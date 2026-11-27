// Sam et son cerveau — épisode 1 : « Je m'y mets à 14h pile » (la procrastination).
// Sketch à dialogues : `qui` indique le personnage, `dit` ce qu'il prononce, `affiche` le sous-titre.
// Les [indications] en anglais au début de `dit` règlent le ton (jouées, pas lues).
// Source de la phrase de fin : Sirois & Pychyl (2013), procrastination = régulation des émotions à court terme.
export const persos = {
  sam: "ctilxqiD5xHFsAqEwjvS", // Grégory : jeune, dynamique
  cerveau: "zlP1wgh6FsmMZswaDa2M", // Julien : calme, poli, sûr de lui
};
// Narrateur (phrase de fin) : Antoine, la voix par défaut de la chaîne.

export const scenes = [
  {
    id: "pile",
    blocs: [
      { qui: "sam", dit: "[determined] À quatorze heures pile, je m'y mets.", affiche: "À *14H PILE*, JE M'Y METS." },
      { qui: "cerveau", dit: "[calm] Excellente décision. Je te soutiens à cent pour cent.", affiche: "JE TE SOUTIENS À *100 %*." },
    ],
  },
  {
    id: "trois",
    blocs: [
      { qui: "sam", dit: "[excited] Allez, c'est parti.", affiche: "ALLEZ, C'EST *PARTI*." },
      { qui: "cerveau", dit: "[deadpan] Il est quatorze heures trois.", affiche: "IL EST *14H03*." },
      { qui: "sam", dit: "[confused] Et alors ?", affiche: "ET ALORS ?" },
      { qui: "cerveau", dit: "[calm] On ne commence pas à quatorze heures trois. On reprend à quinze heures.", affiche: "ON REPREND À *15H*." },
    ],
  },
  {
    id: "four",
    blocs: [
      { qui: "sam", dit: "[confused] Pourquoi je nettoie le four ?", affiche: "POURQUOI JE NETTOIE *LE FOUR* ?" },
      { qui: "cerveau", dit: "[calm] On ne travaille pas dans un appart sale.", affiche: "PAS DANS UN APPART *SALE*." },
      { qui: "sam", dit: "[annoyed] J'ai jamais utilisé ce four.", affiche: "J'AI *JAMAIS* UTILISÉ CE FOUR." },
      { qui: "cerveau", dit: "[deadpan] Justement. Il t'attendait.", affiche: "JUSTEMENT. IL *T'ATTENDAIT*." },
    ],
  },
  {
    id: "rate",
    blocs: [{ qui: "cerveau", dit: "[deadpan] Quinze heures une. Raté. Seize heures.", affiche: "*15H01*. RATÉ. *16H*." }],
  },
  {
    id: "jeudi",
    blocs: [
      { qui: "sam", dit: "[excited] Seize heures pile ! Je…", affiche: "*16H PILE* ! JE…" },
      { qui: "cerveau", dit: "[calm] On est jeudi.", affiche: "ON EST *JEUDI*." },
      { qui: "sam", dit: "[confused] Quel rapport ?", affiche: "QUEL RAPPORT ?" },
      { qui: "cerveau", dit: "[calm] Personne ne commence un jeudi. Lundi.", affiche: "PERSONNE COMMENCE UN JEUDI. *LUNDI*." },
      { qui: "sam", dit: "[annoyed] Lundi, c'est le vingt-huit.", affiche: "LUNDI, C'EST LE *28*." },
      { qui: "cerveau", dit: "[calm] Fin de mois. On démarre proprement. Le premier.", affiche: "ON DÉMARRE PROPREMENT. *LE 1ER*." },
      { qui: "sam", dit: "[annoyed] Le premier tombe un mercredi.", affiche: "LE 1ER TOMBE UN *MERCREDI*." },
      { qui: "cerveau", dit: "[calm] Alors janvier. Nouvelle année, nouveau Sam.", affiche: "ALORS *JANVIER*. NOUVEAU SAM." },
    ],
  },
  {
    id: "demain",
    blocs: [
      { qui: "sam", dit: "[panicked] Le dossier est à rendre demain, neuf heures !", affiche: "C'EST POUR *DEMAIN 9H* !" },
      { qui: "cerveau", dit: "[surprised] Demain ? Fallait le dire ! Là, je peux travailler.", affiche: "LÀ, JE PEUX *TRAVAILLER*." },
    ],
  },
  {
    id: "minuit",
    blocs: [
      { qui: "sam", dit: "[tired] À minuit pile, on s'y met ?", affiche: "À *MINUIT PILE*, ON S'Y MET ?" },
      { qui: "cerveau", dit: "[calm] Promis.", affiche: "*PROMIS.*" },
    ],
  },
  {
    id: "minuit3",
    blocs: [{ qui: "cerveau", dit: "[deadpan] Minuit trois. Une heure du matin.", affiche: "*MINUIT 3*. 1H DU MATIN." }],
  },
  {
    id: "morale",
    blocs: [
      { dit: "Ton cerveau ne fuit pas le travail.", affiche: "TON CERVEAU NE FUIT PAS *LE TRAVAIL*." },
      { dit: "Il fuit ce que le travail lui fait ressentir.", affiche: "IL FUIT CE QU'IL *RESSENT*." },
    ],
  },
];
