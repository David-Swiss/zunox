# ZUNOX – Game Overhaul & QA

Stand: 20. November 2026

## Umfang
Die Spieleübersicht enthält 12 Spiele. Alle 12 Einträge wurden sprachlich überarbeitet und erhalten einen eigenen, neu gestalteten 16:9-SVG-Cover. Auch die Seitentitel der einzelnen Spiele wurden an die neuen Namen angepasst.

| Bisher | Neuer Name |
|---|---|
| ZUNOX Chess | ZUNOX Chess Arena |
| Wobble Brawl | Wobble Rumble |
| Panic Pizza | Pizza Panic Rush |
| Lumen Realm | Lumen Realm |
| Neon Swing | Neon Grapple |
| Chain Blast | Chain Reaction |
| Void Survivors | Voidfall Survivors |
| Neon Orbit | Neon Orbit: Hyperdrive |
| Drift Arena | Driftline Arena |
| Rival Strike | Rival Strike: Zero Hour |
| Chicken Valley | Chicken Valley Tycoon |
| Ballstorm | Ballstorm: Breakout |

## Visuelle Upgrades
- 12 individuelle SVG-Cover im Seitenverhältnis 16:9.
- Eigene Motive, Farbwelten und Typografie statt generischer Emoji-Kacheln.
- Beschreibungen der 12 Karten auf die jeweiligen Spielschwerpunkte aktualisiert.
- Seitentitel in den einzelnen Spielordnern angepasst.

## ZUNOX Chess Arena – Online 1v1
- Peer-to-peer Datenverbindung über PeerJS; PeerJS Cloud dient als Signalisierungsdienst.
- Gastgeber erstellt einen Raum und teilt die erzeugte Peer-ID als Raumcode.
- Zweiter Spieler tritt mit dem Code bei.
- Gastgeber spielt Weiß, Gast spielt Schwarz; Online-Partien laufen ohne synchronisierte Uhr.
- Jeder empfangene Zug wird vor Ausführung erneut gegen die legalen Züge von chess.js geprüft.
- Promotion wird mit übertragen; Remisangebot/-annahme und Aufgabe werden übertragen.
- Rückgängig ist im Online-Modus gesperrt, damit die Partiepositionen nicht auseinanderlaufen.
- Bot-Modus und Online-Modus werden getrennt; verspätete Bot-Antworten aus einer vorherigen Partie werden über eine Spielgeneration verworfen.
- Online-Partien verändern nicht das lokale Bot-Elo-Profil.

### Online-Voraussetzungen und Grenzen
- Beide Spieler brauchen Internet und müssen die Website geöffnet haben.
- Die Verbindung benötigt den externen PeerJS-CDN-Import und den öffentlichen PeerJS-Signalisierungsdienst.
- Das ist kein eigener, dauerhaft betriebener ZUNOX-Spielserver. Verfügbarkeit und Verbindungsaufbau hängen vom Drittanbieter ab.
- Online-Multiplayer wurde hier nicht mit zwei echten Browsern/Endgeräten durchgespielt. Deshalb wird keine Fehlerfreiheit oder garantierte Verfügbarkeit behauptet.

## Automatische Prüfungen
- 12 Spieleinträge erkannt.
- Alle 12 Spielziele und alle 12 Thumbnail-Dateien vorhanden.
- Startseiten-JavaScript syntaktisch geprüft.
- Chess-Hauptmodul nach Entfernen der statischen Importzeilen syntaktisch geprüft.
- Peer-Transport-Modul syntaktisch geprüft.
- Inline-JavaScript aller 12 Spielseiten syntaktisch geprüft.
- Multiplayer-Steuerelemente und die erwarteten DOM-IDs vorhanden.

## Noch offene manuelle Tests
- Jedes Spiel auf Desktop und iPad starten, pausieren, fortsetzen und neu starten.
- Alle Pop-ups/Dialogs einzeln öffnen und schliessen.
- Touch-Steuerung, Hoch-/Querformat, Audio und Hintergrund-Tab testen.
- Online-Schach mit zwei unabhängigen Geräten testen: Raum erstellen, Code kopieren, beitreten, Züge, Umwandlung, Remis, Aufgabe, Verbindungsabbruch.
- Screenshots der echten Browseransicht prüfen.

## Wichtige Einschränkung
Die visuellen/namensbezogenen Änderungen gelten für alle 12 Spiele. Die statische Syntaxprüfung ist kein Ersatz für echte Laufzeit- und Spieltests. Dieses Update behauptet nicht, dass sämtliche Gameplay-Bugs in allen 12 Spielen bereits ausgeschlossen sind.
