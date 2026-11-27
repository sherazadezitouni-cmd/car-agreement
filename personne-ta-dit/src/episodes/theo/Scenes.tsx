import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Chambre } from "../../decor/Chambre";
import { Camera, Carte, Confettis, GrosTexte, Rayons } from "../../fx/Effets";
import { Theo } from "../../perso/Perso";
import { SousTitres } from "../../SousTitres";
import { couleurs, msEnFrames, police, SERRE } from "../../theme";
import { voix } from "../../voix/theo";
import { Billets, Escargot, Graphique, Montre, Terrarium, TelephoneGeant, VERT } from "./Accessoires";

const Decor: React.FC = () => <Chambre mur="vert" poster="lambo" />;

export const Intro: React.FC = () => {
  const { fps } = useVideoConfig();
  const v = voix.intro;
  const carte = msEnFrames(v.captions[2].startMs, fps);
  return (
    <AbsoluteFill>
      <Camera de={1} a={1.12} origine="540px 1100px">
        <Decor />
        <Theo style={{ position: "absolute", left: 340, top: 560 }} />
      </Camera>
      <Carte titre="PLAN N°47" delai={carte} style={{ top: 200 }}>
        <GrosTexte taille={200} couleur={VERT}>
          $$$
        </GrosTexte>
      </Carte>
      <Audio name="Voix intro" src={staticFile(v.src)} />
      <Audio name="Pop plan" src={staticFile("sfx/whip.wav")} from={carte} volume={0.5} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};

export const Crypto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = voix.crypto;
  const carte = msEnFrames(v.captions[2].startMs, fps);
  const crash = msEnFrames(v.captions[5].startMs, fps);
  const crashe = frame >= crash;
  return (
    <AbsoluteFill>
      <Graphique crash={crash} />
      <Theo expression={crashe ? "choc" : "malin"} ecran="allume" style={{ position: "absolute", left: 20, top: 760 }} />
      <Carte titre="ÉCONOMIES DE MAMAN" delai={carte} largeur={640} style={{ top: 330 }}>
        <div style={{ translate: crashe ? `${Math.sin(frame * 2) * 6}px 0px` : "0px 0px" }}>
          <GrosTexte taille={150} couleur={crashe ? couleurs.rouge : couleurs.contour}>
            {crashe ? "0 €" : "8 400 €"}
          </GrosTexte>
        </div>
        <div
          style={{
            fontFamily: police,
            fontSize: 50,
            color: couleurs.rouge,
            opacity: interpolate(frame, [crash + 4, crash + 8], [0, 1], SERRE),
          }}
        >
          MENU : PÂTES ×365
        </div>
      </Carte>
      <Audio name="Voix crypto" src={staticFile(v.src)} />
      <Audio name="Pop économies" src={staticFile("sfx/whip.wav")} from={carte} volume={0.5} />
      <Audio name="Crash" src={staticFile("sfx/price-is-right-fail.wav")} from={crash} volume={0.4} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};

export const Montres: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = voix.montres;
  const carte = msEnFrames(v.captions[2].startMs, fps);
  const mamie = msEnFrames(v.captions[4].startMs, fps);
  const ventes = Math.round(interpolate(frame, [carte + 4, carte + 16], [0, 3], SERRE));
  return (
    <AbsoluteFill>
      <Camera de={1.05} a={1.15} origine="540px 1000px">
        <Decor />
        <Theo style={{ position: "absolute", left: 340, top: 560 }} />
      </Camera>
      <Carte titre={`VENTES : ${ventes}`} delai={carte} largeur={620} style={{ top: 200 }}>
        <div style={{ display: "flex", gap: 40 }}>
          <Montre delai={mamie - carte} mamie />
          <Montre delai={mamie - carte + 4} mamie />
          <Montre delai={0} />
        </div>
      </Carte>
      <Audio name="Voix montres" src={staticFile(v.src)} />
      <Audio name="Ding ventes" src={staticFile("sfx/ding.wav")} from={carte} volume={0.4} />
      <Audio name="Bruh mamie" src={staticFile("sfx/bruh.wav")} from={mamie} volume={0.6} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};

export const Escargots: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = voix.escargots;
  const fuite = msEnFrames(v.captions[2].startMs, fps);
  const carte = msEnFrames(v.captions[3].startMs, fps);
  const boom = msEnFrames(v.captions[4].startMs, fps);
  // Les escargots filent « à toute vitesse » hors du terrarium.
  const avance = (vitesse: number) => Math.max(0, frame - fuite) * vitesse;
  return (
    <AbsoluteFill>
      <Camera de={1} a={1.08} origine="540px 1300px">
        <Decor />
        <Theo expression={frame >= carte ? "choc" : "malin"} style={{ position: "absolute", left: 120, top: 560 }} />
        <Terrarium x={560} y={1120} />
        <Escargot x={640 + avance(9)} y={1230} echelle={0.8} />
        <Escargot x={780 + avance(12)} y={1250} echelle={0.7} />
        <Escargot x={700 - avance(8)} y={1300} echelle={0.75} sens={-1} />
      </Camera>
      <Carte titre="ESCARGOTS RESTANTS" delai={carte} largeur={640} style={{ top: 220 }}>
        <GrosTexte taille={220} couleur={couleurs.rouge}>
          0
        </GrosTexte>
      </Carte>
      <Audio name="Voix escargots" src={staticFile(v.src)} />
      <Audio name="Fuite" src={staticFile("sfx/whoosh.wav")} from={fuite} volume={0.5} />
      <Audio name="Boom escargots" src={staticFile("sfx/vine-boom.wav")} from={boom} volume={0.4} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};

export const Solde: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = voix.solde;
  const carte = msEnFrames(v.captions[1].startMs, fps);
  const telephone = msEnFrames(v.captions[3].startMs, fps);
  const clignote = Math.floor(frame / 6) % 2 === 0;
  return (
    <AbsoluteFill>
      <Camera de={1.25} a={1.35} origine="540px 820px">
        <Decor />
        <Theo expression="supplie" style={{ position: "absolute", left: 340, top: 560 }} />
      </Camera>
      {frame < telephone ? (
        <Carte titre="MON COMPTE" delai={carte} style={{ top: 200 }}>
          <GrosTexte taille={190} couleur={clignote ? couleurs.rouge : "#b8352c"}>
            -12 €
          </GrosTexte>
        </Carte>
      ) : (
        <TelephoneGeant delai={telephone} />
      )}
      <Audio name="Voix solde" src={staticFile(v.src)} />
      <Audio name="Erreur compte" src={staticFile("sfx/windows-xp-error.wav")} from={carte} volume={0.4} />
      <Audio name="Pop téléphone" src={staticFile("sfx/whip.wav")} from={telephone} volume={0.5} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};

export const Formation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = voix.formation;
  const carte = msEnFrames(v.captions[1].startMs, fps);
  const prix = msEnFrames(v.captions[2].startMs, fps);
  const marche = msEnFrames(v.captions[5].startMs, fps);
  const eleves = Math.round(interpolate(frame, [marche, marche + 18], [0, 3482], SERRE));
  const succes = frame >= marche;
  return (
    <AbsoluteFill>
      {succes ? (
        <>
          <Rayons clair="#7fd38a" fonce="#2f8f45" />
          <Billets />
          <Confettis nombre={40} />
          <Theo pose="brasLeves" expression="rire" ecran="allume" style={{ position: "absolute", left: 340, top: 640 }} />
          <Carte titre="ÉLÈVES INSCRITS" delai={marche} style={{ top: 170 }}>
            <GrosTexte taille={180}>{eleves.toLocaleString("fr-FR")}</GrosTexte>
          </Carte>
        </>
      ) : (
        <>
          <Camera de={1} a={1.1} origine="540px 1100px">
            <Decor />
            <Theo style={{ position: "absolute", left: 340, top: 560 }} />
          </Camera>
          <Carte titre="MA FORMATION" delai={carte} style={{ top: 200 }}>
            <div style={{ fontFamily: police, fontSize: 56, color: couleurs.contour, textAlign: "center", lineHeight: 1.05 }}>
              DEVENIR RICHE
              <br />
              EN 7 JOURS
            </div>
            <div style={{ opacity: interpolate(frame, [prix, prix + 3], [0, 1], SERRE), marginTop: 10 }}>
              <GrosTexte taille={150} couleur={VERT}>
                997 €
              </GrosTexte>
            </div>
          </Carte>
        </>
      )}
      <Audio name="Voix formation" src={staticFile(v.src)} />
      <Audio name="Pop formation" src={staticFile("sfx/whip.wav")} from={carte} volume={0.5} />
      <Audio name="Ding prix" src={staticFile("sfx/ding.wav")} from={prix} volume={0.4} />
      <Audio name="Wow ça marche" src={staticFile("sfx/anime-wow.wav")} from={marche} volume={0.45} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};
