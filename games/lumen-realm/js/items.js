import{ITEM_DATA}from"../data/items.js";
export const ITEMS=ITEM_DATA;
export const makeInventory=()=>({food:{apple:0,bread:0,berry:0,roast:0},materials:{wood:8,stone:6,fiber:6,crystal:2},equipment:{lantern:false,boomerang:false,bomb:false,hook:false},potions:0});
export function addInventoryItem(inv,id,count=1){if(id in inv.food)inv.food[id]=Math.min(99,(inv.food[id]||0)+count);else if(id in inv.materials)inv.materials[id]=Math.min(99,(inv.materials[id]||0)+count);else if(id in inv.equipment)inv.equipment[id]=true;else if(id==="potion")inv.potions=Math.min(99,inv.potions+count)}
export function serializeInventory(inv){return{food:{...inv.food},materials:{...inv.materials},equipment:{...inv.equipment},potions:inv.potions||0}}
export function restoreInventory(inv,data){if(!data||typeof data!=="object")return;for(const id of Object.keys(inv.food))inv.food[id]=Math.max(0,Math.min(99,Number(data.food?.[id])||0));for(const id of Object.keys(inv.materials))inv.materials[id]=Math.max(0,Math.min(99,Number(data.materials?.[id]??inv.materials[id])||0));for(const id of Object.keys(inv.equipment))inv.equipment[id]=Boolean(data.equipment?.[id]);inv.potions=Math.max(0,Math.min(99,Number(data.potions)||0))}
export const FOOD_NAMES={apple:"Apfel",bread:"Brot",berry:"Waldbeeren",roast:"Gebratenes Fleisch"};
