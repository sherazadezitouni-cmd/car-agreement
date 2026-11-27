# Étape 5 — Le script

Objectif : le script du premier épisode, validé par l'élève, écrit dans `scripts/episodes/<id>.mjs`.

## Le format du fichier

```js
// scripts/episodes/jordan.mjs
export const voix = "ID_DE_LA_VOIX"; // optionnel : sinon ELEVENLABS_VOIX du .env

export const scenes = [
  {
    id: "intro", // une scène = un plan / un décor, 3 à 6 secondes
    blocs: [
      { dit: "[excited] Voici Jordan,", affiche: "VOICI *JORDAN*" },
      { dit: "le mec qui ne rend jamais rien.", affiche: "IL REND *JAMAIS RIEN*" },
    ],
  },
  // …
];
```
- `dit` = ce que la voix prononce. `affiche` = le sous-titre (2 à 4 mots, MAJUSCULES, mots-clés entre `*étoiles*` = surlignés).
- Les nombres : écris-les en lettres dans `dit` (« quarante »), en chiffres dans `affiche` (« 40 »).
- Les **indications de jeu** entre crochets au début d'un `dit` (modèle `eleven_v4`, en anglais) :
  `[excited]` (énergie), `[teasing]` (taquin, chutes), `[playful]`, `[deadpan]` (pince-sans-rire),
  `[sarcastic]`, `[whispers]`, `[sighs]`, `[laughs]` (à doser : vite agaçant).
- Piège connu : « Son » en tout début de phrase est souvent mal prononcé → « Et son… ».

## Durées cibles

- Short YouTube : 60–80 s ≈ 170–210 mots (les plus courts retiennent mieux).
- TikTok : vérifie la durée minimale exigée pour la monétisation (étape 2) ; souvent > 1 min.
- Vidéo longue : 8–12 min ≈ 1 300–1 800 mots, découpée en chapitres.

## Les règles d'écriture qui font la différence

1. **Accroche en 2 secondes** : le perso + son défaut, ou une promesse (« à la fin, il va faire un truc… »).
2. **Une vanne ou une info toutes les 3 secondes.** Une phrase qui n'apporte rien saute.
3. **Chiffres précis et absurdes** (« 638 jours », « 47 objets »).
4. **Escalade** : chaque gag plus fort que le précédent.
5. **Planter / récolter** : un détail des 5 premières secondes revient dans la chute.
6. **Le retournement final** : la situation se retourne contre le perso, ou un perso secondaire gagne.
7. **Concret et local** : des lieux, marques, situations que la cible connaît.
8. **Dialogues** (si le format en a) : répliques de 12 mots max, qui claquent.
9. **Trash oui, mais sur les comportements** — jamais sur les origines, la religion, le handicap, le physique subi.

## Structures prêtes à l'emploi

**Portrait comique (75 s)** : accroche + défaut (0-4 s) → fiche absurde (4-10) → journée type, 1 gag par phrase (10-40)
→ contradiction « il jure que… alors que » (40-48) → tournant « un jour… » (48-58) → il est fier de lui (58-62)
→ retournement (62-72) → CTA.

**Procès (75 s)** : ouverture rituelle → acte d'accusation + chiffres → 3 témoins (flashbacks) → défense lamentable
→ verdict ironique → retournement → « Coupable ou acquitté ? ».

**Top 5 (60 s)** : promesse (« le n°1 va te choquer ») → 5, 4, 3, 2 (un plan chacun) → CTA au milieu → n°1 → chute.

**Histoire vraie (70 s)** : fait incroyable en accroche → contexte (qui, où, quand) → complication → climax → révélation finale
→ source à l'écran. (Vérifie les faits sur le web et cite la source dans la description.)

**Quiz (45 s)** : question → 3 propositions → compte à rebours 3 s → réponse animée → anecdote → « tu avais trouvé ? ».

## Les appels à l'action (CTA)

- **Vers 20 s (Shorts)** : un CTA court et drôle intégré à l'histoire (« Abonne-toi pendant que t'attends, t'as le temps »).
- **À la fin** : partage + commentaire avec une vraie question (« Si t'as un pote comme ça, envoie-lui. Dis en commentaire… »).
- **Vidéos longues** : CTA plus long vers 1 min 30 environ, quand le spectateur est accroché.

## Avant de valider

Lis le script à voix haute dans ta tête : chaque bloc doit pouvoir devenir une image. Montre à l'élève le script
sous forme de tableau (scène · ce qu'on entend · ce qu'on voit) et demande « on valide ? ».
Puis écris le fichier `scripts/episodes/<id>.mjs`.
