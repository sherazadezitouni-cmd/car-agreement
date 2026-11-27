import { loadFont } from "@remotion/google-fonts/Exo2";
import { interpolate, useCurrentFrame } from "remotion";
import { SERRE, usePop } from "../theme";

// Badge optionnel « Fait avec AI Cash Factory » (charte AI Cash Factory : noir bleuté, dégradé cyan → rose).
// À poser en fin de vidéo si l'élève le souhaite : <FaitAvec delai={...} />
const { fontFamily: exo } = loadFont("normal", { weights: ["600", "800"], subsets: ["latin"] });

export const ACF = {
  fond: "#0b0f1a",
  cyan: "#5ef0f0",
  violet: "#a78bfa",
  rose: "#e85cf0",
  degrade: "linear-gradient(90deg, #5ef0f0 0%, #a78bfa 50%, #e85cf0 100%)",
};

export const FaitAvec: React.FC<{
  readonly delai?: number;
  readonly variante?: "nom" | "lien";
  readonly bottom?: number;
}> = ({ delai = 0, variante = "nom", bottom = 220 }) => {
  const frame = useCurrentFrame();
  const pop = usePop(delai);
  if (frame < delai) {
    return null;
  }
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          padding: 6,
          borderRadius: 40,
          background: ACF.degrade,
          scale: String(pop),
          opacity: interpolate(frame, [delai, delai + 4], [0, 1], SERRE),
          boxShadow: "0 0 40px rgba(232, 92, 240, 0.35)",
        }}
      >
        <div style={{ backgroundColor: ACF.fond, borderRadius: 34, padding: "18px 46px", textAlign: "center", fontFamily: exo }}>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 10, color: "#c9d2e8" }}>FAIT AVEC</div>
          <div
            style={{
              fontSize: variante === "nom" ? 72 : 58,
              fontWeight: 800,
              lineHeight: 1.1,
              backgroundImage: ACF.degrade,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {variante === "nom" ? "AI CASH FACTORY" : "skool.com/aicashfactory"}
          </div>
        </div>
      </div>
    </div>
  );
};
