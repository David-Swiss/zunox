export const NPCS=[
{id:"mira",name:"Mira",role:"Lichtwächterin",x:548,y:328,color:"#d6a7d8",text:"Die Leuchtsteine halten unser Land am Leben. Ohne sie verblasst das Licht."},
{id:"bram",name:"Bram",role:"Wegfinder",x:414,y:420,color:"#d6b078",text:"Die alten Wege sind gefährlich. Folge den grünen Wegmarken und bleib aufmerksam."},
{id:"lio",name:"Lio",role:"Händler",x:602,y:420,color:"#8fc7d6",text:"Willkommen! Ich tausche Münzen gegen nützliche Dinge."}
];
export function nearestNpc(x,y,maxDistance=54){let best=null,distance=maxDistance;for(const npc of NPCS){const d=Math.hypot(npc.x-x,npc.y-y);if(d<distance){best=npc;distance=d}}return best}
export function drawVillage(c,camera){const x=v=>v-camera.x,y=v=>v-camera.y;
const hut=(hx,hy,w,h,roof)=>{c.fillStyle="#79553a";c.fillRect(x(hx),y(hy),w,h);c.fillStyle="#4a3429";c.beginPath();c.moveTo(x(hx-8),y(hy+8));c.lineTo(x(hx+w/2),y(hy-28));c.lineTo(x(hx+w+8),y(hy+8));c.closePath();c.fill();c.fillStyle="#b9854d";c.fillRect(x(hx+w*.42),y(hy+h-34),w*.18,34);c.fillStyle="#f0cf83";c.fillRect(x(hx+12),y(hy+18),17,15);c.fillStyle=roof;c.fillRect(x(hx+4),y(hy+h-5),w-8,5)};
hut(365,250,88,76,"#5a4232");hut(560,250,96,80,"#526346");hut(540,390,94,72,"#594b37");
c.fillStyle="#bda06b";c.fillRect(x(450),y(350),110,18);c.fillStyle="#d4bd86";c.fillRect(x(470),y(358),75,5);
for(const npc of NPCS){const nx=x(npc.x),ny=y(npc.y);c.fillStyle="#2b3c2b";c.beginPath();c.ellipse(nx,ny+17,13,5,0,0,7);c.fill();c.fillStyle=npc.color;c.fillRect(nx-9,ny-3,18,19);c.fillStyle="#e6b98a";c.beginPath();c.arc(nx,ny-9,8,0,7);c.fill();c.fillStyle="#2a2925";c.fillRect(nx-5,ny-11,3,3);c.fillRect(nx+3,ny-11,3,3);c.fillStyle="#fff4c4";c.font="bold 11px system-ui";c.textAlign="center";c.fillText(npc.name,nx,ny-25)}
}