# Lumen Realm – Stability, Hotbar & World Progression

## Änderungen
- Minecraft-inspirierte Hotbar mit neun nummerierten Slots:
  1. Altes Schwert
  2. Holzfälleraxt
  3. Jagdbogen
  4. Wanderspeer
  5. Apfel
  6. Brot
  7. Waldbeeren
  8. Bombe
  9. Greifhaken
- Slotwechsel mit 1–9 und Numpad 1–9; auf Touch-Geräten können Slots angetippt werden.
- J/Leertaste löst die ausgewählte Hotbar-Aktion aus; Touch-Aktionsknopf übernimmt dieselbe Funktion.
- Hotbar-Auswahl und Munition werden angezeigt; die Auswahl wird gespeichert.
- Touch-Steuerkreuz für WASD-Bewegung plus Aktion, Interaktion und Rolle.
- Fünf visuell unterscheidbare Biome mit detaillierterem Terrain, Bäumen, Felsen, Schatten und verfeinerten Figuren.
- Weltportale blockieren den Weg, bis der jeweilige Dungeon-Boss besiegt ist.
- Wurzelgewölbe schaltet Düsterwald frei; Dornenkatakomben schalten Sonnenöde frei; Versunkene Sternwarte schaltet Eisgrat frei. Glutklamm bleibt für die späteren Dungeons gesperrt.
- Weltfortschritt und Hotbar-Slot werden gespeichert; Save-Version 6 akzeptiert ältere Versionen 1–5.
- Boss-Siege setzen sofort einen Speicher-Checkpoint.
- Bomben-Kills verwenden die normale Beute-Logik; Bomben in Dungeons treffen keine unsichtbaren Gegner aus der Oberwelt.
- Bomben und Pfeile werden beim Betreten/Verlassen eines Dungeons sauber zurückgesetzt.
- Nahrung wird bei vollen Herzen ins Inventar gelegt statt auf dem Boden liegen zu bleiben.
- Alte Spielstände, deren Position hinter einer nun gesperrten Welt liegt, werden auf die letzte freigeschaltete Welt zurückgesetzt.

## Automatische Prüfungen
- Syntaxprüfung für 18 JavaScript-Module und Datendateien bestanden.
- Logiktests bestanden:
  - Welt 1 ist an Portal 2 gesperrt, bis Welt 2 freigeschaltet wird.
  - Nach Freischaltung ist das Portal passierbar.
  - Das nächste Portal bleibt weiterhin gesperrt.
  - Boss-Sieg erhöht die freigeschaltete Welt, setzt den Checkpoint und speichert Dungeon-Fortschritt.
  - Dungeon-Weltfortschritt bleibt nach Serialisieren/Wiederherstellen erhalten.
  - Nahrung wird bei vollen Herzen ins Inventar übernommen.
- Hotbar-Markup: exakt 9 Slots; Tastatur-, Touch- und Speichercallbacks statisch geprüft.

## iPad-Testliste
1. Spiel öffnen und prüfen, dass die Hotbar im Hauptmenü verborgen ist.
2. Abenteuer starten: Hotbar mit 9 Slots am unteren Bildschirmrand prüfen.
3. Slots 1–9 antippen und prüfen, ob die Auswahl deutlich markiert wird.
4. Mit dem Touch-Steuerkreuz laufen; Aktion, Interaktion und Rolle testen.
5. Schwert, Axt, Bogen und Speer über Slots 1–4 auswählen.
6. Nahrung über Slots 5–7 verwenden; bei vollen Herzen muss aufgesammeltes Essen im Inventar landen.
7. Bombe über Slot 8 legen; Greifhaken über Slot 9 auslösen.
8. Wurzelgewölbe abschliessen und Boss besiegen; Checkpoint und Weltportal prüfen.
9. Durch das Portal nach Düsterwald gehen; Dornenkatakomben abschliessen.
10. Sonnenöde freischalten und die Sternwarte abschliessen.
11. Speichern, neu laden und Weltfortschritt sowie Hotbar-Auswahl prüfen.
12. Auf schmalem iPad-/Handybildschirm prüfen, dass Hotbar und Touch-Steuerung nicht wichtige HUD-Elemente verdecken.

## Bekannte Grenzen
- Es wurde kein echter Browser- oder iPad-Spieltest ausgeführt; die automatischen Prüfungen sind Syntax- und Logiktests.
- Die fünf Welten sind derzeit zusammenhängende, durch Portale getrennte Biome auf derselben grossen Karte, keine separat geladenen Karten.
- Es sind drei Dungeons vorhanden. Glutklamm und das fünfte Gebiet bleiben bis zu den späteren Dungeon-Inhalten gesperrt.
- Die Gegner besitzen noch keine vollständige Wegfindung; sie verfolgen den Spieler nur in direkter Nähe.
- Die Grafik bleibt bewusst eigenständige 2D-Pixelgrafik und ist nicht mit echter 3D-Minecraft-Grafik gleichzusetzen.
