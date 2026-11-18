# ZUNOX CHESS

Eigenständiges Browser-Schachspiel für GitHub Pages. Alle Pfade sind relativ; Projektziel: `/zunox/games/chess/`.

## Phase 1 einrichten

### Bibliotheken lokal ablegen

1. Lade **chess.js 1.4.0** aus dem npm-Paket herunter: https://www.npmjs.com/package/chess.js
   - Datei: `package/dist/esm/chess.js`
   - Ziel: `games/chess/vendor/chess.js`
   - Das ist die ES-Modul-Version, die die Regel- und FEN/PGN-Logik bereitstellt.
2. Lade **Stockfish 17.1.0**, Single-Thread-Lite-Build, aus dem npm-Paket herunter: https://www.npmjs.com/package/stockfish
   - Quelle im Paket: `package/bin/stockfish-17.1-lite-single-03e3232.js`
   - Zielname: `games/chess/vendor/stockfish.js`
   - Dazu die passende Datei `package/bin/stockfish-17.1-lite-single-03e3232.wasm`
   - Zielname: `games/chess/vendor/stockfish.wasm`
   - Beide Dateien müssen im selben Ordner liegen. Kein Multi-Thread-Build verwenden: GitHub Pages setzt hier keine COOP/COEP-Header.
3. Lege beide Bibliotheken selbst in `vendor/`. Sie werden nicht von einem fremden Server geladen.

> Wichtig: Ohne `vendor/chess.js` kann die Schach-Partie nicht starten, weil die vollständigen Schachregeln daraus kommen. Fehlt nur Stockfish, soll der integrierte vereinfachte Bot-Fallback übernehmen.

## Verzeichnis

- `index.html`, `style.css`, `thumbnail.svg`: Oberfläche und Vorschaubild
- `js/main.js`: Einstieg und Screens
- `js/board.js`, `js/pieces.js`: Brett und SVG-Figuren
- `js/game.js`: Partie, Zeitkontrollen und Regelabfragen
- `js/bots.js`, `js/engine.js`, `js/fallback-worker.js`: Bots und Engine-Anbindung
- `js/analysis.js`, `js/openings.js`, `js/puzzles.js`: Grundlagen für weitere Phasen
- `js/net.js`, `js/profile.js`, `js/sound.js`, `js/ui.js`, `js/storage.js`: Erweiterungsmodule
- `puzzles/starter.json`: kleines Startpaket; das vollständige Puzzlepaket folgt in Phase 3.

## Lokal testen

Starte einen statischen Server im Repository-Root, z. B. `python -m http.server 8000`, und öffne `http://localhost:8000/games/chess/`. ES-Module funktionieren nicht zuverlässig über `file://`.

## Ehrliche Grenzen von Phase 1

Die Oberfläche, Bot-Auswahl, Partie-Steuerung und Basis-Engine-Anbindung sind der Startumfang. Vollständige Analyse, 40+ geprüfte Puzzles, Multiplayer, Profilarchiv, PWA, Pfeile/Premove-Interaktion und präzises Rating-Balancing werden in den späteren Phasen ergänzt. Multiplayer über Peer-to-Peer ist später kein Schutz vor Schummeln und bietet keine globale Lobby oder Konten.

## Hochladen

```bash
git add games/chess
git commit -m "Add ZUNOX Chess phase 1"
git push
```
