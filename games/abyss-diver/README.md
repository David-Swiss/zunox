# ABYSS DIVER – Complete Edition (Phasen 1–5)

2D-Tiefsee-Roguelite für ZUNOX. Eigenständige Canvas-2D-Engine, ES-Module und prozedural erzeugte Web-Audio-Atmosphäre. Keine externen Bibliotheken, Bilddateien oder Sounddateien.

## Projektstruktur
```
games/abyss-diver/
├── index.html
├── style.css
├── thumbnail.svg
├── README.md
├── data/
│   ├── zones.js
│   ├── upgrades.js
│   ├── creatures.js
│   ├── deep-creatures.js
│   ├── bosses.js
│   └── extras.js
└── js/
    ├── main.js
    ├── engine.js
    ├── world.js
    ├── sub.js
    ├── creatures.js
    ├── exploration.js
    ├── meta.js
    ├── items.js
    ├── upgrades.js
    ├── base.js
    ├── ui.js
    ├── audio.js
    ├── save.js
    ├── debug.js
    └── utils.js
```

## Inhalte
- Fünf Zonen: Sonnenriff, Dämmerwald, Schwarze Schlucht, Thermalfelder und Abgrundgraben.
- Seeded prozedurale Welt mit sicherem zentralem Rückweg, Erzadern, Perlen, Wrackteilen, 9 Wracks und 6 Reliktfeldern pro Expedition.
- 28 Kreaturenarten aus den fünf Biomen.
- Fünf Bossbegegnungen: Korallenwächter, Thermalkoloss, Schlungschlange, Leerenherz und Leviathan.
- Sonar-Puls mit Radar-Markierungen, Reliktfund und Wrack-Interaktion per E.
- Foto-Modus per P (P erneut drücken speichert einen PNG-Screenshot); FOTO-Taste auf Touch-Geräten speichert direkt.
- 30 dauerhafte Aufträge, täglich wechselnde Expedition, Kreaturen-Kodex und neun Erfolge.
- Hangar mit drei U-Booten und vier Lackierungen. Bootsauswahl beeinflusst Geschwindigkeit, Sauerstoff und Panzerung.
- Sechs Upgrade-Pfade mit je fünf Stufen.
- Finale wird nach dem Sieg über den Leviathan freigeschaltet.
- Tiefeabhängige synthetische Unterwasser-Ambience, Sonar-Pings und Boss-Stinger.
- Spielstände Version 2: Migration von Phase 1/2, Prüfsumme, Backup und LocalStorage-Fallback.

## Steuerung
Desktop: WASD/Pfeile bewegen, Shift Turbo, F Licht, Leertaste Harpune, V Bohrer, Q Sonar, E Wrack öffnen / an der Oberfläche zurückkehren, P Foto-Modus, R Notfreisetzung, Esc Pause. Maus zielt und Linksklick feuert.
iPad/Handy: linker Stick, rechte Aktionstasten für Harpune, Bohrer, Sonar, Foto, Turbo, Licht und Interaktion.

## iPad-Testliste
- [ ] Spielstand aus Phase 1/2 wird übernommen; Credits und Upgrades bleiben erhalten.
- [ ] Alle fünf Zonen durchfahren; unterschiedliche Farbstimmung und Kreaturen prüfen.
- [ ] Alle fünf Boss-Spawns, Warnsignale, Lebensbalken und Belohnungen prüfen.
- [ ] Wrack mit E öffnen; Beute wird dem Cargo hinzugefügt.
- [ ] Relikt finden; Fund wird gespeichert und im Kodex registriert.
- [ ] Sonar auslösen; Akkuverbrauch und Markierungen prüfen.
- [ ] Foto-Modus P/P und Touch-FOTO testen; PNG wird gespeichert.
- [ ] Tagesmission-Fortschritt, Abschluss und täglicher Reset prüfen.
- [ ] Hangar: Nautilus und Specter kaufen, auswählen und nach Neuladen behalten.
- [ ] Lackierungen kaufen und im Tauchgang sehen.
- [ ] Kodex, 30 Aufträge und Erfolge öffnen und scrollen.
- [ ] Leviathan besiegen; Finale erscheint und bleibt freigeschaltet.
- [ ] Hochformat, Querformat, Safe-Area, Touch-Ziele und Safari-Audio prüfen.
- [ ] Pause, Tab-Wechsel, Fokusverlust, Notaufstieg, Tod und Speichern prüfen.

## Bekannte Grenzen
- Echter iPad-/Safari-Lauf und Live-Pages-Deployment müssen nach dem Merge auf dem Zielgerät geprüft werden.
- Die Kreaturen nutzen prozedurale Bewegungsprofile statt komplexer Navigation; Boss-Angriffe sind telegraphiert, aber noch nicht vollständig unterschiedlich animiert.
- Foto-Modus exportiert den Canvas als PNG; es gibt noch keine freie Kamera- oder Tiefenschärfe-Steuerung.
- Die Hintergrundmusik ist prozedural synthetisiert, kein komponierter Mehrspur-Soundtrack.
- Wrack- und Reliktpositionen sind pro Expedition seeded; Storytexte und Cutscenes sind bewusst kompakt gehalten.

## Git – Branch-Kette
```bash
git fetch origin
git checkout feature/abyss-diver-phase-2
git pull origin feature/abyss-diver-phase-2
git checkout -b feature/abyss-diver-phase-3-5
git add games/abyss-diver
git commit -m "Complete Abyss Diver phases 3 to 5"
git push -u origin feature/abyss-diver-phase-3-5
```

Pull Requests müssen in Reihenfolge gemergt werden: Phase 1 → Phase 2 → Phase 3–5.
