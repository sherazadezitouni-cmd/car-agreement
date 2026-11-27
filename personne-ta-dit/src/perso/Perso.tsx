import { useCurrentFrame } from "remotion";
import { couleurs, EPAISSEUR, policeMono } from "../theme";

type Pose = "repos" | "brasLeves";
type Expression = "malin" | "rire" | "dort" | "supplie" | "choc" | "enerve";
type Ecran = "batterie" | "eteint" | "allume";

// Ce qui change d'un personnage à l'autre.
export type Look = {
  readonly cheveux: string;
  readonly coiffure: "bataille" | "plaquee" | "boucles";
  readonly sweat: string;
  readonly sweatOmbre: string;
  readonly tache?: boolean;
  readonly chaine?: boolean;
  readonly lunettesSurLaTete?: boolean;
  readonly lunettesVue?: boolean;
  readonly casquette?: string;
  readonly torseNu?: boolean;
};

const LOOK_KEVIN: Look = {
  cheveux: couleurs.cheveux,
  coiffure: "bataille",
  sweat: couleurs.sweat,
  sweatOmbre: couleurs.sweatOmbre,
  tache: true,
};

const LOOK_THEO: Look = {
  cheveux: "#d9a441",
  coiffure: "plaquee",
  sweat: "#2b2d42",
  sweatOmbre: "#1f2033",
  chaine: true,
  lunettesSurLaTete: true,
};

const LOOK_BASTIEN: Look = {
  cheveux: "#4a3325",
  coiffure: "bataille",
  sweat: "#d6503f",
  sweatOmbre: "#b43f31",
  casquette: "#2f5fa8",
};

const LOOK_POTE: Look = {
  cheveux: "#1f1a17",
  coiffure: "boucles",
  sweat: "#4f9a6b",
  sweatOmbre: "#3f8058",
  lunettesVue: true,
};

// Sam, 27 ans : le jeune adulte perdu devant ses papiers (perso principal de « Personne T'a Dit »).
const LOOK_SAM: Look = {
  cheveux: "#2b2118",
  coiffure: "boucles",
  sweat: "#f2b134",
  sweatOmbre: "#d4962a",
};

const C = couleurs.contour;
const T = EPAISSEUR;
const OR = "#f2c443";

// Bras : trait de contour épais, puis trait de couleur par-dessus.
const Bras: React.FC<{ readonly d: string; readonly couleur: string }> = ({ d, couleur }) => (
  <>
    <path d={d} fill="none" stroke={C} strokeWidth={42} strokeLinecap="round" />
    <path d={d} fill="none" stroke={couleur} strokeWidth={30} strokeLinecap="round" />
  </>
);

const Main: React.FC<{ readonly x: number; readonly y: number }> = ({ x, y }) => (
  <circle cx={x} cy={y} r={21} fill="#fbfbf8" stroke={C} strokeWidth={T} />
);

const Telephone: React.FC<{ readonly x: number; readonly y: number; readonly ecran: Ecran; readonly rotation: number }> = ({
  x,
  y,
  ecran,
  rotation,
}) => {
  const frame = useCurrentFrame();
  const clignote = Math.floor(frame / 8) % 2 === 0;
  const fond = ecran === "eteint" ? "#0b0b0f" : ecran === "allume" ? "#8fd3ff" : "#dfe9f2";
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      <rect x={-26} y={-46} width={52} height={92} rx={9} fill="#1d1d24" stroke={C} strokeWidth={T} />
      <rect x={-19} y={-38} width={38} height={72} rx={4} fill={fond} />
      {ecran === "batterie" ? (
        <>
          <rect x={-11} y={-10} width={22} height={34} rx={3} fill="none" stroke={C} strokeWidth={3} />
          <rect x={-4} y={-15} width={8} height={5} fill={C} />
          {clignote ? <rect x={-8} y={18} width={16} height={3} fill={couleurs.rouge} /> : null}
        </>
      ) : null}
    </g>
  );
};

const Yeux: React.FC<{ readonly expression: Expression; readonly cligne: number }> = ({ expression, cligne }) => {
  if (expression === "rire") {
    return (
      <g fill="none" stroke={C} strokeWidth={8} strokeLinecap="round">
        <path d="M136 222 Q160 192 184 222" />
        <path d="M216 222 Q240 192 264 222" />
      </g>
    );
  }
  if (expression === "dort") {
    return (
      <g fill="none" stroke={C} strokeWidth={8} strokeLinecap="round">
        <path d="M136 214 Q160 232 184 214" />
        <path d="M216 214 Q240 232 264 214" />
      </g>
    );
  }
  if (expression === "enerve") {
    return (
      <>
        {[160, 240].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx} cy={222} rx={24} ry={20} fill="#fff" stroke={C} strokeWidth={T} />
            <circle cx={cx} cy={224} r={9} fill={C} />
          </g>
        ))}
      </>
    );
  }
  const grands = expression === "supplie" || expression === "choc";
  const pupille = expression === "choc" ? 7 : grands ? 17 : 9;
  return (
    <>
      {[160, 240].map((cx) => (
        <g key={cx} transform={`translate(${cx} 215) scale(1 ${cligne}) translate(${-cx} -215)`}>
          <ellipse cx={cx} cy={215} rx={grands ? 31 : 26} ry={grands ? 35 : 30} fill="#fff" stroke={C} strokeWidth={T} />
          <circle cx={cx + (grands ? 0 : 6)} cy={grands ? 218 : 222} r={pupille} fill={C} />
          {expression === "supplie" ? <circle cx={cx + 6} cy={213} r={6} fill="#fff" /> : null}
          {expression === "malin" ? (
            // Paupière à moitié fermée : l'air sûr de lui
            <path
              d={`M${cx - 30} 186 L${cx + 30} 186 L${cx + 30} 214 Q${cx} 210 ${cx - 30} 214 Z`}
              fill={couleurs.peau}
              stroke={C}
              strokeWidth={T}
              strokeLinejoin="round"
            />
          ) : null}
        </g>
      ))}
    </>
  );
};

const Bouche: React.FC<{ readonly expression: Expression }> = ({ expression }) => {
  switch (expression) {
    case "rire":
      return (
        <>
          <path d="M148 262 Q200 352 252 262 Z" fill="#7a1f24" stroke={C} strokeWidth={T} strokeLinejoin="round" />
          <path d="M156 266 L244 266 L238 282 L162 282 Z" fill="#fff" />
          <ellipse cx={200} cy={318} rx={22} ry={10} fill="#e86b72" />
        </>
      );
    case "dort":
      return <ellipse cx={200} cy={282} rx={11} ry={14} fill="#7a1f24" stroke={C} strokeWidth={T} />;
    case "choc":
      return <ellipse cx={200} cy={292} rx={24} ry={32} fill="#7a1f24" stroke={C} strokeWidth={T} />;
    case "supplie":
      return <path d="M172 292 Q186 278 200 288 Q214 278 228 292" fill="none" stroke={C} strokeWidth={T} strokeLinecap="round" />;
    case "enerve":
      return (
        <>
          <path d="M162 296 Q200 268 238 296 Z" fill="#7a1f24" stroke={C} strokeWidth={T} strokeLinejoin="round" />
          <path d="M170 290 L230 290" stroke="#fff" strokeWidth={6} />
        </>
      );
    default:
      return <path d="M168 280 Q205 296 236 268" fill="none" stroke={C} strokeWidth={T} strokeLinecap="round" />;
  }
};

const Sourcils: React.FC<{ readonly expression: Expression }> = ({ expression }) => {
  if (expression === "supplie") {
    return (
      <g stroke={C} strokeWidth={8} strokeLinecap="round">
        <line x1={132} y1={176} x2={180} y2={162} />
        <line x1={220} y1={162} x2={268} y2={176} />
      </g>
    );
  }
  if (expression === "choc") {
    return (
      <g stroke={C} strokeWidth={8} strokeLinecap="round" fill="none">
        <path d="M134 162 Q160 146 186 160" />
        <path d="M214 160 Q240 146 266 162" />
      </g>
    );
  }
  if (expression === "enerve") {
    return (
      <g stroke={C} strokeWidth={10} strokeLinecap="round">
        <line x1={132} y1={180} x2={184} y2={198} />
        <line x1={216} y1={198} x2={268} y2={180} />
      </g>
    );
  }
  if (expression === "malin") {
    return (
      <g stroke={C} strokeWidth={8} strokeLinecap="round" fill="none">
        <path d="M134 172 Q160 166 184 174" />
        <path d="M216 166 Q242 152 266 164" />
      </g>
    );
  }
  return null;
};

const Cheveux: React.FC<{ readonly look: Look }> = ({ look }) =>
  look.coiffure === "boucles" ? (
    <g fill={look.cheveux} stroke={C} strokeWidth={T}>
      {[
        [104, 150, 34],
        [138, 104, 38],
        [186, 84, 40],
        [236, 88, 40],
        [280, 116, 36],
        [304, 160, 30],
        [94, 192, 24],
      ].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
      ))}
      <path d="M100 160 Q200 120 300 160 L300 130 Q200 70 100 130 Z" stroke="none" />
    </g>
  ) : look.coiffure === "plaquee" ? (
    // Cheveux plaqués en arrière avec une grosse mèche, style « business »
    <>
      <path
        d="M90 190 Q74 60 206 52 Q334 58 312 188 Q304 128 262 112 Q206 96 150 118 Q104 138 90 190 Z"
        fill={look.cheveux}
        stroke={C}
        strokeWidth={T}
        strokeLinejoin="round"
      />
      <path d="M150 80 Q210 62 280 92" fill="none" stroke="#f3d48a" strokeWidth={8} strokeLinecap="round" />
    </>
  ) : (
    <path
      d="M88 196 Q78 66 200 64 Q322 66 312 196 Q298 136 262 126 Q236 168 198 138 Q164 172 128 140 Q100 158 88 196 Z"
      fill={look.cheveux}
      stroke={C}
      strokeWidth={T}
      strokeLinejoin="round"
    />
  );

// Casquette portée à l'envers, visière vers l'arrière (à gauche).
const Casquette: React.FC<{ readonly couleur: string }> = ({ couleur }) => (
  <g>
    <path d="M70 120 Q60 112 40 120 Q34 132 60 138 L96 136 Z" fill={couleur} stroke={C} strokeWidth={T} strokeLinejoin="round" />
    <path d="M86 150 Q86 56 200 52 Q314 56 314 150 Q200 128 86 150 Z" fill={couleur} stroke={C} strokeWidth={T} strokeLinejoin="round" />
    <path d="M200 54 L200 136" stroke={C} strokeWidth={4} />
    <circle cx={200} cy={54} r={8} fill={couleur} stroke={C} strokeWidth={4} />
  </g>
);

// Étiquette lumineuse posée sur le front, largeur selon le texte.
const EtiquetteFront: React.FC<{ readonly texte: string; readonly couleur: string }> = ({ texte, couleur }) => {
  const largeur = Math.max(90, texte.length * 23 + 34);
  return (
    <g transform="translate(200 112)">
      <rect x={-largeur / 2} y={-27} width={largeur} height={54} rx={14} fill="rgba(20, 22, 32, 0.82)" stroke={couleur} strokeWidth={3} />
      <text
        x={0}
        y={12}
        textAnchor="middle"
        fontFamily={policeMono}
        fontWeight={800}
        fontSize={36}
        fill={couleur}
        style={{ filter: `drop-shadow(0 0 6px ${couleur})` }}
      >
        {texte}
      </text>
    </g>
  );
};

const LunettesVue: React.FC = () => (
  <g fill="none" stroke={C} strokeWidth={7}>
    <circle cx={160} cy={216} r={38} />
    <circle cx={240} cy={216} r={38} />
    <line x1={198} y1={214} x2={202} y2={214} />
  </g>
);

const LunettesSurLaTete: React.FC = () => (
  <g>
    <rect x={124} y={78} width={66} height={38} rx={14} fill="#1b1b22" stroke={C} strokeWidth={T} />
    <rect x={210} y={78} width={66} height={38} rx={14} fill="#1b1b22" stroke={C} strokeWidth={T} />
    <line x1={190} y1={94} x2={210} y2={94} stroke={C} strokeWidth={T} />
    <line x1={136} y1={88} x2={152} y2={88} stroke="#6f7590" strokeWidth={5} strokeLinecap="round" />
    <line x1={222} y1={88} x2={238} y2={88} stroke="#6f7590" strokeWidth={5} strokeLinecap="round" />
  </g>
);

const Chaine: React.FC = () => (
  <g>
    <path d="M160 346 Q200 440 240 346" fill="none" stroke={C} strokeWidth={14} strokeLinecap="round" />
    <path d="M160 346 Q200 440 240 346" fill="none" stroke={OR} strokeWidth={8} strokeLinecap="round" strokeDasharray="10 5" />
    <circle cx={200} cy={410} r={22} fill={OR} stroke={C} strokeWidth={T} />
    <text x={200} y={420} textAnchor="middle" fontSize={28} fontWeight="bold" fill={C}>
      $
    </text>
  </g>
);

type Props = {
  readonly marche?: boolean;
  readonly pose?: Pose;
  readonly expression?: Expression;
  readonly ecran?: Ecran;
  // Chiffre affiché sur le front (format « Et si… ça s'affichait sur ton front »).
  readonly front?: { readonly texte: string; readonly couleur?: string };
  readonly style?: React.CSSProperties;
};

// Personnage en 400×900, pieds en bas. Respire et cligne des yeux tout seul.
const Perso: React.FC<Props & { readonly look: Look }> = ({
  look,
  marche = false,
  pose = "repos",
  expression = "malin",
  ecran = "batterie",
  front,
  style,
}) => {
  const frame = useCurrentFrame();
  const pas = marche ? Math.sin(frame / 2.6) * 16 : 0;
  const haut = look.torseNu ? couleurs.peau : look.sweat;
  const hautOmbre = look.torseNu ? "#e6c7ad" : look.sweatOmbre;
  const sautille = pose === "brasLeves";
  const decalage = sautille
    ? -Math.abs(Math.sin(frame / 4.5)) * 26
    : marche
      ? -Math.abs(Math.sin(frame / 2.6)) * 12
      : Math.sin(frame / 9) * 4;
  const cycle = frame % 84;
  const cligne = expression === "choc" ? 1 : cycle < 2 ? 0.15 : cycle < 4 ? 0.5 : 1;

  return (
    <svg viewBox="0 0 400 900" width={400} height={900} style={{ overflow: "visible", ...style }}>
      <g transform={`translate(0 ${decalage})`}>
        {/* Jambes et chaussures */}
        <g transform={`rotate(${pas} 170 590)`}>
          <rect x={152} y={580} width={36} height={258} rx={10} fill={couleurs.pantalon} stroke={C} strokeWidth={T} />
          <ellipse cx={160} cy={848} rx={38} ry={20} fill="#fbfbf8" stroke={C} strokeWidth={T} />
        </g>
        <g transform={`rotate(${-pas} 230 590)`}>
          <rect x={212} y={580} width={36} height={258} rx={10} fill={couleurs.pantalon} stroke={C} strokeWidth={T} />
          <ellipse cx={240} cy={848} rx={38} ry={20} fill="#fbfbf8" stroke={C} strokeWidth={T} />
        </g>

        {/* Bras derrière le buste quand ils sont levés */}
        {pose === "brasLeves" ? (
          <>
            <Bras d="M152 360 Q100 280 96 170" couleur={haut} />
            <Bras d="M248 360 Q300 280 304 170" couleur={haut} />
            <Main x={96} y={150} />
            <Main x={304} y={150} />
          </>
        ) : null}

        {/* Sweat à capuche */}
        <path d="M138 338 Q200 316 262 338 L276 596 Q200 612 124 596 Z" fill={haut} stroke={C} strokeWidth={T} strokeLinejoin="round" />
        {look.torseNu ? (
          <>
            <circle cx={172} cy={420} r={6} fill="#c98a7a" />
            <circle cx={228} cy={420} r={6} fill="#c98a7a" />
            <path d="M196 470 Q200 478 204 470" fill="none" stroke={C} strokeWidth={4} />
          </>
        ) : (
          <>
            <path d="M152 500 L248 500 L238 560 L162 560 Z" fill={hautOmbre} stroke={C} strokeWidth={T} strokeLinejoin="round" />
            {look.tache ? <ellipse cx={176} cy={420} rx={22} ry={15} fill="#8b6a45" opacity={0.75} /> : null}
            <ellipse cx={200} cy={338} rx={58} ry={20} fill={hautOmbre} stroke={C} strokeWidth={T} />
          </>
        )}
        {look.torseNu ? null : look.chaine ? (
          <Chaine />
        ) : (
          <>
            <line x1={186} y1={352} x2={182} y2={410} stroke={C} strokeWidth={4} />
            <line x1={214} y1={352} x2={218} y2={410} stroke={C} strokeWidth={4} />
          </>
        )}

        {pose === "repos" ? (
          <>
            <Bras d="M142 358 Q116 470 130 568" couleur={haut} />
            <Bras d="M258 358 Q284 470 270 568" couleur={haut} />
            <Main x={130} y={584} />
            <Telephone x={278} y={548} ecran={ecran} rotation={8} />
            <Main x={270} y={584} />
          </>
        ) : (
          <Telephone x={318} y={102} ecran={ecran} rotation={18} />
        )}

        {/* Tête */}
        <ellipse cx={88} cy={214} rx={20} ry={28} fill={couleurs.peau} stroke={C} strokeWidth={T} />
        <ellipse cx={312} cy={214} rx={20} ry={28} fill={couleurs.peau} stroke={C} strokeWidth={T} />
        <ellipse cx={200} cy={200} rx={112} ry={126} fill={couleurs.peau} stroke={C} strokeWidth={T} />
        <Cheveux look={look} />
        {look.casquette ? <Casquette couleur={look.casquette} /> : null}
        {look.lunettesSurLaTete ? <LunettesSurLaTete /> : null}
        {expression === "rire" ? (
          <>
            <ellipse cx={128} cy={258} rx={18} ry={10} fill="#f2a3a0" opacity={0.8} />
            <ellipse cx={272} cy={258} rx={18} ry={10} fill="#f2a3a0" opacity={0.8} />
          </>
        ) : null}
        <Sourcils expression={expression} />
        <Yeux expression={expression} cligne={cligne} />
        <Bouche expression={expression} />
        {look.lunettesVue ? <LunettesVue /> : null}
        {front ? <EtiquetteFront texte={front.texte} couleur={front.couleur ?? "#3ddc97"} /> : null}
      </g>
    </svg>
  );
};

export const Kevin: React.FC<Props> = (props) => <Perso look={LOOK_KEVIN} {...props} />;
export const Theo: React.FC<Props> = (props) => <Perso look={LOOK_THEO} {...props} />;
export const Bastien: React.FC<Props & { readonly torseNu?: boolean }> = ({ torseNu = false, ...props }) => (
  <Perso look={{ ...LOOK_BASTIEN, torseNu }} {...props} />
);
export const Pote: React.FC<Props> = (props) => <Perso look={LOOK_POTE} {...props} />;
export const Sam: React.FC<Props> = (props) => <Perso look={LOOK_SAM} {...props} />;
// Perso avec un look libre (pour comparer des variantes).
export const PersoLibre = Perso;
