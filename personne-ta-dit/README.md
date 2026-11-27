# Atelier AI Cash Factory Studio

Ton atelier de vidéos en motion design. Tu n'as pas besoin de toucher au code : demande à Claude
(skill « AI Cash Factory Studio ») et il te guide étape par étape.

## Les commandes utiles (Claude les lance pour toi)
- `npx remotion studio` — ouvre le Studio pour voir tes vidéos (http://localhost:3000)
- `node scripts/catalogue-voix.mjs` — liste les voix françaises disponibles
- `node scripts/audition.mjs "phrase" ID1 ID2` — compare plusieurs voix
- `node scripts/voix.mjs <episode>` — génère la voix off d'un épisode
- `node scripts/musique.mjs <style> <secondes>` — génère une musique
- `npx remotion render <Composition> out/<nom>.mp4` — fabrique la vidéo finale
- `npx remotion still Banniere out/banniere.png` — exporte la bannière (aussi : Avatar, Miniature, MiniatureShort)

## Où sont les choses
- `scripts/episodes/` — les textes de tes épisodes
- `src/episodes/` — le montage de chaque épisode
- `src/perso/`, `src/decor/`, `src/fx/` — personnages, décors, effets
- `src/marque/` — bannière, avatar, miniatures
- `.env` — ta clé ElevenLabs (ne la partage jamais)
- `PROGRESSION.md` — où tu en es

## Important
Ne mets pas ce dossier dans iCloud Drive, OneDrive ou Dropbox : ça bloque les outils.
