import{DUNGEON_DATA}from"../data/dungeons.js";
export class DungeonWorld{
constructor(state){this.state=state;this.width=2880;this.height=600}
solidAt(x,y,w,h){
if(x<28||y<28||x+w>this.width-28||y+h>this.height-28)return true;
const crosses=(wall)=>x<wall+18&&x+w>wall-18;
if(crosses(960)&&!(y>444&&y+h<562))return true;
if(crosses(1920)&&!(this.state.gateOpen&&y>246&&y+h<366))return true;
const blocks=[[310,180,90,90],[570,340,88,100],[1180,150,72,92],[1450,350,90,86],[2200,130,90,100],[2600,420,82,75]];
return blocks.some(([bx,by,bw,bh])=>x<bx+bw&&x+w>bx&&y<by+bh&&y+h>by)
}
reveal(){}
draw(c,cam){
c.fillStyle="#202a32";c.fillRect(0,0,960,600);
for(let room=0;room<3;room++){const ox=room*960-cam.x;c.fillStyle=room===2?"#352b30":room===1?"#263238":"#28352f";c.fillRect(ox+28,-cam.y+28,904,544);c.strokeStyle="#65746b";c.lineWidth=10;c.strokeRect(ox+28,-cam.y+28,904,544);c.strokeStyle="#41504a";c.lineWidth=1;for(let x=ox+48;x<ox+930;x+=48)for(let y=48-cam.y;y<590-cam.y;y+=48){c.strokeRect(x,y,48,48)}}
c.fillStyle="#6a5942";for(const [x,y,w,h]of[[310,180,90,90],[570,340,88,100],[1180,150,72,92],[1450,350,90,86],[2200,130,90,100],[2600,420,82,75]])c.fillRect(x-cam.x,y-cam.y,w,h);
c.fillStyle="#28352f";c.fillRect(932-cam.x,444-cam.y,56,118);if(this.state.gateOpen)c.fillRect(1892-cam.x,246-cam.y,56,120);
if(!this.state.hasKey){c.fillStyle="#9a7448";c.fillRect(680-cam.x,270-cam.y,42,32);c.fillStyle="#e7c46e";c.fillRect(695-cam.x,270-cam.y,10,32)}else{c.fillStyle="#765d42";c.fillRect(680-cam.x,276-cam.y,42,18);c.fillStyle="#b99a62";c.fillRect(680-cam.x,265-cam.y,42,8)}
c.fillStyle=this.state.hasKey?"#3e6559":"#d2a34f";c.beginPath();c.arc(1220-cam.x,255-cam.y,18,0,Math.PI*2);c.fill();c.fillStyle=this.state.runes[0]?"#b8f6e6":"#425f65";c.beginPath();c.arc(1220-cam.x,255-cam.y,9,0,7);c.fill();
c.fillStyle=this.state.runes[1]?"#b8f6e6":"#425f65";c.beginPath();c.arc(1650-cam.x,255-cam.y,18,0,7);c.fill();c.fillStyle="#243d48";c.beginPath();c.arc(1650-cam.x,255-cam.y,9,0,7);c.fill();
if(!this.state.gateOpen){c.fillStyle="#9c6846";c.fillRect(1908-cam.x,246-cam.y,24,120-cam.y+cam.y);for(let y=252;y<360;y+=18){c.fillStyle="#d0a36a";c.fillRect(1905-cam.x,y-cam.y,30,5)}}else{c.fillStyle="#79c9a5";c.fillRect(1908-cam.x,246-cam.y,5,120)}
c.fillStyle="#8fd7d0";c.beginPath();c.arc(2720-cam.x,300-cam.y,24,0,7);c.fill();c.fillStyle="#d7f4bd";c.beginPath();c.arc(2720-cam.x,300-cam.y,11,0,7);c.fill();
c.fillStyle="#d3c18b";c.font="bold 18px system-ui";c.textAlign="center";for(let i=0;i<3;i++)c.fillText(DUNGEON_DATA.rooms[i].name,(i*960+480)-cam.x,78-cam.y);c.font="12px system-ui";c.fillStyle="#c5d0c2";c.fillText(DUNGEON_DATA.rooms[i].hint,(i*960+480)-cam.x,98-cam.y);
if(this.state.boss&&!this.state.boss.defeated){const b=this.state.boss,x=b.x-cam.x,y=b.y-cam.y;c.fillStyle=b.hit>0?"#fff":"#7b9a65";c.beginPath();c.ellipse(x,y,34,40,0,0,7);c.fill();c.fillStyle="#263d30";c.fillRect(x-19,y-12,9,8);c.fillRect(x+10,y-12,9,8);c.fillStyle="#e5c07a";c.fillRect(x-5,y+9,10,6);c.fillStyle="#281e20";c.fillRect(x-38,y-53,76,7);c.fillStyle="#d85b58";c.fillRect(x-38,y-53,76*Math.max(0,b.hp/b.maxHp),7);c.fillStyle="#fff";c.font="bold 13px system-ui";c.fillText(DUNGEON_DATA.boss.name,x,y-62)}
}
}
export function createDungeonState(){return{active:false,returnX:760,returnY:520,hasKey:false,runes:[false,false],gateOpen:false,boss:{x:2440,y:300,hp:DUNGEON_DATA.boss.hp,maxHp:DUNGEON_DATA.boss.hp,attack:0,hit:0,defeated:false},lightstone:false}}
export function restoreDungeon(d){const s=createDungeonState();if(!d||typeof d!=="object")return s;s.active=!!d.active;s.returnX=Number.isFinite(d.returnX)?d.returnX:760;s.returnY=Number.isFinite(d.returnY)?d.returnY:520;s.hasKey=!!d.hasKey;s.runes=Array.isArray(d.runes)?[!!d.runes[0],!!d.runes[1]]:[false,false];s.gateOpen=!!d.gateOpen;s.lightstone=!!d.lightstone;if(d.boss&&Number.isFinite(d.boss.hp)){s.boss={...s.boss,hp:Math.max(0,Math.min(s.boss.maxHp,d.boss.hp)),attack:Math.max(0,Number(d.boss.attack)||0),hit:0,defeated:!!d.boss.defeated||d.boss.hp<=0}}return s}
export function serializeDungeon(s){return{active:s.active,returnX:s.returnX,returnY:s.returnY,hasKey:s.hasKey,runes:[...s.runes],gateOpen:s.gateOpen,lightstone:s.lightstone,boss:{hp:s.boss.hp,attack:s.boss.attack,defeated:s.boss.defeated}}}
export function interactDungeon(s){
const p=s.player,d=s.dungeon,near=(x,y,r=58)=>Math.hypot(p.x-x,p.y-y)<r;
if(near(700,285)&&!d.hasKey){d.hasKey=true;s.status="Du findest einen kleinen Wurzel-Schlüssel.";return}
if(near(1220,255)&&!d.runes[0]){d.runes[0]=true;s.status="Rune I aktiviert. Ein tiefer Ton hallt durch den Raum.";return}
if(near(1650,255)&&!d.runes[1]){d.runes[1]=true;s.status="Rune II aktiviert. Das Siegel beginnt zu leuchten.";return}
if(near(1920,300)){if(d.gateOpen){s.status="Das Tor ist bereits geöffnet."}else if(d.hasKey&&d.runes.every(Boolean)){d.hasKey=false;d.gateOpen=true;s.status="Der Schlüssel passt. Das Tor öffnet sich!";}else s.status=!d.hasKey?"Das Tor braucht einen kleinen Schlüssel.":"Zwei Runen müssen aktiviert werden.";return}
if(near(2720,300)){if(!d.boss.defeated){s.status="Der Leuchtstein wird vom Wurzelkoloss bewacht.";return}if(!d.lightstone){d.lightstone=true;s.status="LEUCHTSTEIN ERHALTEN! Das erste Licht kehrt zurück.";return}s.status="Der Leuchtstein strahlt in deiner Tasche.";return}
if(near(100,510)){d.active=false;s.world=s.overworldWorld||new (s.world.constructor)();s.player.x=d.returnX;s.player.y=d.returnY;s.status="Du verlässt das Wurzelgewölbe.";return}
s.status="Hier gibt es nichts zu benutzen."
}
export function updateDungeon(s,dt){
const b=s.dungeon.boss,p=s.player;if(b.defeated)return;b.hit=Math.max(0,b.hit-dt);b.attack=Math.max(0,b.attack-dt);const dx=p.x-b.x,dy=p.y-b.y,dist=Math.hypot(dx,dy);if(dist<300&&dist>44){const nx=b.x+dx/dist*DUNGEON_DATA.boss.speed*dt,ny=b.y+dy/dist*DUNGEON_DATA.boss.speed*dt;if(!s.world.solidAt(nx-30,ny-34,60,68)){b.x=nx;b.y=ny}}if(dist<54&&b.attack<=0&&p.invuln<=0){p.hp=Math.max(0,p.hp-DUNGEON_DATA.boss.damage);p.invuln=.9;b.attack=1.5;s.status="Der Wurzelkoloss trifft dich!";if(!p.hp)s.mode="gameover"}
}
export function damageDungeonBoss(s,weapon){const b=s.dungeon.boss,p=s.player;if(!s.dungeon.active||b.defeated)return false;const dx=b.x-p.x,dy=b.y-p.y,dist=Math.hypot(dx,dy);if(dist>weapon.range+40)return false;const v={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[p.face],dot=(dx*v[0]+dy*v[1])/Math.max(1,dist);if(dot<.15)return false;b.hp=Math.max(0,b.hp-weapon.damage);b.hit=.2;if(!b.hp){b.defeated=true;s.status="Der Wurzelkoloss ist besiegt! Der Leuchtstein wartet."; }else s.status="Treffer am Wurzelkoloss!";return true}
export function drawDungeonEntrance(c,cam,hasLightstone){const x=760-cam.x,y=520-cam.y;c.fillStyle="#4a382b";c.fillRect(x-34,y-16,68,34);c.fillStyle="#b8d8a1";c.fillRect(x-24,y-12,48,24);c.fillStyle="#26342d";c.fillRect(x-14,y-8,28,20);c.fillStyle="#e5d18a";c.font="bold 12px system-ui";c.textAlign="center";c.fillText(hasLightstone?"Wurzelgewölbe · erkundet":"Wurzelgewölbe",x,y-24)}
