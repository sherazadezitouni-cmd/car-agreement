import { useCurrentFrame } from "remotion";
import { NUIT } from "./Kandicha";

// Personnages articulés de l'univers « légendes » : ils marchent, tournent la tête, clignent des yeux, lèvent les bras.
// Tout est en SVG : à placer dans un <svg>, origine aux pieds.

const PEAU = "#d2a57f";
const PEAU_OMBRE = "#b98c68";
const CHEVEUX = "#1a1310";
const SWEAT = "#2f7a80";
const SWEAT_OMBRE = "#256068";
const PANTALON = "#232a48";
const CHAUSSURE = "#e9e4d6";

const rad = (deg: number) => (deg * Math.PI) / 180;
// Extrémité d'un segment de longueur `l` partant de (x, y), angle 0 = vers le bas, positif = vers l'avant (droite).
const bout = (x: number, y: number, l: number, deg: number) => [x + Math.sin(rad(deg)) * l, y + Math.cos(rad(deg)) * l] as const;

const Membre: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly haut: number;
  readonly bas: number;
  readonly l1: number;
  readonly l2: number;
  readonly couleur: string;
  readonly epaisseur: number;
  readonly fin?: "pied" | "main";
}> = ({ x, y, haut, bas, l1, l2, couleur, epaisseur, fin }) => {
  const [x1, y1] = bout(x, y, l1, haut);
  const [x2, y2] = bout(x1, y1, l2, bas);
  return (
    <g>
      <path d={`M${x} ${y} L${x1} ${y1} L${x2} ${y2}`} stroke={couleur} strokeWidth={epaisseur} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {fin === "pied" ? <ellipse cx={x2 + 14} cy={y2 + 4} rx={30} ry={14} fill={CHAUSSURE} /> : null}
      {fin === "main" ? <circle cx={x2} cy={y2} r={epaisseur * 0.55} fill={PEAU} /> : null}
    </g>
  );
};

// Le héros (« toi ») vu de profil, tourné vers la droite. `marche` : 0 = immobile, 1 = il marche.
// `tete` : inclinaison de la tête en degrés (négatif = il lève les yeux).
export const HerosProfil: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly echelle?: number;
  readonly marche?: number;
  readonly tete?: number;
  readonly peur?: number;
  readonly vitesse?: number;
}> = ({ x, y, echelle = 1, marche = 1, tete = 0, peur = 0, vitesse = 5.2 }) => {
  const frame = useCurrentFrame();
  const ph = frame / vitesse;
  const s = Math.sin(ph) * marche;
  const c = Math.cos(ph) * marche;
  const rebond = -Math.abs(Math.sin(ph)) * 7 * marche + Math.sin(frame / 16) * 2 * (1 - marche);
  const cligne = frame % 96 < 4 ? 0.15 : 1;
  const tremble = peur * Math.sin(frame * 1.9) * 1.6;
  return (
    <g transform={`translate(${x + tremble} ${y}) scale(${echelle})`}>
      <ellipse cx={0} cy={6} rx={78} ry={11} fill="#000" opacity={0.45} />
      <g transform={`translate(0 ${rebond})`}>
        {/* bras et jambe du fond */}
        <Membre x={-4} y={-312} haut={-s * 34} bas={-s * 34 + 12 + Math.max(0, -s) * 26} l1={72} l2={66} couleur={SWEAT_OMBRE} epaisseur={28} fin="main" />
        <Membre x={0} y={-176} haut={-s * 30} bas={-s * 30 - Math.max(0, c) * 44} l1={88} l2={88} couleur="#1a2038" epaisseur={32} fin="pied" />
        {/* jambe de devant */}
        <Membre x={0} y={-176} haut={s * 30} bas={s * 30 - Math.max(0, -c) * 44} l1={88} l2={88} couleur={PANTALON} epaisseur={32} fin="pied" />
        {/* buste */}
        <g transform={`rotate(${3 * marche} 0 -176)`}>
          <path d="M-46 -176 L-50 -300 Q-48 -338 0 -340 Q48 -338 50 -300 L46 -176 Q0 -164 -46 -176 Z" fill={SWEAT} />
          <path d="M-46 -210 L46 -210 L46 -176 Q0 -164 -46 -176 Z" fill={SWEAT_OMBRE} />
          <path d="M-30 -340 Q0 -318 34 -338 Q30 -356 0 -356 Q-28 -356 -30 -340 Z" fill={SWEAT_OMBRE} />
          {/* tête */}
          <g transform={`rotate(${tete} 4 -350)`}>
            <rect x={-10} y={-366} width={26} height={30} fill={PEAU_OMBRE} />
            <circle cx={6} cy={-410} r={60} fill={PEAU} />
            <path d="M-54 -404 Q-62 -482 8 -476 Q60 -474 66 -428 Q30 -452 -6 -440 Q-30 -432 -34 -396 Q-44 -384 -54 -404 Z" fill={CHEVEUX} />
            <ellipse cx={-22} cy={-402} rx={10} ry={14} fill={PEAU_OMBRE} />
            <path d="M64 -412 Q76 -402 64 -394" stroke={PEAU_OMBRE} strokeWidth={5} fill="none" strokeLinecap="round" />
            <g transform={`translate(38 ${-414})`}>
              <ellipse cx={0} cy={0} rx={10 + peur * 3} ry={(12 + peur * 5) * cligne} fill="#f4efe2" />
              <circle cx={3} cy={0} r={5} fill="#0b0d16" opacity={cligne < 1 ? 0 : 1} />
              <path d={`M-12 ${-20 - peur * 8} Q2 ${-26 - peur * 10} 14 ${-18 - peur * 2}`} stroke={CHEVEUX} strokeWidth={5} fill="none" strokeLinecap="round" />
            </g>
            {peur > 0.5 ? <ellipse cx={50} cy={-380} rx={7} ry={9} fill="#3a1c1c" /> : <path d="M40 -380 Q50 -376 58 -380" stroke="#6b3d2e" strokeWidth={4} fill="none" strokeLinecap="round" />}
          </g>
          {/* bras de devant */}
          <Membre x={4} y={-312} haut={s * 34} bas={s * 34 + 12 + Math.max(0, s) * 26} l1={72} l2={66} couleur={SWEAT} epaisseur={28} fin="main" />
        </g>
      </g>
    </g>
  );
};

// Le héros de face, en gros plan (buste). `peur` 0 → 1 : les yeux s'agrandissent, les sourcils montent, la bouche s'ouvre.
// `regard` : décalage des pupilles. `mains` 0 → 1 : il lève les mains devant lui.
export const HerosFace: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly echelle?: number;
  readonly peur?: number;
  readonly regard?: readonly [number, number];
  readonly mains?: number;
  readonly tete?: number;
}> = ({ x, y, echelle = 1, peur = 0, regard = [0, 0], mains = 0, tete = 0 }) => {
  const frame = useCurrentFrame();
  const respire = Math.sin(frame / (14 - peur * 8)) * (3 + peur * 5);
  const cligne = peur > 0.6 ? 1 : frame % 88 < 4 ? 0.12 : 1;
  const tremble = peur * Math.sin(frame * 2.1) * 2;
  const oeil = (cx: number) => (
    <g transform={`translate(${cx} -470)`}>
      <ellipse cx={0} cy={0} rx={24 + peur * 6} ry={(26 + peur * 12) * cligne} fill="#f4efe2" />
      <circle cx={regard[0]} cy={regard[1]} r={11 - peur * 3} fill="#0b0d16" opacity={cligne < 1 ? 0 : 1} />
      <circle cx={regard[0] + 4} cy={regard[1] - 4} r={3} fill="#fff" opacity={cligne < 1 ? 0 : 0.9} />
    </g>
  );
  return (
    <g transform={`translate(${x + tremble} ${y}) scale(${echelle})`}>
      <g transform={`translate(0 ${respire})`}>
        <path d="M-230 0 Q-240 -230 -150 -270 L150 -270 Q240 -230 230 0 Z" fill={SWEAT} />
        <path d="M-90 -270 Q0 -200 90 -270 Q80 -310 0 -310 Q-80 -310 -90 -270 Z" fill={SWEAT_OMBRE} />
        <path d="M-26 -250 L-30 -150 M26 -250 L30 -150" stroke="#e9e4d6" strokeWidth={7} strokeLinecap="round" />
        <rect x={-38} y={-330} width={76} height={70} fill={PEAU_OMBRE} />
        <g transform={`rotate(${tete} 0 -330)`}>
          <ellipse cx={-150} cy={-460} rx={22} ry={32} fill={PEAU_OMBRE} />
          <ellipse cx={150} cy={-460} rx={22} ry={32} fill={PEAU_OMBRE} />
          <ellipse cx={0} cy={-460} rx={146} ry={156} fill={PEAU} />
          <path d="M-150 -470 Q-170 -640 0 -640 Q170 -640 150 -470 Q130 -560 60 -566 Q-20 -548 -70 -570 Q-130 -560 -150 -470 Z" fill={CHEVEUX} />
          {oeil(-58)}
          {oeil(58)}
          <path d={`M-90 ${-516 - peur * 20} Q-58 ${-530 - peur * 26} -26 ${-512 - peur * 6}`} stroke={CHEVEUX} strokeWidth={10} fill="none" strokeLinecap="round" />
          <path d={`M26 ${-512 - peur * 6} Q58 ${-530 - peur * 26} 90 ${-516 - peur * 20}`} stroke={CHEVEUX} strokeWidth={10} fill="none" strokeLinecap="round" />
          <path d="M-6 -430 Q0 -410 10 -424" stroke={PEAU_OMBRE} strokeWidth={6} fill="none" strokeLinecap="round" />
          {peur > 0.45 ? (
            <ellipse cx={0} cy={-366} rx={16 + peur * 8} ry={8 + peur * 18} fill="#3a1c1c" />
          ) : (
            <path d="M-26 -370 Q0 -362 26 -370" stroke="#6b3d2e" strokeWidth={7} fill="none" strokeLinecap="round" />
          )}
          {peur > 0.7 ? <path d="M118 -560 q14 22 0 34 q-14 -12 0 -34" fill="#9fd0e8" opacity={0.85} /> : null}
        </g>
        {mains > 0 ? (
          <>
            <path d={`M-200 -40 Q-250 ${-120 - mains * 160} -170 ${-150 - mains * 190}`} stroke={SWEAT} strokeWidth={62} strokeLinecap="round" fill="none" />
            <circle cx={-170} cy={-150 - mains * 190} r={40} fill={PEAU} />
            <path d={`M200 -40 Q250 ${-120 - mains * 160} 170 ${-150 - mains * 190}`} stroke={SWEAT} strokeWidth={62} strokeLinecap="round" fill="none" />
            <circle cx={170} cy={-150 - mains * 190} r={40} fill={PEAU} />
          </>
        ) : null}
      </g>
    </g>
  );
};

const ROBE = NUIT.robe;
const ROBE_OMBRE = NUIT.robeOmbre;
const OR = "#c9a24a";
const PEAU_ELLE = "#e3c3a4";

// Aïcha Kandicha de face. `leve` 0 → 1 : elle relève la tête. `yeux` 0 → 1 : ils s'ouvrent. `sourire` 0 → 1.
// `tete` : inclinaison en degrés. `bras` 0 → 1 : elle tend la main. `ourlet` : la robe se soulève sur les sabots.
export const AichaFace: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly echelle?: number;
  readonly leve?: number;
  readonly yeux?: number;
  readonly sourire?: number;
  readonly tete?: number;
  readonly bras?: number;
  readonly ourlet?: number;
}> = ({ x, y, echelle = 1, leve = 1, yeux = 1, sourire = 0, tete = 0, bras = 0, ourlet = 0 }) => {
  const frame = useCurrentFrame();
  const vent = Math.sin(frame / 19);
  const vent2 = Math.sin(frame / 13 + 1.4);
  const flotte = Math.sin(frame / 22) * 5;
  const baisse = (1 - leve) * 34;
  const cligne = frame % 150 < 5 ? 0.1 : 1;
  const ouverture = yeux * cligne;
  const oeil = (cx: number) => (
    <g transform={`translate(${cx} -862)`}>
      {ouverture > 0.2 ? (
        <>
          <path d={`M-24 0 Q0 ${-22 * ouverture} 24 0 Q0 ${16 * ouverture} -24 0 Z`} fill="#f7f2e6" />
          <circle cx={0} cy={0} r={9 * Math.min(1, ouverture + 0.2)} fill="#0b0d16" />
          <circle cx={3} cy={-3} r={2.5} fill="#fff" />
        </>
      ) : null}
      <path d={`M-26 0 Q0 ${-24 * Math.max(ouverture, 0.25)} 26 0`} stroke="#0b0d16" strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M26 0 l10 -8" stroke="#0b0d16" strokeWidth={5} strokeLinecap="round" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y + flotte}) scale(${echelle})`}>
      {ourlet > 0 ? (
        <>
          <path d={`M-70 ${-ourlet - 20} L-64 34 L-28 34 L-32 ${-ourlet - 20} Z`} fill="#6b4a36" />
          <path d={`M32 ${-ourlet - 20} L28 34 L64 34 L70 ${-ourlet - 20} Z`} fill="#6b4a36" />
          <path d="M-68 30 L-74 74 Q-46 88 -20 74 L-26 30 Z" fill="#1c120c" />
          <path d="M26 30 L20 74 Q46 88 74 74 L68 30 Z" fill="#1c120c" />
          <path d="M-47 44 L-47 80 M47 44 L47 80" stroke="#6b4a36" strokeWidth={6} />
        </>
      ) : null}
      {/* cheveux derrière */}
      <path
        d={`M-104 -900 Q-150 -600 ${-128 + vent * 16} -300 Q-60 -280 0 -290 Q60 -280 ${128 + vent2 * 16} -300 Q150 -600 104 -900 Z`}
        fill={NUIT.cheveux}
      />
      {/* robe (caftan blanc, liseré doré) */}
      <path d={`M-92 -700 Q-170 -320 ${-146 + vent * 8} ${-ourlet} L${146 + vent2 * 8} ${-ourlet} Q170 -320 92 -700 Q0 -730 -92 -700 Z`} fill={ROBE} />
      <path d={`M40 -712 Q120 -320 104 ${-ourlet} L${146 + vent2 * 8} ${-ourlet} Q170 -320 92 -700 Z`} fill={ROBE_OMBRE} />
      <path d={`M0 -716 L0 ${-ourlet}`} stroke={OR} strokeWidth={7} />
      <path d={`M${-146 + vent * 8} ${-ourlet - 6} L${146 + vent2 * 8} ${-ourlet - 6}`} stroke={OR} strokeWidth={9} />
      <path d="M-40 -722 Q0 -670 40 -722" stroke={OR} strokeWidth={8} fill="none" />
      <path d="M-118 -500 Q0 -482 118 -500 L116 -472 Q0 -454 -116 -472 Z" fill={OR} />
      {/* bras */}
      <path d={`M-90 -690 Q-150 -560 ${-128 - bras * 30} ${-440 - bras * 120}`} stroke={ROBE} strokeWidth={50} strokeLinecap="round" fill="none" />
      <circle cx={-128 - bras * 30} cy={-440 - bras * 120 + 26} r={22} fill={PEAU_ELLE} />
      <path d="M90 -690 Q150 -560 128 -440" stroke={ROBE_OMBRE} strokeWidth={50} strokeLinecap="round" fill="none" />
      <circle cx={128} cy={-414} r={22} fill={PEAU_ELLE} />
      {/* cou et tête */}
      <rect x={-24} y={-760} width={48} height={60} fill="#cfae8e" />
      <g transform={`rotate(${tete} 0 -760) translate(0 ${baisse})`}>
        <ellipse cx={0} cy={-856} rx={92} ry={108} fill={PEAU_ELLE} />
        {oeil(-38)}
        {oeil(38)}
        <path d="M-64 -902 Q-38 -916 -12 -900" stroke="#0b0d16" strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M12 -900 Q38 -916 64 -902" stroke="#0b0d16" strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M-4 -838 Q0 -822 8 -832" stroke="#c5a184" strokeWidth={5} fill="none" strokeLinecap="round" />
        <path
          d={`M${-26 - sourire * 22} ${-790 - sourire * 10} Q0 ${-782 + sourire * 26} ${26 + sourire * 22} ${-790 - sourire * 10}`}
          stroke="#a8323a"
          strokeWidth={9}
          fill="none"
          strokeLinecap="round"
        />
        {/* cheveux devant : raie au milieu, deux rideaux */}
        <path
          d={`M0 -972 Q-112 -972 -104 -850 Q-118 -600 ${-112 + vent * 12} -360 L${-58 + vent * 10} -372 Q-70 -620 -72 -820 Q-62 -920 0 -946 Z`}
          fill={NUIT.cheveux}
        />
        <path
          d={`M0 -972 Q112 -972 104 -850 Q118 -600 ${112 + vent2 * 12} -360 L${58 + vent2 * 10} -372 Q70 -620 72 -820 Q62 -920 0 -946 Z`}
          fill={NUIT.cheveux}
        />
        <path d={`M-90 -880 Q-98 -640 ${-88 + vent * 10} -400 M90 -880 Q98 -640 ${88 + vent2 * 10} -400`} stroke="#1b2140" strokeWidth={5} fill="none" />
      </g>
    </g>
  );
};

// Aïcha de profil (tournée vers la gauche), immobile au bord de l'eau : seuls ses cheveux et sa robe bougent.
export const AichaProfil: React.FC<{ readonly x: number; readonly y: number; readonly echelle?: number; readonly tourne?: number }> = ({
  x,
  y,
  echelle = 1,
  tourne = 0,
}) => {
  const frame = useCurrentFrame();
  const vent = Math.sin(frame / 17);
  return (
    <g transform={`translate(${x} ${y}) scale(${echelle})`}>
      <ellipse cx={0} cy={6} rx={86} ry={11} fill="#000" opacity={0.45} />
      <path d={`M-30 -320 Q-74 -160 ${-62 + vent * 6} 0 L${70 + vent * 10} 0 Q60 -170 36 -320 Z`} fill={ROBE} />
      <path d={`M10 -322 Q44 -170 40 0 L${70 + vent * 10} 0 Q60 -170 36 -320 Z`} fill={ROBE_OMBRE} />
      <path d={`M${-62 + vent * 6} -5 L${70 + vent * 10} -5`} stroke={OR} strokeWidth={6} />
      <path d="M-34 -236 Q0 -228 40 -236 L40 -222 Q0 -214 -34 -222 Z" fill={OR} />
      <path d="M-6 -316 Q-30 -250 -26 -196" stroke={ROBE} strokeWidth={26} strokeLinecap="round" fill="none" />
      <circle cx={-26} cy={-184} r={11} fill={PEAU_ELLE} />
      <rect x={-8} y={-350} width={22} height={34} fill="#cfae8e" />
      {/* visage de profil, à peine visible sous les cheveux */}
      <g transform={`translate(${-tourne * 6} 0)`}>
        <ellipse cx={-2 - tourne * 6} cy={-390} rx={44} ry={50} fill={PEAU_ELLE} />
        <path d={`M-40 -398 Q-56 -388 -42 -378`} stroke="#c5a184" strokeWidth={5} fill="none" strokeLinecap="round" />
        {tourne > 0.5 ? <path d="M-30 -400 q8 -6 16 0" stroke="#0b0d16" strokeWidth={4} fill="none" strokeLinecap="round" /> : null}
      </g>
      <path
        d={`M-36 -420 Q-30 -450 4 -448 Q54 -446 56 -400 Q${76 + vent * 10} -260 ${66 + vent * 22} -150 L${24 + vent * 16} -160 Q30 -300 8 -372 Q-10 -410 -36 -420 Z`}
        fill={NUIT.cheveux}
      />
    </g>
  );
};
