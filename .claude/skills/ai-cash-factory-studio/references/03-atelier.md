# Étape 3 — L'atelier (installation)

Objectif : l'atelier vidéo installé sur l'ordinateur de l'élève, le Studio ouvert,
un épisode d'exemple rendu, et la clé ElevenLabs en place.
Cette étape demande le **mode Production** (terminal). Fais toutes les commandes toi-même.

## 1. Node.js

Vérifie : `node -v`. Il faut la version 20.19+ ou 22+.
Sinon : fais-lui télécharger la version **LTS** sur nodejs.org (installeur classique, « suivant » partout),
puis redémarrer l'app Claude.

## 2. Choisir le dossier — attention iCloud / OneDrive

Les dossiers synchronisés (Bureau/Documents avec iCloud sur Mac, OneDrive sur Windows, Dropbox…) **bloquent**
les milliers de petits fichiers des outils : Node se fige sans aucun message d'erreur.
Propose un dossier hors synchro :
- Mac : `~/Projets/<nom-de-la-chaine>`
- Windows : `C:\Projets\<nom-de-la-chaine>`

## 3. Créer l'atelier

```bash
node <dossier-du-skill>/scripts/creer-atelier.mjs ~/Projets/<nom-de-la-chaine>
```
Le script copie le kit, installe les outils (1-3 min) et, si le dossier est synchronisé malgré tout,
range les dépendances dans `node_modules.nosync` (ignoré par iCloud) avec un raccourci.
Si le skill est installé dans Claude Code, son dossier est en général `~/.claude/skills/ai-cash-factory-studio`.

Copie ensuite la bible du format de l'étape 1 dans l'atelier (`BIBLE-FORMAT.md`) et crée `PROGRESSION.md`
depuis `assets/modeles/progression.md`.

## 4. La clé ElevenLabs

1. Crée le fichier `.env` vide dans l'atelier (copie de `.env.exemple`).
2. Fais faire à l'élève : elevenlabs.io → connexion → icône profil → **API Keys** → **Create API key**
   (autoriser au minimum : Text to Speech, Voices (lecture), Music, Speech to Text) → copier la clé.
3. Il ouvre `.env` (donne-lui le chemin exact ; dans l'app Claude il peut cliquer sur le fichier)
   et colle la clé après `ELEVENLABS_API_KEY=`. **Il ne la colle pas dans le chat.**
4. Vérifie sans afficher la clé : `node scripts/catalogue-voix.mjs` doit lister des voix.

## 5. Ouvrir le Studio et tester

- Lance le Studio en arrière-plan : `npx remotion studio --port 3000 --no-open` depuis l'atelier,
  puis ouvre `http://localhost:3000` dans le navigateur (dans l'app Claude : panneau navigateur).
  Si le panneau ne peut pas lancer le serveur lui-même (« Operation not permitted »), lance-le depuis le terminal
  et pointe le panneau sur l'URL.
- Montre-lui le Studio : liste des compositions à gauche (Episodes, Chaine), lecture, timeline en bas.
- Rends l'exemple pour prouver que tout marche : `npx remotion render VoiciKevin out/exemple.mp4`
  et envoie-lui la vidéo.

## 6. (Optionnel) Les skills officiels Remotion

`npx skills add remotion-dev/skills` ajoute les bonnes pratiques Remotion à Claude. Utile pour aller plus loin.

## Dépannage

| Symptôme | Cause | Solution |
|---|---|---|
| Une commande ne rend jamais la main, 0 % CPU | Dossier synchronisé (iCloud/OneDrive) | Déplacer l'atelier hors synchro, ou `node_modules.nosync` + raccourci |
| `npx: command not found` | Node pas installé ou app pas redémarrée | Installer Node LTS, redémarrer |
| Port 3000 déjà utilisé | Un Studio tourne déjà | Utiliser `--port 3001` |
| Erreur 401 ElevenLabs | Clé absente/erronée dans `.env` | Refaire la clé, vérifier qu'il n'y a pas d'espace |
| Erreur « voice not found » | La voix n'est pas dans son compte | L'ajouter depuis la bibliothèque ElevenLabs (étape 6) |

## Sortie de l'étape

« L'atelier est prêt, l'exemple est rendu. On crée ton univers visuel ? »
