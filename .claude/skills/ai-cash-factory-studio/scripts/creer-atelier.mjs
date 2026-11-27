// Crée l'atelier vidéo de l'élève à partir du kit de départ du skill.
// Usage : node <skill>/scripts/creer-atelier.mjs <dossier-de-destination>
// Exemple : node scripts/creer-atelier.mjs ~/Projets/ma-chaine
import { cpSync, existsSync, readdirSync, renameSync, symlinkSync } from "node:fs";
import { homedir, platform } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const cible = process.argv[2]?.replace(/^~(?=$|\/)/, homedir());
if (!cible) {
  console.error("Indique le dossier à créer, par exemple : ~/Projets/ma-chaine");
  process.exit(1);
}
const destination = resolve(cible);

if (existsSync(destination) && readdirSync(destination).length > 0) {
  console.error(`Le dossier ${destination} existe déjà et n'est pas vide. Choisis un autre nom.`);
  process.exit(1);
}

// iCloud (Bureau/Documents sur Mac) et OneDrive bloquent les milliers de petits fichiers
// des dépendances : Node se fige sans message d'erreur.
const synchronise = /Mobile Documents|iCloud|OneDrive|Dropbox|Google Drive/i.test(destination);
const macDocuments = platform() === "darwin" && /^\/Users\/[^/]+\/(Documents|Desktop)(\/|$)/.test(destination);

const kit = join(dirname(fileURLToPath(import.meta.url)), "..", "assets", "starter");
cpSync(kit, destination, { recursive: true });
console.log(`✓ Atelier copié dans ${destination}`);

console.log("… Installation des outils (1 à 3 minutes)");
execSync("npm install", { cwd: destination, stdio: "inherit" });

if (synchronise || macDocuments) {
  // Dossier synchronisé : on range les dépendances dans un dossier ignoré par la synchro.
  renameSync(join(destination, "node_modules"), join(destination, "node_modules.nosync"));
  symlinkSync("node_modules.nosync", join(destination, "node_modules"));
  console.log("⚠ Dossier synchronisé (iCloud/OneDrive) détecté : dépendances rangées dans node_modules.nosync.");
  console.log("  Après chaque « npm install », il faudra refaire ce rangement.");
}

console.log("✓ Atelier prêt. Prochaine étape : créer le fichier .env avec la clé ElevenLabs (voir .env.exemple).");
