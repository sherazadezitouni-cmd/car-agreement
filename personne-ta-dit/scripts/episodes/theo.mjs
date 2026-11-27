// Épisode : Voici Théo, le mec qui a toujours un plan pour devenir riche.
// Chaque bloc : `dit` est lu par la voix, `affiche` est montré à l'écran.
// Les [indications] en anglais au début de `dit` règlent le ton (jouées, pas lues).
// Les mots entre *étoiles* sont surlignés en jaune.
export const scenes = [
  {
    id: "intro",
    blocs: [
      { dit: "[excited] Voici Théo,", affiche: "VOICI *THÉO*" },
      { dit: "le mec qui a", affiche: "LE MEC QUI A" },
      { dit: "toujours un plan", affiche: "TOUJOURS UN *PLAN*" },
      { dit: "[teasing] pour devenir riche.", affiche: "POUR DEVENIR *RICHE*" },
    ],
  },
  {
    id: "crypto",
    blocs: [
      { dit: "[excited] En 2021,", affiche: "EN *2021*" },
      { dit: "il a claqué", affiche: "IL A CLAQUÉ" },
      { dit: "toutes les économies", affiche: "TOUTES LES ÉCONOMIES" },
      { dit: "de sa daronne", affiche: "DE SA *DARONNE*" },
      { dit: "dans le Dogecoin.", affiche: "DANS LE *DOGECOIN*" },
      { dit: "[teasing] Elle bouffe des pâtes", affiche: "ELLE BOUFFE DES *PÂTES*" },
      { dit: "depuis.", affiche: "DEPUIS" },
    ],
  },
  {
    id: "montres",
    blocs: [
      { dit: "[excited] Ensuite,", affiche: "ENSUITE" },
      { dit: "le dropshipping.", affiche: "LE *DROPSHIPPING*" },
      { dit: "Il a vendu trois montres,", affiche: "IL A VENDU *3 MONTRES*" },
      { dit: "[teasing] dont deux", affiche: "DONT *2*" },
      { dit: "à sa grand-mère.", affiche: "À SA *GRAND-MÈRE*" },
    ],
  },
  {
    id: "escargots",
    blocs: [
      { dit: "[excited] Puis l'élevage", affiche: "PUIS L'ÉLEVAGE" },
      { dit: "d'escargots.", affiche: "D'*ESCARGOTS*" },
      { dit: "Ils se sont", affiche: "ILS SE SONT" },
      { dit: "tous barrés.", affiche: "TOUS *BARRÉS*" },
      { dit: "[teasing] Des escargots.", affiche: "DES *ESCARGOTS*" },
    ],
  },
  {
    id: "solde",
    blocs: [
      { dit: "[excited] Aujourd'hui,", affiche: "AUJOURD'HUI" },
      { dit: "Théo a moins douze euros", affiche: "THÉO A *-12 €*" },
      { dit: "sur son compte,", affiche: "SUR SON COMPTE" },
      { dit: "[teasing] et une Lamborghini", affiche: "ET UNE *LAMBORGHINI*" },
      { dit: "en fond d'écran.", affiche: "EN FOND D'ÉCRAN" },
    ],
  },
  {
    id: "formation",
    blocs: [
      { dit: "[excited] Et son nouveau plan ?", affiche: "ET SON NOUVEAU *PLAN*" },
      { dit: "Vendre une formation", affiche: "VENDRE UNE *FORMATION*" },
      { dit: "à neuf cent quatre-vingt-dix-sept euros", affiche: "À *997 €*" },
      { dit: "pour devenir riche.", affiche: "POUR DEVENIR *RICHE*" },
      { dit: "[teasing] Et le pire,", affiche: "ET LE PIRE" },
      { dit: "c'est que ça marche.", affiche: "C'EST QUE *ÇA MARCHE*" },
    ],
  },
];
