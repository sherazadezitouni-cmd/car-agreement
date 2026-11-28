import { Composition, Folder, Still } from "remotion";
import { ShortKandicha, dureeKandicha } from "./episodes/kandicha/Short";
import { ShortKevin } from "./episodes/kevin/Short";
import { ShortTheo } from "./episodes/theo/Short";
import { DemoFaitAvec, DemoFront, DemoSerie, DemoSerieFilm } from "./formats/Demos";
import { Avatar, Banniere, Miniature, MiniatureShort } from "./marque/Marque";
import { ApercuLegende } from "./legendes/Kandicha";
import { DUREE_TEST, TestAnimation } from "./legendes/TestAnimation";
import { PropositionsDA } from "./marque/PropositionsDA";
import { PropositionsSam } from "./marque/PropositionsSam";
import { dureeTotale } from "./timing";
import { voix as voixKevin } from "./voix/kevin";
import { voix as voixTheo } from "./voix/theo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Episodes">
        <Composition
          id="VoiciKevin"
          component={ShortKevin}
          durationInFrames={dureeTotale(voixKevin, 30)}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="VoiciTheo"
          component={ShortTheo}
          durationInFrames={dureeTotale(voixTheo, 30)}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Formats">
        <Still id="DemoFront" component={DemoFront} width={1080} height={1920} />
        <Still id="DemoSerie" component={DemoSerie} width={1080} height={1920} />
        <Still id="DemoSerieFilm" component={DemoSerieFilm} width={1920} height={1080} />
        <Still id="DemoFaitAvec" component={DemoFaitAvec} width={1080} height={1920} />
      </Folder>
      <Folder name="Legendes">
        <Composition id="TestAnimation" component={TestAnimation} durationInFrames={DUREE_TEST} fps={30} width={1080} height={1920} />
        <Composition id="Kandicha" component={ShortKandicha} durationInFrames={dureeKandicha(30)} fps={30} width={1080} height={1920} />
        <Still id="ApercuLegende" component={ApercuLegende} width={2180} height={1920} />
      </Folder>
      <Folder name="Chaine">
        <Still id="PropositionsSam" component={PropositionsSam} width={2400} height={1500} />
        <Still id="PropositionsDA" component={PropositionsDA} width={3280} height={1920} />
        <Still
          id="Banniere"
          component={Banniere}
          width={2560}
          height={1440}
          defaultProps={{
            nom: "MA *CHAÎNE*",
            slogan: "Un nouveau cliché chaque jour",
            rayonClair: "#6fa8ff",
            rayonFonce: "#2f5fa8",
            perso: "kevin",
            persoBis: "theo",
            expression: "malin",
          }}
        />
        <Still
          id="Avatar"
          component={Avatar}
          width={800}
          height={800}
          defaultProps={{
            nom: "PERSONNE T'A DIT",
            slogan: "",
            rayonClair: "#bfe9e2",
            rayonFonce: "#8fd6cb",
            perso: "sam",
            persoBis: "theo",
            expression: "malin",
          }}
        />
        <Still
          id="Miniature"
          component={Miniature}
          width={1280}
          height={720}
          defaultProps={{
            titre: "IL A *TOUJOURS 1 %*",
            nom: "MA CHAÎNE",
            slogan: "",
            rayonClair: "#ff7a63",
            rayonFonce: "#d63a2f",
            perso: "kevin",
            persoBis: "theo",
            expression: "choc",
          }}
        />
        <Still
          id="MiniatureShort"
          component={MiniatureShort}
          width={1080}
          height={1920}
          defaultProps={{
            titre: "VOICI *KEVIN*",
            nom: "MA CHAÎNE",
            slogan: "",
            rayonClair: "#a98be0",
            rayonFonce: "#6c4bb3",
            perso: "kevin",
            persoBis: "theo",
            expression: "malin",
          }}
        />
      </Folder>
    </>
  );
};
