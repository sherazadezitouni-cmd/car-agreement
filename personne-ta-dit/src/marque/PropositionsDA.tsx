import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadHand } from "@remotion/google-fonts/PatrickHand";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { AbsoluteFill } from "remotion";
import { Rayons } from "../fx/Effets";
import { Sam } from "../perso/Perso";
import { couleurs, police } from "../theme";

// Planche de comparaison : 3 directions artistiques pour « Personne T'a Dit » (étape 4).
const { fontFamily: anton } = loadAnton("normal", { weights: ["400"], subsets: ["latin", "latin-ext"] });
const { fontFamily: hand } = loadHand("normal", { weights: ["400"], subsets: ["latin", "latin-ext"] });
const { fontFamily: poppins } = loadPoppins("normal", { weights: ["600", "800"], subsets: ["latin", "latin-ext"] });

const C = couleurs.contour;

// L'objet-image de la leçon : le salaire brut est une pizza, chacun prend sa part.
const Pizza: React.FC<{
  readonly taille: number;
  readonly pate: string;
  readonly garniture: string;
  readonly partPrise: string;
  readonly trait: string;
  readonly plein?: boolean;
}> = ({ taille, pate, garniture, partPrise, trait, plein = true }) => (
  <svg width={taille} height={taille} viewBox="0 0 400 400">
    <circle cx={200} cy={200} r={185} fill={plein ? pate : "none"} stroke={trait} strokeWidth={10} />
    <circle cx={200} cy={200} r={150} fill={plein ? garniture : "none"} stroke={trait} strokeWidth={plein ? 6 : 8} />
    <path d="M200 200 L200 50 A150 150 0 0 1 330 125 Z" fill={partPrise} stroke={trait} strokeWidth={8} strokeLinejoin="round" />
    <path d="M200 200 L330 125 A150 150 0 0 1 350 200 Z" fill={partPrise} opacity={0.6} stroke={trait} strokeWidth={8} strokeLinejoin="round" />
    {[
      [140, 150],
      [120, 250],
      [220, 290],
      [290, 250],
      [170, 215],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={20} fill={plein ? "#c8402f" : "none"} stroke={trait} strokeWidth={6} />
    ))}
  </svg>
);

const Etiquette: React.FC<{ readonly lettre: string; readonly nom: string; readonly fond: string; readonly texte: string }> = ({
  lettre,
  nom,
  fond,
  texte,
}) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 110,
      background: fond,
      color: texte,
      fontFamily: poppins,
      fontWeight: 800,
      fontSize: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
    }}
  >
    <span style={{ background: texte, color: fond, borderRadius: 14, padding: "2px 22px" }}>{lettre}</span>
    {nom}
  </div>
);

const Panneau: React.FC<{ readonly x: number; readonly children: React.ReactNode }> = ({ x, children }) => (
  <div style={{ position: "absolute", left: x, top: 0, width: 1080, height: 1920, overflow: "hidden" }}>{children}</div>
);

// A — Cartoon pastel : le style de l'atelier, adouci.
const PanneauA: React.FC = () => (
  <>
    <Rayons clair="#bfe9e2" fonce="#8fd6cb" />
    <div style={{ position: "absolute", top: 190, left: 0, right: 0, textAlign: "center" }}>
      <span
        style={{
          fontFamily: police,
          fontSize: 64,
          background: "#ff7a59",
          color: "#fff",
          border: `6px solid ${C}`,
          borderRadius: 26,
          padding: "10px 36px",
          boxShadow: `0 10px 0 ${C}`,
        }}
      >
        LEÇON N°1
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        top: 340,
        left: 40,
        right: 40,
        textAlign: "center",
        fontFamily: police,
        fontSize: 150,
        lineHeight: 1,
        color: "#fff",
        WebkitTextStroke: `20px ${C}`,
        paintOrder: "stroke fill",
      }}
    >
      TA FICHE <span style={{ color: couleurs.jaune }}>DE PAIE</span>
    </div>
    <div style={{ position: "absolute", top: 660, left: 560 }}>
      <Pizza taille={460} pate="#f0c27b" garniture="#f6d365" partPrise="#ff7a59" trait={C} />
    </div>
    <div
      style={{
        position: "absolute",
        top: 1140,
        left: 600,
        fontFamily: police,
        fontSize: 54,
        color: C,
        background: "#fff",
        border: `6px solid ${C}`,
        borderRadius: 20,
        padding: "6px 24px",
        transform: "rotate(-4deg)",
      }}
    >
      ton salaire brut
    </div>
    <Sam expression="choc" style={{ position: "absolute", left: 90, top: 640 }} />
    <div
      style={{
        position: "absolute",
        bottom: 150,
        left: 60,
        right: 60,
        textAlign: "center",
        fontFamily: police,
        fontSize: 64,
        lineHeight: 1.15,
        color: "#fff",
        WebkitTextStroke: `12px ${C}`,
        paintOrder: "stroke fill",
      }}
    >
      Tu signes ça tous les mois <span style={{ color: couleurs.jaune }}>sans le lire.</span>
    </div>
  </>
);

// B — Tableau de nuit : fond sombre, schémas « craie », gros titres condensés.
const PanneauB: React.FC = () => (
  <>
    <AbsoluteFill
      style={{
        background: "#12203a",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 3px, transparent 3px)",
        backgroundSize: "60px 60px",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 190,
        left: 70,
        fontFamily: anton,
        fontSize: 60,
        letterSpacing: 4,
        color: "#12203a",
        background: "#ffd23f",
        padding: "4px 28px",
      }}
    >
      LEÇON N°1
    </div>
    <div style={{ position: "absolute", top: 310, left: 70, right: 60, fontFamily: anton, fontSize: 190, lineHeight: 1.02, color: "#fff" }}>
      TA FICHE
      <br />
      <span style={{ color: "#ffd23f" }}>DE PAIE</span>
    </div>
    <div style={{ position: "absolute", top: 800, left: 550 }}>
      <Pizza taille={480} pate="" garniture="" partPrise="#ffd23f" trait="#ffffff" plein={false} />
    </div>
    <div style={{ position: "absolute", top: 1290, left: 590, fontFamily: hand, fontSize: 64, color: "#fff", transform: "rotate(-3deg)" }}>
      ← ton salaire brut
    </div>
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 800,
        width: 440,
        height: 750,
        background: "#f7f1e3",
        border: "10px solid #fff",
        borderRadius: 36,
        transform: "rotate(-2deg)",
      }}
    />
    <Sam expression="choc" style={{ position: "absolute", left: 80, top: 670 }} />
    <div
      style={{
        position: "absolute",
        bottom: 150,
        left: 70,
        right: 70,
        fontFamily: anton,
        fontSize: 74,
        lineHeight: 1.15,
        color: "#fff",
        textAlign: "center",
      }}
    >
      TU SIGNES ÇA TOUS LES MOIS{" "}
      <span style={{ background: "#ffd23f", color: "#12203a", padding: "0 14px" }}>SANS LE LIRE.</span>
    </div>
  </>
);

// C — Carnet de notes : papier, surligneur, écriture à la main.
const PanneauC: React.FC = () => (
  <>
    <AbsoluteFill
      style={{
        background: "#f7f1e3",
        backgroundImage: "linear-gradient(rgba(60,90,160,0.16) 3px, transparent 3px)",
        backgroundSize: "100% 96px",
      }}
    />
    <div style={{ position: "absolute", top: 0, bottom: 0, left: 120, width: 5, background: "rgba(226,72,61,0.45)" }} />
    <div style={{ position: "absolute", top: 196, left: 170, fontFamily: hand, fontSize: 84, color: "#e2483d" }}>Leçon n°1</div>
    <div
      style={{
        position: "absolute",
        top: 330,
        left: 170,
        right: 50,
        fontFamily: poppins,
        fontWeight: 800,
        fontSize: 140,
        lineHeight: 1.08,
        color: "#1d1b26",
        letterSpacing: -3,
      }}
    >
      Ta fiche
      <br />
      <span style={{ background: "linear-gradient(transparent 52%, #ffe45c 52%)" }}>de paie</span>
    </div>
    <div style={{ position: "absolute", top: 720, left: 560, transform: "rotate(5deg)" }}>
      <Pizza taille={450} pate="#f3d9a4" garniture="#fbe9b7" partPrise="#ff8a73" trait="#1d1b26" />
    </div>
    <div style={{ position: "absolute", top: 1200, left: 610, fontFamily: hand, fontSize: 66, color: "#2c4a9a", transform: "rotate(-3deg)" }}>
      ton salaire brut ↑
    </div>
    <Sam expression="choc" style={{ position: "absolute", left: 130, top: 650 }} />
    <div
      style={{
        position: "absolute",
        bottom: 150,
        left: 170,
        right: 60,
        fontFamily: poppins,
        fontWeight: 600,
        fontSize: 60,
        lineHeight: 1.25,
        color: "#1d1b26",
      }}
    >
      Tu signes ça tous les mois <span style={{ background: "#ffe45c", padding: "0 10px", fontWeight: 800 }}>sans le lire.</span>
    </div>
  </>
);

export const PropositionsDA: React.FC = () => (
  <AbsoluteFill style={{ background: "#fff" }}>
    <Panneau x={0}>
      <PanneauA />
      <Etiquette lettre="A" nom="Cartoon pastel" fond="#1d1b26" texte="#ffffff" />
    </Panneau>
    <Panneau x={1100}>
      <PanneauB />
      <Etiquette lettre="B" nom="Tableau de nuit" fond="#ffd23f" texte="#12203a" />
    </Panneau>
    <Panneau x={2200}>
      <PanneauC />
      <Etiquette lettre="C" nom="Carnet de notes" fond="#1d1b26" texte="#ffffff" />
    </Panneau>
  </AbsoluteFill>
);
