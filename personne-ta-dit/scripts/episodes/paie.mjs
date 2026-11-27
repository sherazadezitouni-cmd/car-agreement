// Leçon n°1 : ta fiche de paie (Personne T'a Dit).
// Chaque bloc : `dit` est lu par la voix, `affiche` est montré à l'écran.
// Les mots entre *étoiles* sont surlignés en jaune.
// Sources : service-public.gouv.fr (fiche de paie, F559) ; « entre 20 et 25 % » = ordre de grandeur du privé (simulateurs).
export const scenes = [
  {
    id: "accroche",
    blocs: [
      { dit: "Tu la reçois tous les mois.", affiche: "TOUS LES *MOIS*" },
      { dit: "Et tu ne l'as jamais lue.", affiche: "*JAMAIS* LUE" },
      { dit: "Leçon numéro un :", affiche: "LEÇON *N°1*" },
      { dit: "ta fiche de paie.", affiche: "TA *FICHE DE PAIE*" },
    ],
  },
  {
    id: "probleme",
    blocs: [
      { dit: "Bon. Respire.", affiche: "BON. *RESPIRE.*" },
      { dit: "Sam non plus n'y comprend rien.", affiche: "SAM COMPREND *RIEN*" },
      { dit: "Il regarde un seul chiffre, en bas,", affiche: "*UN SEUL* CHIFFRE" },
      { dit: "et il range le papier dans le tiroir.", affiche: "DANS LE *TIROIR*" },
    ],
  },
  {
    id: "brut",
    blocs: [
      { dit: "Imagine que ton salaire est une pizza.", affiche: "TON SALAIRE = *PIZZA*" },
      { dit: "La pizza entière, c'est le brut.", affiche: "ENTIÈRE = *LE BRUT*" },
      { dit: "C'est le chiffre qu'on t'annonce à l'embauche.", affiche: "ANNONCÉ À *L'EMBAUCHE*" },
      { dit: "Mais personne ne mange la pizza entière.", affiche: "*PERSONNE* LA MANGE" },
    ],
  },
  {
    id: "abonne",
    blocs: [{ dit: "Abonne-toi, la leçon deux arrive.", affiche: "*ABONNE-TOI*" }],
  },
  {
    id: "cotisations",
    blocs: [
      { dit: "D'abord, les cotisations se servent.", affiche: "LES *COTISATIONS*" },
      { dit: "Retraite, santé, chômage.", affiche: "RETRAITE, SANTÉ, CHÔMAGE" },
      { dit: "Dans le privé, elles prennent entre vingt et vingt-cinq pour cent du brut.", affiche: "*20 À 25 %* DU BRUT" },
      { dit: "Ce qui reste a un nom :", affiche: "CE QUI RESTE" },
      { dit: "le net avant impôt.", affiche: "*NET AVANT IMPÔT*" },
      { dit: "C'est la ligne écrite en plus gros que les autres.", affiche: "ÉCRIT EN *PLUS GROS*" },
    ],
  },
  {
    id: "impot",
    blocs: [
      { dit: "Ensuite, l'impôt prend sa bouchée,", affiche: "*L'IMPÔT* SE SERT" },
      { dit: "directement sur ta paie.", affiche: "SUR *TA PAIE*" },
      { dit: "Et ce qui reste, tout en bas,", affiche: "TOUT *EN BAS*" },
      { dit: "c'est le net payé.", affiche: "*NET PAYÉ*" },
      { dit: "Ce qui arrive vraiment sur ton compte.", affiche: "SUR *TON COMPTE*" },
    ],
  },
  {
    id: "declic",
    blocs: [
      { dit: "Donc quand on te propose un salaire,", affiche: "ON TE PROPOSE" },
      { dit: "on te parle de la pizza entière.", affiche: "LA PIZZA *ENTIÈRE*" },
      { dit: "Toi, tu manges ce qui reste.", affiche: "TOI : *CE QUI RESTE*" },
    ],
  },
  {
    id: "fin",
    blocs: [
      { dit: "Envoie ça à celui qui confond encore", affiche: "*ENVOIE* ÇA" },
      { dit: "brut et net.", affiche: "*BRUT* ET *NET*" },
    ],
  },
];
