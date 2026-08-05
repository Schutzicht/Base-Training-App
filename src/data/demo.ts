// Voorbeelddata voor de BASE app demo.
// Alle namen en cijfers zijn fictief; datums bewegen mee met vandaag zodat de demo levend blijft.

export type Oefening = {
  id: string;
  naam: string;
  spiergroep: string;
  sets: number;
  reps: string;
  gewicht: number | null; // null = lichaamsgewicht of n.v.t.
  rustSec: number;
  cue?: string;
};

export type TrainingDag = {
  id: string;
  label: string; // "Dag A"
  naam: string;
  weekdag: number; // 1 = maandag ... 7 = zondag
  duurMin: number;
  oefeningen: Oefening[];
};

export const LID = {
  naam: "Sanne Visser",
  voornaam: "Sanne",
  lidnummer: "BASE-0247",
  membership: "Limited Membership",
  doel: "Sterker worden en meer energie",
  trainer: "Daan",
  lidSinds: "Opening augustus 2026",
};

export const SCHEMA = {
  naam: "Full Body Kracht",
  blok: "Blok 2 van 3",
  week: 6,
  totaalWeken: 8,
  dagen: [
    {
      id: "dag-a",
      label: "Dag A",
      naam: "Onderlichaam en core",
      weekdag: 1,
      duurMin: 60,
      oefeningen: [
        { id: "squat", naam: "Back squat", spiergroep: "Benen", sets: 4, reps: "6", gewicht: 80, rustSec: 150, cue: "Borst hoog, druk de vloer weg" },
        { id: "rdl", naam: "Romanian deadlift", spiergroep: "Hamstrings", sets: 3, reps: "8", gewicht: 70, rustSec: 120, cue: "Heup naar achteren, rug lang" },
        { id: "splitsquat", naam: "Bulgarian split squat", spiergroep: "Benen", sets: 3, reps: "10 p/k", gewicht: 16, rustSec: 90, cue: "Romp iets voorover, knie volgt de voet" },
        { id: "legcurl", naam: "Leg curl", spiergroep: "Hamstrings", sets: 3, reps: "12", gewicht: 35, rustSec: 75 },
        { id: "plank", naam: "Plank", spiergroep: "Core", sets: 3, reps: "45 sec", gewicht: null, rustSec: 60, cue: "Bilspieren aanspannen, niet doorzakken" },
      ],
    },
    {
      id: "dag-b",
      label: "Dag B",
      naam: "Bovenlichaam push en pull",
      weekdag: 3,
      duurMin: 60,
      oefeningen: [
        { id: "bench", naam: "Bench press", spiergroep: "Borst", sets: 4, reps: "6", gewicht: 62.5, rustSec: 150, cue: "Schouderbladen vast, voeten in de vloer" },
        { id: "pullup", naam: "Pull-up", spiergroep: "Rug", sets: 4, reps: "6", gewicht: null, rustSec: 120, cue: "Start elke herhaling vanuit een dode hang" },
        { id: "ohp", naam: "Dumbbell shoulder press", spiergroep: "Schouders", sets: 3, reps: "10", gewicht: 14, rustSec: 90 },
        { id: "row", naam: "Seated row", spiergroep: "Rug", sets: 3, reps: "10", gewicht: 55, rustSec: 90, cue: "Trek naar de onderkant van je borstkas" },
        { id: "facepull", naam: "Face pull", spiergroep: "Schouders", sets: 3, reps: "15", gewicht: 25, rustSec: 60 },
      ],
    },
    {
      id: "dag-c",
      label: "Dag C",
      naam: "Full body en conditie",
      weekdag: 5,
      duurMin: 55,
      oefeningen: [
        { id: "deadlift", naam: "Deadlift", spiergroep: "Rug", sets: 4, reps: "5", gewicht: 100, rustSec: 180, cue: "Stang dicht bij het lichaam, rustig opbouwen" },
        { id: "pushpress", naam: "Push press", spiergroep: "Schouders", sets: 3, reps: "8", gewicht: 40, rustSec: 120 },
        { id: "goblet", naam: "Goblet squat", spiergroep: "Benen", sets: 3, reps: "12", gewicht: 24, rustSec: 90 },
        { id: "carry", naam: "Farmer carry", spiergroep: "Grip en core", sets: 3, reps: "40 m", gewicht: 24, rustSec: 90, cue: "Lang maken, schouders laag" },
        { id: "bike", naam: "Bike sprints", spiergroep: "Conditie", sets: 6, reps: "20 sec", gewicht: null, rustSec: 40 },
      ],
    },
  ] as TrainingDag[],
};

// Datum-helpers: alles relatief aan vandaag zodat de demo klopt op elk moment.
export function vandaagWeekdag(): number {
  const d = new Date().getDay();
  return d === 0 ? 7 : d;
}

export function trainingVanVandaag(): TrainingDag | null {
  const wd = vandaagWeekdag();
  return SCHEMA.dagen.find((d) => d.weekdag === wd) ?? null;
}

export function volgendeTraining(): { dag: TrainingDag; overDagen: number } {
  const wd = vandaagWeekdag();
  let best: { dag: TrainingDag; overDagen: number } | null = null;
  for (const dag of SCHEMA.dagen) {
    let diff = dag.weekdag - wd;
    if (diff <= 0) diff += 7;
    if (!best || diff < best.overDagen) best = { dag, overDagen: diff };
  }
  return best!;
}

function dagenTerug(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function dagenVooruit(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

export function kortNL(d: Date): string {
  return d.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" });
}

export function langNL(d: Date): string {
  return d.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
}

export function isoDag(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Verloop per oefening: laatste 8 weken, oplopend. Eindwaarde = huidige waarde in het schema.
function reeks(start: number, stappen: number[], weekAfstand = 7): { datum: string; kg: number }[] {
  let kg = start;
  return stappen.map((stap, i) => {
    kg += stap;
    return { datum: isoDag(dagenTerug((stappen.length - 1 - i) * weekAfstand)), kg };
  });
}

// Gedetailleerde spiergroepen met Nederlandse en Engelse zoektermen.
// Weergavenamen volgen gangbare gym-taal (Engels), zoeken werkt in beide talen.
export const SPIEREN: Record<string, { naam: string; zoek: string[] }> = {
  "upper-chest": { naam: "Upper chest", zoek: ["bovenborst", "borst", "chest", "upper chest", "pecs", "pectoralis"] },
  "mid-chest": { naam: "Mid chest", zoek: ["middenborst", "borst", "chest", "mid chest", "middle chest", "pecs", "pectoralis"] },
  "lower-chest": { naam: "Lower chest", zoek: ["onderborst", "borst", "chest", "lower chest", "pecs"] },
  "front-delts": { naam: "Front delts", zoek: ["voorste schouderkop", "voorkant schouder", "schouders", "front delts", "anterior deltoid", "delts", "shoulders"] },
  "side-delts": { naam: "Side delts", zoek: ["zijkant schouder", "schouders", "side delts", "lateral deltoid", "delts", "shoulders"] },
  "rear-delts": { naam: "Rear delts", zoek: ["achterste schouderkop", "achterkant schouder", "schouders", "rear delts", "posterior deltoid", "delts", "shoulders"] },
  lats: { naam: "Lats", zoek: ["lats", "latissimus", "brede rugspier", "rug", "back"] },
  "upper-back": { naam: "Upper back", zoek: ["bovenrug", "rug", "upper back", "rhomboids", "mid traps", "back"] },
  traps: { naam: "Traps", zoek: ["traps", "trapezius", "monnikskapspier", "nek"] },
  "lower-back": { naam: "Lower back", zoek: ["onderrug", "rug", "lower back", "rugstrekkers", "erectors", "spinal erectors", "back"] },
  biceps: { naam: "Biceps", zoek: ["biceps", "armen", "arms"] },
  triceps: { naam: "Triceps", zoek: ["triceps", "armen", "arms"] },
  forearms: { naam: "Forearms", zoek: ["onderarmen", "forearms", "grip", "grijpkracht"] },
  quads: { naam: "Quads", zoek: ["quadriceps", "quads", "bovenbenen", "benen", "dijen", "legs"] },
  hamstrings: { naam: "Hamstrings", zoek: ["hamstrings", "achterkant benen", "benen", "legs"] },
  glutes: { naam: "Glutes", zoek: ["glutes", "bilspieren", "billen", "gluteus"] },
  adductors: { naam: "Adductors", zoek: ["adductoren", "adductors", "binnenkant dij", "liezen"] },
  calves: { naam: "Calves", zoek: ["kuiten", "calves"] },
  abs: { naam: "Abs", zoek: ["buikspieren", "abs", "core", "sixpack", "rechte buikspier"] },
  obliques: { naam: "Obliques", zoek: ["schuine buikspieren", "obliques", "core"] },
  "rotator-cuff": { naam: "Rotator cuff", zoek: ["rotator cuff", "cuff", "schouderstabilisatoren", "infraspinatus", "externe rotatoren"] },
};

// Primaire en secundaire spieren per oefening, op basis van EMG-onderzoek en gangbare
// classificaties (o.a. Rodríguez-Ridao 2020 voor drukhoeken, Stronger by Science voor de squat).
export const OEFENING_SPIEREN: Record<string, { primair: string[]; secundair: string[] }> = {
  squat: { primair: ["quads", "glutes"], secundair: ["adductors", "lower-back", "abs"] },
  rdl: { primair: ["hamstrings", "glutes"], secundair: ["lower-back", "adductors", "forearms"] },
  splitsquat: { primair: ["quads", "glutes"], secundair: ["adductors", "hamstrings", "abs"] },
  legcurl: { primair: ["hamstrings"], secundair: ["calves"] },
  plank: { primair: ["abs"], secundair: ["obliques", "front-delts", "glutes"] },
  bench: { primair: ["mid-chest", "lower-chest"], secundair: ["upper-chest", "front-delts", "triceps"] },
  pullup: { primair: ["lats"], secundair: ["biceps", "upper-back", "rear-delts", "forearms"] },
  ohp: { primair: ["front-delts"], secundair: ["side-delts", "triceps", "traps", "upper-chest"] },
  row: { primair: ["upper-back"], secundair: ["lats", "biceps", "rear-delts", "forearms"] },
  facepull: { primair: ["rear-delts"], secundair: ["upper-back", "traps", "rotator-cuff"] },
  deadlift: { primair: ["glutes", "hamstrings", "lower-back"], secundair: ["quads", "traps", "forearms", "lats"] },
  pushpress: { primair: ["front-delts"], secundair: ["side-delts", "triceps", "quads", "traps"] },
  goblet: { primair: ["quads"], secundair: ["glutes", "adductors", "abs", "upper-back"] },
  carry: { primair: ["forearms", "traps"], secundair: ["abs", "obliques", "glutes"] },
  bike: { primair: ["quads"], secundair: ["hamstrings", "calves", "front-delts"] },
};

export type OefeningVerloop = { naam: string; eenheid: "kg" | "reps" | "sec"; punten: { datum: string; kg: number }[] };

export const KRACHT_VERLOOP: Record<string, OefeningVerloop> = {
  squat: { naam: "Back squat", eenheid: "kg", punten: reeks(60, [0, 5, 2.5, 2.5, 5, 0, 2.5, 2.5]) },
  bench: { naam: "Bench press", eenheid: "kg", punten: reeks(50, [0, 2.5, 2.5, 0, 2.5, 2.5, 0, 2.5]) },
  deadlift: { naam: "Deadlift", eenheid: "kg", punten: reeks(80, [0, 5, 5, 2.5, 2.5, 0, 2.5, 2.5]) },
  rdl: { naam: "Romanian deadlift", eenheid: "kg", punten: reeks(57.5, [0, 2.5, 2.5, 2.5, 0, 2.5, 2.5, 0]) },
  splitsquat: { naam: "Bulgarian split squat", eenheid: "kg", punten: reeks(10, [0, 2, 0, 2, 0, 2, 0, 0]) },
  legcurl: { naam: "Leg curl", eenheid: "kg", punten: reeks(25, [0, 2.5, 2.5, 0, 2.5, 0, 2.5, 0]) },
  pullup: { naam: "Pull-up", eenheid: "reps", punten: reeks(3, [0, 1, 0, 1, 0, 0, 1, 0]) },
  ohp: { naam: "Dumbbell shoulder press", eenheid: "kg", punten: reeks(10, [0, 2, 0, 0, 2, 0, 0, 0]) },
  row: { naam: "Seated row", eenheid: "kg", punten: reeks(45, [0, 2.5, 0, 2.5, 2.5, 0, 2.5, 0]) },
  facepull: { naam: "Face pull", eenheid: "kg", punten: reeks(20, [0, 0, 2.5, 0, 0, 2.5, 0, 0]) },
  pushpress: { naam: "Push press", eenheid: "kg", punten: reeks(32.5, [0, 2.5, 0, 2.5, 0, 2.5, 0, 0]) },
  goblet: { naam: "Goblet squat", eenheid: "kg", punten: reeks(16, [0, 2, 2, 0, 2, 0, 2, 0]) },
  carry: { naam: "Farmer carry", eenheid: "kg", punten: reeks(16, [0, 2, 0, 2, 2, 0, 2, 0]) },
  plank: { naam: "Plank", eenheid: "sec", punten: reeks(30, [0, 5, 0, 5, 0, 0, 5, 0]) },
};

// Wegingen: bijna dagelijks gewogen de afgelopen 8 weken, met dagschommeling rond een dalende lijn.
// Het trendgewicht (EMA) wordt hier client-side overheen gerekend, zoals in LiftLog.
export const WEGINGEN: { datum: string; kg: number }[] = (() => {
  const uit: { datum: string; kg: number }[] = [];
  const dagen = 55;
  for (let i = dagen; i >= 0; i--) {
    if (i % 7 === 2 || i % 7 === 5) continue; // niet elke dag gewogen
    const t = (dagen - i) / dagen;
    const basis = 71.8 - 2.8 * t;
    const schommel = 0.35 * Math.sin((dagen - i) * 1.7) + 0.18 * Math.sin((dagen - i) * 0.55);
    uit.push({ datum: isoDag(dagenTerug(i)), kg: Math.round((basis + schommel) * 10) / 10 });
  }
  return uit;
})();

export const PRS = [
  { oefening: "Deadlift", kg: 100, datum: kortNL(dagenTerug(5)) },
  { oefening: "Back squat", kg: 80, datum: kortNL(dagenTerug(9)) },
  { oefening: "Bench press", kg: 62.5, datum: kortNL(dagenTerug(12)) },
  { oefening: "Pull-up", kg: 6, datum: kortNL(dagenTerug(16)), eenheid: "reps" },
];

export const AFSPRAKEN = [
  { id: "a1", datum: isoDag(dagenVooruit(2)), tijd: "09:00", duurMin: 60, type: "Personal training", met: "Daan" },
  { id: "a2", datum: isoDag(dagenVooruit(9)), tijd: "09:00", duurMin: 60, type: "Personal training", met: "Daan" },
  { id: "a3", datum: isoDag(dagenVooruit(13)), tijd: "17:30", duurMin: 30, type: "Meting en evaluatie", met: "Daan" },
];

export const VRIJE_SLOTEN = [
  { datum: isoDag(dagenVooruit(1)), tijden: ["07:00", "12:30", "19:00"] },
  { datum: isoDag(dagenVooruit(3)), tijden: ["08:00", "16:00"] },
  { datum: isoDag(dagenVooruit(4)), tijden: ["07:00", "10:00", "18:00"] },
  { datum: isoDag(dagenVooruit(6)), tijden: ["09:00", "13:00"] },
];

export const VOEDING = {
  doelen: { kcal: 2100, eiwit: 140, koolhydraten: 210, vet: 70 },
  maaltijden: [
    { naam: "Ontbijt", tijd: "07:30", omschrijving: "Griekse yoghurt met granola en blauwe bessen", kcal: 420, eiwit: 28, koolhydraten: 52, vet: 12 },
    { naam: "Lunch", tijd: "12:30", omschrijving: "Volkoren wrap met kip, hummus en groenten", kcal: 550, eiwit: 38, koolhydraten: 58, vet: 16 },
    { naam: "Snack", tijd: "15:30", omschrijving: "Kwark met walnoten en honing", kcal: 300, eiwit: 24, koolhydraten: 18, vet: 14 },
    { naam: "Diner", tijd: "18:30", omschrijving: "Zalm met zoete aardappel en broccoli", kcal: 650, eiwit: 36, koolhydraten: 55, vet: 26 },
    { naam: "Avond", tijd: "21:00", omschrijving: "Eiwitshake met banaan", kcal: 180, eiwit: 22, koolhydraten: 16, vet: 3 },
  ],
  waterDoel: 8, // glazen
};

// Trainerskant: ledenbestand (fictief).
export type CoachLid = {
  slug: string;
  naam: string;
  type: "Limited" | "PT" | "PT + Limited";
  doel: string;
  laatsteTraining: string;
  trend: "op schema" | "aandacht" | "sterk bezig";
  schemaWeek: string;
};

export const CAPACITEIT = { max: 40, bezet: 26, ptKlanten: 9 };

export const COACH_LEDEN: CoachLid[] = [
  { slug: "sanne-visser", naam: "Sanne Visser", type: "PT + Limited", doel: "Sterker worden en meer energie", laatsteTraining: kortNL(dagenTerug(2)), trend: "sterk bezig", schemaWeek: "Week 6 van 8" },
  { slug: "bram-de-jong", naam: "Bram de Jong", type: "PT", doel: "Afvallen, 8 kg", laatsteTraining: kortNL(dagenTerug(1)), trend: "op schema", schemaWeek: "Week 3 van 12" },
  { slug: "lotte-maas", naam: "Lotte Maas", type: "Limited", doel: "Conditie opbouwen", laatsteTraining: kortNL(dagenTerug(4)), trend: "aandacht", schemaWeek: "Week 7 van 8" },
  { slug: "tim-verbeek", naam: "Tim Verbeek", type: "PT + Limited", doel: "Spiermassa opbouwen", laatsteTraining: kortNL(dagenTerug(1)), trend: "sterk bezig", schemaWeek: "Week 9 van 12" },
  { slug: "eva-schouten", naam: "Eva Schouten", type: "Limited", doel: "Fit blijven naast drukke baan", laatsteTraining: kortNL(dagenTerug(3)), trend: "op schema", schemaWeek: "Week 4 van 8" },
  { slug: "ruben-kok", naam: "Ruben Kok", type: "PT", doel: "Herstel na knieblessure", laatsteTraining: kortNL(dagenTerug(2)), trend: "op schema", schemaWeek: "Week 5 van 10" },
  { slug: "femke-bakker", naam: "Femke Bakker", type: "Limited", doel: "Sterker worden", laatsteTraining: kortNL(dagenTerug(6)), trend: "aandacht", schemaWeek: "Week 2 van 8" },
  { slug: "joost-vermeer", naam: "Joost Vermeer", type: "PT + Limited", doel: "Marathonvoorbereiding", laatsteTraining: kortNL(dagenTerug(1)), trend: "sterk bezig", schemaWeek: "Week 10 van 16" },
  { slug: "nina-de-wit", naam: "Nina de Wit", type: "Limited", doel: "Energie en houding", laatsteTraining: kortNL(dagenTerug(5)), trend: "op schema", schemaWeek: "Week 6 van 8" },
  { slug: "daan-peters", naam: "Daan Peters", type: "Limited", doel: "Kracht behouden, 55 plus", laatsteTraining: kortNL(dagenTerug(2)), trend: "op schema", schemaWeek: "Week 8 van 8" },
];

export const COACH_AGENDA_VANDAAG = [
  { tijd: "07:00", lid: "Bram de Jong", type: "Personal training", status: "afgerond" },
  { tijd: "09:00", lid: "Ruben Kok", type: "Herstel-sessie", status: "afgerond" },
  { tijd: "12:30", lid: "Tim Verbeek", type: "Personal training", status: "afgerond" },
  { tijd: "16:00", lid: "Gym tour: 2 kandidaten", type: "Kennismaking", status: "gepland" },
  { tijd: "17:30", lid: "Joost Vermeer", type: "Personal training", status: "gepland" },
  { tijd: "19:00", lid: "Sanne Visser", type: "Techniek-sessie", status: "gepland" },
];

// Oefeningenbibliotheek voor de schema-editor.
export const BIBLIOTHEEK = [
  { naam: "Back squat", spiergroep: "Benen" },
  { naam: "Front squat", spiergroep: "Benen" },
  { naam: "Leg press", spiergroep: "Benen" },
  { naam: "Walking lunge", spiergroep: "Benen" },
  { naam: "Romanian deadlift", spiergroep: "Hamstrings" },
  { naam: "Leg curl", spiergroep: "Hamstrings" },
  { naam: "Deadlift", spiergroep: "Rug" },
  { naam: "Pull-up", spiergroep: "Rug" },
  { naam: "Seated row", spiergroep: "Rug" },
  { naam: "Lat pulldown", spiergroep: "Rug" },
  { naam: "Bench press", spiergroep: "Borst" },
  { naam: "Incline dumbbell press", spiergroep: "Borst" },
  { naam: "Push-up", spiergroep: "Borst" },
  { naam: "Dumbbell shoulder press", spiergroep: "Schouders" },
  { naam: "Push press", spiergroep: "Schouders" },
  { naam: "Face pull", spiergroep: "Schouders" },
  { naam: "Plank", spiergroep: "Core" },
  { naam: "Farmer carry", spiergroep: "Grip en core" },
  { naam: "Bike sprints", spiergroep: "Conditie" },
  { naam: "Roeien intervallen", spiergroep: "Conditie" },
];

// Community: trainbuddies, feed, splits en de maandchallenge.
export type Buddy = {
  id: string;
  naam: string;
  focus: string;
  moment: string;
  niveau: string;
  overlap: string;
};

export const BUDDIES: Buddy[] = [
  { id: "tim", naam: "Tim Verbeek", focus: "Krachttraining", moment: "Traint 's avonds", niveau: "Gevorderd", overlap: "ma, wo en vr" },
  { id: "eva", naam: "Eva Schouten", focus: "Kracht en conditie", moment: "Traint 's ochtends", niveau: "Gemiddeld", overlap: "ma en wo" },
  { id: "nina", naam: "Nina de Wit", focus: "Kracht en houding", moment: "Traint 's avonds", niveau: "Gemiddeld", overlap: "wo en vr" },
  { id: "joost", naam: "Joost Vermeer", focus: "Conditie en hardlopen", moment: "Traint vroeg", niveau: "Gevorderd", overlap: "vr" },
];

export const INKOMEND_VERZOEK = {
  id: "lotte",
  naam: "Lotte Maas",
  focus: "Conditie opbouwen",
  moment: "Traint 's avonds",
  bericht: "Hoi Sanne, ik zag dat we vaak op dezelfde avonden trainen. Samen squatten?",
};

export const COMMUNITY_FEED = [
  { wie: "Tim Verbeek", wat: "zette een nieuw record op de deadlift: 150 kg", wanneer: "2 uur geleden", kudos: 6 },
  { wie: "Eva Schouten", wat: "rondde week 4 van haar schema af", wanneer: "Gisteren", kudos: 4 },
  { wie: "Joost Vermeer", wat: "roeide 8 km voor de challenge", wanneer: "Gisteren", kudos: 3 },
  { wie: "Nina de Wit", wat: "haalde haar eerste pull-up", wanneer: "2 dagen geleden", kudos: 9 },
];

export type Split = {
  id: string;
  naam: string;
  dagen: number;
  focus: string;
  omschrijving: string;
  populair: boolean;
  indeling: string[];
};

export const SPLITS: Split[] = [
  {
    id: "fullbody",
    naam: "Full body",
    dagen: 3,
    focus: "Kracht en algehele fitheid",
    omschrijving: "Drie trainingen per week waarin je hele lichaam aan bod komt. De beste basis naast een druk leven.",
    populair: true,
    indeling: ["Dag A: onderlichaam en core", "Dag B: bovenlichaam push en pull", "Dag C: full body en conditie"],
  },
  {
    id: "upperlower",
    naam: "Upper / lower",
    dagen: 4,
    focus: "Kracht en spieropbouw",
    omschrijving: "Vier trainingen per week, afwisselend boven- en onderlichaam. Voor wie een stap verder wil.",
    populair: false,
    indeling: ["Dag A: bovenlichaam kracht", "Dag B: onderlichaam kracht", "Dag C: bovenlichaam volume", "Dag D: onderlichaam volume"],
  },
  {
    id: "ppl",
    naam: "Push / pull / legs",
    dagen: 5,
    focus: "Spieropbouw",
    omschrijving: "Vijf trainingen per week met veel volume per spiergroep. Voor ervaren leden met tijd en ambitie.",
    populair: false,
    indeling: ["Push: borst, schouders en triceps", "Pull: rug en biceps", "Legs: benen en core", "Push volume", "Pull volume"],
  },
];

export const CHALLENGE = {
  naam: "Roei-challenge van augustus",
  omschrijving: "Met de hele community samen 250 km roeien deze maand. Elke meter op de roeier telt mee.",
  doel: 250,
  nu: 162,
  eenheid: "km",
  deelnemers: 14,
};

export function hoofdletter(tekst: string): string {
  return tekst.charAt(0).toUpperCase() + tekst.slice(1);
}

// Live in de studio: druktepatroon per uur (0-23) en wie er nu traint.
// Patroon is voorbeelddata; de "nu"-waarde beweegt mee met het echte uur.
export const DRUKTE_PATROON: number[] = [
  0, 0, 0, 0, 0, 1, 2, 5, 6, 4, 3, 3, 4, 2, 2, 3, 4, 6, 7, 6, 4, 2, 1, 0,
];

export function drukteNu(): { aantal: number; label: string } {
  const uur = new Date().getHours();
  const aantal = DRUKTE_PATROON[uur] ?? 0;
  const label = aantal <= 2 ? "rustig" : aantal <= 4 ? "rustig aan het worden" : "gezellig druk";
  return { aantal, label };
}

export const NU_IN_STUDIO = ["Tim Verbeek", "Eva Schouten"];

// Events buiten de deur waar BASE-leden samen naartoe werken.
export type CommunityEvent = {
  id: string;
  naam: string;
  type: "Hardlopen" | "Powerlifting";
  wanneer: string;
  plaats: string;
  info: string;
  deelnemers: number;
};

export const EVENTS: CommunityEvent[] = [
  {
    id: "kustmarathon",
    naam: "Kustmarathon Zeeland",
    type: "Hardlopen",
    wanneer: "Oktober 2026",
    plaats: "Zoutelande",
    info: "Door de duinen en over het strand naar de finish in Zoutelande. Een groep BASE-leden traint er samen naartoe.",
    deelnemers: 5,
  },
  {
    id: "boulevardloop",
    naam: "Boulevardloop Vlissingen",
    type: "Hardlopen",
    wanneer: "September 2026",
    plaats: "Vlissingen",
    info: "10 km door de binnenstad en over de boulevard, bij ons om de hoek. Mooi eerste doel.",
    deelnemers: 3,
  },
  {
    id: "powerliftmeet",
    naam: "Regionale powerlifting meet",
    type: "Powerlifting",
    wanneer: "November 2026",
    plaats: "Goes",
    info: "Squat, bench en deadlift op het platform, ook voor eerste keer wedstrijd. Daan gaat mee als coach.",
    deelnemers: 4,
  },
];

// Berichten tussen lid en trainer: startgesprek voor de demo.
export type ChatBericht = { van: "lid" | "coach"; tekst: string; tijd: string };

export function chatSeed(): ChatBericht[] {
  const min = (n: number) => new Date(Date.now() - n * 60_000).toISOString();
  return [
    { van: "coach", tekst: "Goedemorgen Sanne. Sterke week gehad, je deadlift staat nu op 100 kg. Deze week letten we op je ademhaling bij de zware sets.", tijd: min(2880) },
    { van: "lid", tekst: "Goedemorgen Daan. Voelde goed vrijdag. Mijn onderrug was wel wat stijf na dag C, is dat normaal?", tijd: min(2820) },
    { van: "coach", tekst: "Beetje stijfheid mag, pijn niet. Vrijdag kijken we samen naar je setup bij de eerste sets. Neem je meetlint mee, dan doen we ook de maandmeting.", tijd: min(2760) },
  ];
}

export const COACH_SNELLE_REPLIES = [
  "Sterk bezig deze week, ga zo door.",
  "Ik heb je schema iets aangepast, kijk maar even.",
  "Plan je even een extra sessie in voor techniek?",
  "Goed gedaan met je voeding, hou dit vast.",
];
