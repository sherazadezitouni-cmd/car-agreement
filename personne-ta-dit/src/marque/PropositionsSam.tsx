import { AbsoluteFill } from "remotion";
import { Rayons } from "../fx/Effets";
import { type Look, PersoLibre } from "../perso/Perso";
import { couleurs, police } from "../theme";

// Planche de comparaison : 4 versions de Sam (étape 4).
const C = couleurs.contour;

const VERSIONS: readonly { readonly lettre: string; readonly nom: string; readonly look: Look; readonly expression: "malin" | "choc" | "rire" | "supplie" }[] = [
  { lettre: "A", nom: "Boucles + sweat jaune", look: { cheveux: "#2b2118", coiffure: "boucles", sweat: "#f2b134", sweatOmbre: "#d4962a" }, expression: "choc" },
  { lettre: "B", nom: "Lunettes + sweat corail", look: { cheveux: "#5a3a26", coiffure: "plaquee", sweat: "#ff7a59", sweatOmbre: "#e0603f", lunettesVue: true }, expression: "malin" },
  { lettre: "C", nom: "Casquette + sweat bleu", look: { cheveux: "#3b2a22", coiffure: "bataille", sweat: "#3d6fd1", sweatOmbre: "#2f58ab", casquette: "#ff7a59" }, expression: "rire" },
  { lettre: "D", nom: "Roux + sweat vert", look: { cheveux: "#c96a2b", coiffure: "bataille", sweat: "#2f9e83", sweatOmbre: "#24806a" }, expression: "supplie" },
];

export const PropositionsSam: React.FC = () => (
  <AbsoluteFill>
    <Rayons clair="#bfe9e2" fonce="#8fd6cb" />
    <div
      style={{
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: police,
        fontSize: 110,
        color: "#fff",
        WebkitTextStroke: `16px ${C}`,
        paintOrder: "stroke fill",
      }}
    >
      QUEL <span style={{ color: couleurs.jaune }}>SAM</span> ?
    </div>
    {VERSIONS.map((v, i) => (
      <div key={v.lettre} style={{ position: "absolute", left: 60 + i * 585, top: 230, width: 525, height: 1220 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.75)",
            border: `6px solid ${C}`,
            borderRadius: 40,
          }}
        />
        <PersoLibre look={v.look} expression={v.expression} style={{ position: "absolute", left: 62, top: 60 }} />
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: police,
            fontSize: 37,
            color: C,
          }}
        >
          <span style={{ background: "#ff7a59", color: "#fff", border: `5px solid ${C}`, borderRadius: 16, padding: "0 18px", marginRight: 14 }}>
            {v.lettre}
          </span>
          {v.nom}
        </div>
      </div>
    ))}
  </AbsoluteFill>
);
