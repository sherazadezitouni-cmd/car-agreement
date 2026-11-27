import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { Lambo } from "../../decor/Lambo";
import { couleurs, police, SERRE, usePop } from "../../theme";

const C = couleurs.contour;
export const VERT = "#3fae5a";

// Écran de trading : la courbe monte jusqu'à `crash`, puis s'effondre.
export const Graphique: React.FC<{ readonly crash: number }> = ({ crash }) => {
  const frame = useCurrentFrame();
  const N = 36;
  const points = Array.from({ length: N }).map((_, i) => {
    const x = 70 + (i / (N - 1)) * 900;
    const y = 1350 - (i / (N - 1)) ** 1.6 * 780 + (random(`g${i}`) - 0.5) * 70;
    return [x, y] as const;
  });
  const visibles = Math.floor(interpolate(frame, [0, crash], [2, N], SERRE));
  const dernier = points[visibles - 1];
  const chute = interpolate(frame, [crash, crash + 7], [0, 1], SERRE);
  const crashe = frame >= crash;

  return (
    <AbsoluteFill style={{ backgroundColor: "#121826" }}>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920}>
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1={0} x2={1080} y1={300 + i * 110} y2={300 + i * 110} stroke="#1f2a3d" strokeWidth={3} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} y1={300} y2={1620} x1={60 + i * 110} x2={60 + i * 110} stroke="#1f2a3d" strokeWidth={3} />
        ))}
        <polyline
          points={points.slice(0, visibles).map((p) => p.join(",")).join(" ")}
          fill="none"
          stroke={VERT}
          strokeWidth={14}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {crashe ? (
          <line
            x1={dernier[0]}
            y1={dernier[1]}
            x2={dernier[0] + 40 * chute}
            y2={dernier[1] + (1560 - dernier[1]) * chute}
            stroke={couleurs.rouge}
            strokeWidth={16}
            strokeLinecap="round"
          />
        ) : null}
        <text x={70} y={250} fontFamily={police} fontSize={64} fill="#8a96b3">
          DOGECOIN
        </text>
        <text x={1010} y={250} textAnchor="end" fontFamily={police} fontSize={64} fill={crashe ? couleurs.rouge : VERT}>
          {crashe ? "-99 %" : `+${Math.round(interpolate(frame, [0, crash], [0, 840], SERRE))} %`}
        </text>
      </svg>
    </AbsoluteFill>
  );
};

export const Montre: React.FC<{ readonly mamie?: boolean; readonly delai: number }> = ({ mamie = false, delai }) => {
  const pop = usePop(delai);
  return (
    <div style={{ position: "relative", width: 130, height: 190 }}>
      <svg viewBox="0 0 130 190" width={130} height={190}>
        <rect x={40} y={0} width={50} height={190} rx={10} fill="#5a3a2a" stroke={C} strokeWidth={6} />
        <circle cx={65} cy={95} r={52} fill={couleurs.jaune} stroke={C} strokeWidth={7} />
        <circle cx={65} cy={95} r={38} fill="#fdfcf8" stroke={C} strokeWidth={4} />
        <line x1={65} y1={95} x2={65} y2={68} stroke={C} strokeWidth={6} strokeLinecap="round" />
        <line x1={65} y1={95} x2={84} y2={104} stroke={C} strokeWidth={6} strokeLinecap="round" />
      </svg>
      {mamie ? (
        <div
          style={{
            position: "absolute",
            left: -18,
            top: 66,
            padding: "4px 12px",
            backgroundColor: couleurs.rouge,
            border: `5px solid ${C}`,
            borderRadius: 10,
            color: "#fff",
            fontFamily: police,
            fontSize: 38,
            rotate: "-14deg",
            scale: String(pop),
          }}
        >
          MAMIE
        </div>
      ) : null}
    </div>
  );
};

// Escargot de profil (64×48 dans son repère), qui avance vers la droite.
export const Escargot: React.FC<{ readonly x: number; readonly y: number; readonly echelle?: number; readonly sens?: 1 | -1 }> = ({
  x,
  y,
  echelle = 1,
  sens = 1,
}) => {
  const frame = useCurrentFrame();
  const etire = 1 + Math.sin(frame / 3) * 0.05;
  return (
    <svg
      width={160 * echelle}
      height={120 * echelle}
      viewBox="0 0 160 120"
      style={{ position: "absolute", left: x, top: y, scale: `${sens} 1`, overflow: "visible" }}
    >
      <g transform={`scale(${etire} 1)`}>
        <path d="M10 104 Q20 84 60 84 L130 84 Q150 84 150 70 L150 50" fill="#cfd8b8" stroke={C} strokeWidth={6} strokeLinejoin="round" />
        <path d="M10 104 L132 104 Q150 104 150 84" fill="#cfd8b8" stroke={C} strokeWidth={6} />
        <line x1={142} y1={52} x2={134} y2={22} stroke={C} strokeWidth={5} />
        <line x1={152} y1={52} x2={158} y2={24} stroke={C} strokeWidth={5} />
        <circle cx={134} cy={20} r={7} fill={C} />
        <circle cx={158} cy={22} r={7} fill={C} />
      </g>
      <circle cx={66} cy={58} r={42} fill="#c9853f" stroke={C} strokeWidth={6} />
      <path d="M66 58 m-6 0 a6 6 0 1 1 12 0 a14 14 0 1 1 -26 0 a22 22 0 1 1 42 0" fill="none" stroke={C} strokeWidth={5} />
    </svg>
  );
};

// Terrarium vide (ou pas) posé au sol.
export const Terrarium: React.FC<{ readonly x: number; readonly y: number }> = ({ x, y }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 420, height: 260 }}>
    <svg viewBox="0 0 420 260" width={420} height={260}>
      <rect x={6} y={60} width={408} height={194} rx={12} fill="rgba(190, 230, 240, 0.45)" stroke={C} strokeWidth={7} />
      <rect x={6} y={200} width={408} height={54} fill="#8a6a4a" stroke={C} strokeWidth={7} />
      <path d="M60 200 Q70 160 80 200 M300 200 Q312 150 324 200" fill="#5cc17a" stroke={C} strokeWidth={5} />
      <rect x={110} y={10} width={200} height={50} rx={8} fill="#fdfcf8" stroke={C} strokeWidth={6} />
      <text x={210} y={47} textAnchor="middle" fontFamily={police} fontSize={34} fill={C}>
        ÉLEVAGE
      </text>
    </svg>
  </div>
);

// Grand téléphone en écran de verrouillage avec la Lambo en fond d'écran.
export const TelephoneGeant: React.FC<{ readonly delai: number }> = ({ delai }) => {
  const pop = usePop(delai);
  return (
    <div
      style={{
        position: "absolute",
        left: 680,
        top: 230,
        width: 360,
        height: 650,
        borderRadius: 52,
        backgroundColor: "#1d1d24",
        border: `10px solid ${C}`,
        padding: 16,
        scale: String(pop),
        rotate: `${interpolate(pop, [0, 1], [12, 3])}deg`,
        boxShadow: "0 22px 0 rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 36,
          overflow: "hidden",
          background: "linear-gradient(180deg, #ff8a4c 0%, #e2483d 45%, #3a1f5c 100%)",
        }}
      >
        <div style={{ position: "absolute", top: 50, width: "100%", textAlign: "center", fontFamily: police, fontSize: 96, color: "#fff" }}>
          21:47
        </div>
        <div style={{ position: "absolute", top: 165, width: "100%", textAlign: "center", fontFamily: police, fontSize: 30, color: "#ffe1c7" }}>
          SOLDE : -12 €
        </div>
        <svg width={316} height={190} style={{ position: "absolute", left: 6, top: 380 }}>
          <Lambo largeur={300} y={30} />
        </svg>
      </div>
    </div>
  );
};

// Pluie de billets pour la fin « ça marche ».
export const Billets: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {Array.from({ length: 26 }).map((_, i) => {
        const x = random(`bx${i}`) * 1000;
        const vitesse = 9 + random(`bv${i}`) * 9;
        const y = ((random(`by${i}`) * 2200 + frame * vitesse) % 2200) - 200;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + Math.sin(frame / 8 + i) * 40,
              top: y,
              width: 150,
              height: 74,
              borderRadius: 8,
              backgroundColor: "#8fd18b",
              border: `5px solid ${C}`,
              rotate: `${Math.sin(frame / 10 + i) * 30}deg`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: police,
              fontSize: 44,
              color: "#2f6b33",
            }}
          >
            €
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
