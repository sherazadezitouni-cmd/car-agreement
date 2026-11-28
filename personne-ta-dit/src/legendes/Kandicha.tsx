import { loadFont } from "@remotion/google-fonts/Oswald";
import { AbsoluteFill } from "remotion";

// Univers « légendes du monde » : dessin à plat, nuit, une seule couleur vive (rouge) pour le mot-clé.
export const { fontFamily: policeLegende } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin", "latin-ext"] });

export const NUIT = {
  cielHaut: "#070b1d",
  cielBas: "#1b2752",
  lune: "#f1e9cf",
  eau: "#0e1838",
  reflet: "#c9c3a6",
  terre: "#0a0e1f",
  ombre: "#05070f",
  robe: "#ece7da",
  robeOmbre: "#bdb8ab",
  cheveux: "#07080d",
  peau: "#c99f7e",
  rouge: "#e23b3b",
  texte: "#f4efe2",
};

// Sous-titre : 2-3 mots, majuscules, le mot entre *étoiles* en rouge.
export const SousTitreLegende: React.FC<{ readonly texte: string; readonly bas?: number }> = ({ texte, bas = 520 }) => (
  <div
    style={{
      position: "absolute",
      left: 60,
      right: 60,
      bottom: bas,
      textAlign: "center",
      fontFamily: policeLegende,
      fontWeight: 700,
      fontSize: 84,
      letterSpacing: 2,
      lineHeight: 1.1,
      color: NUIT.texte,
      WebkitTextStroke: "12px #05070f",
      paintOrder: "stroke fill",
      textShadow: "0 6px 24px rgba(0,0,0,0.85)",
    }}
  >
    {texte.split(/(\*[^*]+\*)/).map((m, i) =>
      m.startsWith("*") ? (
        <span key={i} style={{ color: NUIT.rouge }}>
          {m.slice(1, -1)}
        </span>
      ) : (
        <span key={i}>{m}</span>
      ),
    )}
  </div>
);

export const Etoiles: React.FC = () => (
  <>
    {[
      [120, 180, 3], [300, 90, 2], [520, 240, 2], [760, 130, 3], [960, 300, 2], [200, 420, 2], [640, 60, 2],
      [880, 520, 2], [80, 620, 2], [420, 560, 3], [1000, 80, 2], [560, 400, 2],
    ].map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill="#dfe6ff" opacity={0.7} />
    ))}
  </>
);

export const Palmier: React.FC<{ readonly x: number; readonly y: number; readonly h: number; readonly couleur?: string }> = ({
  x,
  y,
  h,
  couleur = NUIT.ombre,
}) => (
  <g transform={`translate(${x} ${y})`} fill={couleur} stroke={couleur}>
    <path d={`M-9 0 Q-22 ${-h / 2} 4 ${-h} L18 ${-h} Q-2 ${-h / 2} 11 0 Z`} />
    {[-70, -35, 0, 35, 70].map((a) => (
      <path key={a} d={`M10 ${-h} q${a * 1.7} ${-60 + Math.abs(a) * 0.5} ${a * 3} ${40 + Math.abs(a) * 0.6} q${-a * 1.2} ${-50} ${-a * 3} ${-40 - Math.abs(a) * 0.6}`} />
    ))}
  </g>
);

// Aïcha Kandicha vue de dos : longs cheveux noirs, robe blanche.
// `ourlet` = hauteur (px) à laquelle le bas de la robe se soulève : dessous, des pattes et des sabots.
export const Aicha: React.FC<{ readonly x: number; readonly y: number; readonly echelle?: number; readonly ourlet?: number }> = ({
  x,
  y,
  echelle = 1,
  ourlet = 0,
}) => (
  <g transform={`translate(${x} ${y}) scale(${echelle})`}>
    {ourlet > 0 ? (
      <>
        <path d={`M-66 ${-ourlet - 20} L-60 34 L-24 34 L-28 ${-ourlet - 20} Z`} fill="#6b4a36" />
        <path d={`M28 ${-ourlet - 20} L24 34 L60 34 L66 ${-ourlet - 20} Z`} fill="#6b4a36" />
        <path d="M-64 30 L-70 74 Q-42 88 -16 74 L-22 30 Z" fill="#1c120c" />
        <path d="M22 30 L16 74 Q42 88 70 74 L64 30 Z" fill="#1c120c" />
        <path d="M-43 44 L-43 80 M43 44 L43 80" stroke="#6b4a36" strokeWidth={6} />
      </>
    ) : null}
    <path d={`M-70 -640 Q-150 -300 -120 ${-ourlet} L120 ${-ourlet} Q150 -300 70 -640 Z`} fill={NUIT.robe} />
    <path d={`M30 -640 Q110 -300 90 ${-ourlet} L120 ${-ourlet} Q150 -300 70 -640 Z`} fill={NUIT.robeOmbre} />
    <path d="M-70 -640 Q-112 -560 -118 -420 L-96 -420 Q-90 -540 -58 -610 Z" fill={NUIT.robe} />
    <path d="M70 -640 Q112 -560 118 -420 L96 -420 Q90 -540 58 -610 Z" fill={NUIT.robeOmbre} />
    <path
      d="M-66 -800 Q-70 -880 0 -888 Q70 -880 66 -800 Q96 -560 82 -330 Q40 -300 0 -310 Q-40 -300 -82 -330 Q-96 -560 -66 -800 Z"
      fill={NUIT.cheveux}
    />
    <path d="M-30 -860 Q-44 -600 -34 -340 M22 -866 Q40 -600 30 -332" stroke="#1b2140" strokeWidth={5} fill="none" />
  </g>
);

const Riviere: React.FC<{ readonly horizon: number }> = ({ horizon }) => (
  <>
    <rect x={0} y={horizon} width={1080} height={1920 - horizon} fill={NUIT.eau} />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect
        key={i}
        x={760 - 60 - i * 14}
        y={horizon + 40 + i * 62}
        width={120 + i * 28}
        height={10}
        rx={5}
        fill={NUIT.reflet}
        opacity={0.5 - i * 0.05}
      />
    ))}
  </>
);

// Plan 1 : la rivière sous la lune, elle attend au loin, « toi » de dos au premier plan.
export const PlanRiviere: React.FC<{ readonly sousTitre: string }> = ({ sousTitre }) => (
  <AbsoluteFill>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={NUIT.cielHaut} />
          <stop offset="1" stopColor={NUIT.cielBas} />
        </linearGradient>
        <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f1e9cf" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f1e9cf" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={1080} height={1920} fill="url(#ciel)" />
      <Etoiles />
      <circle cx={760} cy={330} r={260} fill="url(#halo)" />
      <circle cx={760} cy={330} r={92} fill={NUIT.lune} />
      <circle cx={728} cy={306} r={16} fill="#ddd4b6" />
      <circle cx={790} cy={362} r={10} fill="#ddd4b6" />
      {/* remparts et tours au loin */}
      <path
        d="M0 900 L0 780 L40 780 L40 800 L80 800 L80 780 L120 780 L120 800 L160 800 L160 720 L190 720 L190 740 L220 740 L220 720 L250 720 L250 800 L330 800 L330 780 L370 780 L370 800 L420 800 L420 900 Z"
        fill="#18245a"
      />
      <path d="M820 900 L820 800 Q870 730 920 800 L920 760 L960 760 L960 800 L1080 800 L1080 900 Z" fill="#18245a" />
      <rect x={196} y={760} width={18} height={30} rx={9} fill="#e8b65a" opacity={0.8} />
      <Riviere horizon={900} />
      <Palmier x={70} y={1010} h={330} couleur="#0b1026" />
      <Palmier x={1000} y={960} h={250} couleur="#0b1026" />
      {/* la berge */}
      <path d="M0 1240 Q300 1160 620 1230 Q860 1280 1080 1220 L1080 1920 L0 1920 Z" fill={NUIT.terre} />
      {/* elle, au bord de l'eau */}
      <ellipse cx={420} cy={1214} rx={70} ry={10} fill="#000" opacity={0.5} />
      <Aicha x={420} y={1210} echelle={0.34} />
      {/* toi, de dos, au premier plan */}
      <g fill={NUIT.ombre}>
        <circle cx={800} cy={1470} r={78} />
        <path d="M660 1920 Q650 1600 730 1560 L870 1560 Q950 1600 940 1920 Z" />
      </g>
    </svg>
    <SousTitreLegende texte={sousTitre} bas={250} />
  </AbsoluteFill>
);

// Plan 2 : elle, de près, de dos. Le bas de la robe laisse voir les sabots.
export const PlanSabots: React.FC<{ readonly sousTitre: string }> = ({ sousTitre }) => (
  <AbsoluteFill>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <linearGradient id="ciel2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={NUIT.cielHaut} />
          <stop offset="1" stopColor="#16204a" />
        </linearGradient>
        <radialGradient id="halo2" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f1e9cf" stopOpacity="0.3" />
          <stop offset="1" stopColor="#f1e9cf" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={1080} height={1920} fill="url(#ciel2)" />
      <Etoiles />
      <circle cx={250} cy={300} r={240} fill="url(#halo2)" />
      <circle cx={250} cy={300} r={80} fill={NUIT.lune} />
      <rect x={0} y={1180} width={1080} height={740} fill={NUIT.eau} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={170 - i * 16} y={1210 + i * 50} width={160 + i * 32} height={10} rx={5} fill={NUIT.reflet} opacity={0.4 - i * 0.07} />
      ))}
      <path d="M0 1420 Q540 1360 1080 1420 L1080 1920 L0 1920 Z" fill={NUIT.terre} />
      <ellipse cx={560} cy={1470} rx={210} ry={22} fill="#000" opacity={0.55} />
      <Aicha x={560} y={1380} echelle={1.18} ourlet={24} />
    </svg>
    <SousTitreLegende texte={sousTitre} bas={250} />
  </AbsoluteFill>
);

// Planche d'aperçu du style (deux plans côte à côte).
export const ApercuLegende: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, overflow: "hidden" }}>
      <PlanRiviere sousTitre="AU BORD DE *L'EAU*" />
    </div>
    <div style={{ position: "absolute", left: 1100, top: 0, width: 1080, height: 1920, overflow: "hidden" }}>
      <PlanSabots sousTitre="REGARDE SES *PIEDS*." />
    </div>
  </AbsoluteFill>
);
