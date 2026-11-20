# Lumen Realm – Phase 4 QA

## Scope
- New dungeon: Wurzelgewölbe with three connected rooms
- Small key chest and locked passage
- Two interactable runes; both are required to open the boss gate
- Wurzelkoloss boss with health bar, chase movement and contact damage
- First Leuchtstein reward and persistent progress
- Dungeon entry/exit and save version 4 (loads save versions 1–3)

## Static checks performed
- JavaScript syntax parsing: `main.js`, `dungeon.js`, `save.js`, `data/dungeons.js`
- All four files parsed successfully
- Dungeon entrance moved onto a walkable meadow tile
- Overworld enemies and loot are isolated while inside the dungeon

## Manual iPad/browser test checklist
- [ ] Start a new game and walk to the Wurzelgewölbe entrance near the village meadow
- [ ] Press E to enter; verify the three dungeon rooms render and player movement is bounded by walls
- [ ] Open the chest and collect the small key
- [ ] Activate both runes with E
- [ ] Try the gate before/after the runes and key; verify it only opens when all requirements are met
- [ ] Fight the Wurzelkoloss with sword and, if owned, bow
- [ ] Collect the Leuchtstein from the altar after defeating the boss
- [ ] Exit and re-enter; verify puzzle, boss and Leuchtstein progress persist
- [ ] Save inside the dungeon, reload, and verify the player returns to the same room
- [ ] Test touch scrolling, menu buttons, pause and return-to-ZUNOX link

## Known limitations
- The dungeon currently has three handcrafted rooms; no procedural dungeon generation
- Only one boss and one key/rune puzzle are included in this phase
- No dedicated touch joystick yet; movement still uses keyboard controls
- The new gameplay has not been runtime-tested on a real browser or iPad in this environment
- GitHub Pages deployment happens only after the PR is merged into main
