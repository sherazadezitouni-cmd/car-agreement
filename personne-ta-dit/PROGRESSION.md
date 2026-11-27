# Progression — Personne T'a Dit

Mode : Production (session Claude en ligne) · Plateformes : TikTok · Ordinateur : Mac

| # | Étape | Statut | Notes |
|---|---|---|---|
| 1 | Concept | ✅ | « 60 secondes pour comprendre », thème argent/paperasse, leçons numérotées. Voir BIBLE-FORMAT.md |
| 2 | Chaîne | 🟡 | Nom choisi : Personne T'a Dit · @handle à vérifier (personnetadit) · compte TikTok PAS encore créé · chauffe 3 jours pas commencée |
| 3 | Atelier | ✅ | Dossier : personne-ta-dit/ (branche claude/funny-darwin-ikigyn du dépôt car-agreement). Exemple rendu OK. Clé ElevenLabs enregistrée dans l'environnement « Studio video - Personne T'a Dit » : génération de voix et liste des voix OK (forfait payant actif). Musique non testée |
| 4 | Univers visuel | ✅ | Style A « Cartoon pastel » · Sam version B (cheveux plaqués bruns, lunettes, sweat corail) · Avatar : Sam malin → marque-export/avatar.png (à mettre sur TikTok quand le compte sera créé) · Pas de bannière (TikTok seul) |
| 5 | Script épisode 1 | 🟡 | L'élève a REJETÉ le sujet « fiche de paie » après écoute (« on s'en fout »). scripts/episodes/paie.mjs = brouillon abandonné. Nouveau sujet à choisir (plus accrocheur, moins scolaire) puis réécrire |
| 6 | Voix et musique | 🟡 | Will REJETÉ (accent canadien). L'élève veut un HOMME, français de France. Audition 2 envoyée (out/audition-voix-francaises.mp3) : 1 Antoine RINb2PsSYGXD07PG6mx3 · 2 Julien zlP1wgh6FsmMZswaDa2M · 3 Grégory ctilxqiD5xHFsAqEwjvS · 4 Romain 18NUO6C3U1qa5bYQCTq3 · 5 Jean Pusu0gPf7gLZlyRLR2qN (voix de bibliothèque utilisables directement). Choix en attente ; mettre l'ID choisi par défaut dans scripts/voix.mjs. Musique : à faire |
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
