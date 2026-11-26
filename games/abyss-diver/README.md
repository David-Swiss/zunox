# ABYSS DIVER – Phase 2

2D-Tiefsee-Roguelite für ZUNOX. Keine Bibliotheken, externen Bild- oder Sounddateien. Canvas 2D + Web Audio API.

## Struktur
```
games/abyss-diver/
├── index.html
├── style.css
├── thumbnail.svg
├── README.md
├── data/
│   ├── zones.js
│   └── upgrades.js
└── js/
    ├── main.js
    ├── engine.js
    ├── world.js
    ├── sub.js
    ├── creatures.js
    ├── items.js
    ├── upgrades.js
    ├── base.js
    ├── ui.js
    ├── audio.js
    ├── save.js
    ├── debug.js
    └── utils.js
```

## Phase 1 + 2
- 60-Hz-Simulation mit begrenztem Frame-Delta und Canvas-Resize.
- Seeded Weltgeneration, freier zentraler Korridor als garantierter Rückweg.
- U-Boot-Trägheit, Wasserwiderstand, Auftrieb und Turbo.
- Sauerstoff, Akku, Licht, Druckbelastung und Rumpf.
- Erz-, Perlen- und Wrackteil-Funde;\n- 20 Kreaturenarten mit friedlichen und aggressiven Verhaltensmustern, Lichtschwächen und Harpunenabwehr;\n- Harpune per Maus/Leertaste, Bohrer per V oder Touch; abbaubare Erzadern;\n- Erster Boss: Korallenwächter mit drei Angriffsphasen und sichtbaren Telegraphen;\n- Motor-, Bohrer- und Harpunen-Upgrades zusätzlich zu den drei Basis-Upgrades; Station, Verkauf, drei Upgrades mit je fünf Stufen.
- LocalStorage-Version, Prüfsumme, Backup, Migration und Fehlerbehandlung.
- Pause bei Escape/Tab-Wechsel, Fokusverlust löst Tasten; Touch-Stick und Aktionstasten.
- Sichtbare Laufzeitfehler; Debug unter ?debug=1; Audio erst nach Interaktion.

## Steuerung
Desktop: WASD/Pfeile, Shift Turbo, F Licht, Leertaste Harpune, V Bohrer, E an der Oberfläche zurückkehren, R Notfreisetzung, Esc Pause. Maus zielt und Linksklick feuert.
iPad/Handy: linker virtueller Stick, rechte Tasten für Licht/Interaktion/Turbo.

## iPad-Testliste
- [ ] Startmenü, Tauchgang starten und Rückkehr zur Station.
- [ ] Stick in alle Richtungen, Turbo, Licht und Interaktion testen.
- [ ] Trägheit und Wasserwiderstand beobachten.
- [ ] Weltkorridor bleibt frei; Rückweg blockiert nicht.
- [ ] Sauerstoff, Akku und Druckschaden beobachten.
- [ ] Sauerstoff leer / Rumpf zerstört: Beute verloren, Upgrades bleiben.
- [ ] Funde einsammeln, verkaufen und Upgrade bis Stufe 5 kaufen.
- [ ] Speichern, neu laden und Backup-Fallback testen.
- [ ] Escape, Tab-Wechsel und Fokusverlust testen.
- [ ] Hochformat, Safe-Area, große Touch-Ziele und keine Doppeltrigger.

## Bekannte Schwächen
Zonen 3–5, weitere Bosse, Wracks, Relikte, Sonar, Foto-Modus, Aufträge, Hangar und Endgame folgen in den nächsten Phasen. Zonen sind datengetrieben, Kreaturen-/Relikt-/Questinhalte folgen in späteren Phasen. Boot-/Stationsgrafik sind Phase-1-Canvas-Prototypen. Echter iPad-Browserlauf war hier nicht möglich.

## Git-Befehle
```bash
git checkout main && git pull origin main
git checkout -b feature/abyss-diver-phase-1
git add games/abyss-diver
git commit -m "Add Abyss Diver phase 1"
git push -u origin feature/abyss-diver-phase-1
```