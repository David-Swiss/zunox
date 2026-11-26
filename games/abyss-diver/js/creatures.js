// Phase 2 erweitert dieses Modul um konkrete Arten und Verhaltensmuster.
export function updateCreatures(state,dt){
 for(let i=state.creatures.length-1;i>=0;i--){
  try{const c=state.creatures[i];if(!c||!Number.isFinite(c.x)||!Number.isFinite(c.y))throw Error("Ungültige Kreatur");c.phase=(c.phase||0)+dt;}
  catch(error){state.creatures.splice(i,1);state.debug.errors.push(error.message);}
 }
}
export function drawCreatures(ctx,state){
 for(const c of state.creatures){try{ctx.fillStyle="#9ce9dc";ctx.beginPath();ctx.arc(c.x,c.y,5,0,Math.PI*2);ctx.fill();}catch(error){state.debug.errors.push(error.message);}}
}