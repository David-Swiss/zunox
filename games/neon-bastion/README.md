# NEON BASTION

Ein eigenständiges Neon-Sci-Fi-Tower-Defense-Roguelite für ZUNOX. Keine externen Bibliotheken, Bilddateien oder Sounddateien. Rendering läuft über Canvas 2D; Audio wird später über die Web Audio API ergänzt.

## Starten
Auf GitHub Pages: `/zunox/games/neon-bastion/`

## Steuerung
- Tippen/Klicken: Feld auswählen
- Pulse-Turm: 60 Energie, schnell und günstig
- Prisma-Turm: 95 Energie, grosse Reichweite und direkter Energiestrahl
- Nova-Turm: 125 Energie, langsamer und starker Einzelschuss
- Turm anklicken und Upgrade drücken: Schaden und Feuerrate verbessern
- Rückgängig: letzte Platzierung innerhalb von drei Sekunden
- Pause: Schaltfläche oben rechts
- Zoom: Zwei Finger direkt auf dem Spielfeld zusammen-/auseinanderziehen
- Geschwindigkeit: 1×, 2× oder 3×

## Entwicklungsphasen
- [x] Phase 1 – Fundament, Spielfeld, Kamera, Pfadvalidierung
- [x] Phase 2 – Gegnerwellen, Gegnerbewegung, Kernschaden, Projektile, Bossgegner, 30 Wellen und Sieg/Niederlage
- [x] Phase 3 – Drei Turmklassen, unterschiedliche Reichweiten/Schussraten/Schäden, Upgrades und Energieökonomie
- [ ] Phase 4 – Kartenwahl, Relikte, Held und Run-Mutatoren
- [ ] Phase 5 – Sechs Karten, individuelle Bossmuster und Endlosmodus
- [ ] Phase 6 – Meta-Progression, Skilltree, Erfolge, Audio und vollständige QA

## Technische Hinweise
- Feste 60-Hz-Simulationsschritte; Rendering und Resize bleiben geräteunabhängig
- Turmplatzierung validiert weiterhin den Pfad zum Kern
- Browser-Spielstände/Meta-Progression kommen in Phase 6


## Phase 4 – Einsatzplanung und Relikt-Builds
- Drei Schlachtfelder mit eigenen Pfadverläufen, Schwierigkeitswerten und Relaisfeldern.
- Drei Kommandanten-Doktrinen: zusätzlicher Kernschutz, günstiger Bau oder höhere Reichweite/Schadensleistung.
- Vier Run-Mutatoren mit klaren Risiko-/Belohnungsprofilen.
- Nach jeder überstandenen Welle (ausser dem finalen Sieg) erscheint ein Draft aus drei einzigartigen Relikten.
- Relikte verändern Reichweite, Feuerrate, Schaden, Energieökonomie, Kernintegrität oder Relais-Türme.
- Relaisfelder markieren besondere Bauplätze; dort platzierte Türme erhalten 20% mehr Reichweite.
- Die Simulation stoppt sofort beim Relikt-Draft, auch wenn die Pause während eines Frames ausgelöst wird.
