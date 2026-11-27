import { AbsoluteFill, Sequence, Track, useVideoConfig } from "remotion";
import { CHUTE, dureeScene } from "../../timing";
import { voix } from "../../voix/theo";
import { Crypto, Escargots, Formation, Intro, Montres, Solde } from "./Scenes";

export const ShortTheo: React.FC = () => {
  const { fps } = useVideoConfig();
  const intro = dureeScene(voix.intro, fps);
  const crypto = dureeScene(voix.crypto, fps);
  const montres = dureeScene(voix.montres, fps);
  const escargots = dureeScene(voix.escargots, fps);
  const solde = dureeScene(voix.solde, fps);
  const formation = dureeScene(voix.formation, fps, CHUTE);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Track name="Scènes">
        <Sequence name="Intro" durationInFrames={intro}>
          <Intro />
        </Sequence>
        <Sequence name="Crypto" from={intro} durationInFrames={crypto}>
          <Crypto />
        </Sequence>
        <Sequence name="Montres" from={intro + crypto} durationInFrames={montres}>
          <Montres />
        </Sequence>
        <Sequence name="Escargots" from={intro + crypto + montres} durationInFrames={escargots}>
          <Escargots />
        </Sequence>
        <Sequence name="Solde" from={intro + crypto + montres + escargots} durationInFrames={solde}>
          <Solde />
        </Sequence>
        <Sequence name="Formation" from={intro + crypto + montres + escargots + solde} durationInFrames={formation}>
          <Formation />
        </Sequence>
      </Track>
    </AbsoluteFill>
  );
};
