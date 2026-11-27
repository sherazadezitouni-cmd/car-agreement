// Génère une musique de fond avec ElevenLabs Music.
// Usage : node scripts/musique.mjs <style> <durée en secondes>
// Styles : voir STYLES ci-dessous. Écrit public/musique/<style>.mp3
import "./env.mjs";
import { mkdirSync, writeFileSync } from "node:fs";

const STYLES = {
  violon:
    "Playful comedic instrumental for a funny cartoon short: bouncy pizzicato strings and a cheeky lead violin, " +
    "light percussion, upbeat and mischievous, steady energetic rhythm around 125 BPM, no vocals, no long intro, " +
    "consistent energy from start to end so it sits under a voiceover.",
  // L'Été de Vivaldi (domaine public) : notre propre interprétation, sans droits d'enregistrement.
  vivaldi:
    "Baroque string orchestra performing Vivaldi's The Four Seasons, Summer, third movement Presto (L'estate, RV 315): " +
    "furious fast repeated violin tremolos, stormy driving G minor, solo violin with rapid scales and arpeggios over " +
    "harpsichord continuo, relentless high energy from the very first second, no slow intro, no vocals.",
};

const [style = "violon", secondes = "75"] = process.argv.slice(2);
if (!STYLES[style]) {
  throw new Error(`Style inconnu : ${style}. Styles : ${Object.keys(STYLES).join(", ")}`);
}

const reponse = await fetch("https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128", {
  method: "POST",
  headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: STYLES[style], music_length_ms: Number(secondes) * 1000, force_instrumental: true }),
});
if (!reponse.ok) {
  throw new Error(`ElevenLabs ${reponse.status} : ${await reponse.text()}`);
}
mkdirSync("public/musique", { recursive: true });
writeFileSync(`public/musique/${style}.mp3`, Buffer.from(await reponse.arrayBuffer()));
console.log(`public/musique/${style}.mp3`);
