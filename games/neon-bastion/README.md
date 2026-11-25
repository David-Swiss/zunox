# NEON BASTION

Ein eigenständiges Neon-Sci-Fi-Tower-Defense-Roguelite für ZUNOX. Keine externen Bibliotheken, Bilddateien oder Sounddateien. Rendering läuft über Canvas 2D; Audio wird später über die Web Audio API ergänzt.

## Starten

Auf GitHub Pages: `/zunox/games/neon-bastion/`

Für lokale Entwicklung einen HTTP-Server verwenden. ES-Module funktionieren nicht zuverlässig über `file://`.

## Phase 1 – Fundament

- Responsives Canvas-Spielfeld mit eigenem Neon-Art-Style
- Datengetriebene Kartenbeschreibung
- Rasterkarte mit Spawn, Pfad und Kern
- BFS-Pfadprüfung: Ein Turm darf den Weg zum Kern nicht vollständig blockieren
- Feld-Auswahl und erste Pulse-Turm-Platzierung
- Rückgängig innerhalb von drei Sekunden
- 1×/2×/3×-Geschwindigkeit, Pause und Canvas-Pinch-Zoom
- Desktop-Maus und Touch-Eingabe

## Steuerung

- Tippen/Klicken: Feld auswählen
- Pulse-Turm platzieren: 60 Energie
- Rückgängig: letzte Platzierung innerhalb von drei Sekunden
- Pause: Schaltfläche oben rechts
- Zoom: Zwei Finger direkt auf dem Spielfeld zusammen-/auseinanderziehen

## Geplante Phasen

1. Fundament, Spielfeld, Kamera und Pfadvalidierung
2. Wellen, Gegner, Projektile und Kernschaden
3. Alle 12 Türme mit Ausbaupfaden, Zielmodi und Fusionen
4. Kartenwahl, Relikte, Held und Run-Mutatoren
5. Sechs Karten, Bosse und Endlosmodus
6. Meta-Progression, Skilltree, Erfolge, Audio und QA-Polish

## Bekannte Grenzen in Phase 1

Wellen, Gegner-KI, Turm-Angriffe, Roguelite-Karten und Meta-Progression sind noch nicht implementiert. Diese Phase liefert zuerst eine testbare Bau- und Kartenbasis.
