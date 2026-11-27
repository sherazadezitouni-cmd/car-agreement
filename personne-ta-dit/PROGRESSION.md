# Progression — Personne T'a Dit

Mode : Production (session Claude en ligne) · Plateformes : TikTok · Ordinateur : Mac

| # | Étape | Statut | Notes |
|---|---|---|---|
| 1 | Concept | 🟡 | À REFAIRE : l'élève abandonne le format éducatif (« c'est nul ») et veut passer à l'HUMOUR. Attention : elle n'a pas aimé l'humour de la démo Kevin. Type d'humour à choisir. BIBLE-FORMAT.md est périmée (format éducatif) |
| 2 | Chaîne | 🟡 | Nom choisi : Personne T'a Dit · @handle à vérifier (personnetadit) · compte TikTok PAS encore créé · chauffe 3 jours pas commencée |
| 3 | Atelier | ✅ | Dossier : personne-ta-dit/ (branche claude/funny-darwin-ikigyn du dépôt car-agreement). Exemple rendu OK. Clé ElevenLabs enregistrée dans l'environnement « Studio video - Personne T'a Dit » : génération de voix et liste des voix OK (forfait payant actif). Musique non testée |
| 4 | Univers visuel | ✅ | Style A « Cartoon pastel » · Sam version B (cheveux plaqués bruns, lunettes, sweat corail) · Avatar : Sam malin → marque-export/avatar.png (à mettre sur TikTok quand le compte sera créé) · Pas de bannière (TikTok seul) |
| 5 | Script épisode 1 | ⬜ | À réécrire après le nouveau concept. scripts/episodes/paie.mjs = brouillon abandonné |
| 6 | Voix et musique | 🟡 | Voix de la chaîne : Antoine (ID RINb2PsSYGXD07PG6mx3, homme, français de France), par défaut dans scripts/voix.mjs. Will rejeté (accent canadien). Voix off et musique : à faire après le nouveau script |
| 7 | Montage | ⬜ | |
| 8 | Publication | ⬜ | Liens : |
| 9 | Routine | ⬜ | |
| 10 | Bilan | ⬜ | |

## Notes techniques (pour Claude)
- Session en ligne : rendre avec `--browser-executable=/opt/pw-browsers/chromium`.
- Bruitages copiés en local dans `public/sfx/` (remotion.media n'est pas joignable pendant le rendu).
- ElevenLabs : clé injectée par l'environnement. Lancer les scripts avec `ELEVENLABS_API_KEY=proxy-injected NODE_USE_ENV_PROXY=1`.
- Polices et bruitages : rendre avec les fichiers locaux, le navigateur de rendu ne passe pas par le proxy.

## Calendrier
| Date | Épisode | Écrit | Voix | Monté | Publié |
|---|---|---|---|---|---|

## Bilans hebdomadaires
