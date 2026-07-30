// Lokale opslag voor de demo: alles in een JSON-blob in localStorage.
// In de echte app wordt dit een database met accounts per lid en trainer.

const KEY = "base-app-demo-v1";

export type AppState = Record<string, unknown> & {
  setsDone?: Record<string, boolean[]>;
  gewichten?: Record<string, number>;
  maaltijdenDone?: Record<string, boolean[]>;
  water?: Record<string, number>;
  wegingen?: Record<string, number>;
  trainingenAfgerond?: Record<string, string>;
  extraAfspraken?: { datum: string; tijd: string; type: string; status?: string }[];
  coachNotities?: Record<string, string>;
  schemaOverrides?: Record<string, { sets?: number; reps?: string; gewicht?: number }>;
  schemaToevoegingen?: Record<string, string[]>;
};

export function loadState(): AppState {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as AppState;
  } catch {
    return {};
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function patchState(mutate: (state: AppState) => void): AppState {
  const state = loadState();
  mutate(state);
  saveState(state);
  return state;
}

export function resetState(): void {
  localStorage.removeItem(KEY);
}

export function dateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
