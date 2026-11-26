import{CREATURES}from"../data/creatures.js";
import{DEEP_CREATURES}from"../data/deep-creatures.js";
import{BOSSES}from"../data/bosses.js";
import{progressEvent,recordDiscovery}from"./meta.js";
export function populateCreatures(w){
 const r=w.r,all=[...CREATURES,...DEEP_CREATURES];w.creatures=[];
 for(let y=210;y<2500;y+=112){const z=w.zoneAt(y),pool=all.filter(c=>c.zone.includes(z.id));if(!pool.length)continue;for(let n=0;n<(r()<.35?2:1);n++){const d=pool[Math.floor(r()*pool.length)];w.creatures.push({id:d.id,def:d,x:(r()-.5)*230,y:y+r()*55,hp:d.hp,maxHp:d.hp,phase:r()*6,hit:0,attack:0});}}
 w.projectiles=[];w.boss=null;w.defeatedBosses=[];w.bossDef=BOSSES[0];
}
export function fireHarpoon(s,tx,ty){
 const b=s.sub;if(!b||b.battery<1||!s.world)return false;
 let dx=tx==null?(s.aim?.x||1):tx-b.x,dy=ty==null?(s.aim?.y||0):ty-b.y,l=Math.hypot(dx,dy)||1;
 s.world.projectiles.push({x:b.x+dx/l*28,y:b.y+dy/l*28,vx:dx/l*520,vy:dy/l*520,life:1.2,damage:2+(s.save.upgrades.harpoon||0)*2});
 b.battery-=1;s.audio?.ping();return true;
}
export function drillNearby(s,dt){
 const b=s.sub;if(b.battery<1)return;let t=null;
 for(const r of s.world.rocks)if(r.hp>0&&Math.hypot(r.x-b.x,r.y-b.y)<75&&(!t||Math.hypot(r.x-b.x,r.y-b.y)<Math.hypot(t.x-b.x,t.y-b.y)))t=r;
 if(!t)return;b.battery=Math.max(0,b.battery-3.5*dt);t.hp-=dt*(9+(s.save.upgrades.drill||0)*5);
 if(t.hp<=0&&!t.mined){t.mined=true;const v=Math.round((35+t.r)*s.world.zoneAt(t.y).value);b.cargo.push({type:"Erzader",value:v});b.cargoValue+=v;progressEvent(s,"ore",1);progressEvent(s,"collect",1);s.ui.toast("ERZADER ABGEBAUT · +"+v+" ¢");}
}
export function updateCreatures(s,dt){
 const w=s.world,b=s.sub;if(!w)return;
 for(let i=w.creatures.length-1;i>=0;i--){try{
  const c=w.creatures[i],d=c.def;if(Math.hypot(c.x-b.x,c.y-b.y)<500)recordDiscovery(s,c.id);c.phase+=dt;c.hit=Math.max(0,c.hit-dt);
  const dx=b.x-c.x,dy=b.y-c.y,l=Math.hypot(dx,dy)||1;
  if(d.hostile&&d.weakness==="light"&&b.light&&b.battery>0){c.x-=dx/l*d.speed*.5*dt;c.y-=dy/l*d.speed*.5*dt;}
  else if(d.hostile&&l<320){c.x+=dx/l*d.speed*.72*dt;c.y+=dy/l*d.speed*.72*dt;if(l<35&&c.attack<=0){b.hull=Math.max(0,b.hull-d.damage);c.attack=1.35;s.ui.toast(d.name+" trifft dein Boot!");}}
  else{c.x+=Math.sin(c.phase*1.4)*d.speed*.18*dt;c.y+=Math.cos(c.phase)*d.speed*.12*dt;}
  c.attack=Math.max(0,c.attack-dt);
  if(c.hp<=0){w.creatures.splice(i,1);b.cargo.push({type:d.name+" Probe",value:d.value});b.cargoValue+=d.value;progressEvent(s,"collect",1);s.ui.toast(d.name+" vertrieben · +"+d.value+" ¢");}
 }catch(e){w.creatures.splice(i,1);s.debug.errors.push("Entity: "+e.message);}}
 for(let i=w.projectiles.length-1;i>=0;i--){const p=w.projectiles[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;let hit=false;
  for(const c of w.creatures)if(Math.hypot(c.x-p.x,c.y-p.y)<19){c.hp-=p.damage*(c.def.weakness==="harpoon"?2:1);c.hit=.2;hit=true;break;}
  if(w.boss&&Math.hypot(w.boss.x-p.x,w.boss.y-p.y)<65){w.boss.hp-=p.damage;hit=true;}
  if(hit||p.life<=0)w.projectiles.splice(i,1);
 }
 if(w.bossDef&&!w.boss&&b.depth>w.bossDef.depth-15){w.boss={x:0,y:w.bossDef.depth,hp:w.bossDef.hp,maxHp:w.bossDef.hp,phase:0,tell:0,attack:0};s.ui.toast("WARNUNG · "+w.bossDef.name+" ERWACHT");}
 if(w.boss){const q=w.boss;q.phase+=dt;q.x=Math.sin(q.phase*.55)*125;q.phaseIndex=q.hp<q.maxHp*.3?2:q.hp<q.maxHp*.65?1:0;
  if(q.tell>0){q.tell-=dt;if(q.tell<=0&&Math.hypot(b.x-q.x,b.y-q.y)<280)b.hull=Math.max(0,b.hull-w.bossDef.damage);}
  else if(q.attack<=0&&Math.hypot(b.x-q.x,b.y-q.y)<320){q.tell=w.bossDef.phases[q.phaseIndex].tell;q.attack=2.4;s.ui.toast("BOSS-ANGRIFF · AUSWEICHEN!");}
  q.attack=Math.max(0,q.attack-dt);
  if(q.hp<=0){const defeated=w.bossDef;w.defeatedBosses.push(defeated.id);w.boss=null;w.bossDef=BOSSES.find(x=>!w.defeatedBosses.includes(x.id))||null;b.cargo.push({type:defeated.name+" Kern",value:defeated.reward});b.cargoValue+=defeated.reward;s.save.bossKills.push(defeated.id);progressEvent(s,"boss",1);progressEvent(s,"bossid:"+defeated.id,1,defeated.id);s.ui.toast(defeated.name+" BESIEGT · +"+defeated.reward+" ¢");if(defeated.id==="leviathan"){s.save.ending=true;s.endingUnlocked=true;progressEvent(s,"ending",1);}s.saves.write(s.save);}
 }
}
export function drawCreatures(c,s){
 const w=s.world;if(!w)return;c.save();c.translate(s.engineW/2-s.camera.x,s.engineH/2-s.camera.y);
 for(const p of w.projectiles){c.strokeStyle="#d7fff2";c.lineWidth=3;c.shadowColor="#9ffff0";c.shadowBlur=9;c.beginPath();c.moveTo(p.x-p.vx*.025,p.y-p.vy*.025);c.lineTo(p.x,p.y);c.stroke();}
 for(const e of w.creatures){if(Math.abs(e.y-s.camera.y)>s.engineH/2+45)continue;c.save();c.translate(e.x,e.y);c.fillStyle=e.hit>0?"#fff":e.def.color;c.shadowColor=e.def.color;c.shadowBlur=14;c.beginPath();if(e.id.includes("jelly")||e.id==="ghost"||e.id==="void-jelly"){c.arc(0,0,13,Math.PI,0);c.quadraticCurveTo(13,18,7,12);c.quadraticCurveTo(0,22,-7,12);c.quadraticCurveTo(-13,18,-13,0);}else c.ellipse(0,0,e.def.hostile?18:14,9,0,0,Math.PI*2);c.fill();c.shadowBlur=0;c.fillStyle="#071522";c.beginPath();c.arc(6,-2,2,0,Math.PI*2);c.fill();if(e.def.hostile){c.fillStyle="#ff9b89";c.fillRect(-14,-19,28,3);c.fillStyle="#b6f18a";c.fillRect(-14,-19,28*e.hp/e.maxHp,3);}c.restore();}
 if(w.boss){const q=w.boss;c.save();c.translate(q.x,q.y);c.fillStyle=w.bossDef?.color||"#9c6c78";c.shadowColor=w.bossDef?.color||"#ff668e";c.shadowBlur=28;c.beginPath();c.moveTo(-65,0);c.quadraticCurveTo(-30,-70,35,-42);c.quadraticCurveTo(90,0,35,42);c.quadraticCurveTo(-30,70,-65,0);c.fill();c.fillStyle="#fff2c4";c.beginPath();c.arc(25,-7,8,0,Math.PI*2);c.fill();if(q.tell>0){c.strokeStyle="#ff9a75";c.lineWidth=4;c.globalAlpha=.45+Math.sin(q.phase*12)*.3;c.beginPath();c.arc(0,0,85+Math.sin(q.phase*8)*8,0,Math.PI*2);c.stroke();c.globalAlpha=1;}c.restore();const x=s.engineW/2-100,y=s.engineH-60;c.fillStyle="#071522cc";c.fillRect(x,y,200,12);c.fillStyle="#ff688d";c.fillRect(x,y,200*q.hp/q.maxHp,12);c.fillStyle="#fff";c.font="bold 10px system-ui";c.fillText(w.bossDef?.name||"BOSS",x,y-7);}
 c.restore();
}