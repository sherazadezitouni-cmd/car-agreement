import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { couleurs, police, policeMono, SERRE, usePop } from "../theme";

// Briques « série à suspense » : tableau de bord (HUD) façon thriller.
// Palette : bleu nuit, jaune, rouge alerte, police machine.
export const HUD = {
  nuit: "#0d1526",
  nuitClair: "#16213a",
  jaune: "#ffd23f",
  rouge: "#ff4d5e",
  vert: "#3ddc97",
  texte: "#e9eefb",
  discret: "#7d89a8",
};

// Fond bleu nuit avec grille légère et vignettage.
export const FondHud: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: HUD.nuit }}>
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(125,137,168,0.08) 2px, transparent 2px), linear-gradient(90deg, rgba(125,137,168,0.08) 2px, transparent 2px)",
        backgroundSize: "90px 90px",
      }}
    />
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)" }} />
  </AbsoluteFill>
);

// Bandeau du haut : point rouge qui clignote + texte (heure · lieu, ou statut).
export const BadgeHud: React.FC<{ readonly texte: string; readonly top?: number }> = ({ texte, top = 90 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "14px 28px",
          border: `3px solid ${HUD.jaune}`,
          borderRadius: 8,
          fontFamily: policeMono,
          fontWeight: 800,
          fontSize: 40,
          letterSpacing: 4,
          color: HUD.jaune,
          backgroundColor: "rgba(13,21,38,0.7)",
        }}
      >
        <div style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: HUD.rouge, opacity: Math.floor(frame / 15) % 2 ? 0.25 : 1 }} />
        {texte}
      </div>
    </div>
  );
};

// Gros compteur avec son étiquette (survivants, prime, solde…). La valeur peut changer d'une image à l'autre.
export const Compteur: React.FC<{
  readonly etiquette: string;
  readonly valeur: string;
  readonly top: number;
  readonly couleur?: string;
}> = ({ etiquette, valeur, top, couleur = HUD.jaune }) => (
  <div style={{ position: "absolute", top, left: 0, right: 0, textAlign: "center" }}>
    <div style={{ fontFamily: policeMono, fontWeight: 700, fontSize: 36, letterSpacing: 8, color: "#ff8fa0" }}>{etiquette}</div>
    <div style={{ fontFamily: police, fontSize: 170, lineHeight: 1.05, color: couleur }}>{valeur}</div>
  </div>
);

type Regle = { readonly texte: string; readonly debut: number; readonly enfreinte?: number };

// Les 3 règles du monde : chacune apparaît à `debut`, se barre en rouge à `enfreinte`.
export const Regles: React.FC<{ readonly regles: readonly Regle[]; readonly top: number; readonly left?: number }> = ({
  regles,
  top,
  left = 70,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top, left, right: left, display: "flex", flexDirection: "column", gap: 16 }}>
      {regles.map((r, i) => {
        if (frame < r.debut) {
          return null;
        }
        const barree = r.enfreinte !== undefined && frame >= r.enfreinte;
        const trait = barree ? interpolate(frame, [r.enfreinte!, r.enfreinte! + 8], [0, 100], SERRE) : 0;
        return (
          <div
            key={i}
            style={{
              position: "relative",
              alignSelf: "flex-start",
              fontFamily: policeMono,
              fontWeight: 800,
              fontSize: 42,
              color: barree ? HUD.rouge : HUD.texte,
              backgroundColor: "rgba(13,21,38,0.75)",
              border: `2px solid ${barree ? HUD.rouge : HUD.discret}`,
              borderRadius: 8,
              padding: "8px 18px",
              opacity: interpolate(frame, [r.debut, r.debut + 6], [0, 1], SERRE),
              translate: `${interpolate(frame, [r.debut, r.debut + 8], [-40, 0], SERRE)}px 0px`,
            }}
          >
            <span style={{ color: HUD.jaune }}>RÈGLE {i + 1} ·</span> {r.texte}
            <div style={{ position: "absolute", left: 10, top: "50%", height: 6, width: `calc(${trait}% - 20px)`, backgroundColor: HUD.rouge }} />
          </div>
        );
      })}
    </div>
  );
};

// Jauge de pouls (électrocardiogramme) qui défile, avec la valeur qui monte avec la tension.
export const Jauge: React.FC<{
  readonly valeur: number;
  readonly etiquette?: string;
  readonly top?: number;
  readonly vitesse?: number;
}> = ({ valeur, etiquette = "VIGILANCE · POULS", top = 1640, vitesse = 1 }) => {
  const frame = useCurrentFrame();
  const largeur = 640;
  const pas = 160;
  const decalage = (frame * 6 * vitesse) % pas;
  const points: string[] = [];
  for (let x = -pas; x <= largeur + pas; x += pas) {
    const b = x - decalage;
    points.push(`${b},60 ${b + 60},60 ${b + 72},20 ${b + 84},100 ${b + 96},0 ${b + 108},60 ${b + 160},60`);
  }
  const bat = 1 + Math.max(0, Math.sin((frame * vitesse) / 4)) * 0.25;
  const couleur = valeur >= 140 ? HUD.rouge : HUD.jaune;
  return (
    <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <svg width={largeur} height={120} viewBox={`0 0 ${largeur} 120`}>
          <polyline points={points.join(" ")} fill="none" stroke={couleur} strokeWidth={6} strokeLinejoin="round" />
        </svg>
        <svg width={56} height={50} viewBox="0 0 56 50" style={{ scale: String(bat) }}>
          <path d="M28 48 L5 24 Q-4 10 10 4 Q22 0 28 12 Q34 0 46 4 Q60 10 51 24 Z" fill={couleur} />
        </svg>
        <div style={{ fontFamily: police, fontSize: 92, color: couleur, minWidth: 170 }}>{Math.round(valeur)}</div>
      </div>
      <div style={{ fontFamily: policeMono, fontWeight: 700, fontSize: 28, letterSpacing: 8, color: HUD.discret }}>{etiquette}</div>
    </div>
  );
};

// Fiche « RECHERCHÉ » (ou autre titre) qui pope, avec un contenu (souvent un visage) dedans.
export const Fiche: React.FC<{
  readonly titre: string;
  readonly delai?: number;
  readonly top: number;
  readonly children: React.ReactNode;
}> = ({ titre, delai = 0, top, children }) => {
  const pop = usePop(delai);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 290,
        width: 500,
        borderRadius: 14,
        overflow: "hidden",
        border: `4px solid ${HUD.rouge}`,
        backgroundColor: "#cfc9bd",
        scale: String(pop),
        rotate: `${interpolate(pop, [0, 1], [-10, 0])}deg`,
      }}
    >
      <div style={{ backgroundColor: HUD.rouge, color: "#fff", fontFamily: police, fontSize: 56, textAlign: "center", padding: "8px 0" }}>{titre}</div>
      <div style={{ height: 420, position: "relative", overflow: "hidden" }}>{children}</div>
    </div>
  );
};

// Carton de fin de partie : « PARTIE X · question ? »
export const CartonPartie: React.FC<{ readonly texte: string; readonly delai: number }> = ({ texte, delai }) => {
  const pop = usePop(delai);
  const frame = useCurrentFrame();
  if (frame < delai) {
    return null;
  }
  return (
    <div style={{ position: "absolute", top: 820, left: 80, right: 80, display: "flex", justifyContent: "center", scale: String(pop) }}>
      <div style={{ backgroundColor: HUD.jaune, color: couleurs.contour, fontFamily: police, fontSize: 64, padding: "14px 30px", borderRadius: 10, rotate: "-3deg", textAlign: "center" }}>
        {texte}
      </div>
    </div>
  );
};

// Mise en page 16:9 (film YouTube) : la scène verticale à gauche, le panneau HUD à droite.
export const Paysage: React.FC<{ readonly scene: React.ReactNode; readonly panneau: React.ReactNode }> = ({ scene, panneau }) => (
  <AbsoluteFill style={{ backgroundColor: HUD.nuit }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, scale: String(1080 / 1920), transformOrigin: "0 0", overflow: "hidden" }}>
      {scene}
    </div>
    <div style={{ position: "absolute", left: 607, top: 0, right: 0, bottom: 0, borderLeft: `3px solid ${HUD.nuitClair}` }}>{panneau}</div>
  </AbsoluteFill>
);
