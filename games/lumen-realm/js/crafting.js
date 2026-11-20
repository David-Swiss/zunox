export const RECIPES=[
{id:"arrows",name:"Pfeilbündel",icon:"➶",cost:{wood:2,fiber:1},description:"8 Pfeile für deinen Bogen"},
{id:"bombs",name:"Bombenpaket",icon:"💣",cost:{stone:3,fiber:2},description:"3 zusätzliche Bomben"},
{id:"rations",name:"Reiseproviant",icon:"🍞",cost:{wood:1,fiber:2},description:"2 Brote für unterwegs"},
{id:"axe",name:"Holzfälleraxt",icon:"🪓",cost:{wood:3,stone:2},description:"Schaltet die Axt frei",once:true},
{id:"stew",name:"Kräuter-Eintopf",icon:"🥣",cost:{berry:2,crystal:1},description:"Heilt 2 Herzen",foodCost:true}
];
export function canCraft(s,r){if(r.once&&s.loot.owned.has(r.id))return false;if(r.foodCost)return Object.entries(r.cost).every(([k,n])=>(s.inventory.food[k]||0)>=n)&&s.player.hp<s.player.maxHp;return Object.entries(r.cost).every(([k,n])=>(s.inventory.materials[k]||0)>=n)}
export function craft(s,id){const r=RECIPES.find(x=>x.id===id);if(!r||!canCraft(s,r))return false;for(const[k,n]of Object.entries(r.cost)){if(r.foodCost)s.inventory.food[k]-=n;else s.inventory.materials[k]-=n}if(id==="arrows")s.loot.ammo+=8;else if(id==="bombs")s.bombs=Math.min(9,s.bombs+3);else if(id==="rations")s.inventory.food.bread=Math.min(99,s.inventory.food.bread+2);else if(id==="axe")s.loot.owned.add("axe");else if(id==="stew")s.player.hp=Math.min(s.player.maxHp,s.player.hp+2);return true}
