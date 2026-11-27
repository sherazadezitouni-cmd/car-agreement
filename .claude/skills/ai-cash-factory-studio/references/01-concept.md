# Étape 1 — Le concept

Objectif : sortir de cette étape avec une **bible du format** d'une page (modèle : `assets/modeles/bible-format.md`)
que l'élève comprend et valide. C'est l'étape la plus importante : un bon concept avec une production moyenne
bat une production parfaite sur un concept flou.

## Les 3 portes d'entrée

Demande à l'élève laquelle lui correspond :

### Porte A — « J'ai déjà mon idée »
1. Fais-lui décrire l'idée en 2 phrases.
2. Passe-la au **test des 5 critères** (plus bas). Pour chaque critère faible, propose une correction concrète.
3. Propose 3 variantes de l'idée (plus drôle / plus large / plus visuelle) et laisse-le choisir.

### Porte B — « Propose-moi des concepts »
1. Demande : ses centres d'intérêt, le ton qu'il aime (drôle, trash, émouvant, mystère, éducatif),
   la cible (ados, 20-35 ans, parents…).
2. Commence par les **3 formats maison** déjà produits et publiés (voir `references/formats/`) : clichés cartoon,
   « Et si… ça s'affichait sur ton front », série à suspense. Puis complète jusqu'à **5 concepts** avec le catalogue
   (plus bas), chacun avec : nom de chaîne provisoire, pitch en une phrase, exemple de titre d'épisode,
   pourquoi ça peut marcher. Montre la démo correspondante de l'atelier quand il existe (dès l'étape 3).
3. Il en choisit un → test des 5 critères → bible.

### Porte C — « Voilà une chaîne qui m'inspire » (il colle un lien)
C'est la porte la plus puissante. Procède ainsi :

1. **Relever les vidéos et leurs vues.** Avec un navigateur (outils `mcp__Claude_Browser__*` ou Claude in Chrome) :
   ouvre `https://www.youtube.com/@<chaine>/shorts` (et `/videos`), fais défiler pour tout charger, puis récupère
   la liste des vidéos avec leurs vues (onglet « Populaires » pour le top). Sans navigateur : demande à l'élève
   de te coller les 5 vidéos les plus vues (titre + vues) et leur texte.
2. **Récupérer le texte des vidéos les plus vues** (au moins les 10 premières + les 3 moins vues).
   Méthode qui marche : ouvrir `https://www.youtube.com/watch?v=<id>` (même pour un Short), déplier la description,
   cliquer « Afficher la transcription », puis lire les segments. En JavaScript dans la page :
   ```js
   await new Promise(r => setTimeout(r, 2500));
   document.querySelector('video')?.pause();
   document.querySelector('#description-inline-expander #expand, tp-yt-paper-button#expand')?.click();
   await new Promise(r => setTimeout(r, 700));
   [...document.querySelectorAll('button')].find(b => /transcription|transcript/i.test(b.innerText || b.getAttribute('aria-label') || ''))?.click();
   await new Promise(r => setTimeout(r, 3000));
   const vd = ytInitialPlayerResponse.videoDetails;
   const texte = [...document.querySelectorAll('ytd-transcript-segment-renderer .segment-text, transcript-segment-view-model')]
     .map(s => s.innerText.trim()).join(' ');
   JSON.stringify({ id: vd.videoId, vues: vd.viewCount, duree: vd.lengthSeconds, texte });
   ```
   (Le téléchargement direct des sous-titres et l'API de transcription sont bloqués par YouTube : passe par le bouton.)
   Pour les longues vidéos, garde aussi les horodatages : ils montrent le rythme.
   Ne télécharge jamais les vidéos ni leur audio.
3. **Analyser** avec la grille ci-dessous et présenter à l'élève un résumé clair : chiffres, top 10, la recette,
   ce qui marche le moins et pourquoi.
4. **Transformer** (voir « Rendre original ») et proposer **2-3 formats originaux**. L'élève choisit → bible.

Ne recopie jamais de longs passages des vidéos analysées dans tes réponses ou fichiers : résume les mécaniques.

## Grille d'analyse d'une chaîne

| Question | Ce qu'on cherche |
|---|---|
| Volume | Nombre de vidéos, fréquence, depuis quand, vues moyennes |
| Top vs flop | Qu'ont en commun les 5 plus vues ? et les 5 moins vues ? (sujet, durée, ton) |
| Durée | Durée moyenne ; les plus courtes marchent-elles mieux ? |
| Accroche | Les 2 premières secondes mot pour mot (formule récurrente ?) |
| Structure | Les grandes étapes, avec le moment (en secondes) où chacune arrive |
| Procédés | Chiffres absurdes, comparaisons, répétition, retournement final, callback… |
| Univers | Personnages ou lieux récurrents, phrases signatures |
| Visuel | Style d'animation, fréquence des changements de décor, sous-titres, effets |
| Son | Voix (ton, débit), musique, bruitages |
| Fin | Comment ça se termine (chute, CTA, jingle) |
| Entonnoir | Des Shorts servent-ils de bande-annonce à des vidéos longues ? |

Exemple réel (analyse d'une chaîne d'humour « clichés ») : 38 Shorts en 18 jours, ≈ 790 k vues en moyenne,
les 5 plus vus durent 68–80 s et ont un archétype universel en 2 mots (« le radin », « le mytho ») ;
les sujets de niche font 2 à 5 fois moins ; chaque Short est une mini-histoire avec retournement final ;
des Shorts « origine » de 2 min servent de teaser aux vidéos longues de 10 min.

## Rendre original (obligatoire en porte C)

Garde la **mécanique qui marche**, change au moins **3 de ces 5 curseurs** :
1. **Le cadre** — où se passe l'histoire (ex. raconter les clichés comme un procès, un documentaire animalier,
   un journal télévisé, une notice de montage, une fiche Pokédex…).
2. **La narration** — narrateur seul → dialogues joués / interview / messages / commentaire sportif.
3. **La structure** — journée type → procès en 3 témoins / top 5 / avant-après / compte à rebours.
4. **L'univers** — d'autres persos récurrents, d'autres lieux, une autre phrase signature.
5. **Le visuel** — autre style, autre palette, autre police, d'autres effets signature.

Puis vérifie la **liste de ce qu'on ne reprend pas** : noms des persos, phrases signatures, jingles,
titres, sujets déjà traités par la chaîne (fais la liste et mets-la dans la bible).

Exemple : chaîne source « Voici X, le mec qui… » (narration, journée type, retournement)
→ format original « Le Tribunal des Relous » : chaque relou passe en procès, 3 témoins de plus en plus graves
avec de vrais dialogues trash, une juge et un avocat récurrents, verdict ironique, CTA « Coupable ou acquitté ? ».

## Test des 5 critères (pour tout concept)

1. **Universel** — un inconnu de 15 à 45 ans comprend en 2 secondes ? (« le radin » oui, « le dev React » non)
2. **Renouvelable** — peut-on écrire 100 épisodes sans se répéter ? Fais-lui lister 20 sujets en 5 minutes.
3. **Visuel** — chaque phrase peut-elle devenir une image qui bouge ?
4. **Engageant** — le spectateur a-t-il une raison de commenter ou d'envoyer à un ami ? (« tag ton pote qui… »)
5. **Faisable** — produisible avec les briques de l'atelier (ou quelques briques à créer) ?

## Catalogue de formats faisables avec l'atelier

| Format | Principe | Ressorts |
|---|---|---|
| Portrait comique | « Voici [prénom], celui qui… », mini-histoire + chute | Clichés, chiffres absurdes, retournement |
| Procès / tribunal | Un comportement jugé, témoins, verdict | Dialogues, escalade, vote en commentaire |
| Documentaire animalier | Un type d'humain décrit comme une espèce | Voix sérieuse, situations ridicules |
| Journal / flash info | Faits du quotidien traités en breaking news | Bandeaux, graphiques, envoyé spécial |
| Top / classement | Top 5 des pires… | Compte à rebours, cartes, révélation du n°1 |
| Quiz / devine | « Devine qui a dit ça », « Vrai ou faux » | Pause pour réfléchir, réponse animée |
| Histoire vraie / fait divers | Récit incroyable mais vrai, sourcé | Suspense, cartes, chronologie |
| Explication express | Comment marche X en 60 s | Schémas animés, analogies |
| Messages / conversations | Une histoire racontée en SMS | Téléphone géant, bulles, notifications |
| Avant / après | Ce que tu imagines vs la réalité | Écran coupé en deux |
| Origine d'une vie | De la naissance à la mort d'un personnage (format long) | Motifs qui reviennent, émotion + vanne |
| Mini-série | Mêmes persos, un épisode par jour | Fidélisation, cliffhangers |

## Sortie de l'étape

Remplis `assets/modeles/bible-format.md` avec l'élève (copie-le dans son atelier dès l'étape 3,
en attendant garde-le dans la conversation), montre-le, et demande : « On valide ce format ? ».
