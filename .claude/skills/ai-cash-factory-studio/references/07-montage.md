# Étape 7 — Le montage (motion design)

Objectif : l'épisode monté, vérifié image par image, rendu en MP4.
Regarde `src/episodes/kevin/` et `src/episodes/theo/` : ce sont des modèles complets.

## Organisation

```
src/episodes/<id>/Scenes.tsx   ← une fonction par scène (décor, persos, effets, voix, sous-titres)
src/episodes/<id>/Short.tsx    ← enchaîne les scènes + la musique
src/Root.tsx                   ← déclare la composition (id, 1080×1920, 30 i/s, durée calculée)
```

## Modèle de scène (dynamique)

```tsx
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = voix.intro;                 // généré par scripts/voix.mjs
  const b = debutsBlocs(v.captions, fps); // image de début de chaque sous-titre
  return (
    <AbsoluteFill>
      <Plan punchs={b} secousses={[b[3]]}>   {/* zoom à chaque phrase + secousse sur la chute */}
        <Rue variante="cafe" />
        <Kevin expression={frame >= b[3] ? "choc" : "malin"} style={{ position: "absolute", left: 340, top: 560 }} />
        <Carte titre="BATTERIE" delai={b[2]} style={{ top: 230 }}>
          <GrosTexte taille={150}>1 %</GrosTexte>
        </Carte>
        <Tampon delai={b[3]} style={{ left: 260, top: 900 }}>MINIMUM</Tampon>
      </Plan>
      <Audio name="Voix intro" src={staticFile(v.src)} />
      <Audio name="Boom" src="https://remotion.media/vine-boom.wav" from={b[3]} volume={0.4} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};
```
`Plan` (dans `src/fx/Effets.tsx`) ajoute l'entrée en zoom avec whoosh, les coups de zoom et les secousses.
Les sous-titres restent **hors** du `Plan` pour ne pas trembler.

Boîte à outils (`src/fx/Effets.tsx`, `src/fx/Ecrans.tsx`) : `Carte`, `GrosTexte`, `Tampon`, `Bulle` (BD), `Entourage`
(cercle qui se dessine), `Entree` (glissement d'un perso), `Rayons`, `Confettis`, `Camera` (zoom lent), `Sms`,
`TelephonePlein` + `ChatGroupe`, `PlanGPS`, `BoutonAbonne` (curseur qui clique), `BoutonRond` (partager/commenter),
`Horloge`, `FringuesVolantes`, `Trottinette`, `Eclair` (flash).
Tableau de bord thriller (`src/fx/Hud.tsx`) : `FondHud`, `BadgeHud`, `Compteur`, `Fiche`, `Regles`, `Jauge`,
`CartonPartie`, `Paysage` (film 16:9). Chiffre sur le front : prop `front` des persos.
Les démos du dossier « Formats » du Studio montrent ces briques en place.

## Les règles du dynamisme (ce qui retient le spectateur)

- **Le décor change souvent** : idéalement à chaque scène (toutes les 3-5 s), parfois au milieu d'une scène
  (le mensonge → la vérité). Une vidéo qui reste dans la même pièce décroche.
- **Un événement visuel par sous-titre** : une carte qui pope, une expression qui change, un objet qui vole, un tampon.
- **Coups de zoom** à chaque phrase (`punchs`) et **secousses** sur les chutes.
- **Les persos bougent** : ils entrent en marchant (`Entree` + `marche`), sautent (`brasLeves`), changent d'expression.
- **Bruitages** sur les moments forts uniquement.
- **Moment « victoire »** : fond `Rayons` + `Confettis` (un par vidéo, sur le climax).

## Vérifier avant de rendre (obligatoire)

1. Rends une image par scène (au milieu ou juste après la chute) en petite taille :
   ```bash
   npx remotion still <Composition> out/verif-<n>.png --frame=<n> --scale=0.3
   ```
   et **regarde-les** une par une. Cherche : texte qui déborde ou se coupe, sous-titres sur un visage,
   carte qui cache la tête du perso, éléments qui sortent de l'écran, mots coupés au tiret.
2. Corrige, re-vérifie les images concernées.
3. Montre 3-4 images à l'élève avant le rendu final.

## Rendu final

```bash
npx remotion render <Composition> out/<episode>.mp4
```
Puis mesure le volume : `npx remotion ffmpeg -i out/<episode>.mp4 -vn -af loudnorm=print_format=summary -f null -`
(viser ≈ -14 LUFS intégré ; si un bruitage dépasse 0 dB de crête, baisse son volume).
Envoie la vidéo à l'élève. Il regarde **avec le son** et donne son avis ; ajuste puis re-rends.

## Erreurs fréquentes

| Problème | Solution |
|---|---|
| Sous-titre sur deux lignes moches | Raccourcir le `affiche` (≤ 22 caractères) |
| Carte qui cache le visage | Monter la carte (`top`) ou décaler le perso |
| Deux décors avec le même motif mélangent leurs couleurs | Utiliser des identifiants de motif uniques (déjà fait dans les décors fournis) |
| Rendu figé sans erreur | Dossier iCloud/OneDrive (voir étape 3) |
| Bruitage absent | Pas de connexion Internet au moment du rendu |

## Sortie de l'étape

« Ta vidéo est prête ! On fait la miniature et on publie ? »
