import { AbsoluteFill } from "remotion";
import { Rayons } from "../fx/Effets";
import { Bastien, Kevin, Pote, Theo } from "../perso/Perso";
import { couleurs, police } from "../theme";

// Visuels de la chaîne : bannière, avatar, miniatures.
// Tout se règle par les props (Studio → panneau de droite) puis :
//   npx remotion still Banniere out/banniere.png

const PERSOS = { kevin: Kevin, theo: Theo, bastien: Bastien, pote: Pote } as const;
type PersoId = keyof typeof PERSOS;
type Expression = "malin" | "rire" | "supplie" | "choc" | "enerve";

export type PropsMarque = {
  readonly nom: string;
  readonly slogan: string;
  readonly rayonClair: string;
  readonly rayonFonce: string;
  readonly perso: PersoId;
  readonly persoBis: PersoId;
  readonly expression: Expression;
};

const C = couleurs.contour;

// Texte « sticker » : blanc, gros contour, mots entre *étoiles* en jaune.
const Gros: React.FC<{ readonly texte: string; readonly taille: number; readonly style?: React.CSSProperties }> = ({
  texte,
  taille,
  style,
}) => (
  <div
    style={{
      fontFamily: police,
      fontSize: taille,
      lineHeight: 1,
      color: "#fff",
      WebkitTextStroke: `${Math.round(taille / 7)}px ${C}`,
      paintOrder: "stroke fill",
      textShadow: `0 ${Math.round(taille / 12)}px 0 rgba(0,0,0,0.35)`,
      textAlign: "center",
      ...style,
    }}
  >
    {texte.split(/(\*[^*]+\*)/).map((m, i) =>
      m.startsWith("*") ? (
        <span key={i} style={{ color: couleurs.jaune }}>
          {m.slice(1, -1)}
        </span>
      ) : (
        <span key={i}>{m}</span>
      ),
    )}
  </div>
);

// Bannière YouTube 2560×1440. Zone visible partout (mobile) : 1546×423 au centre.
export const Banniere: React.FC<PropsMarque> = ({ nom, slogan, rayonClair, rayonFonce, perso, persoBis, expression }) => {
  const A = PERSOS[perso];
  const B = PERSOS[persoBis];
  return (
    <AbsoluteFill>
      <Rayons clair={rayonClair} fonce={rayonFonce} />
      <A expression={expression} style={{ position: "absolute", left: 120, top: 420, scale: "1.15" }} />
      <B pose="brasLeves" expression="rire" style={{ position: "absolute", right: 120, top: 460, scale: "1.15" }} />
      <div style={{ position: "absolute", left: 507, top: 508, width: 1546, height: 423, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
        <Gros texte={nom} taille={190} />
        <Gros texte={slogan} taille={82} />
      </div>
    </AbsoluteFill>
  );
};

// Avatar 800×800 (YouTube et TikTok le recadrent en rond).
export const Avatar: React.FC<PropsMarque> = ({ rayonClair, rayonFonce, perso, expression }) => {
  const A = PERSOS[perso];
  return (
    <AbsoluteFill>
      <Rayons clair={rayonClair} fonce={rayonFonce} />
      <A expression={expression} style={{ position: "absolute", left: 200, top: 30, scale: "2", transformOrigin: "200px 200px" }} />
    </AbsoluteFill>
  );
};

export type PropsMiniature = PropsMarque & { readonly titre: string };

// Miniature de vidéo longue 1280×720.
export const Miniature: React.FC<PropsMiniature> = ({ titre, rayonClair, rayonFonce, perso, expression }) => {
  const A = PERSOS[perso];
  return (
    <AbsoluteFill>
      <Rayons clair={rayonClair} fonce={rayonFonce} />
      <A expression={expression} style={{ position: "absolute", left: 780, top: 60, scale: "1.05" }} />
      <div style={{ position: "absolute", left: 50, top: 120, width: 760 }}>
        <Gros texte={titre} taille={120} style={{ textAlign: "left" }} />
      </div>
    </AbsoluteFill>
  );
};

// Couverture de Short 1080×1920 (la première image que voient les gens).
export const MiniatureShort: React.FC<PropsMiniature> = ({ titre, rayonClair, rayonFonce, perso, expression }) => {
  const A = PERSOS[perso];
  return (
    <AbsoluteFill>
      <Rayons clair={rayonClair} fonce={rayonFonce} />
      <div style={{ position: "absolute", left: 80, right: 80, top: 230 }}>
        <Gros texte={titre} taille={150} />
      </div>
      <A expression={expression} style={{ position: "absolute", left: 340, top: 760, scale: "1.3", transformOrigin: "200px 0px" }} />
    </AbsoluteFill>
  );
};
