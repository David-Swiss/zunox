// Kreaturen werden in Phase 2 ergänzt. Fehler einzelner Entities isoliert behandeln.
export function updateCreatures(state,dt){
 const list=Array.isArray(state.creatures)?state.creatures:[];
 for(let i=list.length-1;i>=0;i--){
  try{const c=list[i];if(!c||!Number.isFinite(c.x)||!Number.isFinite(c.y))throw Error("Ungültige Kreatur");c.phase=(c.phase||0)+dt;}
  catch(error){list.splice(i,1);state.debug.errors.push(error.message);}
 }
}
export function drawCreatures(ctx,state){
 for(const c of (Array.isArray(state.creatures)?state.creatures:[])){try{ctx.fillStyle="#9ce9dc";ctx.beginPath();ctx.arc(c.x,c.y,5,0,Math.PI*2);ctx.fill();}catch(error){state.debug.errors.push(error.message);}}
}