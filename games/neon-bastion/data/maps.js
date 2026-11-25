export const MAPS = [
  {
    id: "entry",
    name: "Einstieg",
    difficulty: 1,
    theme: { background: "#071321", grid: "#17304a", path: "#1b4660", glow: "#59f4ff", accent: "#a879ff" },
    description: "Ein klarer Korridor führt direkt zum Kern. Ideal, um die Verteidigung aufzubauen.",
    width: 17,
    height: 11,
    spawn: { x: 0, y: 5 },
    core: { x: 16, y: 5 },
    path: [
      { x: 0, y: 5 }, { x: 4, y: 5 }, { x: 4, y: 2 },
      { x: 11, y: 2 }, { x: 11, y: 8 }, { x: 16, y: 8 },
      { x: 16, y: 5 }
    ],
    special: "Keine Sonderfelder"
  }
];
export const DEFAULT_MAP_ID = "entry";