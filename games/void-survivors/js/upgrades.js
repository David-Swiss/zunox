import {WEAPONS,addWeapon} from "./weapons.js";
import {weightedPick,pick} from "./utils.js";
export const PASSIVES=[
{id:"hp",name:"Titanium-Hülle",icon:"♥",desc:"+20 maximale Lebenspunkte.",rarity:1,apply:p=>{p.maxHp+=20;p.heal(20);}},
{id:"regen",name:"Nanoregenerator",icon:"✚",desc:"+0,7 HP Regeneration pro Sekunde.",rarity:1,apply:p=>p.regenRate=(p.regenRate||.35)+.7},
{id:"speed",name:"Phasenantrieb",icon:"➤",desc:"+12% Bewegungstempo.",rarity:1,apply:p=>p.speed*=1.12},
{id:"magnet",name:"Gravitationskern",icon:"◎",desc:"+55 Sammelradius.",rarity:1,apply:p=>p.magnet+=55},
{id:"damage",name:"Überladener Kern",icon:"ϟ",desc:"+15% Waffenschaden.",rarity:1,apply:p=>p.damage*=1.15},
{id:"fireRate",name:"Beschleuniger",icon:"»",desc:"+14% Feuerrate.",rarity:1,apply:p=>p.fireRate*=1.14},
{id:"projectile",name:"Fokussierer",icon:"✧",desc:"+25% Projektilgröße und -tempo.",rarity:1,apply:p=>p.projectileSize*=1.25},
{id:"luck",name:"Schicksalsmodul",icon:"✦",desc:"Bessere Drops und Upgrade-Auswahl.",rarity:1,apply:p=>p.luck+=.12}
];
export function makeChoices(player,rerollBias=0){const pool=[];for(const w of Object.keys(WEAPONS)){const level=player.weapons[w]||0;if(level<6)pool.push({id:"weapon:"+w,name:WEAPONS[w].name,icon:WEAPONS[w].icon,desc:level===0?"Neue Waffe freischalten.":"Waffe verstärken: mehr Schaden oder Effekt.",kind:"weapon",weapon:w,rarity:level>=4?"epic":level>=2?"rare":"common",weight:1.3+(player.luck||0)});}
for(const p of PASSIVES)pool.push({...p,kind:"passive",rarity:Math.random()<(player.luck||0)*.2?"rare":"common",weight:1+(player.luck||0)});
const chosen=[];while(chosen.length<3&&pool.length){const x=weightedPick(pool);chosen.push(x);pool.splice(pool.indexOf(x),1);}return chosen;}
export function applyUpgrade(player,choice){if(choice.kind==="weapon"){const old=player.weapons[choice.weapon]||0;addWeapon(player,choice.weapon);if(old===5){player.evolutions??={};player.evolutions[choice.weapon]=true;}return;}const p=PASSIVES.find(x=>x.id===choice.id);if(p)p.apply(player);}
