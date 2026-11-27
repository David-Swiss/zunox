export const MAPS = [
  {
    id:"entry",name:"Einstieg",difficulty:1,
    theme:{background:"#071321",grid:"#17304a",path:"#1b4660",glow:"#59f4ff",accent:"#a879ff"},
    description:"Ein klarer Korridor führt direkt zum Kern. Ideal, um die Verteidigung aufzubauen.",
    width:17,height:11,spawn:{x:0,y:5},core:{x:16,y:5},
    path:[{x:0,y:5},{x:4,y:5},{x:4,y:2},{x:11,y:2},{x:11,y:8},{x:16,y:8},{x:16,y:5}],
    relays:[{x:7,y:5},{x:14,y:9}],special:"Zwei Relaisfelder verstärken verbundene Türme."
  },
  {
    id:"cryo",name:"Kryo-Schlucht",difficulty:1.16,
    theme:{background:"#091426",grid:"#24456b",path:"#275477",glow:"#79d7ff",accent:"#9c83ff"},
    description:"Lange Kehren und drei Energie-Relais. Gegner sind schneller und robuster.",
    width:19,height:11,spawn:{x:0,y:9},core:{x:18,y:1},
    path:[{x:0,y:9},{x:4,y:9},{x:4,y:2},{x:10,y:2},{x:10,y:7},{x:15,y:7},{x:15,y:1},{x:18,y:1}],
    relays:[{x:2,y:6},{x:7,y:5},{x:17,y:9}],special:"Drei Relaisfelder liegen abseits des Hauptpfads."
  },
  {
    id:"shatter",name:"Splitterring",difficulty:1.28,
    theme:{background:"#170e20",grid:"#4a2c56",path:"#693d6d",glow:"#ff9bca",accent:"#ffbd71"},
    description:"Ein langer Ringweg mit engen Bauzonen. Hohe Gefahr, aber starke Relais-Positionen.",
    width:17,height:13,spawn:{x:0,y:6},core:{x:16,y:6},
    path:[{x:0,y:6},{x:3,y:6},{x:3,y:11},{x:12,y:11},{x:12,y:3},{x:16,y:3},{x:16,y:6}],
    relays:[{x:1,y:3},{x:8,y:8},{x:14,y:9}],special:"Drei Relaisfelder verstärken Türme mit +20% Reichweite."
  }
];
export const DEFAULT_MAP_ID="entry";
