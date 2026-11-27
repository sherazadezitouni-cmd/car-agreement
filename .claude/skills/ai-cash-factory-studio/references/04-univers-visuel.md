# Étape 4 — L'univers visuel (persos, décors, avatar, bannière)

Objectif : une identité reconnaissable en un coup d'œil, puis l'avatar et la bannière exportés et ajoutés à la chaîne.
Règle d'or : **montre une image à chaque proposition**, l'élève choisit sur pièce.

## 1. La direction artistique (une page)

Décide avec l'élève, en fonction du concept :
- **Style** : cartoon à plat avec gros contours (le style de l'atelier), typographie animée, infographie,
  « documentaire » avec images, papier découpé… L'atelier est optimisé pour le cartoon à plat, mais les
  effets (cartes, graphiques, SMS, compteurs, tampons) marchent avec n'importe quel style.
- **Palette** : 1 couleur principale + 1 couleur d'accent (sous-titres surlignés) + couleurs de fond.
  Elles sont dans `src/theme.ts` (`couleurs`).
- **Police** : une police Google Fonts très lisible et grasse. Dans `src/theme.ts`, change l'import
  (`@remotion/google-fonts/LilitaOne` → par ex. `LuckiestGuy`, `Bangers`, `Anton`, `Poppins`).
  Évite de reprendre exactement la police + les couleurs d'une chaîne existante.
- **Signature visuelle** : un élément qu'on ne voit que chez lui (un marteau qui frappe, un tampon, un cadre, un jingle).

Ajoute ces choix dans la bible du format.

## 2. Les personnages

Tout est dans `src/perso/Perso.tsx` :
- Un **look** = cheveux (couleur), coiffure (`bataille`, `plaquee`, `boucles`), haut (`sweat`, `sweatOmbre`),
  options : `casquette` (couleur), `lunettesVue`, `lunettesSurLaTete`, `chaine`, `tache`, `torseNu`.
- **Expressions** : `malin`, `rire`, `dort`, `supplie`, `choc`, `enerve`.
- **Poses** : `repos`, `brasLeves` ; `marche` (jambes qui bougent) ; `ecran` du téléphone : `batterie`, `eteint`, `allume`.
- Pour créer un perso : ajoute un `LOOK_<NOM>` puis `export const <Nom> = (props) => <Perso look={LOOK_<NOM>} {...props} />`.
  Pour un perso féminin, ajoute une coiffure (cheveux longs : une forme derrière la tête + mèches) et éventuellement
  une jupe/robe : c'est du SVG simple dans le même fichier, suis le style existant (contour `#26222e`, épaisseur 6).

Fais-lui choisir 1 perso principal + 2-3 récurrents. Pour comparer, rends une image avec les persos côte à côte
(une composition `Still` temporaire, ou `npx remotion still` sur une scène).

## 3. Les décors disponibles

`src/decor/Chambre.tsx` : `Chambre` (props `nuit`, `mur`: lavande/vert, `poster`: eclair/lambo).
`src/decor/Decors.tsx` : `SalleDeBain` + `Baignoire` (premier plan), `Rue` (`variante`: cafe/resto/immeuble, `nuit`),
`TableTerrasse` (premier plan, tasses qui popent), `Metro`, `Campagne` + `Vache`, `SalleFete` + `Gateau`.
Fonds plein écran : `Rayons` (couleurs au choix), `PlanGPS`, `Graphique` (courbe qui monte puis s'effondre),
`TelephonePlein` + `ChatGroupe`.

Nouveaux décors : un composant SVG en 1080×1920, sol à partir de y≈1250 (les persos posés à `top: 560`
ont les pieds vers y=1410), contours `#26222e` épaisseur 5, aplats de couleurs. Prévois les décors dont le concept
a besoin (une salle de tribunal pour un procès, un plateau télé pour un journal…). Un nouveau décor par épisode
au début, puis la bibliothèque grossit.

## 4. Avatar et bannière

Dans le Studio, dossier **Chaine** : `Avatar` (800×800), `Banniere` (2560×1440), `Miniature`, `MiniatureShort`.
1. Modifie les `defaultProps` dans `src/Root.tsx` (nom, slogan, couleurs, perso, expression) — ou dans le panneau
   de droite du Studio.
2. Exporte :
   ```bash
   npx remotion still Avatar out/avatar.png
   npx remotion still Banniere out/banniere.png
   ```
3. Envoie-lui les images. Une fois validées, il les ajoute : YouTube Studio → Personnalisation → Branding ;
   TikTok → Modifier le profil → Photo.

Bannière : tout le texte important doit tenir dans la zone centrale 1546×423 (visible sur mobile).

## Sortie de l'étape

« Ton univers est prêt et ta chaîne a sa tête. On écrit le premier épisode ? »
