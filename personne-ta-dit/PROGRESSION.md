# Progression — Personne T'a Dit

Mode : Production (session Claude en ligne) · Plateformes : TikTok · Ordinateur : Mac

| # | Étape | Statut | Notes |
|---|---|---|---|
| 1 | Concept | ✅ | « Sam et son cerveau » : sketchs à dialogues sur la psychologie du quotidien (humour). Voir BIBLE-FORMAT.md (réécrite). Format éducatif argent abandonné |
| 2 | Chaîne | 🟡 | Nom choisi : Personne T'a Dit · @handle à vérifier (personnetadit) · compte TikTok PAS encore créé · chauffe 3 jours pas commencée |
| 3 | Atelier | ✅ | Dossier : personne-ta-dit/ (branche claude/funny-darwin-ikigyn du dépôt car-agreement). Exemple rendu OK. Clé ElevenLabs enregistrée dans l'environnement « Studio video - Personne T'a Dit » : génération de voix et liste des voix OK (forfait payant actif). Musique non testée |
| 4 | Univers visuel | ✅ | Style A « Cartoon pastel » · Sam version B (cheveux plaqués bruns, lunettes, sweat corail) · Avatar : Sam malin → marque-export/avatar.png (à mettre sur TikTok quand le compte sera créé) · Pas de bannière (TikTok seul) |
| 5 | Script épisode 1 | ✅ | Épisode 1 « Je m'y mets à 14h pile » validé → scripts/episodes/procrastination.mjs (≈ 60 s). paie.mjs = ancien brouillon abandonné |
| 6 | Voix et musique | 🟡 | Sam = Grégory ctilxqiD5xHFsAqEwjvS · Cerveau = Julien zlP1wgh6FsmMZswaDa2M · Narrateur = Antoine RINb2PsSYGXD07PG6mx3. Voix du sketch générées (public/voix/procrastination), écoute envoyée (out/voix-sketch-procrastination.mp3), validation en attente. Musique : à faire |
| 7 | Montage | ⬜ | |
| 8 | Publication | ⬜ | Liens : |
| 9 | Routine | ⬜ | |
| 10 | Bilan | ⬜ | |

## Références envoyées par l'élève le 28/11 (« on va faire ça »)
5 vidéos TikTok analysées (images + transcription). Deux familles :
- Légendes qui font peur, 2D à plat sombre : @lenvers_ (FR, Kuchisake-onna, 67 s), @darkatlastales (EN, Jiangshi 135 s, Manananggal 72 s).
  Recette : « Au/En [pays], si [signe], ne fais surtout pas [réflexe] » → nom de la créature → description → la légende →
  « mais voici le pire » (règle contre-intuitive) → faiblesse → retour à « toi » ce soir → dernière phrase qui glace.
  Narrateur seul à la 2e personne, sous-titres 2-3 mots avec un mot rouge/jaune, décors nuit, peu de mouvements.
- Histoires en 3D façon blocs : @zaylento.yt (ninja sans pouvoir, 141 s), @pawranoid.pets (le facteur, 71 s).
  Recette : « Dans cette ville, tout le monde est X, sauf moi » → 1re personne → indices → retournement. Sous-titres 1 mot jaune.
  Le rendu 3D n'est PAS faisable avec l'atelier (2D) ; la structure d'histoire, si.
Le concept « Sam et son cerveau » (sketch + voix déjà générés) est en pause tant que l'élève n'a pas choisi.

## Notes techniques (pour Claude)
- Session en ligne : rendre avec `--browser-executable=/opt/pw-browsers/chromium`.
- Bruitages copiés en local dans `public/sfx/` (remotion.media n'est pas joignable pendant le rendu).
- ElevenLabs : clé injectée par l'environnement. Lancer les scripts avec `ELEVENLABS_API_KEY=proxy-injected NODE_USE_ENV_PROXY=1`.
- Polices et bruitages : rendre avec les fichiers locaux, le navigateur de rendu ne passe pas par le proxy.

## Calendrier
| Date | Épisode | Écrit | Voix | Monté | Publié |
|---|---|---|---|---|---|

## Bilans hebdomadaires
