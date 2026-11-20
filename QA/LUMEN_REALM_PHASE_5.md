# Lumen Realm – Phase 5 QA

## Umfang
- Düsterwald (Region 2) und Sonnenöde (Region 3) erhalten eigene Bodenpaletten.
- Neue Eingänge: Dornenkatakomben bei (2240, 520), Versunkene Sternwarte bei (3770, 520).
- Beide Gewölbe besitzen drei Räume, Schlüssel, zwei Runen, ein Tor, einen Wächter und eine Belohnung.
- Fortschritt pro Gewölbe wird separat gespeichert; alte Spielstände bis Version 4 werden weiterhin akzeptiert.
- Greifhaken: Taste G oder Touch-Schaltfläche „Greifen“, zieht den Spieler zum nächsten Ankerpunkt.
- Bomben: Taste B oder Touch-Schaltfläche „Bombe“, bis zu drei gleichzeitig; Explosion nach kurzer Zündzeit.
- Bomben und Vorrat werden im Spielstand gespeichert.

## Statische Prüfungen
- JavaScript-Syntax geprüft: main.js, dungeon.js, abilities.js, world.js, save.js, data/regions.js, data/dungeons.js.
- Imports und Export-Syntax beim Parsing für die Prüfung entfernt; dies ist kein vollständiger Modul-/Browserlauf.
- Kein echter Browser-, iPad-, Touch-, Kampf- oder Speicher-Runtime-Test durchgeführt.

## iPad-Testliste
1. ZUNOX öffnen → Lumen Realm starten → Region 2 und Region 3 aufsuchen.
2. Prüfen, ob Düsterwald und Sonnenöde sichtbar unterschiedliche Bodenfarben haben.
3. Greifen antippen und prüfen, ob ein erreichbarer Ankerpunkt den Spieler versetzt.
4. Bombe antippen, Abstand nehmen und Explosion abwarten.
5. Dornenkatakomben und Sternwarte betreten; Schlüssel holen, beide Runen aktivieren, Tor öffnen, Wächter besiegen, Belohnung einsammeln.
6. Gewölbe verlassen und erneut betreten; Schlüssel-/Runen-/Bossfortschritt kontrollieren.
7. In jedem Gewölbe speichern, Seite neu laden und Spielstand laden.
8. Einen alten v4-Spielstand laden und prüfen, ob er ohne Absturz startet.

## Bekannte Grenzen
- Die beiden neuen Gewölbe verwenden denselben Drei-Raum-Grundriss und dieselbe Schlüssel-/Runenmechanik; Rätsel und Raumgeometrie sind noch nicht individuell.
- Der Greifhaken bewegt den Spieler direkt zum Anker; es gibt noch keine physikalische Seilschwingung.
- Bomben zerstören noch keine Wände oder Hindernisse. Gegner, die durch Bomben besiegt werden, lassen derzeit keine Beute fallen.
- Die Regionen sind durch Farbpaletten unterschieden; eigene Pflanzen, NPCs und Gegnerpopulationen fehlen noch.
- Keine echte Laufzeitprüfung auf iPad/Browser.
