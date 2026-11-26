export const BOATS=Object.freeze([
{id:"manta",name:"MANTA",cost:0,color:"#b9d7d5",speed:1,oxygen:1,description:"Ausgewogenes Forschungsschiff"},
{id:"nautilus",name:"NAUTILUS",cost:1800,color:"#d5b98c",speed:.9,oxygen:1.35,description:"Mehr Sauerstoff und Panzerung"},
{id:"specter",name:"SPECTER",cost:4200,color:"#8bdde2",speed:1.28,oxygen:.92,description:"Schnell und wendig"}
]);
export const SKINS=Object.freeze([
{id:"standard",name:"Polarlicht",cost:0,color:"#b9d7d5"},
{id:"abyss",name:"Abgrund",cost:650,color:"#8977ce"},
{id:"coral",name:"Korallenfeuer",cost:950,color:"#ff987c"},
{id:"toxic",name:"Biolumineszenz",cost:1300,color:"#a9f47c"}
]);
export const QUESTS=Object.freeze([
["salvage","Bergungsspezialist","Sammle 5 Fundstücke","collect",5,180],["salvage2","Schatzsucher","Sammle 12 Fundstücke","collect",12,420],["deep","Tiefenrausch","Erreiche 700 m","depth",700,250],["deep2","Grenzgänger","Erreiche 1500 m","depth",1500,650],["deep3","Am Abgrund","Erreiche 2200 m","depth",2200,1100],["scan","Aufklärer","Führe 3 Sonar-Scans aus","scan",3,160],["scan2","Echojäger","Führe 10 Sonar-Scans aus","scan",10,480],["wreck","Wracktaucher","Öffne 2 Wracks","wreck",2,300],["wreck2","Bergungstrupp","Öffne 5 Wracks","wreck",5,800],["relic","Vergessene Geschichte","Finde 1 Relikt","relic",1,350],["relic2","Reliktjäger","Finde 4 Relikte","relic",4,1100],["boss","Jäger","Besiege einen Boss","boss",1,500],["boss2","Titanensturz","Besiege 3 Bosse","boss",3,1600],["creature","Biologe","Entdecke 5 Arten","discover",5,220],["creature2","Meereslexikon","Entdecke 15 Arten","discover",15,650],["ore","Schürfer","Baue 3 Erzadern ab","ore",3,240],["ore2","Tiefenmine","Baue 10 Erzadern ab","ore",10,800],["cash","Kapital","Verdiene 1000 Credits","earn",1000,200],["cash2","Tycoon","Verdiene 5000 Credits","earn",5000,900],["survive","Ruhige Hand","Kehre mit mindestens 50% Rumpf zurück","return",1,220],["light","Licht in der Finsternis","Entdecke Zone 4","zone",4,650],["abyss","Letzte Grenze","Entdecke Zone 5","zone",5,1200],["photo","Chronist","Mache 3 Fotos","photo",3,180],["daily","Tagesgast","Schließe eine Tagesmission ab","daily",1,300],["boss3","Wächterbrecher","Besiege den Korallenwächter","bossid:reef-warden",1,700],["boss4","Glutbezwinger","Besiege den Thermalkoloss","bossid:thermal-colossus",1,950],["boss5","Schattensturz","Besiege den Leviathan","bossid:leviathan",1,2200],["full","Vollausstattung","Besitze alle U-Boote","boats",3,1000],["codex","Forscher","Entdecke 20 Arten","discover",20,1100],["legend","Legende der Tiefe","Schalte ein Ende frei","ending",1,2500]
].map(([id,name,description,type,target,reward])=>Object.freeze({id,name,description,type,target,reward})));
export const DAILY_OBJECTIVES=Object.freeze([
{type:"collect",target:4,label:"Berge 4 Fundstücke",reward:250},{type:"scan",target:3,label:"Führe 3 Sonar-Scans aus",reward:220},{type:"wreck",target:1,label:"Öffne ein Wrack",reward:320},{type:"depth",target:900,label:"Erreiche 900 m Tiefe",reward:280},{type:"relic",target:1,label:"Finde ein Relikt",reward:400},{type:"discover",target:3,label:"Entdecke 3 Kreaturenarten",reward:300}
]);