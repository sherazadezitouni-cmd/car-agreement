// Génère la voix off de chaque scène d'un épisode, puis écrit src/voix/<épisode>.ts
// (durées + minutage des sous-titres).
// Avec ELEVENLABS_API_KEY : voix ElevenLabs, sous-titres calés sur l'audio.
// Sans : synthèse vocale de macOS, minutage estimé.
// Usage : node scripts/voix.mjs <épisode> [scènes à refaire…]   (ex. node scripts/voix.mjs theo formation)
// Dans `dit`, les [indications] en anglais règlent le ton (jouées, pas lues).
import "./env.mjs";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const ELEVENLABS = {
  // Voix par défaut : ELEVENLABS_VOIX dans .env (sinon Will, la voix de la chaîne).
  voix: process.env.ELEVENLABS_VOIX || "bIHbv24MWmeRgasZH58o", // Will : la voix de « Personne T'a Dit »
  modele: "eleven_v4", // comprend les indications de jeu entre [crochets]
  vitesse: 1.15, // 0,7 à 1,2
};
const MAC = { voix: "Thomas", debit: 185 };

// Volume cible des Shorts : -14 LUFS.
const NORMALISATION = "loudnorm=I=-14:TP=-1:LRA=7,aresample=44100";


const episode = process.argv[2];
if (!episode) {
  throw new Error("Précise l'épisode : node scripts/voix.mjs kevin");
}
// Un épisode peut choisir sa voix de narrateur (`export const voix = "…"`), sinon celle par défaut.
// Dialogues : `export const persos = { juge: "ID_VOIX", ... }` puis `qui: "juge"` sur un bloc
// (ou `voix: "ID_VOIX"` directement). Chaque personnage parle avec sa propre voix.
const { scenes, voix: voixEpisode, persos = {} } = await import(`./episodes/${episode}.mjs`);
const idVoix = voixEpisode ?? ELEVENLABS.voix;

const INDICATION = /^\[[^\]]*\]\s*/;
// Petit blanc entre deux voix différentes (rythme d'un dialogue).
const PAUSE_REPLIQUE = 0.12;

// Durée d'un fichier audio en secondes (ffprobe : marche sur Mac, Windows et Linux).
const duree = (fichier) =>
  Number(
    execFileSync("npx", ["remotion", "ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", fichier])
      .toString()
      .trim(),
  );

const ffmpeg = (...args) => execFileSync("npx", ["remotion", "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", ...args]);

const voixDuBloc = (b) => {
  if (b.voix) {
    return b.voix;
  }
  if (b.qui) {
    if (!persos[b.qui]) {
      throw new Error(`Le personnage « ${b.qui} » n'a pas de voix dans \`persos\`.`);
    }
    return persos[b.qui];
  }
  return idVoix;
};

const parler = async (id, texte) => {
  const reponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}/with-timestamps?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ text: texte, model_id: ELEVENLABS.modele, language_code: "fr", voice_settings: { speed: ELEVENLABS.vitesse } }),
  });
  if (!reponse.ok) {
    throw new Error(`ElevenLabs ${reponse.status} : ${await reponse.text()}`);
  }
  return reponse.json();
};

// Renvoie { fichier, debuts } : début (s) de chaque bloc dans l'audio final de la scène.
// Les blocs qui se suivent avec la même voix sont générés en une fois ; chaque morceau est
// coupé au plus près de la parole, puis tout est assemblé et normalisé (-14 LUFS).
const avecElevenLabs = async (scene) => {
  const morceauxVoix = [];
  for (const b of scene.blocs) {
    const v = voixDuBloc(b);
    const dernier = morceauxVoix.at(-1);
    if (dernier && dernier.voix === v) {
      dernier.blocs.push(b);
    } else {
      morceauxVoix.push({ voix: v, blocs: [b] });
    }
  }

  const dossier = `public/voix/${episode}`;
  const fichiersWav = [];
  const debuts = [];
  let t = 0;
  for (const [i, m] of morceauxVoix.entries()) {
    const { audio_base64, alignment } = await parler(m.voix, m.blocs.map((b) => b.dit).join(" "));
    const brut = `${dossier}/${scene.id}-${i}-brut.mp3`;
    writeFileSync(brut, Buffer.from(audio_base64, "base64"));

    // Le bloc commence au premier mot prononcé (après l'éventuelle [indication]).
    let position = 0;
    const locaux = m.blocs.map((b) => {
      const decalage = b.dit.match(INDICATION)?.[0].length ?? 0;
      const x = alignment.character_start_times_seconds[position + decalage];
      position += b.dit.length + 1;
      return x;
    });
    const coupe = Math.max(0, locaux[0] - 0.03);
    const fin = alignment.character_end_times_seconds.at(-1) + 0.08;
    const wav = `${dossier}/${scene.id}-${i}.wav`;
    ffmpeg("-i", brut, "-ss", String(coupe), "-to", String(fin), "-ar", "44100", "-ac", "1", wav);
    rmSync(brut);

    locaux.forEach((x) => debuts.push(t + x - coupe));
    t += duree(wav) + PAUSE_REPLIQUE;
    fichiersWav.push(wav);
  }

  const fichier = `voix/${episode}/${scene.id}.mp3`;
  const entrees = fichiersWav.flatMap((f) => ["-i", f]);
  const blancs = fichiersWav.slice(1).flatMap(() => ["-f", "lavfi", "-t", String(PAUSE_REPLIQUE), "-i", "anullsrc=r=44100:cl=mono"]);
  const ordre = fichiersWav.map((_, i) => (i === 0 ? "[0]" : `[${fichiersWav.length + i - 1}][${i}]`)).join("");
  const filtre = `${ordre}concat=n=${fichiersWav.length * 2 - 1}:v=0:a=1,${NORMALISATION}[o]`;
  ffmpeg(...entrees, ...blancs, "-filter_complex", filtre, "-map", "[o]", "-b:a", "192k", `public/${fichier}`);
  fichiersWav.forEach((f) => rmSync(f));
  return { fichier, debuts };
};

const avecMac = (scene, texte) => {
  const fichier = `voix/${episode}/${scene.id}.wav`;
  const aiff = `public/voix/${episode}/${scene.id}.aiff`;
  execFileSync("say", ["-v", MAC.voix, "-r", String(MAC.debit), "-o", aiff, texte.replace(/\[[^\]]*\]\s*/g, "")]);
  execFileSync("afconvert", ["-f", "WAVE", "-d", "LEI16@44100", aiff, `public/${fichier}`]);
  rmSync(aiff);
  // Répartit la durée entre les blocs selon leur nombre de lettres.
  const total = duree(`public/${fichier}`);
  const poids = scene.blocs.map((b) => b.dit.length + 3);
  const somme = poids.reduce((a, b) => a + b, 0);
  let t = 0;
  const debuts = poids.map((p) => {
    const debut = t;
    t += (p / somme) * total;
    return debut;
  });
  return { fichier, debuts };
};

// Scènes à refaire (toutes si aucune n'est précisée) ; les autres sont reprises telles quelles.
const aRefaire = process.argv.slice(3);
const sortie = `src/voix/${episode}.ts`;
const existant =
  aRefaire.length > 0 && existsSync(sortie)
    ? JSON.parse(readFileSync(sortie, "utf8").replace(/^\/\/.*\n/, "").replace("export const voix = ", "").replace(/ as const;\s*$/, ""))
    : {};
if (aRefaire.length === 0) {
  rmSync(`public/voix/${episode}`, { recursive: true, force: true });
}
mkdirSync(`public/voix/${episode}`, { recursive: true });

const avecCle = Boolean(process.env.ELEVENLABS_API_KEY);
console.log(avecCle ? "Voix : ElevenLabs" : "Voix : macOS (pas de ELEVENLABS_API_KEY)");

const resultat = {};
for (const scene of scenes) {
  if (aRefaire.length > 0 && !aRefaire.includes(scene.id) && existant[scene.id]) {
    resultat[scene.id] = existant[scene.id];
    continue;
  }
  const texte = scene.blocs.map((b) => b.dit).join(" ");
  const { fichier, debuts } = avecCle ? await avecElevenLabs(scene) : avecMac(scene, texte);
  const total = duree(`public/${fichier}`);
  resultat[scene.id] = {
    src: fichier,
    durationInSeconds: Math.round(total * 1000) / 1000,
    captions: scene.blocs.map((b, i) => ({
      text: b.affiche,
      startMs: Math.round(debuts[i] * 1000),
      endMs: Math.round((i + 1 < debuts.length ? debuts[i + 1] : total) * 1000),
    })),
  };
  console.log(`${scene.id}: ${total.toFixed(2)} s`);
}

writeFileSync(
  `src/voix/${episode}.ts`,
  `// Fichier généré par scripts/voix.mjs ${episode} — ne pas modifier à la main.\n` +
    `export const voix = ${JSON.stringify(resultat, null, 2)} as const;\n`,
);
