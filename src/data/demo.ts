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

// Krachtverloop per hoofdoefening: laatste 8 weken, oplopend.
function reeks(start: number, stappen: number[], weekAfstand = 7): { datum: string; kg: number }[] {
  let kg = start;
  return stappen.map((stap, i) => {
    kg += stap;
    return { datum: isoDag(dagenTerug((stappen.length - 1 - i) * weekAfstand)), kg };
  });
}

export const KRACHT_VERLOOP: Record<string, { naam: string; punten: { datum: string; kg: number }[] }> = {
  squat: { naam: "Back squat", punten: reeks(60, [0, 5, 2.5, 2.5, 5, 0, 2.5, 2.5]) },
  bench: { naam: "Bench press", punten: reeks(50, [0, 2.5, 2.5, 0, 2.5, 2.5, 0, 2.5]) },
  deadlift: { naam: "Deadlift", punten: reeks(80, [0, 5, 5, 2.5, 2.5, 0, 2.5, 2.5]) },
};

export const GEWICHT_VERLOOP: { datum: string; kg: number }[] = [
  { datum: isoDag(dagenTerug(49)), kg: 71.6 },
  { datum: isoDag(dagenTerug(42)), kg: 71.1 },
  { datum: isoDag(dagenTerug(35)), kg: 70.8 },
  { datum: isoDag(dagenTerug(28)), kg: 70.2 },
  { datum: isoDag(dagenTerug(21)), kg: 69.9 },
  { datum: isoDag(dagenTerug(14)), kg: 69.5 },
  { datum: isoDag(dagenTerug(7)), kg: 69.3 },
  { datum: isoDag(dagenTerug(0)), kg: 69.0 },
];

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
