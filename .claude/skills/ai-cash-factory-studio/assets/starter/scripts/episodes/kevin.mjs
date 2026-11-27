// Épisode : Voici Kevin, le mec qui a toujours 1 % de batterie.
// Chaque bloc : `dit` est lu par la voix, `affiche` est montré à l'écran.
// Les [indications] en anglais au début de `dit` règlent le ton (jouées, pas lues).
// Les mots entre *étoiles* sont surlignés en jaune.
export const scenes = [
  {
    id: "intro",
    blocs: [
      { dit: "[excited] Voici Kevin,", affiche: "VOICI *KEVIN*" },
      { dit: "le mec qui a", affiche: "LE MEC QUI A" },
      { dit: "toujours", affiche: "TOUJOURS" },
      { dit: "[teasing] un pour cent de", affiche: "*1 %* DE" },
      { dit: "batterie.", affiche: "*BATTERIE*" },
    ],
  },
  {
    id: "record",
    blocs: [
      { dit: "[excited] Son téléphone", affiche: "SON TÉLÉPHONE" },
      { dit: "n'a pas dépassé", affiche: "N'A PAS DÉPASSÉ" },
      { dit: "cinq pour cent", affiche: "*5 %*" },
      { dit: "[teasing] depuis 2019 !", affiche: "DEPUIS *2019*" },
    ],
  },
  {
    id: "prise",
    blocs: [
      { dit: "[excited] Chaque soir,", affiche: "CHAQUE *SOIR*" },
      { dit: "il le branche,", affiche: "IL LE BRANCHE" },
      { dit: "mais il oublie", affiche: "MAIS IL OUBLIE" },
      { dit: "d'allumer", affiche: "D'ALLUMER" },
      { dit: "[teasing] la multiprise.", affiche: "LA *MULTIPRISE*" },
    ],
  },
  {
    id: "pouvoir",
    blocs: [
      { dit: "[excited] Mais Kevin", affiche: "MAIS KEVIN" },
      { dit: "a un don,", affiche: "A UN *DON*" },
      { dit: "il envoie", affiche: "IL ENVOIE" },
      { dit: "quarante messages", affiche: "*40 MESSAGES*" },
      { dit: "avec un seul", affiche: "AVEC UN SEUL" },
      { dit: "pour cent !", affiche: "*POUR CENT*" },
    ],
  },
  {
    id: "fin",
    blocs: [
      { dit: "[excited] Et quand", affiche: "ET QUAND" },
      { dit: "il s'éteint", affiche: "IL S'ÉTEINT" },
      { dit: "enfin,", affiche: "*ENFIN*" },
      { dit: "[teasing] il te demande", affiche: "IL TE DEMANDE" },
      { dit: "ton chargeur.", affiche: "TON *CHARGEUR*" },
    ],
  },
];
