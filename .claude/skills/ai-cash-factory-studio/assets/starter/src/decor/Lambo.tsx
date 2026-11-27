import { couleurs } from "../theme";

const C = couleurs.contour;

// Supercar jaune de profil, dans un repère 300×120.
export const Lambo: React.FC<{ readonly largeur: number; readonly x?: number; readonly y?: number }> = ({ largeur, x = 0, y = 0 }) => (
  <svg x={x} y={y} width={largeur} height={(largeur * 120) / 300} viewBox="0 0 300 120" style={{ overflow: "visible" }}>
    <path
      d="M12 86 L30 62 Q100 22 150 22 Q190 24 232 52 L284 62 Q294 66 292 84 L288 92 L12 92 Z"
      fill={couleurs.jaune}
      stroke={C}
      strokeWidth={6}
      strokeLinejoin="round"
    />
    <path d="M104 50 Q140 30 168 32 L196 52 Z" fill="#2d3561" stroke={C} strokeWidth={5} strokeLinejoin="round" />
    <path d="M40 74 L120 70" stroke={C} strokeWidth={4} strokeLinecap="round" />
    <circle cx={76} cy={92} r={22} fill="#26222e" stroke={C} strokeWidth={6} />
    <circle cx={76} cy={92} r={9} fill="#c9c9d1" />
    <circle cx={232} cy={92} r={22} fill="#26222e" stroke={C} strokeWidth={6} />
    <circle cx={232} cy={92} r={9} fill="#c9c9d1" />
  </svg>
);
