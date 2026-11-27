import { AbsoluteFill } from "remotion";
import { couleurs, police } from "../theme";
import { Lambo } from "./Lambo";

const C = couleurs.contour;
const T = 5;

const MURS = {
  lavande: ["#cbc7e2", "#bfbad9"],
  vert: ["#c5dcc6", "#b5d0b7"],
} as const;

// Chambre en aplats, cadrée pour du 1080×1920. Le sol commence à y = 1250.
export const Chambre: React.FC<{
  readonly nuit?: boolean;
  readonly mur?: keyof typeof MURS;
  readonly poster?: "eclair" | "lambo";
}> = ({ nuit = false, mur = "lavande", poster = "eclair" }) => {
  const ciel = nuit ? "#27315e" : "#bfe3f5";
  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920}>
        <defs>
          <pattern id={`rayures-${mur}`} width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill={MURS[mur][0]} />
            <rect x="0" width="26" height="60" fill={MURS[mur][1]} />
          </pattern>
        </defs>

        {/* Mur */}
        <rect width="1080" height="1260" fill={`url(#rayures-${mur})`} />

        {/* Fenêtre */}
        <rect x="110" y="360" width="300" height="400" rx="10" fill="#f4f1ea" stroke={C} strokeWidth={T} />
        <rect x="135" y="385" width="250" height="350" fill={ciel} stroke={C} strokeWidth={T} />
        <circle cx="315" cy="460" r={nuit ? 38 : 46} fill={nuit ? "#f3ecc2" : "#fff3b0"} stroke={C} strokeWidth={T} />
        {nuit ? <circle cx="300" cy="450" r="34" fill={ciel} /> : null}
        <line x1="260" y1="385" x2="260" y2="735" stroke={C} strokeWidth={T} />
        <line x1="135" y1="560" x2="385" y2="560" stroke={C} strokeWidth={T} />

        {poster === "lambo" ? (
          <>
            {/* Poster de supercar, pour « manifester » */}
            <rect x="620" y="330" width="310" height="330" rx="6" fill="#141420" stroke={C} strokeWidth={T} />
            <Lambo largeur={270} x={640} y={450} />
            <text x="775" y="410" textAnchor="middle" fontFamily={police} fontSize={46} fill={couleurs.jaune}>
              DREAM BIG
            </text>
          </>
        ) : (
          <>
            {/* Poster éclair (ironique) */}
            <rect x="650" y="330" width="250" height="330" rx="6" fill="#2d3561" stroke={C} strokeWidth={T} />
            <path d="M790 370 L720 510 L780 510 L750 620 L840 460 L780 460 L810 370 Z" fill={couleurs.jaune} stroke={C} strokeWidth={T} strokeLinejoin="round" />
          </>
        )}

        {/* Étagère */}
        <rect x="640" y="760" width="300" height="22" fill="#a27a55" stroke={C} strokeWidth={T} />
        <rect x="670" y="712" width="70" height="48" rx="8" fill="#e8e3da" stroke={C} strokeWidth={T} />
        <rect x="770" y="700" width="40" height="60" rx="6" fill="#e2483d" stroke={C} strokeWidth={T} />
        <rect x="840" y="718" width="70" height="42" rx="10" fill="#3c3f4a" stroke={C} strokeWidth={T} />

        {/* Plinthe */}
        <rect y="1240" width="1080" height="24" fill="#8a6a4a" stroke={C} strokeWidth={T} />

        {/* Parquet en perspective */}
        <rect y="1262" width="1080" height="660" fill="#d9a56d" />
        {Array.from({ length: 13 }).map((_, i) => {
          const xh = -60 + i * 100;
          const xb = 540 + (xh - 540) * 2.4;
          return <line key={i} x1={xh} y1={1262} x2={xb} y2={1920} stroke="#b9854f" strokeWidth={5} />;
        })}
        {[1360, 1490, 1660, 1880].map((y) => (
          <line key={y} x1={0} y1={y} x2={1080} y2={y} stroke="#c8935c" strokeWidth={4} />
        ))}

        {/* Lit */}
        <rect x="-30" y="1090" width="440" height="230" rx="18" fill="#8a6a4a" stroke={C} strokeWidth={T} />
        <rect x="-30" y="1040" width="430" height="150" rx="40" fill="#4d78b8" stroke={C} strokeWidth={T} />
        <rect x="20" y="1000" width="170" height="80" rx="34" fill="#f4f1ea" stroke={C} strokeWidth={T} />

        {/* Table de chevet + réveil */}
        <rect x="760" y="1080" width="230" height="250" rx="10" fill="#b98a5e" stroke={C} strokeWidth={T} />
        <line x1="760" y1="1190" x2="990" y2="1190" stroke={C} strokeWidth={T} />
        <circle cx="875" cy="1140" r="9" fill={couleurs.jaune} stroke={C} strokeWidth={3} />
        <rect x="800" y="990" width="150" height="90" rx="16" fill="#2b2b33" stroke={C} strokeWidth={T} />
        <text x="875" y="1052" textAnchor="middle" fontFamily={police} fontSize={50} fill={couleurs.rouge}>
          {nuit ? "3:12" : "7:48"}
        </text>
      </svg>
      {nuit ? <AbsoluteFill style={{ backgroundColor: "rgba(18, 24, 70, 0.45)" }} /> : null}
    </AbsoluteFill>
  );
};
