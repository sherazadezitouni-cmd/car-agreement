// Liste les voix françaises : celles déjà dans ton compte ElevenLabs,
// puis des suggestions de la bibliothèque publique (à ajouter à ton compte pour les utiliser).
// Usage : node scripts/catalogue-voix.mjs [mot-clé]   (ex. node scripts/catalogue-voix.mjs dynamique)
import "./env.mjs";

const cle = process.env.ELEVENLABS_API_KEY;
if (!cle) {
  throw new Error("Ajoute ELEVENLABS_API_KEY dans le fichier .env du projet.");
}
const recherche = process.argv[2] ?? "";
const entetes = { "xi-api-key": cle };

const mes = await (await fetch("https://api.elevenlabs.io/v2/voices?page_size=100", { headers: entetes })).json();
console.log("\n— TES VOIX (utilisables tout de suite) —");
for (const v of mes.voices ?? []) {
  const langues = (v.verified_languages ?? []).map((l) => l.language);
  const fr = v.labels?.language === "fr" || langues.includes("fr");
  if (fr && (!recherche || v.name.toLowerCase().includes(recherche.toLowerCase()))) {
    console.log(`${v.voice_id}  ${v.name}  (${v.labels?.gender ?? "?"})`);
  }
}

const params = new URLSearchParams({ language: "fr", page_size: "15", sort: "trending" });
if (recherche) {
  params.set("search", recherche);
}
const bib = await (await fetch(`https://api.elevenlabs.io/v1/shared-voices?${params}`, { headers: entetes })).json();
console.log("\n— SUGGESTIONS DE LA BIBLIOTHÈQUE (à ajouter à ton compte d'abord) —");
for (const v of bib.voices ?? []) {
  console.log(`${v.voice_id}  ${v.name}  (${v.gender ?? "?"}, ${v.age ?? "?"})  écoute : ${v.preview_url ?? "-"}`);
}
