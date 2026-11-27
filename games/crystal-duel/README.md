# CRYSTAL DUEL – Phase 1

Eigenständiges 3D-Block-Arena-Projekt für ZUNOX. Alle Blocktexturen werden zur Laufzeit mit Canvas erzeugt; Three.js r128 wird als einziges externes Paket von cdnjs.cloudflare.com geladen.

## Start
GitHub Pages: `/zunox/games/crystal-duel/`. Lokal wegen ES-Modulen über einen HTTP-Server starten, nicht per `file://`.

## Steuerung (Desktop empfohlen)
- WASD: bewegen · Maus: umsehen (Pointer Lock)
- Leertaste: springen · Shift: sprinten · Strg: schleichen
- Linksklick: Block abbauen / Nahkampf-Grundaktion
- Rechtsklick: Block platzieren
- 1–9 / Mausrad: Hotbar · E: Inventarhinweis · F: Zweithand-Hinweis · Q: Drop-Hinweis
- Esc: Pause / Pointer Lock lösen

## Phase 1
Voxel-Arena, zusammengeführte InstancedMesh-Blockdarstellung, Canvas-Texturen, Kamera, Bewegung, AABB-ähnliche Voxel-Kollision, Block platzieren/abbauen, Hotbar, einfacher Schwert-Grundangriff und sichtbare Laufzeitfehler. Die fünf Bot-Stufen sind als Daten vorbereitet; Bot-KI und Duell-Runden kommen in Phase 4.

## Testliste
1. Menü öffnet; Arena betreten.
2. Maus-Lock startet und Esc pausiert.
3. WASD, Sprint, Schleichen und Sprung funktionieren.
4. Spieler kollidiert mit Arena-Rand und Säulen.
5. Linksklick baut Holz/Stein ab.
6. Rechtsklick platziert Blöcke vor dem Spieler.
7. Hotbar 1–9 und Mausrad wählen Slots.
8. E/F/Q zeigen verständliche Phase-Hinweise.
9. Tab-Wechsel pausiert; Rückkehr setzt keine Tasten fort.
10. Fehler-Overlay zeigt Laufzeitfehler statt weißem Bildschirm.

## Bekannte Schwächen
- Noch kein PvP-/Bot-Kampf, keine Kristallexplosionen, Rüstung, Inventar-GUI oder Respawn; folgen in späteren Phasen.
- Pointer Lock und Tastatursteuerung sind Desktop-orientiert; Touch-Modus folgt in Phase 7.
- InstancedMesh fasst Blöcke pro Material zusammen; einzelne Chunk-Neuaufbau-Optimierung folgt.
- Keine echte Browser-/iPad-Ausführung in dieser Build-Umgebung verifiziert.

## Git
```bash
git checkout -b feature/crystal-duel-phase-1
git add games/crystal-duel index.html
git commit -m "Add Crystal Duel phase 1 engine"
git push -u origin feature/crystal-duel-phase-1
```
