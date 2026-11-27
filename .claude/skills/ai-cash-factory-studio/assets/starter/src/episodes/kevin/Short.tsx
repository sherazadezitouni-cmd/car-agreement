import { AbsoluteFill, Sequence, Track, useVideoConfig } from "remotion";
import { CHUTE, dureeScene } from "../../timing";
import { voix } from "../../voix/kevin";
import { Fin, Intro, Pouvoir, Prise, Record } from "./Scenes";

export const ShortKevin: React.FC = () => {
  const { fps } = useVideoConfig();
  const intro = dureeScene(voix.intro, fps);
  const record = dureeScene(voix.record, fps);
  const prise = dureeScene(voix.prise, fps);
  const pouvoir = dureeScene(voix.pouvoir, fps);
  const fin = dureeScene(voix.fin, fps, CHUTE);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Track name="Scènes">
        <Sequence name="Intro" durationInFrames={intro}>
          <Intro />
        </Sequence>
        <Sequence name="Record" from={intro} durationInFrames={record}>
          <Record />
        </Sequence>
        <Sequence name="Multiprise" from={intro + record} durationInFrames={prise}>
          <Prise />
        </Sequence>
        <Sequence name="Super-pouvoir" from={intro + record + prise} durationInFrames={pouvoir}>
          <Pouvoir />
        </Sequence>
        <Sequence name="Chargeur" from={intro + record + prise + pouvoir} durationInFrames={fin}>
          <Fin />
        </Sequence>
      </Track>
    </AbsoluteFill>
  );
};
