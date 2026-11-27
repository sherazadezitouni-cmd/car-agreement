import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { couleurs, police } from "./theme";

type Bloc = { readonly text: string; readonly startMs: number; readonly endMs: number };

// Sous-titres 2-3 mots à la fois, mots entre *étoiles* en jaune.
export const SousTitres: React.FC<{ readonly blocs: readonly Bloc[] }> = ({ blocs }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const actif = blocs.find((b) => ms >= b.startMs && ms < b.endMs) ?? (ms >= blocs[blocs.length - 1].endMs ? blocs[blocs.length - 1] : null);
  if (!actif) {
    return null;
  }
  const depuis = frame - (actif.startMs / 1000) * fps;
  // Un élément par mot, pour que la ligne ne se coupe qu'entre deux mots
  // (jamais au tiret de GRAND-MÈRE). Un mot peut être à moitié jaune : D'*ARRIVÉE*.
  const mots: { texte: string; jaune: boolean }[][] = [[]];
  let jaune = false;
  for (const car of actif.text) {
    const mot = mots[mots.length - 1];
    if (car === "*") {
      jaune = !jaune;
    } else if (car === " ") {
      if (mot.length > 0) {
        mots.push([]);
      }
    } else if (mot.length > 0 && mot[mot.length - 1].jaune === jaune) {
      mot[mot.length - 1].texte += car;
    } else {
      mot.push({ texte: car, jaune });
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom: 380,
        textAlign: "center",
        fontFamily: police,
        fontSize: 124,
        lineHeight: 1.02,
        color: "#fff",
        WebkitTextStroke: `18px ${couleurs.contour}`,
        paintOrder: "stroke fill",
        textShadow: "0 10px 0 rgba(0,0,0,0.35)",
        letterSpacing: 2,
        scale: String(interpolate(depuis, [0, 3, 6], [0.6, 1.12, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })),
      }}
    >
      {mots.map((morceaux, i) => (
        <span key={i}>
          {i > 0 ? " " : null}
          <span style={{ whiteSpace: "nowrap" }}>
            {morceaux.map((m, j) => (
              <span key={j} style={{ color: m.jaune ? couleurs.jaune : undefined }}>
                {m.texte}
              </span>
            ))}
          </span>
        </span>
      ))}
    </div>
  );
};
