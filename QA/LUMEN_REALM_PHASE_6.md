# Lumen Realm – Phase 6 QA

## Umfang
- Eisgrat und Glutklamm als vierte und fünfte Region mit eigener Farbpalette und Wetterprofil.
- Frostbund-Sanktuarium und Aschenschmiede als Dungeon 4 und 5 mit eigenen Wächtern, Lebenspunkten, Namen und Belohnungen.
- Dungeon 4 schaltet Welt 5 frei; Dungeon 5 ist der finale optionale Abschluss der aktuellen Weltkarte.
- Dynamischer Tag-/Nachtzyklus sowie regionales Wetter: Regen, Nebel, Sandwind, Schnee, Ascheregen und Sturm.
- Wetter-/Tageszeit-Fortschritt wird in Save-Version 7 gespeichert; ältere Spielstände 1–6 bleiben ladbar.

## Automatische Prüfungen
- JavaScript-Syntax der geänderten Module prüfen.
- Datenprüfung: genau fünf Regionen und fünf Dungeons; eindeutige IDs; gültige WorldIndex-Werte; Boss-HP positiv.
- Speicherprüfung: Atmosphäre serialisiert Uhrzeit/Wetter und stellt alte Saves mit Standardwerten wieder her.

## iPad-Testliste
1. Vom Startgebiet durch die Portale bis Eisgrat und Glutklamm reisen.
2. Frostbund-Sanktuarium betreten, Schlüssel/Runen/Tor/Boss/Belohnung testen.
3. Prüfen, dass der Sieg über den Gletscherwächter Glutklamm freischaltet.
4. Aschenschmiede betreten und den Schlackendrachen besiegen.
5. Mindestens einige Minuten in mehreren Regionen spielen und Tag/Nacht sowie Wetterwechsel beobachten.
6. Speichern, neu laden und Uhrzeit/Wetter sowie Dungeon-Fortschritt prüfen.
7. Hotbar 1–9, Touch-Steuerung, Pause, Karte und Zurück-Link erneut testen.

## Bekannte Grenzen
- Die beiden neuen Dungeons nutzen noch den gemeinsamen Drei-Raum-Grundriss und das Schlüssel-/Runenrätsel; individuelle Puzzle-Mechaniken und Raumgeometrie folgen in einer späteren Ausbaustufe.
- Wetter ist visuell dargestellt und beeinflusst aktuell noch nicht Laufgeschwindigkeit, Sichtweite oder Gegnerverhalten.
- Der Tag-/Nachtzyklus verändert Beleuchtung, aber noch keine NPC-Tagesroutinen.
- Kein echter Browser-/iPad-Runtime-Test in dieser Umgebung.
