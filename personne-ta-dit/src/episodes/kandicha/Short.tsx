import { AbsoluteFill, Sequence, Track, useVideoConfig } from "remotion";
import { voix } from "../../voix/kandicha";
import { Accroche, Faiblesse, Fin, Legende, Nom, Pire, Portrait, ToiCeSoir } from "./Scenes";

// Une légende se raconte lentement : un silence après chaque scène, et un long noir à la fin.
const SILENCE = 0.95;
const NOIR_FINAL = 2.4;

const SCENES = [
  ["accroche", Accroche],
  ["nom", Nom],
  ["portrait", Portrait],
  ["legende", Legende],
  ["pire", Pire],
  ["faiblesse", Faiblesse],
  ["toi", ToiCeSoir],
  ["fin", Fin],
] as const;

const duree = (id: keyof typeof voix, fps: number) =>
  Math.ceil((voix[id].durationInSeconds + (id === "fin" ? NOIR_FINAL : SILENCE)) * fps);

export const dureeKandicha = (fps: number) => SCENES.reduce((t, [id]) => t + duree(id, fps), 0);

export const ShortKandicha: React.FC = () => {
  const { fps } = useVideoConfig();
  let debut = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Track name="Scènes">
        {SCENES.map(([id, Composant]) => {
          const d = duree(id, fps);
          const from = debut;
          debut += d;
          return (
            <Sequence key={id} name={id} from={from} durationInFrames={d}>
              <Composant />
            </Sequence>
          );
        })}
      </Track>
    </AbsoluteFill>
  );
};
