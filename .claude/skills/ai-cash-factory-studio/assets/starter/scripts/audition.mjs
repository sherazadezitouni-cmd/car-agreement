// Fait dire la même phrase à plusieurs voix, dans l'ordre, pour comparer à l'oreille.
// Usage : node scripts/audition.mjs "<phrase>" <idVoix1> <idVoix2> ...
// Écrit out/audition.mp3 (une seconde de silence entre chaque voix).
import "./env.mjs";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";

const [phrase, ...ids] = process.argv.slice(2);
if (!phrase || ids.length === 0) {
  throw new Error('Usage : node scripts/audition.mjs "[excited] Voici Kevin..." idVoix1 idVoix2');
}
mkdirSync("out/audition", { recursive: true });
const fichiers = [];
for (const [i, id] of ids.entries()) {
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ text: phrase, model_id: "eleven_v4", language_code: "fr", voice_settings: { speed: 1.15 } }),
  });
  if (!r.ok) {
    console.log(`Voix ${i + 1} (${id}) : erreur ${r.status} ${(await r.text()).slice(0, 160)}`);
    continue;
  }
  const f = `out/audition/${i + 1}.mp3`;
  writeFileSync(f, Buffer.from(await r.arrayBuffer()));
  fichiers.push(f);
  console.log(`Voix ${i + 1} : ${id}`);
}
// Assemble : chaque voix normalisée au même volume, séparée par 1 s de silence.
const entrees = fichiers.flatMap((f) => ["-i", f]);
const silences = fichiers.slice(1).flatMap(() => ["-f", "lavfi", "-t", "1", "-i", "anullsrc=r=44100:cl=mono"]);
const norme = "loudnorm=I=-14:TP=-1:LRA=7,aresample=44100,aformat=sample_fmts=fltp:channel_layouts=mono";
const parties = fichiers.map((_, i) => `[${i}]${norme}[a${i}]`);
const blancs = fichiers.slice(1).map((_, i) => `[${fichiers.length + i}]aformat=sample_fmts=fltp[s${i}]`);
const ordre = fichiers.map((_, i) => (i === 0 ? `[a0]` : `[s${i - 1}][a${i}]`)).join("");
const filtre = [...parties, ...blancs, `${ordre}concat=n=${fichiers.length * 2 - 1}:v=0:a=1[o]`].join(";");
execFileSync("npx", ["remotion", "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", ...entrees, ...silences, "-filter_complex", filtre, "-map", "[o]", "out/audition.mp3"]);
rmSync("out/audition", { recursive: true, force: true });
console.log("→ out/audition.mp3");
