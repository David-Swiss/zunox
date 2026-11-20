export const DUNGEONS=[
{id:"root-hollow",name:"Wurzelgewölbe",region:"meadow",entrance:{x:760,y:520},boss:{name:"Wurzelkoloss",hp:8,damage:1,speed:58},rooms:["Die versunkene Halle","Die Halle der zwei Runen","Das Herz der Wurzeln"],reward:"Leuchtstein"},
{id:"thorn-vault",name:"Dornenkatakomben",region:"gloamwood",entrance:{x:2240,y:520},boss:{name:"Dornhüter",hp:12,damage:1,speed:68},rooms:["Der überwucherte Eingang","Die Dornenkammer","Der Dornenthron"],reward:"Waldkern"},
{id:"sunken-observatory",name:"Versunkene Sternwarte",region:"sunscar",entrance:{x:3770,y:520},boss:{name:"Sternenwächter",hp:15,damage:1,speed:76},rooms:["Die Sandhalle","Das Sternenrätsel","Die Kuppel der Sonne"],reward:"Sonnenprisma"}
];
export const DUNGEON_DATA={...DUNGEONS[0],rooms:DUNGEONS[0].rooms.map((name,i)=>({id:"room-"+i,name,hint:["Suche den Schlüssel in der Truhe.","Aktiviere beide Runen und öffne das Siegel.","Besiege den Wächter und hole den Leuchtstein."][i]}))};