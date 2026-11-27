# Étape 9 — La routine de production

Objectif : un rythme tenable (la régularité compte plus que la perfection) et les épisodes 2 à 5 écrits.

## 1. Le rythme

Ne parle pas de temps de travail : c'est toi qui fabriques. Demande seulement à quel rythme il veut publier, puis propose :
- **Débutant** : 3 Shorts/semaine, mêmes jours, même heure.
- **Régulier** : 1 Short/jour.
- **Format long** : 1 vidéo longue toutes les 1-2 semaines + son Short teaser (le Short raconte le début et coupe
  sur « la suite dans la vidéo longue »).
Crée un calendrier simple dans `PROGRESSION.md` (date · épisode · statut : écrit / voix / monté / publié).

## 2. Travailler par lots (le vrai gain de temps)

1. **Écriture** : 5 scripts d'un coup (une session). Liste de 20 sujets dans la bible pour ne jamais être à sec.
2. **Voix** : générer les 5 voix off d'un coup (`node scripts/voix.mjs <ep>` × 5).
3. **Montage** : réutiliser décors, persos, effets ; ne créer que les nouveaux éléments nécessaires.
4. **Publication** : programmer la semaine.

## 3. Garder l'univers cohérent

Tiens dans la bible : persos récurrents (nom, look, voix, running gag), lieux, phrases signatures,
sujets déjà traités. Fais revenir les persos des anciens épisodes (crossovers) : ça fidélise.

## 4. Budget

Note les crédits ElevenLabs utilisés par épisode (≈ 1 par caractère) et le renouvellement du forfait.
Régénère seulement les scènes à corriger (`node scripts/voix.mjs <ep> <scene>`).

## 5. Sauvegardes

Le dossier de l'atelier (sans `node_modules`) contient tout : sauvegarde-le régulièrement (disque externe,
ou une archive zip dans un cloud — l'archive, pas le dossier vivant).

## Sortie de l'étape

« Ta routine est en place et tu as 5 épisodes d'avance. Dans 7 jours, on analyse les résultats ensemble. »
