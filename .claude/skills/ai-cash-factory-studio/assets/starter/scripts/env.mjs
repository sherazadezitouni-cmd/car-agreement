// Charge le fichier .env du projet (ELEVENLABS_API_KEY=..., ELEVENLABS_VOIX=...)
// pour que la clé ne soit jamais tapée dans le chat ni dans le code.
import { existsSync, readFileSync } from "node:fs";

if (existsSync(".env")) {
  for (const ligne of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const m = ligne.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}
