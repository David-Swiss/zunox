import{hash,uid,clamp}from"./utils.js";
export const WEAPONS=[
{id:"sword",name:"Altes Schwert",kind:"melee",damage:2,range:48,cooldown:.34,stamina:0,icon:"⚔"},
{id:"axe",name:"Holzfälleraxt",kind:"melee",damage:3,range:42,cooldown:.62,stamina:8,icon:"🪓"},
{id:"bow",name:"Jagdbogen",kind:"ranged",damage:2,range:300,cooldown:.48,stamina:3,icon:"🏹"}
];
export const FOODS=[{id:"apple",name:"Apfel",heal:1,weight:42},{id:"bread",name:"Brot",heal:2,weight:32},{id:"berry",name:"Waldbeeren",heal:1,weight:20},{id:"roast",name:"Gebratenes Fleisch",heal:3,weight:6}];
const pick=(arr,n)=>{let total=arr.reduce((a,x)=>a+x.weight,0),v=n%total;for(const x of arr){v-=x.weight;if(v<0)return x}return arr[0]};
export function makeLootState(){return{opened:new Set(),drops:new Map(),weapon:"sword",owned:new Set(["sword"]),ammo:12,coins:0}}
export function chestSpawns(screenX,screenY){const seed=hash(screenX+17,screenY+91);if(seed%100>62)return[];const count=seed%7===0?2:1;return Array.from({length:count},(_,i)=>({id:"chest-"+screenX+"-"+screenY+"-"+i,x:screenX*960+170+hash(seed,i+5)%620,y:screenY*600+130+hash(seed,i+37)%330}))}
export function createChestDrops(chestId,seed){const r=hash(seed,seed^0x51ed);const weapon=WEAPONS.find(w=>w.id==="axe"&&r%100<20)||null;const food=pick(FOODS,hash(r,3));const out=[{id:uid(),type:"food",item:food.id,x:0,y:0}];if(weapon)out.push({id:uid(),type:"weapon",item:weapon.id,x:0,y:0});if(r%4===0)out.push({id:uid(),type:"coins",amount:3+r%8,x:0,y:0});return out}
export function randomFood(seed){return pick(FOODS,seed)}
export function weaponById(id){return WEAPONS.find(w=>w.id===id)||WEAPONS[0]}
export function rollChest(state,chest){if(state.opened.has(chest.id))return false;state.opened.add(chest.id);const drops=createChestDrops(chest.id,chest.x+chest.y);for(let i=0;i<drops.length;i++){const d=drops[i];d.x=chest.x+12+i*17;d.y=chest.y+20;state.drops.set(d.id,d)}return true}
export function collectDrop(state,player,drop){if(drop.type==="food"){const food=FOODS.find(x=>x.id===drop.item);if(food)player.hp=clamp(player.hp+food.heal,0,player.maxHp)}else if(drop.type==="weapon"){state.owned.add(drop.item)}else if(drop.type==="coins"){state.coins+=drop.amount}state.drops.delete(drop.id);return drop}
export function serializeLoot(l){return{opened:[...l.opened],drops:[...l.drops.values()],weapon:l.weapon,owned:[...l.owned],ammo:l.ammo,coins:l.coins}}
export function restoreLoot(l,d){if(!d)return;l.opened=new Set(Array.isArray(d.opened)?d.opened:[]);l.drops=new Map(Array.isArray(d.drops)?d.drops.filter(x=>x&&typeof x.id==="string"&&Number.isFinite(x.x)&&Number.isFinite(x.y)).map(x=>[x.id,x]):[]);l.owned=new Set(["sword",...(Array.isArray(d.owned)?d.owned.filter(x=>WEAPONS.some(w=>w.id===x)):[])]);l.weapon=l.owned.has(d.weapon)?d.weapon:"sword";l.ammo=clamp(Number(d.ammo)||0,0,999);l.coins=clamp(Number(d.coins)||0,0,99999)}