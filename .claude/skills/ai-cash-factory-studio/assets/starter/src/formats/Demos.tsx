import { AbsoluteFill } from "remotion";
import { Rue } from "../decor/Decors";
import { FondHud, BadgeHud, Compteur, Fiche, HUD, Jauge, Paysage, Regles } from "../fx/Hud";
import { FaitAvec } from "../marque/FaitAvec";
import { Kevin, Pote, Theo } from "../perso/Perso";
import { police } from "../theme";

// Images de démonstration des formats maison (dossier « Formats » du Studio).
// Elles montrent les briques à réutiliser ; ce ne sont pas des épisodes.

const Titre: React.FC<{ readonly texte: string; readonly top: number; readonly couleur?: string; readonly taille?: number }> = ({
  texte,
  top,
  couleur = "#fff",
  taille = 120,
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 60,
      right: 60,
      textAlign: "center",
      fontFamily: police,
      fontSize: taille,
      lineHeight: 1,
      color: couleur,
      WebkitTextStroke: "16px #26222e",
      paintOrder: "stroke fill",
    }}
  >
    {texte}
  </div>
);

// Format « Et si… ça s'affichait sur ton front » : chiffres sur les fronts qui contrastent.
export const DemoFront: React.FC = () => (
  <AbsoluteFill>
    <Rue variante="immeuble" />
    <Titre texte="TON SALAIRE…" top={230} />
    <Theo expression="choc" front={{ texte: "-12 €", couleur: HUD.rouge }} style={{ position: "absolute", left: 90, top: 560 }} />
    <Pote expression="malin" front={{ texte: "4 200 €", couleur: HUD.vert }} style={{ position: "absolute", left: 590, top: 560 }} />
    <Titre texte="SUR TON FRONT." top={1480} couleur={HUD.vert} taille={130} />
  </AbsoluteFill>
);

// Format « série à suspense » : HUD, compteur, fiche, règles, jauge.
export const DemoSerie: React.FC = () => (
  <AbsoluteFill>
    <FondHud />
    <BadgeHud texte="03:12 · PARIS" />
    <Compteur etiquette="HOMMES EN VIE" valeur="1" top={230} />
    <Fiche titre="RECHERCHÉ" delai={-30} top={470}>
      <Kevin expression="choc" style={{ position: "absolute", left: 50, top: 10, scale: "1.1", transformOrigin: "200px 0px" }} />
    </Fiche>
    <Regles
      top={1070}
      regles={[
        { texte: "NE RÉPONDS À PERSONNE", debut: -30 },
        { texte: "NE DORS JAMAIS 2 FOIS AU MÊME ENDROIT", debut: -30, enfreinte: -20 },
        { texte: "NE REGARDE PAS LE CIEL", debut: -30 },
      ]}
    />
    <Jauge valeur={112} />
  </AbsoluteFill>
);

// Version film 16:9 : la scène à gauche, le tableau de bord à droite.
export const DemoSerieFilm: React.FC = () => (
  <Paysage
    scene={
      <AbsoluteFill>
        <FondHud />
        <Fiche titre="RECHERCHÉ" delai={-30} top={560}>
          <Kevin expression="choc" style={{ position: "absolute", left: 50, top: 10, scale: "1.1", transformOrigin: "200px 0px" }} />
        </Fiche>
      </AbsoluteFill>
    }
    panneau={
      <AbsoluteFill>
        <div style={{ position: "absolute", top: 60, left: 70, fontFamily: police, fontSize: 84, color: HUD.jaune }}>LE DERNIER HOMME</div>
        <Regles
          top={220}
          regles={[
            { texte: "NE RÉPONDS À PERSONNE", debut: -30 },
            { texte: "NE DORS JAMAIS 2 FOIS AU MÊME ENDROIT", debut: -30 },
            { texte: "NE REGARDE PAS LE CIEL", debut: -30 },
          ]}
        />
        <Jauge valeur={146} top={720} />
      </AbsoluteFill>
    }
  />
);

// Badge optionnel de fin de vidéo « Fait avec AI Cash Factory ».
export const DemoFaitAvec: React.FC = () => (
  <AbsoluteFill>
    <Rue variante="cafe" />
    <Kevin pose="brasLeves" expression="rire" ecran="allume" style={{ position: "absolute", left: 340, top: 560 }} />
    <FaitAvec delai={-30} />
  </AbsoluteFill>
);
