# Étape 6 — Voix et musique

Objectif : la voix de la chaîne choisie (on la garde ensuite pour tous les épisodes), la voix off de l'épisode générée,
et une musique utilisable légalement.

## 1. Choisir la voix (une fois pour toute la chaîne)

1. `node scripts/catalogue-voix.mjs` (ou avec un mot-clé : `dynamique`, `narrateur`, `jeune`…) liste ses voix françaises
   et des suggestions de la bibliothèque.
2. Les voix de la bibliothèque doivent d'abord être **ajoutées à son compte** : il ouvre le lien d'écoute ou
   elevenlabs.io → Voices → Library, cherche la voix, clique **Add to my voices**.
3. Audition : la même phrase par 3 à 6 voix, à la suite :
   ```bash
   node scripts/audition.mjs "[excited] Voici Jordan, le mec qui rend jamais rien." ID1 ID2 ID3
   ```
   Envoie `out/audition.mp3` à l'élève, il choisit un numéro.
4. Inscris l'ID choisi dans `.env` : `ELEVENLABS_VOIX=...` (ou `export const voix = "..."` dans un épisode précis).
5. Option : sa propre voix clonée (elevenlabs.io → Voices → Instant Voice Clone, 1-2 min d'enregistrement propre).

Réglages par défaut (dans `scripts/voix.mjs`) : modèle `eleven_v4`, vitesse 1,15, volume normalisé à -14 LUFS,
silences coupés avant le premier et après le dernier mot. Si l'élève trouve ça trop lent : vitesse 1,2 (max) ;
pas assez naturel : enlève des `[excited]` ; trop de rires : retire les `[laughs]`.

## Dialogues : une voix par personnage

Pour les formats avec répliques (tribunal, « sur ton front »…), déclare les voix dans l'épisode puis indique
qui parle sur chaque bloc ; le narrateur garde la voix de la chaîne :
```js
export const persos = { juge: "ID_VOIX_FEMME", accuse: "ID_VOIX_JEUNE_HOMME" };
// …
{ qui: "juge", dit: "[annoyed] Accusé, levez-vous.", affiche: "« ACCUSÉ, *LEVEZ-VOUS* »" },
```
Le script génère chaque réplique avec sa voix, les assemble avec un petit blanc et cale les sous-titres.
Choisis des voix bien différentes (âge, timbre) et garde toujours la même voix pour un perso récurrent.

## 2. Générer la voix off

```bash
node scripts/voix.mjs <episode>              # tout l'épisode
node scripts/voix.mjs <episode> intro chute  # seulement ces scènes (économise des crédits)
```
Le script écrit `public/voix/<episode>/*.mp3` et `src/voix/<episode>.ts` (durées + minutage exact des sous-titres).
Coût : environ 1 crédit par caractère (≈ 1 200 caractères pour un Short de 70 s). Vérifie le solde :
`curl -s https://api.elevenlabs.io/v1/user/subscription -H "xi-api-key: $ELEVENLABS_API_KEY"` (sans afficher la clé).

Contrôle sans écouter : la transcription ElevenLabs (`POST /v1/speech-to-text`, `model_id=scribe_v1`,
`tag_audio_events=true`) permet de vérifier qu'aucune indication n'est lue à voix haute et que les mots sont bons.
Fais quand même écouter l'élève : c'est lui qui juge le ton.

## 3. La musique (légale)

Jamais de musique téléchargée depuis YouTube/TikTok ni d'extrait d'une vidéo existante.
Trois options :
1. **Générée par ElevenLabs Music** (la plus simple, aucun crédit à mettre) :
   `node scripts/musique.mjs <style> <secondes>` — ajoute un style dans `STYLES` en décrivant instruments, tempo,
   énergie (en anglais). Un morceau du domaine public peut servir de base (ex. « Vivaldi, Summer, Presto »).
2. **Enregistrement libre de droits du domaine public** (ex. musique classique sur Wikimedia Commons, Free Music Archive,
   Musopen) : vérifie la licence de **l'enregistrement** (pas seulement de l'œuvre). En CC BY / CC BY-SA, le crédit dans la
   description est obligatoire ; garde-le dans `CREDITS.md`. Téléchargement uniquement avec l'accord de l'élève.
3. **Bibliothèque audio YouTube** ou banque payante dont l'élève a la licence.

Volume : la voix est à -14 LUFS ; la musique doit rester ~12 dB en dessous (≈ -26 LUFS).
Mesure la musique (`npx remotion ffmpeg -i musique.mp3 -af loudnorm=print_format=summary -f null -`) et règle le
`volume` de l'`<Audio>` en conséquence (ex. musique à -18 LUFS → volume ≈ 0,35 ; à -10 LUFS → ≈ 0,14).

## 4. Bruitages

Disponibles en ligne (connexion requise au rendu) : `https://remotion.media/<nom>.wav` avec `whoosh`, `whip`, `ding`,
`vine-boom`, `bruh`, `mouse-click`, `switch`, `snapchat-notification`, `windows-xp-error`, `price-is-right-fail`,
`spongebob-fail`, `record-scratch`, `yippee`, `anime-wow`, `bone-crack`, `triggered`, etc.
Un bruitage par moment fort, volume 0,3–0,6 — pas plus, sinon ça devient fatigant.

## Sortie de l'étape

« La voix est prête et calée. On monte la vidéo ? »
