# Format maison — Série à suspense en plusieurs parties (+ film complet)

Un format déjà produit par la maison (« Le dernier homme », « La dernière femme », « Le dernier signal »).
Une histoire simple et prenante, découpée en 3 ou 4 parties d'environ 1 min pour TikTok/Reels/Shorts,
puis remontée en **film complet** 16:9 pour YouTube.

## Avant d'écrire : 4 choix

- **Niche** (une seule par chaîne, ne jamais mélanger) : thriller/survie, psychologie, psychologie amoureuse,
  santé, histoire, finance, actualité.
- **Sujet** : libre, ou « propose-moi 5 sujets » (titre · hook · jauge · 3 règles · réponse finale en 1 phrase).
- **Style visuel** (un seul par chaîne, voir plus bas).
- **Nombre de parties** : 3 ou 4.

## Règles d'écriture

1. **Hook dans les 2 premières secondes** : 2e personne, situation choc + enjeu chiffré.
   Ex. de forme : « Ce matin, tous les téléphones de la planète se sont éteints. Sauf le tien. »
   Jamais d'intro, jamais « dans cette vidéo ».
2. **Clarté avant tout** : une seule idée forte par partie, chaque révélation résumable en une phrase.
   Pas de concept abstrait sans l'expliquer en une ligne.
3. Phrases très courtes, présent de narration, mots concrets. On passe du « tu » au prénom du héros après le hook.
4. **Mécanique de série** : **3 règles numérotées** qui structurent l'histoire + **une jauge visible** (pouls, batterie,
   prime, compteur, solde…) qui monte avec la tension.
5. Chaque partie : hook → 2-3 rebondissements (un toutes les 10-15 s) → une graine plantée → une fausse accalmie
   → **cliffhanger formulé en question**.
6. La partie suivante démarre exactement sur le cliffhanger précédent (rappel de 1-2 phrases max).
7. **La dernière partie résout TOUS les mystères**, clairement. Fin satisfaisante + phrase-signature qui reprend la règle n°1.
8. Durée : 150 à 170 mots par partie (≈ 60-65 s de voix).
9. Faits réels (santé, histoire, finance, actualité) : uniquement des faits vérifiés, sources citées, aucun conseil
   médical ou financier personnalisé, pas de sensationnalisme sur des drames réels ni sur des personnes privées.

Écris d'abord la **fiche concept** (titre · pitch · héros : prénom, âge, 1 trait visuel · menace · jauge · 3 règles ·
réponse finale du mystère en 1 phrase) et fais-la valider : elle garantit la cohérence de toutes les parties.

## Ton de voix

Balises : `[calm]`, `[serious]`, `[whispers]`, `[tense]`, `[intense]`. Narration posée et grave ; on accélère dans
les rebondissements. Une phrase = un bloc.

## Découpage visuel (12 à 16 scènes par partie)

Pour chaque scène : phrase(s) couverte(s) · décor · personnages + expression · infographie (compteur, carte, grille,
message téléphone, étiquette) · mouvement de caméra · état de la jauge.

Briques de l'atelier (`src/fx/Hud.tsx`, démos `DemoSerie` et `DemoSerieFilm`) :
`FondHud` (bleu nuit), `BadgeHud` (heure · lieu en haut), `Compteur` (« HOMMES EN VIE : 1 »), `Fiche` (« RECHERCHÉ »),
`Regles` (apparaissent puis se barrent en rouge quand une règle est enfreinte), `Jauge` (pouls qui défile, rouge au-delà
de 140), `CartonPartie` (« PARTIE 1 · Qui a coupé le signal ? »), `Paysage` (mise en page 16:9).
Sous-titres au centre, mots-clés en jaune ; léger zoom lent sur chaque scène (`Camera`).

## Publication courte (par partie)

- Légende : « {Série} · Partie X/N » + 4-6 hashtags (2 larges, 2 de niche, 1 de format), ex. #pov #survie #histoire #suspense.
- Titre Shorts ≤ 60 caractères.
- Miniature 9:16 : 3 lignes max, la 3e en jaune, texte centré, bandeau « PARTIE X » + nom de la série.

## Film complet YouTube (16:9)

- **Une seule histoire continue** : AUCUNE mention « partie », aucun carton entre épisodes, aucun rappel.
  Les parties s'enchaînent en fondu comme un film. Démarre directement sur le hook de la partie 1.
- Mise en page : scène à gauche, panneau HUD à droite (nom de la série, règles, jauge) → `Paysage`.
- Titre ≤ 70 caractères (curiosité + enjeu), description (pitch 2 lignes, chapitres avec horodatages, question,
  hashtags), chapitres narratifs sans le mot « partie ».
- Miniature 1280×720 : 2 éléments max (un visuel fort + 3 à 6 mots énormes, dernier mot en jaune)
  + bandeau « L'HISTOIRE COMPLÈTE ».

## Checklist qualité

Hook < 2 s ? · Révélation résumable en 1 phrase ? · Tous les mystères résolus à la fin ? · Chaque partie ≥ 60 s ?
· Jauge présente et qui évolue ? · Film sans « partie » ? · Faits vérifiés et sourcés (si niche réelle) ?

## Les 7 styles visuels (un seul par chaîne)

1. **HUD thriller** — bleu nuit, jaune, rouge alerte, police machine ; jauge = pouls. Thriller, survie, actualité. *(prêt dans l'atelier)*
2. **Dossier d'enquête** — papier kraft, polaroïds, punaises, fil rouge, tampons « CONFIDENTIEL » ; jauge = indices. Histoire, faits divers.
3. **Pâte à modeler minimal** — figurines, fonds pastel, lumière douce ; jauge = attachement. Psychologie, amour.
4. **Doodle papier** — trait noir sur papier blanc, annotations, flèches ; jauge = compteur dessiné. Santé, vulgarisation.
5. **Néon cyber** — fond noir, néons violet/cyan, glitch ; jauge = barre de piratage. Tech, arnaques, crypto.
6. **Data minimal** — fond crème, graphiques animés, chiffres géants, une couleur d'accent ; jauge = solde/courbe. Finance, économie.
7. **Archive rétro** — grain film, sépia, coupures de journaux, machine à écrire ; jauge = compte à rebours. Histoire, biographies.

Pour les styles 2 à 7, crée le fond et les éléments dans le même esprit que `Hud.tsx` (une palette dans un objet,
un fond plein écran, des cartes/étiquettes), et montre une image à l'élève avant d'aller plus loin.

## Idées de jauges et de règles par niche

- Thriller/survie : pouls, batterie, prime, survivants — règles de survie.
- Psychologie : niveau de manipulation, contrôle — règles pour repérer un manipulateur.
- Psychologie amoureuse : attachement, red flags — signaux d'alerte.
- Santé : organes touchés, jours sans sommeil — règles du corps (faits vérifiés, pas de diagnostic).
- Histoire : compte à rebours, kilomètres — règles de l'époque.
- Finance : solde, dette, inflation — règles d'argent (pédagogique, pas de conseil d'investissement).
- Actualité : chronologie, chiffres clés vérifiés — neutre, sourcé, daté.
