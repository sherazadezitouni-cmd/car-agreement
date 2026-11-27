import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { couleurs, police, SERRE, usePop } from "../theme";

const C = couleurs.contour;

// Fond à rayons qui tourne lentement, pour les moments « victoire ».
export const Rayons: React.FC<{ readonly clair?: string; readonly fonce?: string }> = ({
  clair = "#f5c04a",
  fonce = "#c9862a",
}) => {
  const frame = useCurrentFrame();
  const nb = 18;
  return (
    <AbsoluteFill style={{ backgroundColor: fonce }}>
      <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <g transform={`translate(540 900) rotate(${frame * 0.6})`}>
          {Array.from({ length: nb }).map((_, i) => {
            const a1 = (i / nb) * Math.PI * 2;
            const a2 = a1 + Math.PI / nb;
            const r = 2200;
            return (
              <path
                key={i}
                d={`M0 0 L${Math.cos(a1) * r} ${Math.sin(a1) * r} L${Math.cos(a2) * r} ${Math.sin(a2) * r} Z`}
                fill={clair}
              />
            );
          })}
        </g>
      </svg>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 47%, rgba(255,255,255,0.35), rgba(0,0,0,0) 45%)" }} />
    </AbsoluteFill>
  );
};

const COULEURS_CONFETTIS = ["#e2483d", "#4d78b8", "#ffd23f", "#5cc17a", "#f28ac0", "#ffffff"];

export const Confettis: React.FC<{ readonly nombre?: number }> = ({ nombre = 70 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {Array.from({ length: nombre }).map((_, i) => {
        const x = random(`x${i}`) * 1080;
        const vitesse = 6 + random(`v${i}`) * 10;
        const y = ((random(`y${i}`) * 2200 + frame * vitesse) % 2200) - 200;
        const rot = frame * (4 + random(`r${i}`) * 10);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + Math.sin(frame / 10 + i) * 30,
              top: y,
              width: 18,
              height: 30,
              backgroundColor: COULEURS_CONFETTIS[i % COULEURS_CONFETTIS.length],
              rotate: `${rot}deg`,
              borderRadius: 3,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Carte blanche à bandeau rouge qui « pope » à l'écran.
export const Carte: React.FC<{
  readonly titre: string;
  readonly delai?: number;
  readonly largeur?: number;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ titre, delai = 0, largeur = 560, style, children }) => {
  const pop = usePop(delai);
  return (
    <div
      style={{
        position: "absolute",
        left: (1080 - largeur) / 2,
        width: largeur,
        backgroundColor: "#fdfcf8",
        border: `8px solid ${C}`,
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 18px 0 rgba(0,0,0,0.25)",
        scale: String(pop),
        rotate: `${interpolate(pop, [0, 1], [-14, -2])}deg`,
        ...style,
      }}
    >
      <div
        style={{
          backgroundColor: couleurs.rouge,
          borderBottom: `8px solid ${C}`,
          color: "#fff",
          fontFamily: police,
          fontSize: 58,
          textAlign: "center",
          padding: "14px 10px 10px",
          letterSpacing: 1,
        }}
      >
        {titre}
      </div>
      <div style={{ padding: "26px 20px 30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {children}
      </div>
    </div>
  );
};

// Gros texte de carte (chiffres, slogans).
export const GrosTexte: React.FC<{ readonly taille?: number; readonly couleur?: string; readonly children: React.ReactNode }> = ({
  taille = 190,
  couleur = C,
  children,
}) => (
  <div style={{ fontFamily: police, fontSize: taille, lineHeight: 1, color: couleur }}>{children}</div>
);

// Cercle jaune qui se dessine autour d'un détail.
export const Entourage: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly rayon: number;
  readonly delai?: number;
}> = ({ x, y, rayon, delai = 0 }) => {
  const frame = useCurrentFrame();
  const perimetre = 2 * Math.PI * rayon;
  const progression = interpolate(frame - delai, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <svg
      width={rayon * 2 + 40}
      height={rayon * 2 + 40}
      style={{ position: "absolute", left: x - rayon - 20, top: y - rayon - 20, overflow: "visible" }}
    >
      <circle
        cx={rayon + 20}
        cy={rayon + 20}
        r={rayon}
        fill="none"
        stroke={couleurs.jaune}
        strokeWidth={14}
        strokeLinecap="round"
        strokeDasharray={perimetre}
        strokeDashoffset={perimetre * (1 - progression)}
        transform={`rotate(-90 ${rayon + 20} ${rayon + 20})`}
        style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.5))" }}
      />
    </svg>
  );
};

// Bulle de BD avec une queue vers le bas à gauche.
export const Bulle: React.FC<{
  readonly delai?: number;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ delai = 0, style, children }) => {
  const pop = usePop(delai);
  return (
    <div style={{ position: "absolute", scale: String(pop), transformOrigin: "20% 100%", ...style }}>
      <div
        style={{
          position: "relative",
          backgroundColor: "#fff",
          border: `8px solid ${C}`,
          borderRadius: 60,
          padding: "30px 44px",
          fontFamily: police,
          fontSize: 76,
          lineHeight: 1.05,
          color: C,
          textAlign: "center",
        }}
      >
        {children}
      </div>
      <svg width={120} height={90} style={{ position: "absolute", left: 90, bottom: -78 }}>
        <path d="M0 0 L30 82 L90 0" fill="#fff" stroke={C} strokeWidth={8} strokeLinejoin="round" />
        <rect x={6} y={-6} width={80} height={10} fill="#fff" />
      </svg>
    </div>
  );
};

// Lent zoom avant sur toute la scène, comme une caméra.
export const Camera: React.FC<{
  readonly de: number;
  readonly a: number;
  readonly origine: string;
  readonly children: React.ReactNode;
}> = ({ de, a, origine, children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ scale: String(interpolate(frame, [0, durationInFrames], [de, a], SERRE)), transformOrigin: origine }}>
      {children}
    </AbsoluteFill>
  );
};

// Habillage dynamique d'un plan : entrée en zoom rapide (avec whoosh),
// petit coup de zoom à chaque `punchs` (ex. début de chaque sous-titre),
// et secousse d'écran à chaque `secousses`.
export const Plan: React.FC<{
  readonly punchs?: readonly number[];
  readonly secousses?: readonly number[];
  readonly children: React.ReactNode;
}> = ({ punchs = [], secousses = [], children }) => {
  const frame = useCurrentFrame();
  const entree = interpolate(frame, [0, 7], [1, 0], SERRE);
  let zoom = 1 + entree * 0.22;
  let rotation = entree * -4;
  punchs.forEach((p, i) => {
    const t = frame - p;
    if (t >= 0 && t < 8) {
      const force = Math.sin((t / 8) * Math.PI);
      zoom += force * 0.045;
      rotation += force * (i % 2 === 0 ? 0.8 : -0.8);
    }
  });
  let dx = 0;
  let dy = 0;
  secousses.forEach((s) => {
    const t = frame - s;
    if (t >= 0 && t < 12) {
      const amorti = 1 - t / 12;
      dx += Math.sin(t * 2.7) * 26 * amorti;
      dy += Math.cos(t * 3.3) * 18 * amorti;
    }
  });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: String(zoom), rotate: `${rotation}deg`, translate: `${dx}px ${dy}px` }}>{children}</AbsoluteFill>
      <Audio name="Whoosh" src="https://remotion.media/whoosh.wav" volume={0.25} />
    </AbsoluteFill>
  );
};

// Personnage (ou objet) qui entre dans le champ en glissant depuis `depuis` px.
export const Entree: React.FC<{
  readonly delai?: number;
  readonly depuis: number;
  readonly duree?: number;
  readonly children: React.ReactNode;
}> = ({ delai = 0, depuis, duree = 14, children }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame - delai, [0, duree], [depuis, 0], { ...SERRE, easing: Easing.out(Easing.cubic) });
  return <AbsoluteFill style={{ translate: `${x}px 0px` }}>{children}</AbsoluteFill>;
};

// Tampon qui s'écrase sur l'écran.
export const Tampon: React.FC<{
  readonly delai: number;
  readonly couleur?: string;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ delai, couleur = couleurs.rouge, style, children }) => {
  const frame = useCurrentFrame();
  const t = frame - delai;
  if (t < 0) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        padding: "10px 30px",
        border: `10px solid ${couleur}`,
        borderRadius: 18,
        color: couleur,
        backgroundColor: "rgba(255,255,255,0.92)",
        fontFamily: police,
        fontSize: 84,
        rotate: "-10deg",
        scale: String(interpolate(t, [0, 4, 7], [3, 0.9, 1], SERRE)),
        opacity: interpolate(t, [0, 3], [0, 1], SERRE),
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
