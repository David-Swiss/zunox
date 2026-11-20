# ZUNOX – Popup- und Spiel-QA

**Stand:** 20.11.2026  
**Branch:** `lumen-realm-phase-3`

## Umfang

Statische Prüfung aller 13 Spiel-Einstiegspunkte im Portal. Geprüft wurden HTML-IDs, erkennbare Button-Verknüpfungen, Overlay-/Dialog-Strukturen und JavaScript-Syntax der Inline-Skripte. Das ist kein Ersatz für echte Browser- und iPad-Tests.

| Spiel | Geprüfte Menüs/Popups |
|---|---|
| Chain Blast | Start, Pause, Shop, Design, Erfolge, Ergebnis/Neustart |
| Drift Arena | Start, Garage, Spielende/Reset |
| Chicken Valley | Intro/Start, Shop, Inventar, Stall- und Aktionsfenster |
| Ballstorm | Start, Pause, Upgrade-Auswahl, Shop, Ergebnis |
| Lumen Realm | Start, Pause, Game Over, NPC-Dialog, Händler, Inventar, Aufträge, Karte |
| ZUNOX Chess | Spielansicht, Puzzle, Analyse, Profil, Einstellungen, Bauernumwandlung |
| Neon Swing | Menü, Pause, Shop, Erfolge, Game Over |
| Panic Pizza | Menü, Pause, Garage, Trophäen, Ergebnis, Crash/Recovery |
| Void Survivors | Start, Pause, Level-Up, Shop, Schiffe, Missionen, Ergebnis |
| Wobble Brawl | Menü, Pause, Runde, Kleiderschrank, Erfolge, Match-Ende, Replay |
| Gravity Flip | Menü, Pause, Game Over/Neustart |
| Neon Orbit | Menü, Pause, Game Over/Neustart |
| Rival Strike | Start, Einstellungen |

## In dieser Runde behoben

- **Wobble Brawl:** Replay hatte keinen sichtbaren Weg zurück. Beim Start einer Wiederholung erscheint jetzt eine Schaltfläche „WIEDERHOLUNG VERLASSEN“; zusätzlich führt Escape zurück zum Menü.
- **Wobble Brawl:** Der Neustart aus dem Pausefenster startet jetzt einen vollständig frischen Match-Run über dieselbe Reset-Funktion wie „Noch ein Match“. Dadurch bleiben keine alten Match-Münzen oder Replay-Daten versehentlich erhalten.
- **Lumen Realm:** Dialog-, Inventar-, Auftrags- und Kartenfenster haben explizite Schliessen-/Weiter-Aktionen. Escape schliesst geöffnete Fenster; die Pause bleibt davon getrennt.

## Statische Prüfergebnisse

- Inline-JavaScript der klassischen HTML-Spielseiten liess sich syntaktisch parsen.
- Farm und Rival Strike verwenden ES-Module mit externem Three.js-Import; der Inline-Code wurde nach Entfernen der Importzeile syntaktisch geprüft.
- Die Chess-Oberfläche bindet ihre Bedienelemente über ES-Module; deren Laufzeitverhalten muss im Browser getestet werden.
- Für Lumen Realm wurden die geänderten Haupt- und UI-Module syntaktisch geprüft.

## Noch erforderliche manuelle Tests

- Auf iPad und Desktop jedes oben aufgeführte Fenster öffnen, schliessen und erneut öffnen.
- Alle Buttons in jedem Fenster antippen, besonders Zurück, Neustart, Weiter, Kaufen, Abbrechen und Menü.
- Prüfen, dass beim Schliessen eines Popups die Spielsimulation korrekt pausiert bzw. weiterläuft.
- Hoch-/Querformat, Safe-Area-Ränder, kleine Displays und schnelle Mehrfach-Taps testen.
- Spielstände nach Neustart/Reload prüfen.

**Wichtig:** Ohne echten Browser-/iPad-Lauf wird kein Spiel als vollständig fehlerfrei oder vollständig getestet bezeichnet.