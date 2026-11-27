export const COMMANDERS = [
  {id:"warden",name:"Wächter",title:"Schilddoktrin",description:"Der Kern startet mit 25 zusätzlicher Integrität.",coreBonus:25},
  {id:"engineer",name:"Ingenieur",title:"Effizienter Bau",description:"Alle Türme und Upgrades kosten 15% weniger Energie.",costMultiplier:.85},
  {id:"oracle",name:"Taktiker",title:"Präzisionsnetz",description:"Alle Türme erhalten 12% mehr Reichweite und 8% mehr Schaden.",rangeMultiplier:1.12,damageMultiplier:1.08}
];
export const MUTATORS = [
  {id:"stable",name:"Stabiler Zyklus",description:"Ausgewogene Standardregeln ohne zusätzliche Risiken."},
  {id:"overdrive",name:"Overdrive",description:"Türme feuern 18% schneller – Gegner bewegen sich 16% schneller.",fireRateMultiplier:1.18,enemySpeedMultiplier:1.16},
  {id:"high-voltage",name:"Hochspannung",description:"100 Startenergie und höhere Belohnungen – Gegner haben 20% mehr Leben.",startEnergy:100,rewardMultiplier:1.12,enemyHpMultiplier:1.2},
  {id:"glass",name:"Glaskern",description:"28% mehr Turmschaden, aber 30% weniger Kernintegrität.",damageMultiplier:1.28,coreMultiplier:.7}
];
export const RELICS = [
  {id:"prism-lens",icon:"◎",name:"Prismenlinse",description:"+12% Reichweite für alle Türme.",rangeMultiplier:1.12},
  {id:"rapid-coil",icon:"ϟ",name:"Hyper-Spule",description:"Türme feuern 14% schneller.",fireRateMultiplier:1.14},
  {id:"shard-core",icon:"✦",name:"Splitterkern",description:"+15% Schaden für alle Türme.",damageMultiplier:1.15},
  {id:"capacitor",icon:"⌁",name:"Doppelkondensator",description:"+45 Energie sofort und +2 Energie pro Abschuss.",energyBonus:45,killEnergyBonus:2},
  {id:"bastion",icon:"⬡",name:"Bastionsschild",description:"+15 Kernintegrität und sofortige Reparatur.",coreBonus:15},
  {id:"salvage",icon:"◇",name:"Bergungssonde",description:"+25% Energie zwischen den Wellen.",waveRewardMultiplier:1.25},
  {id:"relay-overload",icon:"⌘",name:"Relais-Überladung",description:"Relais-Türme verursachen 25% mehr Schaden.",relayDamageMultiplier:1.25}
];
export function rollRelics(ownedIds=[]){
  const pool=RELICS.filter(relic=>!ownedIds.includes(relic.id));
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool.slice(0,3);
}
