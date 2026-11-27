# Étape 8 — Miniature et publication

Objectif : la vidéo en ligne, bien présentée (couverture, titre, description, réglages).
Avant de publier : vérifie dans `PROGRESSION.md` que les comptes ont bien été chauffés **au moins 3 jours** (étape 2).
Sinon, la vidéo attend : on la garde prête et il continue la chauffe.
L'élève publie lui-même (son compte) ; tu prépares tout et tu le guides clic par clic.

## 1. Couverture / miniature

- **Short / TikTok** : la couverture compte dans l'onglet Shorts du profil et sur TikTok.
  Composition `MiniatureShort` (1080×1920) : titre de 2-4 mots en gros + perso avec une expression forte.
- **Vidéo longue** : composition `Miniature` (1280×720). 3 mots max, un visage expressif, fort contraste,
  lisible en tout petit (teste en réduisant l'image à 20 %).
```bash
npx remotion still MiniatureShort out/couverture-<episode>.png --props='{"titre":"VOICI *JORDAN*","perso":"kevin","expression":"choc","nom":"","slogan":"","rayonClair":"#ff7a63","rayonFonce":"#d63a2f","persoBis":"theo"}'
```
Propose 2 versions et laisse-le choisir.

## 1 bis. Badge « Fait avec AI Cash Factory » (optionnel)

Propose-le une fois à l'élève (ne l'impose pas) : un badge aux couleurs d'AI Cash Factory sur les 2-3 dernières
secondes de la vidéo, composant `FaitAvec` (`src/marque/FaitAvec.tsx`, démo `DemoFaitAvec`) :
`<FaitAvec delai={debutDerniereScene} />` ou `variante="lien"` pour afficher skool.com/aicashfactory.
S'il accepte, ajoute-le dans la dernière scène de chaque épisode et note-le dans la bible du format.

## 2. Titre

Court, curieux, sans tout révéler. Formules :
- « Voici [Prénom], celui qui [défaut] » / « Le [archétype] en procès »
- « [Prénom] a [chiffre absurde] [objet] » / « POV : t'as un pote qui… »
Propose 5 titres. Évite le putaclic mensonger (ça tue la rétention).

## 3. Description (modèle : `assets/modeles/description.md`)

2 lignes d'accroche, l'appel à commenter, les crédits obligatoires (musique CC…), 3-5 hashtags
(#shorts sur YouTube n'est plus nécessaire mais ne gêne pas ; sur TikTok 3-5 hashtags précis + 1 large).

## 4. Publier sur YouTube (Shorts)

1. studio.youtube.com → **Créer → Importer des vidéos** → choisir le MP4.
2. Titre, description, **miniature** (pour un Short, la couverture se choisit aussi dans l'appli mobile YouTube).
3. Audience : « Non, elle n'est pas conçue pour les enfants » (si c'est le cas).
4. **Contenu modifié ou synthétique** : réponds selon la règle en vigueur (voix réaliste générée par IA → en général « Oui »).
   Vérifie la règle actuelle sur l'aide YouTube.
5. Visibilité : publier maintenant ou **programmer** (même heure chaque jour).
6. Après publication : épingler un commentaire avec une question (« Tu le connais, ce pote ? »).

## 5. Publier sur TikTok

1. Depuis l'ordinateur : tiktok.com/upload (permet de programmer) ; ou l'appli.
2. Légende courte + question + hashtags, **couverture** (image du MP4 ou import de la couverture).
3. Activer l'étiquette **contenu généré par l'IA** si demandé par les règles en vigueur.
4. Laisser commentaires, duos et collages activés (ça aide la diffusion).

## 6. La première heure

Répondre aux premiers commentaires, ne pas supprimer/republier si ça démarre lentement (attendre 48-72 h pour juger).

## Sortie de l'étape

Note dans `PROGRESSION.md` : date, liens des vidéos. « Bravo, ta première vidéo est en ligne ! On met en place ta routine ? »
