import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { couleurs, police, SERRE, usePop } from "../theme";

const C = couleurs.contour;

// Notification de message qui tombe du haut de l'écran.
export const Sms: React.FC<{
  readonly de: string;
  readonly texte: string;
  readonly delai?: number;
  readonly top?: number;
  readonly couleur?: string;
}> = ({ de, texte, delai = 0, top = 200, couleur = "#5cc17a" }) => {
  const pop = usePop(delai);
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top,
        display: "flex",
        gap: 26,
        alignItems: "center",
        padding: "26px 30px",
        backgroundColor: "#fdfcf8",
        border: `8px solid ${C}`,
        borderRadius: 40,
        boxShadow: "0 16px 0 rgba(0,0,0,0.25)",
        translate: `0px ${interpolate(pop, [0, 1], [-260, 0])}px`,
        opacity: interpolate(pop, [0, 0.3], [0, 1], SERRE),
      }}
    >
      <div
        style={{
          width: 110,
          height: 110,
          flexShrink: 0,
          borderRadius: 28,
          backgroundColor: couleur,
          border: `6px solid ${C}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={64} height={56} viewBox="0 0 64 56">
          <path d="M8 6 L56 6 Q60 6 60 10 L60 38 Q60 42 56 42 L24 42 L10 52 L12 42 L8 42 Q4 42 4 38 L4 10 Q4 6 8 6 Z" fill="#fff" />
        </svg>
      </div>
      <div style={{ fontFamily: police, color: C, minWidth: 0 }}>
        <div style={{ fontSize: 46, color: "#7b7686" }}>{de}</div>
        <div style={{ fontSize: 66, lineHeight: 1.05 }}>{texte}</div>
      </div>
    </div>
  );
};

// Téléphone géant plein cadre ; le contenu de l'écran est passé en enfant.
export const TelephonePlein: React.FC<{ readonly delai?: number; readonly fond?: string; readonly children: React.ReactNode }> = ({
  delai = 0,
  fond = "#efeae4",
  children,
}) => {
  const pop = usePop(delai);
  return (
    <div
      style={{
        position: "absolute",
        left: 170,
        top: 150,
        width: 740,
        height: 1180,
        borderRadius: 80,
        backgroundColor: "#1d1d24",
        border: `10px solid ${C}`,
        padding: 24,
        scale: String(interpolate(pop, [0, 1], [0.6, 1])),
        rotate: `${interpolate(pop, [0, 1], [-8, 0])}deg`,
        boxShadow: "0 24px 0 rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 58, overflow: "hidden", backgroundColor: fond }}>
        {children}
      </div>
    </div>
  );
};

type Message = { readonly nom: string; readonly texte: string; readonly delai: number; readonly couleur: string };

// Conversation de groupe (à mettre dans <TelephonePlein>).
export const ChatGroupe: React.FC<{ readonly titre: string; readonly messages: readonly Message[] }> = ({ titre, messages }) => (
  <AbsoluteFill>
    <div
      style={{
        backgroundColor: "#4d78b8",
        color: "#fff",
        fontFamily: police,
        fontSize: 50,
        padding: "70px 30px 24px",
        textAlign: "center",
        borderBottom: `6px solid ${C}`,
      }}
    >
      {titre}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 22, padding: 30 }}>
      {messages.map((m) => (
        <BulleChat key={m.nom + m.texte} {...m} />
      ))}
    </div>
  </AbsoluteFill>
);

const BulleChat: React.FC<Message> = ({ nom, texte, delai, couleur }) => {
  const pop = usePop(delai);
  return (
    <div
      style={{
        alignSelf: "flex-start",
        maxWidth: "88%",
        padding: "16px 26px",
        borderRadius: 30,
        backgroundColor: "#fff",
        border: `6px solid ${C}`,
        fontFamily: police,
        scale: String(pop),
        transformOrigin: "0% 50%",
      }}
    >
      <div style={{ fontSize: 34, color: couleur }}>{nom}</div>
      <div style={{ fontSize: 50, color: C, lineHeight: 1.05 }}>{texte}</div>
    </div>
  );
};

// Plan avec la position « en direct » qui ne bouge pas.
export const PlanGPS: React.FC<{ readonly etiquette: string }> = ({ etiquette }) => {
  const frame = useCurrentFrame();
  const onde = (frame % 30) / 30;
  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920}>
        <rect width="1080" height="1920" fill="#e9eedf" />
        <rect x="620" y="200" width="380" height="420" rx="30" fill="#b9dca4" />
        <rect x="60" y="1300" width="420" height="380" rx="30" fill="#b9dca4" />
        <path d="M-50 1050 Q400 900 600 1150 T1150 1100" fill="none" stroke="#9fd0ee" strokeWidth={90} />
        {[
          "M0 500 L1080 560",
          "M0 1500 L1080 1420",
          "M300 0 L360 1920",
          "M780 0 L700 1920",
        ].map((d) => (
          <g key={d}>
            <path d={d} stroke="#fff" strokeWidth={60} />
            <path d={d} stroke="#f2c443" strokeWidth={8} strokeDasharray="30 30" />
          </g>
        ))}
        <circle cx={540} cy={900} r={40 + onde * 120} fill="#4d78b8" opacity={0.4 * (1 - onde)} />
        <circle cx={540} cy={900} r={38} fill="#4d78b8" stroke="#fff" strokeWidth={12} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 290,
          top: 680,
          width: 500,
          textAlign: "center",
          fontFamily: police,
          fontSize: 44,
          color: C,
          backgroundColor: "#fff",
          border: `6px solid ${C}`,
          borderRadius: 24,
          padding: "8px 0",
        }}
      >
        {etiquette}
      </div>
    </AbsoluteFill>
  );
};

// Gros bouton « S'abonner » sur lequel un curseur vient cliquer à `clic`.
export const BoutonAbonne: React.FC<{ readonly clic: number }> = ({ clic }) => {
  const frame = useCurrentFrame();
  const pop = usePop(0);
  const abonne = frame >= clic;
  const enfonce = interpolate(frame, [clic - 2, clic, clic + 4], [1, 0.88, 1], SERRE);
  const curseur = interpolate(frame, [0, clic], [0, 1], { ...SERRE, easing: Easing.inOut(Easing.cubic) });
  const cloche = abonne ? Math.sin((frame - clic) * 1.2) * interpolate(frame, [clic, clic + 25], [22, 0], SERRE) : 0;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 640,
          width: 800,
          height: 210,
          borderRadius: 105,
          backgroundColor: abonne ? "#d9d6de" : "#e62e2e",
          border: `10px solid ${C}`,
          boxShadow: "0 18px 0 rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          fontFamily: police,
          fontSize: 104,
          color: abonne ? C : "#fff",
          scale: String(pop * enfonce),
        }}
      >
        <svg width={90} height={96} viewBox="0 0 90 96" style={{ rotate: `${cloche}deg` }}>
          <path d="M45 8 Q72 8 74 44 L76 66 L86 78 L4 78 L14 66 L16 44 Q18 8 45 8 Z" fill={abonne ? C : "#fff"} />
          <circle cx={45} cy={86} r={9} fill={abonne ? C : "#fff"} />
        </svg>
        {abonne ? "ABONNÉ" : "S'ABONNER"}
      </div>
      <svg
        width={120}
        height={150}
        viewBox="0 0 120 150"
        style={{
          position: "absolute",
          left: interpolate(curseur, [0, 1], [900, 560]),
          top: interpolate(curseur, [0, 1], [1300, 770]),
          scale: String(enfonce),
        }}
      >
        <path d="M10 6 L10 116 L38 90 L58 140 L80 130 L60 82 L100 82 Z" fill="#fff" stroke={C} strokeWidth={9} strokeLinejoin="round" />
      </svg>
    </>
  );
};

// Bouton rond avec icône et légende, qui pope puis pulse.
export const BoutonRond: React.FC<{
  readonly icone: "partager" | "commenter";
  readonly legende: string;
  readonly delai: number;
  readonly x: number;
  readonly y: number;
  readonly couleur: string;
}> = ({ icone, legende, delai, x, y, couleur }) => {
  const frame = useCurrentFrame();
  const pop = usePop(delai);
  const pulse = 1 + Math.max(0, Math.sin((frame - delai) / 4)) * 0.06;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 340, textAlign: "center", scale: String(pop * pulse) }}>
      <div
        style={{
          margin: "0 auto",
          width: 250,
          height: 250,
          borderRadius: 125,
          backgroundColor: couleur,
          border: `10px solid ${C}`,
          boxShadow: "0 16px 0 rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icone === "partager" ? (
          <svg width={140} height={120} viewBox="0 0 140 120">
            <path d="M80 10 L134 56 L80 102 L80 76 Q30 74 8 112 Q14 46 80 36 Z" fill="#fff" stroke={C} strokeWidth={8} strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width={140} height={120} viewBox="0 0 140 120">
            <path d="M18 10 L122 10 Q132 10 132 20 L132 74 Q132 84 122 84 L54 84 L24 110 L28 84 L18 84 Q8 84 8 74 L8 20 Q8 10 18 10 Z" fill="#fff" stroke={C} strokeWidth={8} strokeLinejoin="round" />
            <circle cx={42} cy={47} r={8} fill={C} />
            <circle cx={70} cy={47} r={8} fill={C} />
            <circle cx={98} cy={47} r={8} fill={C} />
          </svg>
        )}
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: police,
          fontSize: 64,
          color: "#fff",
          WebkitTextStroke: `12px ${C}`,
          paintOrder: "stroke fill",
        }}
      >
        {legende}
      </div>
    </div>
  );
};

// Horloge murale dont les aiguilles tournent à toute vitesse.
export const Horloge: React.FC<{ readonly x: number; readonly y: number; readonly taille?: number; readonly vitesse?: number }> = ({
  x,
  y,
  taille = 520,
  vitesse = 24,
}) => {
  const frame = useCurrentFrame();
  return (
    <svg width={taille} height={taille} viewBox="0 0 200 200" style={{ position: "absolute", left: x, top: y }}>
      <circle cx={100} cy={100} r={92} fill="#fdfcf8" stroke={C} strokeWidth={8} />
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1={100}
          y1={16}
          x2={100}
          y2={30}
          stroke={C}
          strokeWidth={5}
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
      <line x1={100} y1={100} x2={100} y2={50} stroke={C} strokeWidth={9} strokeLinecap="round" transform={`rotate(${frame * (vitesse / 12)} 100 100)`} />
      <line x1={100} y1={100} x2={100} y2={28} stroke={couleurs.rouge} strokeWidth={6} strokeLinecap="round" transform={`rotate(${frame * vitesse} 100 100)`} />
      <circle cx={100} cy={100} r={8} fill={C} />
    </svg>
  );
};

// Fringues qui volent dans tous les sens (Bastien qui cherche ses chaussettes).
export const FringuesVolantes: React.FC<{ readonly debut: number; readonly origine: readonly [number, number] }> = ({ debut, origine }) => {
  const frame = useCurrentFrame();
  const t0 = frame - debut;
  if (t0 < 0) {
    return null;
  }
  const couleursF = [couleurs.rouge, "#4d78b8", couleurs.jaune, "#5cc17a", "#f28ac0"];
  return (
    <AbsoluteFill>
      {Array.from({ length: 12 }).map((_, i) => {
        const t = t0 - i * 3;
        if (t < 0) {
          return null;
        }
        const vx = (random(`fx${i}`) - 0.5) * 50;
        const vy = -30 - random(`fy${i}`) * 25;
        const x = origine[0] + vx * t;
        const y = origine[1] + vy * t + 1.6 * t * t;
        const chaussette = i % 2 === 0;
        return (
          <svg
            key={i}
            width={120}
            height={120}
            viewBox="0 0 120 120"
            style={{ position: "absolute", left: x - 60, top: y - 60, rotate: `${t * (12 + i)}deg` }}
          >
            {chaussette ? (
              <path d="M40 6 L76 6 L76 66 Q76 76 86 82 L104 92 Q116 100 108 110 Q100 118 86 112 L46 96 Q40 92 40 82 Z" fill={couleursF[i % 5]} stroke={C} strokeWidth={7} strokeLinejoin="round" />
            ) : (
              <path d="M30 10 L50 6 Q60 18 70 6 L90 10 L114 34 L98 50 L88 42 L88 112 L32 112 L32 42 L22 50 L6 34 Z" fill={couleursF[i % 5]} stroke={C} strokeWidth={7} strokeLinejoin="round" />
            )}
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};

// Trottinette qui traverse l'écran puis se crashe à `crash`.
export const Trottinette: React.FC<{ readonly debut: number; readonly crash: number }> = ({ debut, crash }) => {
  const frame = useCurrentFrame();
  if (frame < debut) {
    return null;
  }
  const x = interpolate(frame, [debut, crash], [-400, 420], SERRE);
  const chute = Math.max(0, frame - crash);
  return (
    <svg
      width={380}
      height={340}
      viewBox="0 0 380 340"
      style={{
        position: "absolute",
        left: x + chute * 6,
        top: 1080 + chute * chute * 0.6 - chute * 14,
        rotate: `${chute * 16}deg`,
        overflow: "visible",
      }}
    >
      <line x1={300} y1={30} x2={270} y2={290} stroke={C} strokeWidth={16} strokeLinecap="round" />
      <line x1={300} y1={30} x2={300} y2={30} stroke={C} strokeWidth={16} />
      <line x1={260} y1={30} x2={340} y2={30} stroke={C} strokeWidth={14} strokeLinecap="round" />
      <rect x={60} y={270} width={230} height={26} rx={12} fill="#2fb4a3" stroke={C} strokeWidth={8} />
      <circle cx={80} cy={300} r={34} fill="#3a3a44" stroke={C} strokeWidth={8} />
      <circle cx={275} cy={300} r={34} fill="#3a3a44" stroke={C} strokeWidth={8} />
    </svg>
  );
};

// Fond uni qui tourne (rayons) en couleur au choix — raccourci pour les CTA.
export const Eclair: React.FC<{ readonly debut: number }> = ({ debut }) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ backgroundColor: "#fff", opacity: interpolate(frame, [debut, debut + 2, debut + 6], [0, 0.8, 0], SERRE) }} />;
};
