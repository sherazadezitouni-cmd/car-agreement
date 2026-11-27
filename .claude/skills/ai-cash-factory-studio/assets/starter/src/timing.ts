type Voix = Record<string, { readonly durationInSeconds: number }>;

// Respiration après chaque phrase, et temps de chute à la fin.
const MARGE = 0.15;
export const CHUTE = 1.2;

export const dureeScene = (scene: { readonly durationInSeconds: number }, fps: number, extra = 0) =>
  Math.ceil((scene.durationInSeconds + MARGE + extra) * fps);

export const dureeTotale = (voix: Voix, fps: number) =>
  Object.values(voix).reduce((total, scene) => total + dureeScene(scene, fps), 0) + Math.ceil(CHUTE * fps);
