# Bible du format — Légendes du monde (chaîne : Personne T'a Dit, nom à confirmer)

## Le concept en une phrase
Chaque vidéo raconte une légende qui fait peur, d'un pays différent, à la deuxième personne :
« Au [pays], si [signe], ne fais surtout pas [réflexe]. »

## Plateformes et rythme
- TikTok (vidéos verticales, 60 à 90 s) — rythme de publication à fixer à l'étape 9.
- Public : 20-35 ans · Ton : frisson, calme, jamais gore.

## Inspiration et ce qu'on change
- Références envoyées par l'élève (28/11) : @lenvers_ (FR), @darkatlastales (EN). Analyse dans PROGRESSION.md.
- Mécaniques gardées : accroche pays + signe + interdit ; nom de la créature ; « mais voici le pire » ; faiblesse ; retour à « toi ce soir » ; dernière phrase qui glace ; dessin à plat de nuit ; sous-titres 2-3 mots avec un mot en couleur.
- On NE reprend PAS : leurs légendes déjà traitées (Kuchisake-onna, Jiangshi, Manananggal), leurs phrases, leurs personnages et dessins, leur musique.
- Notre patte : des légendes peu racontées en animation, sources citées en description, on dit clairement ce qui est légende.

## Historique des choix (pour ne pas refaire les mêmes erreurs)
- Format éducatif argent (« fiche de paie ») : abandonné, jugé ennuyeux.
- Humour façon démo « Voici Kevin » : n'a pas plu. « Sam et son cerveau » (sketch + voix générés) : mis de côté.
- Voix à accent non français : rejetées. Voix d'homme, français de France.
- « Légendes de France » seulement : refusé (pas assez d'idées) → légendes du MONDE.

## Structure d'un épisode (≈ 70 s, ≈ 170-190 mots)
| Bloc | Ce qui se passe |
|---|---|
| Accroche (0-6 s) | « Au [pays], si [signe], [interdit]. » |
| Le nom | « Là-bas, on l'appelle… » |
| Le portrait | 3-4 détails courts, un par plan |
| La légende | D'où elle vient (« certains racontent… ») |
| « Mais voici le pire » | La règle qui piège |
| La faiblesse | Ce qui la trahit ou l'arrête |
| Toi, ce soir | Retour à la 2e personne, consigne |
| Fin | Une phrase qui glace, fin sèche |

## Règles d'écriture
- Phrases très courtes, présent, 2e personne. Narrateur seul.
- Vérifier chaque légende sur plusieurs sources avant d'écrire ; ne garder que ce qui est confirmé ;
  dire à l'élève ce qui est de la mise en scène. « Certains racontent » quand il y a plusieurs versions.
- Respect des cultures : on raconte une légende, on ne se moque ni d'un pays ni d'une religion.
- Peur par suggestion : pas de sang montré en gros plan, pas de violence détaillée.

## Direction artistique
- Dessin à plat, nuit : ciel #070b1d → #1b2752, lune crème #f1e9cf, silhouettes très sombres.
- Une seule couleur vive : rouge #e23b3b pour le mot-clé du sous-titre.
- Police : Oswald 700, majuscules, sous-titres de 2-3 mots en bas de l'écran.
- Peu de mouvements : lents zooms, apparitions, un détail qui bouge.
- Composants : src/legendes/Kandicha.tsx (NUIT, SousTitreLegende, Aicha, PlanRiviere, PlanSabots).
- Avatar : à refaire (l'ancien avatar pastel de Sam ne convient plus).

## Voix et musique
- Narrateur : Antoine (RINb2PsSYGXD07PG6mx3), par défaut dans scripts/voix.mjs. Une voix plus grave peut être testée.
- Musique : nappe sombre et lente, générée (sans droits). Bruitages discrets (sabots, eau, vent).

## CTA
- Légende de la vidéo : question (« Et chez toi, c'est quoi la légende qu'on te racontait ? ») : fait commenter et donne des idées.

## Banque de sujets
1. Aïcha Kandicha (Maroc) — épisode 1
2. Le Kelpie (Écosse)
3. La Llorona (Mexique)
4. L'Ankou (Bretagne)
5. La Dame de midi (Pologne)
6. La Banshee (Irlande)
7. Le Wendigo (Canada, peuples algonquiens)
8. Baba Yaga (Russie)
9. Le Nøkken (Norvège)
10. Teke Teke (Japon)
11. La Pontianak (Malaisie / Indonésie)
12. Le Tokoloshe (Afrique du Sud)
