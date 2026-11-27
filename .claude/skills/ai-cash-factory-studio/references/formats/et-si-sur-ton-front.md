# Format maison — « Et si… ça s'affichait sur ton front »

Un format déjà produit et publié par la maison. Principe : une **règle du monde** absurde
(« ce matin, ton salaire s'affiche sur ton front ») et on montre ce que ça change dans la vraie vie,
avec des personnages qui se parlent et des chiffres qui contrastent sur les fronts.

Variantes déjà faites : le salaire, le body count, le compte en banque, le pourcentage d'amour,
les heures passées sur le téléphone, les jours qu'il te reste à vivre, ce que les gens pensent de toi.
Idées de suite : ta note de crédit sociale, ton nombre de mensonges du jour, ton QI, tes abonnés réels,
le nombre de fois où tu as menti à ta mère, ton nombre d'ex, ce que tu as dépensé chez Shein cette année.

## Structure d'un épisode court (9:16, environ 1 min 30 à 1 min 50, ≈ 230-250 mots)

1. **Hook dès la première image** : une réplique choc d'un personnage ou une image forte
   (jamais d'écran noir, jamais de titre seul).
2. **La règle du monde** : « Imagine. Ce matin, ton front affiche… »
3. **Scènes concrètes**, une par situation : le couple, la rue, le boulot, la famille, les inconnus.
   Chaque scène a son mini-retournement.
4. **Les règles** réparties dans la vidéo : « Règle numéro un : … », « Règle numéro deux : … ».
5. **Rebondissements**, puis un **twist final**.
6. **Question au spectateur** : « Et toi, il afficherait quoi, ton front ? »
7. Fin sèche environ 1 s après la dernière phrase : pas de carton de fin, pas de « À suivre ».

CTA abonnement entre 18 et 25 s, juste après une phrase peu importante : la scène reste derrière, assombrie,
avec le bouton (`BoutonAbonne`), puis l'histoire reprend.

## Version longue YouTube (16:9, 7 à 9 min, ≈ 1 150-1 250 mots)

- Ce n'est pas le Short rallongé. **Titre à la 2e personne, une seule idée** : « Et si ton front affichait ton salaire ? »
- **Hook différent du Short** (le public a déjà vu celui du Short).
- 4 à 6 situations qui montent en tension (couple, travail, famille, rue, inconnus, puissants),
  chacune avec son mini-retournement, puis 2-3 rebondissements et un twist final.
- Les 3 « Règle numéro… » réparties dans la vidéo, la question finale au spectateur.
- CTA plus long vers 1 min 30.

## Écriture

- **Le narrateur porte le récit, les personnages lancent les répliques.** Répliques courtes, punchy, une voix différente
  par personnage (voir « Dialogues » dans `references/06-voix-musique.md`).
- **Les chiffres font la blague** : ils doivent contraster (47 contre 14, -90 000 € contre 3 200 000 €).
- Une situation = un décor différent.

Exemple de début (à adapter, ne pas réutiliser tel quel) :
```js
export const persos = { patron: "ID_VOIX_HOMME_MUR", stagiaire: "ID_VOIX_JEUNE_FEMME" };
export const scenes = [
  { id: "hook", blocs: [
    { qui: "patron", dit: "[shocked] Attends… la stagiaire gagne plus que moi ?", affiche: "« LA STAGIAIRE *GAGNE PLUS* ? »" },
  ]},
  { id: "regle", blocs: [
    { dit: "[calm] Imagine. Ce matin, ton salaire s'affiche sur ton front.", affiche: "TON SALAIRE *SUR TON FRONT*" },
  ]},
];
```

## Visuel (briques de l'atelier)

- Chiffre sur le front : prop `front` de n'importe quel perso, ex. `<Theo front={{ texte: "-12 €", couleur: HUD.rouge }} />`
  (couleurs : `HUD.vert` positif, `HUD.rouge` négatif, `HUD.jaune` énorme). Démo : composition `DemoFront`.
- Pour changer le chiffre en cours de scène : calcule le texte selon `frame` (ex. compteur qui défile).
- Gros titres type « TON SALAIRE… / SUR TON FRONT. » en haut et en bas, mot-clé en couleur.
- Rien ne doit être coupé aux bords : chiffres, bulles, sous-titres. Vérifie sur les images de contrôle.

## Miniatures

- 9:16 : texte entre y≈330 et y≈1500 (sinon coupé sur la grille TikTok), titre court et aguicheur, jamais « Épisode 1 ».
- 16:9 : gros plan sur 1-2 visages expressifs, chiffres géants qui contrastent sur les fronts, 2-3 mots max,
  lumière dramatique (halo coloré, bords sombres).
