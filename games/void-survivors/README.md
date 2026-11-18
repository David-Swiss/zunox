# VOID SURVIVORS

Ein eigenständiges Neon-Sci-Fi-Survivor-Spiel für ZUNOX und GitHub Pages. Keine externen Bibliotheken, Assets oder Audio-Dateien: Rendering erfolgt mit Canvas 2D, Sound wird über die Web Audio API synthetisiert.

## Starten

Die Datei `index.html` über einen lokalen HTTP-Server oder GitHub Pages öffnen. ES-Module funktionieren nicht zuverlässig über `file://`.

## Steuerung

- **Desktop:** WASD oder Pfeiltasten bewegen das Schiff.
- **Pause:** Esc oder P.
- **Mobil:** Mit einem Finger auf dem Spielfeld einen virtuellen Joystick aufsetzen und ziehen.
- Das Schiff feuert automatisch auf das nächste Ziel.

## Run

Ein Run ist auf zehn Minuten ausgelegt. Die Gegnerdichte und Gegnertypen skalieren mit der Zeit. Bei Level-ups wird das Spiel pausiert und es stehen drei zufällige Upgrades zur Auswahl. Nach dem Endboss geht der Run in einen Endlos-Modus über.

## Systeme

- Prozedural erzeugte Gegnerwellen, sieben Gegnertypen und Bosskämpfe.
- Sechs Waffen mit fünf Stufen und Evolutionsstufe.
- Passive Verbesserungen, XP-Kristalle, Heilung und Spezialdrops.
- Void-Kerne, permanente Shop-Upgrades, Schiffe und Missionen.
- Touch-Steuerung, Partikel-Pooling, synthetische Audioeffekte und lokaler Spielstand.

## Speichern

Spielstände liegen lokal im Browser unter einem versionierten localStorage-Schlüssel. Private Browserfenster oder das Löschen der Website-Daten können den Fortschritt entfernen.

## Credits

Konzept, Code, Grafik und Sound: ZUNOX / OpenAI-Unterstützung. Alle visuellen und akustischen Effekte werden zur Laufzeit erzeugt.
