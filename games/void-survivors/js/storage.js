const KEY="zunox_void_survivors_v1";
const defaults=()=>({version:1,cores:0,best:0,totalKills:0,runs:0,selectedShip:"scout",unlockedShips:["scout"],upgrades:{hp:0,damage:0,xp:0,reroll:0},missions:{survive300:false,kills500:false,boss:false},sound:true});
function normalize(data){const d=defaults();if(!data||typeof data!=="object")return d;return{...d,...data,version:1,upgrades:{...d.upgrades,...(data.upgrades||{})},missions:{...d.missions,...(data.missions||{})},unlockedShips:Array.isArray(data.unlockedShips)?data.unlockedShips:d.unlockedShips};}
export function loadSave(){try{return normalize(JSON.parse(localStorage.getItem(KEY)||"null"));}catch{return defaults();}}
export function saveData(data){try{localStorage.setItem(KEY,JSON.stringify(normalize(data)));return true;}catch{return false;}}
export function resetSave(){const d=defaults();saveData(d);return d;}
