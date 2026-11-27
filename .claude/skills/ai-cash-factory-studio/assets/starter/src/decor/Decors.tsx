import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { couleurs, police, usePop } from "../theme";

// Tous les décors sont en 1080×1920, sol à partir de y ≈ 1250.
// Un perso posé à top 560 a les pieds vers y = 1410.
const C = couleurs.contour;
const T = 5;

const Svg: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill>
    <svg viewBox="0 0 1080 1920" width={1080} height={1920}>
      {children}
    </svg>
  </AbsoluteFill>
);

// ——— Salle de bain ———

export const SalleDeBain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Svg>
      <defs>
        <pattern id="carreaux-sdb" width="90" height="90" patternUnits="userSpaceOnUse">
          <rect width="90" height="90" fill="#bfe1ea" />
          <rect width="90" height="90" fill="none" stroke="#9fcbd7" strokeWidth={6} />
        </pattern>
      </defs>
      <rect width="1080" height="1260" fill="url(#carreaux-sdb)" />
      <rect y="1250" width="1080" height="670" fill="#e9e6df" />
      {[1330, 1460, 1640, 1860].map((y) => (
        <line key={y} x1={0} x2={1080} y1={y} y2={y} stroke="#cfcac0" strokeWidth={5} />
      ))}
      {/* Miroir et étagère */}
      <rect x="90" y="300" width="230" height="300" rx="110" fill="#e8f6fb" stroke={C} strokeWidth={T} />
      <path d="M140 380 L200 330" stroke="#fff" strokeWidth={14} strokeLinecap="round" />
      <rect x="800" y="560" width="200" height="20" fill="#a27a55" stroke={C} strokeWidth={T} />
      <rect x="820" y="490" width="40" height="70" rx="8" fill="#f28ac0" stroke={C} strokeWidth={T} />
      <rect x="880" y="505" width="46" height="55" rx="8" fill="#5cc17a" stroke={C} strokeWidth={T} />
      {/* Pommeau et eau qui coule */}
      <rect x="600" y="0" width="22" height="440" fill="#c9c9d1" stroke={C} strokeWidth={T} />
      <path d="M540 470 Q560 420 611 430 Q660 420 680 470 Z" fill="#c9c9d1" stroke={C} strokeWidth={T} strokeLinejoin="round" />
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 552 + i * 15;
        const y = 480 + ((frame * 22 + i * 37) % 140);
        return <line key={i} x1={x} x2={x - 4} y1={y} y2={y + 40} stroke="#5aa9e6" strokeWidth={6} strokeLinecap="round" />;
      })}
    </Svg>
  );
};

// Baignoire au premier plan (à poser APRÈS le perso), avec mousse qui tremble.
export const Baignoire: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Svg>
      {Array.from({ length: 14 }).map((_, i) => (
        <circle
          key={i}
          cx={150 + i * 58}
          cy={1012 + Math.sin(frame / 6 + i) * 6}
          r={34 + (i % 3) * 8}
          fill="#fdfdfd"
          stroke={C}
          strokeWidth={4}
        />
      ))}
      <path d="M90 1010 L990 1010 L960 1330 Q955 1380 900 1380 L180 1380 Q125 1380 120 1330 Z" fill="#fbfbf8" stroke={C} strokeWidth={T} strokeLinejoin="round" />
      <rect x="70" y="990" width="940" height="40" rx="18" fill="#fbfbf8" stroke={C} strokeWidth={T} />
      <rect x="200" y="1375" width="40" height="60" rx="10" fill="#c9a24a" stroke={C} strokeWidth={T} />
      <rect x="840" y="1375" width="40" height="60" rx="10" fill="#c9a24a" stroke={C} strokeWidth={T} />
      <ellipse cx="820" cy="980" rx="40" ry="26" fill={couleurs.jaune} stroke={C} strokeWidth={T} />
      <circle cx="790" cy="955" r="22" fill={couleurs.jaune} stroke={C} strokeWidth={T} />
      <path d="M770 958 L752 962 L770 966 Z" fill="#f28c38" stroke={C} strokeWidth={3} />
    </Svg>
  );
};

// ——— Rue ———

const Immeuble: React.FC<{ readonly x: number; readonly largeur: number; readonly haut: number; readonly couleur: string }> = ({
  x,
  largeur,
  haut,
  couleur,
}) => {
  const colonnes = Math.floor((largeur - 40) / 110);
  return (
    <g>
      <rect x={x} y={haut} width={largeur} height={1260 - haut} fill={couleur} stroke={C} strokeWidth={T} />
      {Array.from({ length: Math.floor((900 - haut) / 150) }).map((_, l) =>
        Array.from({ length: colonnes }).map((__, c) => (
          <g key={`${l}-${c}`}>
            <rect
              x={x + 30 + c * 110}
              y={haut + 50 + l * 150}
              width={70}
              height={96}
              fill="#d8eef5"
              stroke={C}
              strokeWidth={4}
            />
            <line x1={x + 65 + c * 110} x2={x + 65 + c * 110} y1={haut + 50 + l * 150} y2={haut + 146 + l * 150} stroke={C} strokeWidth={3} />
          </g>
        )),
      )}
    </g>
  );
};

export const Rue: React.FC<{ readonly variante?: "cafe" | "resto" | "immeuble"; readonly nuit?: boolean }> = ({
  variante = "immeuble",
  nuit = false,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920}>
        <rect width="1080" height="1260" fill={nuit ? "#28305a" : "#a8d8ef"} />
        <circle cx={900} cy={180} r={60} fill={nuit ? "#f3ecc2" : "#fff3b0"} stroke={C} strokeWidth={T} />
        <Immeuble x={-20} largeur={380} haut={260} couleur="#e7c9a0" />
        <Immeuble x={350} largeur={400} haut={180} couleur="#d9a38e" />
        <Immeuble x={740} largeur={360} haut={300} couleur="#c7c3a1" />

        {variante === "cafe" ? (
          <g>
            <rect x={360} y={930} width={380} height={330} fill="#7a3b2e" stroke={C} strokeWidth={T} />
            <rect x={390} y={1010} width={150} height={220} fill="#f6e3b4" stroke={C} strokeWidth={T} />
            <rect x={570} y={1010} width={140} height={250} fill="#4b2a22" stroke={C} strokeWidth={T} />
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={i}
                d={`M${330 + i * 55} 880 L${385 + i * 55} 880 L${385 + i * 55} 960 Q${357 + i * 55} 985 ${330 + i * 55} 960 Z`}
                fill={i % 2 === 0 ? couleurs.rouge : "#fdfcf8"}
                stroke={C}
                strokeWidth={4}
              />
            ))}
            <text x={550} y={860} textAnchor="middle" fontFamily={police} fontSize={60} fill={C}>
              CAFÉ DU COIN
            </text>
          </g>
        ) : null}

        {variante === "resto" ? (
          <g>
            <rect x={360} y={880} width={380} height={380} fill="#5f6672" stroke={C} strokeWidth={T} />
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1={360} x2={740} y1={900 + i * 30} y2={900 + i * 30} stroke="#454b55" strokeWidth={6} />
            ))}
            <rect x={370} y={790} width={360} height={80} rx={10} fill="#fdfcf8" stroke={C} strokeWidth={T} />
            <text x={550} y={848} textAnchor="middle" fontFamily={police} fontSize={52} fill={C}>
              CHEZ MARCEL
            </text>
            <g transform="rotate(-8 550 1060)">
              <rect x={400} y={1010} width={300} height={100} rx={10} fill={couleurs.rouge} stroke={C} strokeWidth={T} />
              <text x={550} y={1080} textAnchor="middle" fontFamily={police} fontSize={60} fill="#fff">
                À VENDRE
              </text>
            </g>
          </g>
        ) : null}

        {variante === "immeuble" ? (
          <g>
            <rect x={460} y={960} width={180} height={300} rx={10} fill="#3c5a8a" stroke={C} strokeWidth={T} />
            <circle cx={615} cy={1110} r={10} fill={couleurs.jaune} stroke={C} strokeWidth={3} />
            <rect x={660} y={1060} width={60} height={90} rx={8} fill="#c9c9d1" stroke={C} strokeWidth={T} />
            <text x={550} y={940} textAnchor="middle" fontFamily={police} fontSize={56} fill={C}>
              12
            </text>
          </g>
        ) : null}

        {/* Trottoir */}
        <rect y="1255" width="1080" height="665" fill="#c9c6c0" />
        <rect y="1250" width="1080" height="18" fill="#9e9a92" stroke={C} strokeWidth={T} />
        {[1400, 1580, 1800].map((y) => (
          <line key={y} x1={0} x2={1080} y1={y} y2={y} stroke="#b3afa8" strokeWidth={5} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={i * 180 + ((frame * 0) % 1)} x2={i * 180 - 60} y1={1268} y2={1920} stroke="#b3afa8" strokeWidth={5} />
        ))}
      </svg>
      {nuit ? <AbsoluteFill style={{ backgroundColor: "rgba(18, 24, 70, 0.35)" }} /> : null}
    </AbsoluteFill>
  );
};

// Table de bistrot au premier plan, avec `cafes` tasses qui apparaissent une à une.
export const TableTerrasse: React.FC<{ readonly cafes?: number; readonly delai?: number; readonly x?: number }> = ({
  cafes = 1,
  delai = 0,
  x = 700,
}) => (
  <Svg>
    <rect x={x - 14} y={1250} width={28} height={300} fill="#3a3a44" stroke={C} strokeWidth={T} />
    <ellipse cx={x} cy={1555} rx={110} ry={26} fill="#3a3a44" stroke={C} strokeWidth={T} />
    <ellipse cx={x} cy={1250} rx={240} ry={52} fill="#e8e3da" stroke={C} strokeWidth={T} />
    {Array.from({ length: cafes }).map((_, i) => (
      <Tasse key={i} x={x - 120 + i * 95} y={1180} delai={delai + i * 6} />
    ))}
  </Svg>
);

const Tasse: React.FC<{ readonly x: number; readonly y: number; readonly delai: number }> = ({ x, y, delai }) => {
  const pop = usePop(delai);
  return (
    <g transform={`translate(${x} ${y + 70}) scale(${pop}) translate(0 -70)`}>
      <path d="M-30 20 L30 20 L24 70 L-24 70 Z" fill="#fdfcf8" stroke={C} strokeWidth={T} strokeLinejoin="round" />
      <path d="M30 32 Q52 36 46 52 Q42 62 27 60" fill="none" stroke={C} strokeWidth={T} />
      <ellipse cx={0} cy={22} rx={28} ry={8} fill="#6b3f2a" stroke={C} strokeWidth={3} />
    </g>
  );
};

// ——— Métro ———

export const Metro: React.FC = () => (
  <Svg>
    <defs>
      <pattern id="carreaux-metro" width="80" height="40" patternUnits="userSpaceOnUse">
        <rect width="80" height="40" fill="#f4f1ea" />
        <rect x="2" y="2" width="76" height="36" rx="10" fill="#fbf9f4" stroke="#d6d0c4" strokeWidth={3} />
      </pattern>
    </defs>
    <rect width="1080" height="1270" fill="url(#carreaux-metro)" />
    <path d="M-40 1270 L-40 520 Q300 260 640 520 L640 1270 Z" fill="#232631" stroke={C} strokeWidth={T} />
    <circle cx={850} cy={420} r={90} fill="#2f5fa8" stroke={C} strokeWidth={T} />
    <text x={850} y={460} textAnchor="middle" fontFamily={police} fontSize={120} fill="#fff">
      M
    </text>
    <rect x={720} y={600} width={260} height={340} fill="#f2c443" stroke={C} strokeWidth={T} />
    <text x={850} y={700} textAnchor="middle" fontFamily={police} fontSize={44} fill={C}>
      PROCHAIN
    </text>
    <text x={850} y={760} textAnchor="middle" fontFamily={police} fontSize={44} fill={C}>
      MÉTRO :
    </text>
    <text x={850} y={870} textAnchor="middle" fontFamily={police} fontSize={90} fill={couleurs.rouge}>
      2 MIN
    </text>
    <rect y="1260" width="1080" height="160" fill="#9a958c" stroke={C} strokeWidth={T} />
    <rect y="1260" width="1080" height="26" fill={couleurs.jaune} stroke={C} strokeWidth={T} />
    <rect y="1420" width="1080" height="500" fill="#3b3b42" />
    <line x1={0} x2={1080} y1={1560} y2={1560} stroke="#8d8d95" strokeWidth={12} />
    <line x1={0} x2={1080} y1={1700} y2={1700} stroke="#8d8d95" strokeWidth={12} />
  </Svg>
);

// ——— Campagne ———

export const Campagne: React.FC = () => (
  <Svg>
    <rect width="1080" height="1920" fill="#a8d8ef" />
    <circle cx={180} cy={240} r={80} fill="#fff3b0" stroke={C} strokeWidth={T} />
    <ellipse cx={250} cy={1150} rx={700} ry={260} fill="#8cc97a" stroke={C} strokeWidth={T} />
    <ellipse cx={950} cy={1180} rx={600} ry={230} fill="#7dbd6b" stroke={C} strokeWidth={T} />
    <rect y="1240" width="1080" height="680" fill="#9bd087" />
    {Array.from({ length: 10 }).map((_, i) => (
      <rect key={i} x={20 + i * 115} y={1120} width={20} height={150} fill="#b98a5e" stroke={C} strokeWidth={4} />
    ))}
    <rect x={0} y={1150} width={1080} height={16} fill="#b98a5e" stroke={C} strokeWidth={4} />
    <rect x={0} y={1205} width={1080} height={16} fill="#b98a5e" stroke={C} strokeWidth={4} />
    <path d="M560 1920 Q600 1500 540 1250 L620 1250 Q700 1500 760 1920 Z" fill="#d9c08a" />
    <text x={880} y={980} textAnchor="middle" fontFamily={police} fontSize={44} fill={C}>
      MÉTRO À 43 KM
    </text>
    <rect x={720} y={920} width={320} height={84} fill="none" stroke={C} strokeWidth={T} rx={10} />
    <rect x={870} y={1004} width={20} height={130} fill="#b98a5e" stroke={C} strokeWidth={4} />
  </Svg>
);

export const Vache: React.FC<{ readonly x: number; readonly y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  const machouille = Math.sin(frame / 3) * 4;
  return (
    <svg width={420} height={300} viewBox="0 0 420 300" style={{ position: "absolute", left: x, top: y, overflow: "visible" }}>
      {[70, 130, 270, 330].map((lx) => (
        <rect key={lx} x={lx} y={190} width={30} height={100} fill="#fdfcf8" stroke={C} strokeWidth={T} />
      ))}
      <rect x={40} y={80} width={330} height={150} rx={60} fill="#fdfcf8" stroke={C} strokeWidth={T} />
      <ellipse cx={140} cy={130} rx={50} ry={34} fill={C} />
      <ellipse cx={280} cy={180} rx={40} ry={26} fill={C} />
      <path d="M40 120 Q10 140 18 190" fill="none" stroke={C} strokeWidth={T} />
      <g transform={`translate(0 ${machouille / 2})`}>
        <ellipse cx={380} cy={110} rx={70} ry={62} fill="#fdfcf8" stroke={C} strokeWidth={T} />
        <ellipse cx={410} cy={140 + machouille} rx={48} ry={30} fill="#f2a3a0" stroke={C} strokeWidth={T} />
        <circle cx={398} cy={138 + machouille} r={6} fill={C} />
        <circle cx={424} cy={138 + machouille} r={6} fill={C} />
        <circle cx={370} cy={90} r={9} fill={C} />
        <path d="M330 60 L310 30 M420 60 L440 30" stroke={C} strokeWidth={8} strokeLinecap="round" />
      </g>
    </svg>
  );
};

// ——— Salle de fête ———

export const SalleFete: React.FC = () => {
  const frame = useCurrentFrame();
  const couleursFanions = [couleurs.rouge, couleurs.jaune, "#4d78b8", "#5cc17a", "#f28ac0"];
  return (
    <Svg>
      <rect width="1080" height="1260" fill="#f6d5dc" />
      <rect y="1250" width="1080" height="670" fill="#c98f62" />
      {[1360, 1520, 1740].map((y) => (
        <line key={y} x1={0} x2={1080} y1={y} y2={y} stroke="#b07a50" strokeWidth={5} />
      ))}
      <path d="M0 200 Q540 330 1080 200" fill="none" stroke={C} strokeWidth={4} />
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 40 + i * 90;
        const y = 210 + Math.sin((i / 11) * Math.PI) * 60;
        return (
          <path
            key={i}
            d={`M${x} ${y} L${x + 60} ${y} L${x + 30} ${y + 70} Z`}
            fill={couleursFanions[i % couleursFanions.length]}
            stroke={C}
            strokeWidth={4}
          />
        );
      })}
      <rect x="250" y="400" width="580" height="120" rx="20" fill="#fdfcf8" stroke={C} strokeWidth={T} />
      <text x="540" y="485" textAnchor="middle" fontFamily={police} fontSize={66} fill={couleurs.rouge}>
        JOYEUX ANNIV !
      </text>
      {[
        [120, 700, couleurs.rouge],
        [220, 640, "#4d78b8"],
        [900, 680, couleurs.jaune],
        [980, 760, "#5cc17a"],
      ].map(([bx, by, coul], i) => {
        const yb = Number(by) + Math.sin(frame / 10 + i) * 14;
        return (
          <g key={i}>
            <line x1={Number(bx)} x2={Number(bx)} y1={yb + 70} y2={yb + 330} stroke={C} strokeWidth={3} />
            <ellipse cx={Number(bx)} cy={yb} rx={58} ry={72} fill={String(coul)} stroke={C} strokeWidth={T} />
          </g>
        );
      })}
    </Svg>
  );
};

// Gâteau d'anniversaire avec bougies qui ont fondu.
export const Gateau: React.FC<{ readonly x: number; readonly y: number; readonly fondu?: number }> = ({ x, y, fondu = 0 }) => {
  const frame = useCurrentFrame();
  const hauteur = interpolate(fondu, [0, 1], [70, 12]);
  return (
    <svg width={360} height={320} viewBox="0 0 360 320" style={{ position: "absolute", left: x, top: y, overflow: "visible" }}>
      <ellipse cx={180} cy={290} rx={170} ry={26} fill="#e8e3da" stroke={C} strokeWidth={T} />
      <rect x={40} y={170} width={280} height={120} rx={16} fill="#f2a3c2" stroke={C} strokeWidth={T} />
      <rect x={70} y={100} width={220} height={80} rx={14} fill="#fdfcf8" stroke={C} strokeWidth={T} />
      {[110, 150, 190, 230, 260].map((bx, i) => (
        <g key={bx}>
          <rect x={bx} y={100 - hauteur} width={14} height={hauteur} fill="#4d78b8" stroke={C} strokeWidth={3} />
          {fondu < 0.9 ? (
            <ellipse cx={bx + 7} cy={92 - hauteur + Math.sin(frame / 3 + i) * 2} rx={9} ry={14} fill="#f6a623" stroke={C} strokeWidth={3} />
          ) : null}
        </g>
      ))}
    </svg>
  );
};
