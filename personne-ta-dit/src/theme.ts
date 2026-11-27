import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont } from "@remotion/google-fonts/LilitaOne";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const { fontFamily: police } = loadFont("normal", {
  weights: ["400"],
  subsets: ["latin", "latin-ext"],
});

// Police « interface » (compteurs, bandeaux, chiffres sur le front).
export const { fontFamily: policeMono } = loadMono("normal", { weights: ["700", "800"], subsets: ["latin", "latin-ext"] });

export const couleurs = {
  contour: "#26222e",
  jaune: "#ffd23f",
  rouge: "#e2483d",
  peau: "#f3dcc8",
  cheveux: "#3b2a22",
  sweat: "#8d927c",
  sweatOmbre: "#767b66",
  pantalon: "#2e2f3a",
};

export const EPAISSEUR = 6;

export const SERRE = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Entrée « pop » avec rebond, démarrant `delai` frames après le début du parent.
export const usePop = (delai = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delai,
    fps,
    config: { damping: 9, stiffness: 170, mass: 0.6 },
  });
};

export const msEnFrames = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

// Frames de début de chaque sous-titre (pour caler les coups de caméra).
export const debutsBlocs = (blocs: readonly { readonly startMs: number }[], fps: number) =>
  blocs.map((b) => msEnFrames(b.startMs, fps));
