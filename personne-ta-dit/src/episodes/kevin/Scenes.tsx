import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Chambre } from "../../decor/Chambre";
import { Bulle, Camera, Carte, Confettis, Entourage, GrosTexte, Rayons } from "../../fx/Effets";
import { Kevin } from "../../perso/Perso";
import { SousTitres } from "../../SousTitres";
import { couleurs, msEnFrames, police, SERRE } from "../../theme";
import { voix } from "../../voix/kevin";

const C = couleurs.contour;

const Batterie: React.FC = () => {
  const frame = useCurrentFrame();
  const allume = Math.floor(frame / 7) % 2 === 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: 230, height: 120, border: `10px solid ${C}`, borderRadius: 18, padding: 8 }}>
          <div style={{ width: 22, height: "100%", borderRadius: 6, backgroundColor: allume ? couleurs.rouge : "transparent" }} />
        </div>
        <div style={{ width: 16, height: 48, backgroundColor: C, borderRadius: "0 6px 6px 0" }} />
      </div>
      <GrosTexte taille={150} couleur={couleurs.rouge}>
        1 %
      </GrosTexte>
    </div>
  );
};

export const Intro: React.FC = () => {
  const { fps } = useVideoConfig();
  const v = voix.intro;
  const carte = msEnFrames(v.captions[3].startMs, fps);
  return (
    <AbsoluteFill>
      <Camera de={1} a={1.12} origine="540px 1100px">
        <Chambre />
        <Kevin style={{ position: "absolute", left: 340, top: 560 }} />
      </Camera>
      <Carte titre="BATTERIE" delai={carte} style={{ top: 230 }} largeur={620}>
        <Batterie />
      </Carte>
      <Audio name="Voix intro" src={staticFile(v.src)} />
      <Audio name="Pop batterie" src={staticFile("sfx/whip.wav")} from={carte} volume={0.5} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};

export const Record: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = voix.record;
  const annee = msEnFrames(v.captions[3].startMs, fps);
  const valeur = Math.min(5, 1 + Math.floor(Math.max(0, frame - 10) / 7));
  const bloque = valeur === 5 ? Math.sin(frame * 1.7) * 4 : 0;
  return (
    <AbsoluteFill>
      <Camera de={1.28} a={1.36} origine="540px 820px">
        <Chambre />
        <Kevin style={{ position: "absolute", left: 340, top: 560 }} />
      </Camera>
      <Carte titre="RECORD ABSOLU" delai={4} style={{ top: 130 }}>
        <div style={{ translate: `${bloque}px 0px` }}>
          <GrosTexte taille={210}>{valeur} %</GrosTexte>
        </div>
        <div
          style={{
            fontFamily: police,
            fontSize: 64,
            color: couleurs.rouge,
            marginTop: 6,
            opacity: interpolate(frame, [annee, annee + 4], [0, 1], SERRE),
            scale: String(interpolate(frame, [annee, annee + 3, annee + 6], [1.8, 0.9, 1], SERRE)),
          }}
        >
          DEPUIS 2019
        </div>
      </Carte>
      <Audio name="Voix record" src={staticFile(v.src)} />
      <Audio name="Ding record" src={staticFile("sfx/ding.wav")} from={4} volume={0.4} />
      <Audio name="Boom 2019" src={staticFile("sfx/vine-boom.wav")} from={annee} volume={0.35} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};

const Multiprise: React.FC<{ readonly cercle: number }> = ({ cercle }) => (
  <div style={{ position: "relative", width: 440, height: 190 }}>
    <svg viewBox="0 0 440 190" width={440} height={190}>
      {/* Câble du chargeur qui arrive dans la première prise */}
      <path d="M95 20 Q95 -40 40 -60" fill="none" stroke={C} strokeWidth={10} />
      <rect x={10} y={60} width={420} height={110} rx={26} fill="#f4f1ea" stroke={C} strokeWidth={8} />
      {[95, 195, 295].map((x) => (
        <g key={x}>
          <circle cx={x} cy={115} r={32} fill="#dedad0" stroke={C} strokeWidth={6} />
          <circle cx={x - 11} cy={115} r={5} fill={C} />
          <circle cx={x + 11} cy={115} r={5} fill={C} />
        </g>
      ))}
      <rect x={72} y={70} width={46} height={58} rx={8} fill="#2b2b33" stroke={C} strokeWidth={6} />
      <rect x={90} y={0} width={10} height={72} fill={C} />
      <rect x={358} y={88} width={52} height={56} rx={10} fill={couleurs.rouge} stroke={C} strokeWidth={6} />
      <text x={384} y={126} textAnchor="middle" fontFamily={police} fontSize={24} fill="#fff">
        OFF
      </text>
    </svg>
    <Entourage x={384} y={116} rayon={52} delai={cercle} />
  </div>
);

const Zzz: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {[0, 1, 2].map((i) => {
        const t = (frame + i * 16) % 48;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 400 + t * 2.4,
              top: 600 - t * 5,
              fontFamily: police,
              fontSize: 70 + i * 14,
              color: "#fff",
              WebkitTextStroke: `8px ${C}`,
              paintOrder: "stroke fill",
              opacity: interpolate(t, [0, 8, 38, 48], [0, 1, 1, 0]),
            }}
          >
            Z
          </div>
        );
      })}
    </>
  );
};

export const Prise: React.FC = () => {
  const { fps } = useVideoConfig();
  const v = voix.prise;
  const carte = msEnFrames(v.captions[1].startMs, fps);
  const cercle = msEnFrames(v.captions[4].startMs, fps) - carte;
  return (
    <AbsoluteFill>
      <Camera de={1.05} a={1.1} origine="540px 1100px">
        <Chambre nuit />
        <Kevin expression="dort" style={{ position: "absolute", left: 120, top: 560 }} />
        <Zzz />
      </Camera>
      <Carte titre="MULTIPRISE" delai={carte} largeur={520} style={{ top: 300, left: 500 }}>
        <Multiprise cercle={cercle} />
      </Carte>
      <Audio name="Voix prise" src={staticFile(v.src)} />
      <Audio name="Pop multiprise" src={staticFile("sfx/whip.wav")} from={carte} volume={0.5} />
      <Audio name="Bruh" src={staticFile("sfx/bruh.wav")} from={carte + cercle} volume={0.6} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};

const MESSAGES = ["slt", "t ou ?", "mdr", "jarrive", "allo ??", "ok", "?", "vazy", "lol", "jsuis la"];

const PluieDeMessages: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: 14 }).map((_, i) => {
        const t = (frame - i * 4 + 200) % 42;
        const angle = -Math.PI / 2 + ((i % 7) - 3) * 0.38;
        const distance = interpolate(t, [0, 42], [0, 720]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 660 + Math.cos(angle) * distance - 90,
              top: 720 + Math.sin(angle) * distance,
              padding: "14px 26px",
              borderRadius: 30,
              border: `6px solid ${C}`,
              backgroundColor: i % 2 === 0 ? "#5cc17a" : "#4d9be8",
              color: "#fff",
              fontFamily: police,
              fontSize: 48,
              opacity: interpolate(t, [0, 4, 32, 42], [0, 1, 1, 0]),
              scale: String(interpolate(t, [0, 6], [0.3, 1], SERRE)),
              whiteSpace: "nowrap",
            }}
          >
            {MESSAGES[i % MESSAGES.length]}
          </div>
        );
      })}
    </>
  );
};

export const Pouvoir: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = voix.pouvoir;
  const carte = msEnFrames(v.captions[3].startMs, fps);
  const compteur = Math.round(interpolate(frame, [carte, carte + 14], [0, 40], SERRE));
  return (
    <AbsoluteFill>
      <Rayons />
      <Confettis />
      <PluieDeMessages />
      <Kevin pose="brasLeves" expression="rire" style={{ position: "absolute", left: 340, top: 640 }} />
      <Carte titre="AVEC 1 %" delai={carte} style={{ top: 170 }}>
        <GrosTexte taille={200}>{compteur}</GrosTexte>
        <GrosTexte taille={90} couleur={couleurs.rouge}>
          MESSAGES
        </GrosTexte>
      </Carte>
      <Audio name="Voix pouvoir" src={staticFile(v.src)} />
      <Audio name="Yippee" src={staticFile("sfx/yippee.wav")} volume={0.35} />
      <Audio name="Notif 1" src={staticFile("sfx/snapchat-notification.wav")} from={8} volume={0.3} />
      <Audio name="Notif 2" src={staticFile("sfx/snapchat-notification.wav")} from={carte} volume={0.3} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};

export const Fin: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = voix.fin;
  const eteint = msEnFrames(v.captions[1].startMs, fps);
  const bulle = msEnFrames(v.captions[3].startMs, fps);
  const apres = frame >= eteint;
  return (
    <AbsoluteFill>
      <Camera de={1.55} a={1.7} origine="540px 900px">
        <Chambre />
        <Kevin
          expression={apres ? "supplie" : "malin"}
          ecran={apres ? "eteint" : "batterie"}
          style={{ position: "absolute", left: 340, top: 560 }}
        />
      </Camera>
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: interpolate(frame, [eteint, eteint + 2, eteint + 6], [0, 0.85, 0], SERRE) }} />
      <Bulle delai={bulle} style={{ top: 170, left: 130 }}>
        T'AS UN
        <br />
        CHARGEUR ?
      </Bulle>
      <Audio name="Voix fin" src={staticFile(v.src)} />
      <Audio name="Extinction" src={staticFile("sfx/windows-xp-error.wav")} from={eteint} volume={0.4} />
      <Audio name="Boom chargeur" src={staticFile("sfx/vine-boom.wav")} from={bulle} volume={0.4} />
      <SousTitres blocs={v.captions} />
    </AbsoluteFill>
  );
};
