import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { SERRE } from "../theme";
import { Etoiles, NUIT, Palmier, SousTitreLegende } from "./Kandicha";
import { AichaFace, AichaProfil, HerosFace, HerosProfil } from "./Persos";

// Test d'animation (11 s, sans voix) : trois plans avec des personnages qui bougent.

const Lampadaire: React.FC<{ readonly x: number; readonly y: number; readonly clignote?: boolean }> = ({ x, y, clignote = false }) => {
  const frame = useCurrentFrame();
  const allume = clignote ? (frame % 47 < 3 || (frame % 61 > 20 && frame % 61 < 23) ? 0.25 : 1) : 1;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-170 0 L-40 -560 L40 -560 L170 0 Z" fill="#f3dc9a" opacity={0.13 * allume} />
      <rect x={-7} y={-600} width={14} height={600} fill="#060914" />
      <path d="M-44 -600 Q0 -640 44 -600 Z" fill="#060914" />
      <ellipse cx={0} cy={-592} rx={30} ry={12} fill="#f6e2a0" opacity={allume} />
      <ellipse cx={0} cy={4} rx={150} ry={20} fill="#f3dc9a" opacity={0.16 * allume} />
    </g>
  );
};

// Décor de la promenade au bord de l'eau, large de 2200 px (la caméra glisse dessus).
const Promenade: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <defs>
        <linearGradient id="ciel-test" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={NUIT.cielHaut} />
          <stop offset="1" stopColor="#1f2c5e" />
        </linearGradient>
        <radialGradient id="halo-test" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f1e9cf" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f1e9cf" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={2200} height={1920} fill="url(#ciel-test)" />
      <g opacity={0.75 + Math.sin(frame / 14) * 0.25}>
        <Etoiles />
        <g transform="translate(1100 60)">
          <Etoiles />
        </g>
      </g>
      <circle cx={1500} cy={470} r={250} fill="url(#halo-test)" />
      <circle cx={1500} cy={470} r={86} fill={NUIT.lune} />
      <circle cx={1470} cy={448} r={15} fill="#ddd4b6" />
      {/* remparts au loin */}
      <path
        d="M0 1010 L0 880 L60 880 L60 905 L120 905 L120 880 L180 880 L180 905 L240 905 L240 800 L290 800 L290 825 L340 825 L340 800 L390 800 L390 905 L520 905 L520 880 L580 880 L580 905 L700 905 L700 1010 Z"
        fill="#1a2760"
      />
      <rect x={300} y={850} width={22} height={36} rx={11} fill="#e8b65a" opacity={0.85} />
      <path d="M1750 1010 L1750 900 Q1830 800 1910 900 L1910 850 L1970 850 L1970 900 L2200 900 L2200 1010 Z" fill="#1a2760" />
      {/* l'eau */}
      <rect x={0} y={1010} width={2200} height={300} fill={NUIT.eau} />
      {[0, 1, 2, 3].map((i) => {
        const l = 130 + i * 34 + Math.sin(frame / 11 + i * 1.7) * 26;
        return <rect key={i} x={1500 - l / 2 + Math.sin(frame / 17 + i) * 10} y={1040 + i * 56} width={l} height={10} rx={5} fill={NUIT.reflet} opacity={0.5 - i * 0.08} />;
      })}
      <Palmier x={200} y={1250} h={420} couleur="#080c1e" />
      <Palmier x={2050} y={1250} h={360} couleur="#080c1e" />
      {/* muret et pavés */}
      <rect x={0} y={1230} width={2200} height={70} fill="#2a3566" />
      <rect x={0} y={1230} width={2200} height={14} fill="#3a4680" />
      {Array.from({ length: 16 }, (_, i) => (
        <rect key={i} x={i * 140 + 60} y={1244} width={6} height={56} fill="#1c2550" />
      ))}
      <rect x={0} y={1300} width={2200} height={620} fill="#121a3a" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${i * 200} 1300 L${i * 200 - 220} 1920`} stroke="#0c1330" strokeWidth={6} />
      ))}
      <path d="M0 1470 H2200 M0 1680 H2200" stroke="#0c1330" strokeWidth={6} />
      <Lampadaire x={520} y={1330} />
      <Lampadaire x={1640} y={1330} clignote />
    </>
  );
};

// Plan 1 : il marche le long de l'eau, la caméra le suit. Au bout, sous le lampadaire, quelqu'un attend.
const PlanMarche: React.FC = () => {
  const frame = useCurrentFrame();
  const avance = interpolate(frame, [0, 118], [0, 1], SERRE);
  const marche = interpolate(frame, [104, 122], [1, 0], SERRE);
  const xHeros = 180 + avance * 900;
  const camera = interpolate(frame, [0, 130], [0, 1308], SERRE);
  return (
    <AbsoluteFill style={{ background: "#121a3a", overflow: "hidden" }}>
      <svg width={2970} height={2592} viewBox="0 0 2200 1920" style={{ position: "absolute", left: -camera, top: -825 }}>
        <Promenade />
        <AichaProfil x={1660} y={1420} echelle={1.16} tourne={interpolate(frame, [118, 140], [0, 1], SERRE)} />
        <HerosProfil x={xHeros} y={1500} echelle={1.05} marche={marche} tete={interpolate(frame, [112, 128], [0, -9], SERRE)} peur={interpolate(frame, [120, 135], [0, 0.6], SERRE)} />
      </svg>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(0,0,0,0.6) 100%)" }} />
      <SousTitreLegende texte={frame < 70 ? "CE SOIR, TU RENTRES *SEUL*." : "QUELQU'UN *ATTEND*."} bas={470} />
    </AbsoluteFill>
  );
};

// Plan 2 : gros plan sur lui. Il la voit.
const PlanPeur: React.FC = () => {
  const frame = useCurrentFrame();
  const peur = interpolate(frame, [14, 34], [0.1, 1], SERRE);
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: String(interpolate(frame, [0, 90], [1, 1.12], SERRE)), transformOrigin: "50% 45%" }}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <defs>
            <linearGradient id="ciel-peur" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={NUIT.cielHaut} />
              <stop offset="1" stopColor="#1f2c5e" />
            </linearGradient>
          </defs>
          <rect width={1080} height={1920} fill="url(#ciel-peur)" />
          <Etoiles />
          <rect x={0} y={900} width={1080} height={260} fill={NUIT.eau} />
          <rect x={0} y={1130} width={1080} height={70} fill="#2a3566" />
          <rect x={0} y={1200} width={1080} height={720} fill="#121a3a" />
          <HerosFace
            x={540}
            y={1560}
            echelle={1.25}
            peur={peur}
            regard={[interpolate(frame, [0, 14], [-4, 8], SERRE), interpolate(frame, [40, 62], [0, 9], SERRE)]}
            mains={interpolate(frame, [50, 68], [0, 0.55], SERRE)}
            tete={interpolate(frame, [14, 30], [0, -3], SERRE)}
          />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(0,0,0,0.65) 100%)" }} />
      <SousTitreLegende texte="ELLE EST *MAGNIFIQUE*." bas={390} />
    </AbsoluteFill>
  );
};

// Plan 3 : elle relève la tête, ouvre les yeux, sourit. Puis la caméra descend… vers ses pieds.
const PlanElle: React.FC = () => {
  const frame = useCurrentFrame();
  const descente = interpolate(frame, [78, 112], [0, 1.25], SERRE);
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <AbsoluteFill style={{ translate: `0px ${-descente * 700}px`, scale: String(interpolate(frame, [0, 78], [1, 1.1], SERRE)), transformOrigin: "50% 40%" }}>
        <svg width={1080} height={2700} viewBox="0 0 1080 2700" style={{ position: "absolute", top: 0 }}>
          <defs>
            <linearGradient id="ciel-elle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={NUIT.cielHaut} />
              <stop offset="0.6" stopColor="#1f2c5e" />
            </linearGradient>
            <radialGradient id="halo-elle" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#f1e9cf" stopOpacity="0.4" />
              <stop offset="1" stopColor="#f1e9cf" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width={1080} height={2700} fill="url(#ciel-elle)" />
          <Etoiles />
          <circle cx={540} cy={420} r={330} fill="url(#halo-elle)" />
          <circle cx={540} cy={420} r={120} fill={NUIT.lune} />
          <rect x={0} y={1500} width={1080} height={300} fill={NUIT.eau} />
          <rect x={0} y={1750} width={1080} height={70} fill="#2a3566" />
          <rect x={0} y={1820} width={1080} height={880} fill="#121a3a" />
          <ellipse cx={540} cy={2096} rx={250} ry={26} fill="#000" opacity={0.55} />
          <AichaFace
            x={540}
            y={2010}
            echelle={1.6}
            leve={interpolate(frame, [8, 34], [0, 1], SERRE)}
            yeux={interpolate(frame, [30, 42], [0, 1], SERRE)}
            sourire={interpolate(frame, [44, 62], [0, 1], SERRE)}
            tete={interpolate(frame, [52, 74], [0, 9], SERRE)}
            bras={interpolate(frame, [56, 76], [0, 1], SERRE)}
            ourlet={interpolate(frame, [92, 116], [0, 70], SERRE)}
          />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(0,0,0,0.6) 100%)" }} />
      <SousTitreLegende texte={frame < 80 ? "ELLE TE *SOURIT*." : "REGARDE SES *PIEDS*."} bas={330} />
    </AbsoluteFill>
  );
};

export const DUREE_TEST = 150 + 80 + 130;

export const TestAnimation: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence durationInFrames={150}>
      <PlanMarche />
    </Sequence>
    <Sequence from={150} durationInFrames={80}>
      <PlanPeur />
    </Sequence>
    <Sequence from={230} durationInFrames={130}>
      <PlanElle />
    </Sequence>
  </AbsoluteFill>
);
