import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Aicha, Etoiles, NUIT, Palmier, policeLegende } from "../../legendes/Kandicha";
import { SERRE, debutsBlocs } from "../../theme";
import { voix } from "../../voix/kandicha";

// Légendes du monde — épisode 1 : Aïcha Kandicha. Une fonction par scène.
// Rythme lent : fondu depuis le noir, caméra qui avance doucement, un détail qui bouge par phrase.

// Décalage vertical du décor (px) pour dégager la zone des sous-titres.
const MONTEE = 230;

type Bloc = { readonly text: string; readonly startMs: number; readonly endMs: number };

// Sous-titres calés sur la voix : 2-3 mots, le mot entre *étoiles* en rouge.
const SousTitres: React.FC<{ readonly blocs: readonly Bloc[] }> = ({ blocs }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const actif = blocs.find((b) => ms >= b.startMs && ms < b.endMs) ?? (ms >= blocs[blocs.length - 1].endMs ? blocs[blocs.length - 1] : null);
  if (!actif) {
    return null;
  }
  const depuis = frame - (actif.startMs / 1000) * fps;
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        bottom: 470,
        textAlign: "center",
        fontFamily: policeLegende,
        fontWeight: 700,
        fontSize: 88,
        letterSpacing: 2,
        lineHeight: 1.12,
        color: NUIT.texte,
        textShadow: "0 6px 26px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.8)",
        opacity: interpolate(depuis, [0, 4], [0, 1], SERRE),
        translate: `0px ${interpolate(depuis, [0, 5], [14, 0], SERRE)}px`,
      }}
    >
      {actif.text.split(/(\*[^*]+\*)/).map((m, i) =>
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
};

// Habillage d'une scène : fond noir, fondu d'entrée, zoom lent, voix, sous-titres.
const Scene: React.FC<{
  readonly id: keyof typeof voix;
  readonly de?: number;
  readonly a?: number;
  readonly origine?: string;
  readonly fond?: string;
  readonly children: React.ReactNode;
}> = ({ id, de = 1, a = 1.08, origine = "50% 55%", fond = NUIT.terre, children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const v = voix[id];
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      {/* Tout le décor est remonté de MONTEE px : les personnages restent au-dessus des sous-titres. */}
      <AbsoluteFill
        style={{
          background: fond,
          translate: `0px ${-MONTEE}px`,
          height: 1920 + MONTEE,
          opacity: interpolate(frame, [0, 10], [0, 1], SERRE),
          scale: String(interpolate(frame, [0, durationInFrames], [de, a], SERRE)),
          transformOrigin: origine,
        }}
      >
        {children}
      </AbsoluteFill>
      {/* vignette sombre sur les bords */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(0,0,0,0.6) 100%)" }} />
      <Audio name={`Voix ${id}`} src={staticFile(v.src)} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};

const Ciel: React.FC<{ readonly id: string; readonly lune?: readonly [number, number, number]; readonly bas?: string }> = ({
  id,
  lune,
  bas = NUIT.cielBas,
}) => {
  const frame = useCurrentFrame();
  return (
    <>
      <defs>
        <linearGradient id={`ciel-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={NUIT.cielHaut} />
          <stop offset="1" stopColor={bas} />
        </linearGradient>
        <radialGradient id={`halo-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f1e9cf" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f1e9cf" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={1080} height={1920} fill={`url(#ciel-${id})`} />
      <g opacity={0.75 + Math.sin(frame / 14) * 0.25}>
        <Etoiles />
      </g>
      {lune ? (
        <>
          <circle cx={lune[0]} cy={lune[1]} r={lune[2] * 2.9} fill={`url(#halo-${id})`} />
          <circle cx={lune[0]} cy={lune[1]} r={lune[2]} fill={NUIT.lune} />
          <circle cx={lune[0] - lune[2] * 0.35} cy={lune[1] - lune[2] * 0.25} r={lune[2] * 0.17} fill="#ddd4b6" />
          <circle cx={lune[0] + lune[2] * 0.33} cy={lune[1] + lune[2] * 0.35} r={lune[2] * 0.11} fill="#ddd4b6" />
        </>
      ) : null}
    </>
  );
};

// Eau avec les reflets de la lune qui ondulent.
const Eau: React.FC<{ readonly horizon: number; readonly xLune: number; readonly lignes?: number }> = ({ horizon, xLune, lignes = 7 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      <rect x={0} y={horizon} width={1080} height={1920 - horizon} fill={NUIT.eau} />
      {Array.from({ length: lignes }, (_, i) => {
        const l = 120 + i * 28 + Math.sin(frame / 11 + i * 1.7) * 26;
        return <rect key={i} x={xLune - l / 2 + Math.sin(frame / 17 + i) * 10} y={horizon + 40 + i * 62} width={l} height={10} rx={5} fill={NUIT.reflet} opacity={0.5 - i * 0.05} />;
      })}
    </>
  );
};

// « Toi », de dos : une silhouette noire.
const Toi: React.FC<{ readonly x: number; readonly y: number; readonly echelle?: number }> = ({ x, y, echelle = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${echelle})`} fill={NUIT.ombre}>
    <circle cx={0} cy={-450} r={78} />
    <path d="M-140 0 Q-150 -320 -70 -360 L70 -360 Q150 -320 140 0 Z" />
  </g>
);

const Remparts: React.FC<{ readonly y: number; readonly couleur?: string }> = ({ y, couleur = "#18245a" }) => (
  <g transform={`translate(0 ${y})`} fill={couleur}>
    <path d="M0 0 L0 -120 L40 -120 L40 -100 L80 -100 L80 -120 L120 -120 L120 -100 L160 -100 L160 -180 L190 -180 L190 -160 L220 -160 L220 -180 L250 -180 L250 -100 L330 -100 L330 -120 L370 -120 L370 -100 L420 -100 L420 0 Z" />
    <path d="M820 0 L820 -100 Q870 -170 920 -100 L920 -140 L960 -140 L960 -100 L1080 -100 L1080 0 Z" />
    <rect x={196} y={-140} width={18} height={30} rx={9} fill="#e8b65a" opacity={0.8} />
  </g>
);

// 1. Accroche : la rivière sous la lune, elle attend au loin, toi au premier plan.
export const Accroche: React.FC = () => (
  <Scene id="accroche" de={1} a={1.22} origine="39% 60%">
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <Ciel id="a" lune={[760, 520, 92]} />
      <Remparts y={900} />
      <Eau horizon={900} xLune={760} />
      <Palmier x={70} y={1010} h={330} couleur="#0b1026" />
      <Palmier x={1000} y={960} h={250} couleur="#0b1026" />
      <path d="M0 1240 Q300 1160 620 1230 Q860 1280 1080 1220 L1080 1920 L0 1920 Z" fill={NUIT.terre} />
      <ellipse cx={420} cy={1214} rx={70} ry={10} fill="#000" opacity={0.5} />
      <Aicha x={420} y={1210} echelle={0.34} />
      <Toi x={800} y={1920} echelle={1} />
    </svg>
  </Scene>
);

// 2. Le nom : elle, plus près, et son nom qui s'écrit.
export const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = debutsBlocs(voix.nom.captions, fps);
  const nom = "AÏCHA KANDICHA";
  const lettres = Math.round(interpolate(frame, [b[1], b[1] + 22], [0, nom.length], SERRE));
  return (
    <Scene id="nom" de={1.02} a={1.1} origine="50% 60%">
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <Ciel id="n" lune={[870, 400, 56]} bas="#16204a" />
        <Eau horizon={1180} xLune={870} lignes={4} />
        <path d="M0 1420 Q540 1360 1080 1420 L1080 1920 L0 1920 Z" fill={NUIT.terre} />
        <ellipse cx={600} cy={1432} rx={170} ry={18} fill="#000" opacity={0.55} />
        <Aicha x={600} y={1420} echelle={0.8} />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 500,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: policeLegende,
          fontWeight: 700,
          fontSize: 104,
          letterSpacing: 10,
          color: NUIT.rouge,
          textShadow: "0 0 30px rgba(226,59,59,0.55)",
        }}
      >
        {nom.slice(0, lettres)}
      </div>
    </Scene>
  );
};

const Vignette: React.FC<{ readonly x: number; readonly delai: number; readonly titre: string; readonly children: React.ReactNode }> = ({
  x,
  delai,
  titre,
  children,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [delai, delai + 8], [0, 1], SERRE);
  return (
    <div style={{ position: "absolute", left: x, top: 520, width: 300, opacity: t, translate: `0px ${(1 - t) * 30}px` }}>
      <svg width={300} height={380} viewBox="0 0 300 380" style={{ borderRadius: 24, border: `5px solid ${NUIT.lune}`, background: "#0c1432" }}>
        {children}
      </svg>
      <div style={{ textAlign: "center", marginTop: 14, fontFamily: policeLegende, fontWeight: 600, fontSize: 44, letterSpacing: 3, color: NUIT.lune }}>
        {titre}
      </div>
    </div>
  );
};

// 3. Le portrait : les cheveux, la robe, toi qui avances, puis les trois eaux.
export const Portrait: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = debutsBlocs(voix.portrait.captions, fps);
  const plan = frame < b[1] ? "cheveux" : frame < b[2] ? "robe" : "large";
  const avance = interpolate(frame, [b[2], b[4]], [0, 1], SERRE);
  const sombre = interpolate(frame, [b[4], b[4] + 10], [0, 0.72], SERRE);
  return (
    <Scene id="portrait" de={1} a={1.06}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <Ciel id="p" lune={[820, 470, 84]} bas="#16204a" />
        {plan === "cheveux" ? (
          <Aicha x={540} y={3300 - frame * 1.5} echelle={4.2} />
        ) : plan === "robe" ? (
          <>
            <rect x={0} y={1500} width={1080} height={420} fill={NUIT.terre} />
            <Aicha x={540 + (frame - b[1]) * 0.5} y={1560} echelle={2.4} />
          </>
        ) : (
          <>
            <Eau horizon={1080} xLune={820} lignes={5} />
            <path d="M0 1380 Q540 1320 1080 1380 L1080 1920 L0 1920 Z" fill={NUIT.terre} />
            <ellipse cx={330} cy={1392} rx={120} ry={14} fill="#000" opacity={0.55} />
            <Aicha x={330} y={1380} echelle={0.62} />
            <Toi x={1010 - avance * 250} y={1560} echelle={0.62 + avance * 0.06} />
          </>
        )}
        <rect width={1080} height={1920} fill="#000" opacity={sombre} />
      </svg>
      {frame >= b[4] ? (
        <>
          <Vignette x={45} delai={b[5]} titre="RIVIÈRES">
            <rect width={300} height={380} fill="#0c1432" />
            <path d="M-10 150 Q80 110 150 170 Q230 240 310 190 L310 290 Q230 340 150 270 Q80 210 -10 250 Z" fill="#1d3a7a" />
            <path d="M40 190 q30 -14 60 0 M170 240 q30 -14 60 0" stroke={NUIT.reflet} strokeWidth={6} fill="none" opacity={0.7} />
            <circle cx={230} cy={70} r={26} fill={NUIT.lune} />
          </Vignette>
          <Vignette x={390} delai={b[5] + 11} titre="PUITS">
            <rect width={300} height={380} fill="#0c1432" />
            <rect y={300} width={300} height={80} fill={NUIT.terre} />
            <path d="M80 130 L150 70 L220 130 Z" fill="#3a2a22" />
            <path d="M96 130 L96 250 M204 130 L204 250" stroke="#3a2a22" strokeWidth={12} />
            <rect x={70} y={230} width={160} height={90} rx={10} fill="#4b5578" />
            <ellipse cx={150} cy={232} rx={80} ry={18} fill="#05070f" />
            <path d="M150 130 L150 200" stroke={NUIT.reflet} strokeWidth={4} />
          </Vignette>
          <Vignette x={735} delai={b[5] + 22} titre="MER">
            <rect width={300} height={380} fill="#0c1432" />
            <circle cx={150} cy={110} r={34} fill={NUIT.lune} />
            <rect y={200} width={300} height={180} fill="#12265a" />
            <path d="M0 200 q25 -18 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 L300 220 L0 220 Z" fill="#12265a" />
            <path d="M100 250 h100 M80 290 h140 M110 330 h80" stroke={NUIT.reflet} strokeWidth={7} strokeLinecap="round" opacity={0.6} />
          </Vignette>
        </>
      ) : null}
    </Scene>
  );
};

const Soldat: React.FC<{ readonly x: number; readonly y: number; readonly decalage: number }> = ({ x, y, decalage }) => {
  const frame = useCurrentFrame();
  const pas = Math.sin(frame / 5 + decalage) * 6;
  return (
    <g transform={`translate(${x} ${y + Math.abs(pas) * -0.8})`} fill="#070a18">
      <path d="M-34 0 L-30 -170 Q0 -196 30 -170 L34 0 Z" />
      <circle cx={0} cy={-214} r={30} />
      <path d="M-46 -222 Q0 -286 46 -222 L58 -214 L-58 -214 Z" />
      <path d="M0 -262 L0 -292" stroke="#070a18" strokeWidth={8} />
      <path d="M44 20 L44 -330" stroke="#070a18" strokeWidth={7} />
      <path d="M44 -370 L32 -326 L56 -326 Z" />
      <path d={`M-16 0 L${-16 - pas} 46 M16 0 L${16 + pas} 46`} stroke="#070a18" strokeWidth={18} strokeLinecap="round" />
    </g>
  );
};

// 4. La légende : les remparts de Mazagan, les soldats la suivent… puis plus personne.
export const Legende: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = debutsBlocs(voix.legende.captions, fps);
  const marche = interpolate(frame, [b[3], b[5]], [0, 1], SERRE);
  const disparus = interpolate(frame, [b[5], b[5] + 14], [1, 0], SERRE);
  return (
    <Scene id="legende" de={1.06} a={1} origine="50% 50%">
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <Ciel id="l" lune={[940, 370, 52]} bas="#27224d" />
        {/* grande muraille crénelée */}
        <path
          d="M0 1300 L0 760 L70 760 L70 800 L140 800 L140 760 L210 760 L210 800 L280 800 L280 760 L350 760 L350 800 L420 800 L420 640 L470 640 L470 680 L520 680 L520 640 L570 640 L570 680 L620 680 L620 640 L670 640 L670 800 L740 800 L740 760 L810 760 L810 800 L880 800 L880 760 L950 760 L950 800 L1020 800 L1020 760 L1080 760 L1080 1300 Z"
          fill="#141d4a"
        />
        <path d="M500 1300 L500 1010 Q545 940 590 1010 L590 1300 Z" fill="#070a18" />
        <rect x={530} y={720} width={30} height={50} rx={15} fill="#e8b65a" opacity={0.85} />
        <path d="M0 1300 Q540 1250 1080 1300 L1080 1920 L0 1920 Z" fill={NUIT.terre} />
        {frame >= b[3] ? (
          <g opacity={disparus}>
            {[0, 1, 2, 3].map((i) => (
              <Soldat key={i} x={-60 + i * 130 + marche * 330} y={1400} decalage={i * 1.3} />
            ))}
          </g>
        ) : null}
        <ellipse cx={930} cy={1388} rx={64} ry={9} fill="#000" opacity={0.5} />
        <Aicha x={930} y={1384} echelle={0.33} />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 470,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: policeLegende,
          fontWeight: 600,
          fontSize: 50,
          letterSpacing: 8,
          color: NUIT.lune,
          opacity: interpolate(frame, [b[2], b[2] + 10], [0, 0.9], SERRE),
        }}
      >
        MAZAGAN · XVIe SIÈCLE
      </div>
    </Scene>
  );
};

// 5. Le pire : il est rentré chez lui. Il ne dort plus.
export const Pire: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = debutsBlocs(voix.pire.captions, fps);
  const yeux = interpolate(frame, [b[4], b[4] + 6], [0, 1], SERRE);
  const elle = interpolate(frame, [b[5], b[5] + 16], [0, 1], SERRE);
  return (
    <Scene id="pire" de={1} a={1.16} origine="50% 48%" fond="#0a0f26">
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <rect width={1080} height={1920} fill="#0a0f26" />
        {/* fenêtre */}
        <rect x={560} y={300} width={380} height={520} rx={12} fill="#1b2752" />
        <circle cx={850} cy={400} r={48} fill={NUIT.lune} />
        <g opacity={elle}>
          <path d="M700 820 Q690 640 716 560 L784 560 Q810 640 800 820 Z" fill={NUIT.robe} />
          <path d="M712 600 Q708 500 750 496 Q792 500 788 600 Q798 700 790 760 L710 760 Q702 700 712 600 Z" fill={NUIT.cheveux} />
        </g>
        <path d="M560 300 h380 v520 h-380 Z M750 300 v520 M560 560 h380" stroke="#05070f" strokeWidth={18} fill="none" />
        {/* lumière de la lune sur le sol */}
        <path d="M560 1920 L420 1250 L800 1250 L940 1920 Z" fill="#1b2752" opacity={0.35} />
        {/* lit */}
        <rect x={0} y={1280} width={700} height={90} rx={30} fill="#1a2247" />
        <rect x={0} y={1350} width={720} height={220} fill="#121a3a" />
        <rect x={-20} y={1150} width={90} height={420} rx={20} fill="#0d1330" />
        {/* lui, assis */}
        <g fill="#05070f">
          <circle cx={380} cy={960} r={86} />
          <path d="M250 1300 Q240 1090 310 1056 L450 1056 Q520 1090 510 1300 Z" />
          <path d="M430 1290 L640 1290 L640 1560 L560 1560 L560 1370 L430 1370 Z" />
        </g>
        <g opacity={yeux}>
          <ellipse cx={352} cy={950} rx={17} ry={20} fill="#f4efe2" />
          <ellipse cx={412} cy={950} rx={17} ry={20} fill="#f4efe2" />
          <circle cx={356} cy={952} r={6} fill="#05070f" />
          <circle cx={416} cy={952} r={6} fill="#05070f" />
        </g>
      </svg>
    </Scene>
  );
};

// 6. Sa faiblesse : le bas de la robe se soulève.
export const Faiblesse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = debutsBlocs(voix.faiblesse.captions, fps);
  const ourlet = interpolate(frame, [b[2], b[4] + 6], [0, 96], SERRE);
  const descente = interpolate(frame, [b[1], b[4]], [0, 1], SERRE);
  return (
    <Scene id="faiblesse" de={1} a={1}>
      <AbsoluteFill style={{ scale: String(1 + descente * 0.75), transformOrigin: "52% 76%" }}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <Ciel id="f" lune={[250, 480, 80]} bas="#16204a" />
          <Eau horizon={1180} xLune={250} lignes={4} />
          <path d="M0 1420 Q540 1360 1080 1420 L1080 1920 L0 1920 Z" fill={NUIT.terre} />
          <ellipse cx={560} cy={1470} rx={210} ry={22} fill="#000" opacity={0.55} />
          <Aicha x={560} y={1380} echelle={1.18} ourlet={ourlet} />
        </svg>
      </AbsoluteFill>
    </Scene>
  );
};

// 7. Toi, ce soir : face à elle. « Baisse les yeux. »
export const ToiCeSoir: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = debutsBlocs(voix.toi.captions, fps);
  const baisse = interpolate(frame, [b[3], b[3] + 22], [0, 1], SERRE);
  return (
    <Scene id="toi" de={1.02} a={1.1} origine="50% 50%">
      <AbsoluteFill style={{ translate: `0px ${-baisse * 330}px` }}>
        <svg width={1080} height={2300} viewBox="0 0 1080 2300" style={{ position: "absolute", top: 0 }}>
          <Ciel id="t" lune={[540, 460, 100]} bas="#16204a" />
          <rect x={0} y={1920} width={1080} height={380} fill={NUIT.terre} />
          <Eau horizon={1000} xLune={540} lignes={5} />
          <path d="M0 1500 Q540 1440 1080 1500 L1080 2300 L0 2300 Z" fill={NUIT.terre} />
          <ellipse cx={540} cy={1452} rx={180} ry={20} fill="#000" opacity={0.55} />
          <Aicha x={540} y={1410} echelle={0.92} ourlet={baisse > 0.2 ? 60 : 0} />
          <Toi x={540} y={2380} echelle={1.5} />
        </svg>
      </AbsoluteFill>
    </Scene>
  );
};

// 8. Fin : le noir, et des traces de sabots qui s'approchent.
export const Fin: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = debutsBlocs(voix.fin.captions, fps);
  const traces = [
    [420, 420], [640, 560], [430, 720], [650, 880], [440, 1040],
  ] as const;
  return (
    <Scene id="fin" de={1} a={1.05} fond="#04050c">
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <rect width={1080} height={1920} fill="#04050c" />
        {traces.map(([x, y], i) => {
          const o = interpolate(frame, [b[0] + 8 + i * 9, b[0] + 12 + i * 9], [0, 1], SERRE);
          const e = 0.7 + i * 0.16;
          return (
            <g key={i} transform={`translate(${x} ${y}) scale(${e})`} opacity={o * 0.9} fill={i === traces.length - 1 && frame >= b[1] ? NUIT.rouge : "#8b8572"}>
              <path d="M-34 -40 Q-40 30 -6 44 L-6 -44 Q-22 -50 -34 -40 Z" />
              <path d="M34 -40 Q40 30 6 44 L6 -44 Q22 -50 34 -40 Z" />
            </g>
          );
        })}
      </svg>
    </Scene>
  );
};
