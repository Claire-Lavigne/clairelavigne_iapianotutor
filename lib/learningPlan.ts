// lib/learningPlan.ts

export type SessionPlan = {
  session: number;
  title: string;
  summary: string;
  focus: string[];           // ce qu'on travaille
  targetResult: string;      // ce qu'on doit savoir faire à la fin
  suggestedMinutesPerDay: number;
};

export const pianoLearningPlan: SessionPlan[] = [
  {
    session: 1,
    title: "Découverte du clavier + 4 accords de base",
    summary:
      "Découvrir le clavier, repérer le Do et apprendre 4 accords de base en position fondamentale (C, Am, F, G).",
    focus: [
      "Repérer les touches et les Do",
      "Position de la main droite (1-3-5)",
      "Accords C, Am, F, G en position fondamentale",
      "Jouer la progression C–Am–F–G lentement",
    ],
    targetResult: "Être capable de jouer C–Am–F–G lentement main droite seule.",
    suggestedMinutesPerDay: 20,
  },
  {
    session: 2,
    title: "Stabilisation des accords + rythme simple",
    summary:
      "Stabiliser les 4 accords et introduire 1 à 2 patterns rythmiques très simples main droite.",
    focus: [
      "Rejouer C, Am, F, G sans trop regarder les mains",
      "Garder un tempo lent et régulier",
      "Rythme accords plaqués 4 temps",
      "Rythme accords plaqués 2 + 2",
    ],
    targetResult:
      "Pouvoir accompagner un chant lent avec des accords plaqués simples.",
    suggestedMinutesPerDay: 20,
  },
  {
    session: 3,
    title: "Introduction aux renversements pour enchaînements fluides",
    summary:
      "Réduire les grands sauts entre accords en utilisant les renversements simples.",
    focus: [
      "Comprendre le principe de renversement (même notes, autre ordre)",
      "Renversement de C, G, Am, F",
      "Enchaîner C–G–Am–F avec peu de mouvement",
    ],
    targetResult:
      "Enchaîner C–G–Am–F en renversements avec des transitions fluides main droite.",
    suggestedMinutesPerDay: 20,
  },
  {
    session: 4,
    title: "Patterns rythmiques worship main droite",
    summary:
      "Ajouter du mouvement à la main droite avec quelques patterns rythmiques typiques du worship.",
    focus: [
      "Pattern accords plaqués avec accents sur certains temps",
      "Pattern de notes répétées",
      "Jouer un chant simple avec un pattern régulier",
    ],
    targetResult:
      "Accompagner un chant avec un pattern rythmique simple mais vivant.",
    suggestedMinutesPerDay: 20,
  },
  {
    session: 5,
    title: "Main gauche : basses et fondamentales solides",
    summary:
      "Introduire la main gauche pour jouer la fondamentale de chaque accord.",
    focus: [
      "Comprendre le rôle de la basse (main gauche)",
      "Jouer les fondamentales C, G, A, F à la main gauche",
      "Coordonner main gauche simple + main droite accords plaqués",
    ],
    targetResult:
      "Accompagner une progression C–G–Am–F avec main gauche en basse simple + main droite en accords plaqués.",
    suggestedMinutesPerDay: 20,
  },
  {
    session: 6,
    title: "Coordination des deux mains",
    summary:
      "Renforcer la synchronisation entre main gauche et main droite sur des rythmes lents.",
    focus: [
      "Synchroniser basse main gauche + accord main droite sur le temps 1",
      "Garder un tempo lent mais stable",
      "Travailler C–G–Am–F à deux mains",
    ],
    targetResult:
      "Jouer une progression simple à deux mains sans se bloquer.",
    suggestedMinutesPerDay: 20,
  },
  {
    session: 7,
    title: "Arpèges et broken chords doux",
    summary:
      "Introduire les arpèges et les broken chords pour enrichir l’accompagnement.",
    focus: [
      "Arpèges simples main droite (C = do–mi–sol–mi par exemple)",
      "Pattern 1–5–3–5",
      "Utiliser les arpèges pour intros/ponts doux",
    ],
    targetResult:
      "Être capable de jouer une progression en arpèges simples main droite.",
    suggestedMinutesPerDay: 20,
  },
  {
    session: 8,
    title: "Build-up et intensité dans les refrains",
    summary:
      "Apprendre à augmenter l’intensité (forte, répétitions, accents) pour les refrains.",
    focus: [
      "Accentuer certains temps (1 et 3 par exemple)",
      "Répétitions de notes pour créer de l’énergie",
      "Utiliser renversements serrés pour les refrains",
    ],
    targetResult:
      "Jouer un refrain de chant worship avec plus d’intensité contrôlée.",
    suggestedMinutesPerDay: 20,
  },
  {
    session: 9,
    title: "Variations autour d’un chant",
    summary:
      "Prendre un chant concret et en jouer plusieurs versions (douce, normale, intense).",
    focus: [
      "Version douce : arpèges et textures light",
      "Version normale : accords plaqués + quelques patterns",
      "Version intense : pattern plus dense, mains plus engagées",
    ],
    targetResult:
      "Adapter un même chant en plusieurs versions selon le moment du culte.",
    suggestedMinutesPerDay: 20,
  },
  {
    session: 10,
    title: "Motifs fluides et arpèges plus avancés",
    summary:
      "Fluidifier la main droite avec des motifs d’arpèges plus continus.",
    focus: [
      "Motifs 1–3–5–8 ou similaires",
      "Maintenir une régularité dans les arpèges",
      "Appliquer ces motifs sur 2 à 3 chants",
    ],
    targetResult:
      "Jouer des intros et interludes fluides en arpèges sur un chant worship.",
    suggestedMinutesPerDay: 20,
  },
  {
    session: 11,
    title: "Fills et petites décorations entre les accords",
    summary:
      "Ajouter de petites décorations mélodiques simples entre les changements d’accords.",
    focus: [
      "Fills très courts (2–3 notes) entre les accords",
      "Glissandos ou petites notes de passage",
      "Rester simple, ne pas surcharger le chant",
    ],
    targetResult:
      "Intégrer quelques fills simples sans casser le rythme ni la louange.",
    suggestedMinutesPerDay: 20,
  },
  {
    session: 12,
    title: "Jouer un chant complet en autonomie",
    summary:
      "Assembler tout ce qui a été vu pour jouer un chant complet (ou deux) de A à Z.",
    focus: [
      "Choisir un chant principal",
      "Travailler intro, couplets, refrains, ponts",
      "Gestion de la dynamique (doux → intense → doux)",
    ],
    targetResult:
      "Être capable de jouer un chant de louange complet en autonomie, avec dynamique et variations.",
    suggestedMinutesPerDay: 20,
  },
];

/**
 * Retourne le plan de la séance actuelle.
 * sessionIndex commence à 1. Si > 12, on renvoie la séance 12.
 */
export function getSessionPlan(sessionIndex: number): SessionPlan {
  const clamped = Math.min(Math.max(sessionIndex, 1), pianoLearningPlan.length);
  return pianoLearningPlan[clamped - 1];
}
