# Lumen Realm – Phase 7 + 8 QA

## Phase 7 – Quests, crafting, fast travel
- Acht Haupt- und Nebenaufträge aus einer eigenen Datendatei.
- Fortschritt für das Erkunden aller fünf Regionen, fünf Dungeon-Wächter, Materialsammlung und erstes Crafting.
- Werkbank im Wiesenland mit Rezepten für Pfeile, Bomben, Proviant, Axt und Kräuter-Eintopf.
- Schatztruhen liefern zusätzlich Holz, Stein, Fasern oder Kristalle.
- Wegstein im Dorf öffnet Schnellreise zu bereits freigeschalteten Regionen.
- Schnellreise ist in Dungeons gesperrt.

## Phase 8 – Finale und Polishing
- Aschenschmiede/Schlackendrache als finaler Bosskampf mit Abschlusssequenz.
- Finale Quest wird beim Sieg abgeschlossen; Abschlussstatus wird gespeichert.
- iPad- und Touch-UI für neue Werkbank-/Reisefunktionen erweitert.
- Gehaltene Gegenstände sind sichtbar: Schwert, Axt, Bogen, Speer, Apfel, Brot, Beeren, Bombe oder Greifhaken.
- Save-Version 8; Versionen 1–7 bleiben ladbar.

## Grössere Weltkarten
- Weltkarte von 7680×4608 auf 9600×6000 Weltpixel erweitert.
- Fünf Regionen je 1920 Weltpixel breit; Erkundungskarte von 8×8 auf 10×10 Felder erweitert.
- Wiesenland enthält zusätzliche Blumen, Pilze, Baumstümpfe, zwei Teiche mit Schilf, Steinzirkel, Lagerfeuer, Wegweiser, Werkbank und sichtbaren Pfad zum Dungeon.
- Kollisionsflächen für Teiche, Gebäude, Werkbank und Wegstein.

## Automatische Prüfungen
- Syntaxprüfung aller geänderten JavaScript-Module bestanden.
- Datenprüfung: 5 Regionen, 5 Dungeons, 8 Aufträge, alle Dungeons mit gültigen Eingängen.
- Weltgrösse, verschlossenes/geöffnetes Portal und Dungeon-Eingänge geprüft.
- Crafting: Pfeilrezept zieht Materialien ab und erhöht Pfeilvorrat.
- Materialdrops werden aus Truhen erzeugt und ins Inventar übernommen.
- Dungeon 5: Boss-Sieg setzt Abschlussstatus und hält Weltfreischaltung auf 5.
- UI-IDs und Event-Handler für Werkbank, Schnellreise, Hotbar und Abschlussfenster vorhanden.
- Save-Version 8 akzeptiert ältere Versionen 1–7.

## iPad-Testliste
1. Spiel laden und prüfen, dass die Startwelt grösser ist und die neuen Landschaftsdetails sichtbar sind.
2. Um Teiche, Häuser, Werkbank und Wegstein laufen; Kollision testen.
3. Am Wegstein die Schnellreise öffnen und nur freigeschaltete Regionen ansteuern.
4. An der Werkbank Pfeile, Bomben, Proviant, Axt und Eintopf herstellen.
5. Hotbar 1–9 wählen und prüfen, ob Waffen und Essen sichtbar in der Hand liegen.
6. In jeder Region Schatztruhen öffnen und Materialien sammeln.
7. Alle fünf Dungeons abschliessen; nach Dungeon 4 Glutklamm betreten.
8. Schlackendrachen besiegen und Abschlusssequenz sehen.
9. Speichern, neu laden und Regionen, Inventar, Aufträge, Weltfreischaltung sowie Abschlussstatus kontrollieren.
10. iPad-Hoch-/Querformat, Touch-Steuerung, Pause, Menüs und Zurück-Link testen.

## Bekannte Grenzen
- Kein echter Browser-/iPad-Runtime-Test in dieser Umgebung; Syntax- und Logiktests ersetzen keinen Spieltest.
- Die fünf Dungeons teilen weiterhin den Drei-Raum-Grundaufbau; individuelle Rätselmechaniken sind noch begrenzt.
- Wetter ist überwiegend visuell; es beeinflusst noch nicht systematisch Gegner oder Bewegung.
- Die Darstellung bleibt ein 2D-Pixel-Art-Spiel und keine 3D-Voxelwelt.
