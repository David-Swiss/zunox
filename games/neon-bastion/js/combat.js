import { clamp, distance } from "./utils.js";

const TYPES = {
  pulse: { name:"Pulse", cost:60, range:3.15, rate:.62, damage:13, speed:7.5, color:"#59f4ff", projectile:3 },
  beam: { name:"Prisma", cost:95, range:4.35, rate:1.15, damage:30, speed:0, color:"#c18aff", projectile:0 },
  cannon: { name:"Nova", cost:125, range:2.65, rate:1.55, damage:62, speed:4.4, color:"#ffb45d", projectile:6 }
};

export class BattleSystem {
  constructor(mapData, onChange=()=>{}) {
    this.map=mapData; this.path=[]; this.onChange=onChange; this.reset();
  }
  reset(){
    this.enemies=[]; this.shots=[]; this.effects=[]; this.wave=1; this.energy=220;
    this.coreHealth=100; this.kills=0; this.clock=0; this.spawnClock=0;
    this.spawned=0; this.totalToSpawn=8; this.intermission=0; this.finished="";
    this.lastDamage=0;
  }
  start(){ this.reset(); this.path=this.expand(this.map.path); }
  expand(points){
    const out=[];
    for(let i=0;i<points.length-1;i++){
      const a=points[i],b=points[i+1],dx=Math.sign(b.x-a.x),dy=Math.sign(b.y-a.y);
      let x=a.x,y=a.y; out.push({x,y});
      while(x!==b.x||y!==b.y){x+=dx;y+=dy;out.push({x,y});}
    }
    return out;
  }
  spawn(){
    const boss=this.wave%5===0 && this.spawned===this.totalToSpawn-1;
    const hp=(24+this.wave*8)*(boss?9:1);
    this.enemies.push({id:this.clock+Math.random(),x:this.path[0].x,y:this.path[0].y,index:0,hp,maxHp:hp,
      speed:(boss?.72:1.12)+Math.min(.38,this.wave*.012),boss,r:boss?.34:.19,damage:boss?18:7,
      reward:boss?95:12});
    this.spawned++;
  }
  update(dt,towers){
    if(this.finished)return;
    this.clock+=dt;
    if(this.spawned<this.totalToSpawn){
      this.spawnClock-=dt;
      if(this.spawnClock<=0){this.spawn();this.spawnClock=Math.max(.34,.95-this.wave*.014);}
    }
    for(let i=this.enemies.length-1;i>=0;i--){
      const e=this.enemies[i],target=this.path[Math.min(e.index+1,this.path.length-1)];
      const dx=target.x-e.x,dy=target.y-e.y,d=Math.hypot(dx,dy),step=e.speed*dt;
      if(d<=step){e.x=target.x;e.y=target.y;e.index++;if(e.index>=this.path.length-1){
        this.coreHealth=Math.max(0,this.coreHealth-e.damage);this.lastDamage=this.clock;this.enemies.splice(i,1);
        this.effects.push({x:e.x,y:e.y,life:.5,color:"#ff668d",text:"-"+e.damage});
        if(this.coreHealth<=0){this.finished="lost";this.onChange("lost");}
      }}else{e.x+=dx/d*step;e.y+=dy/d*step;}
    }
    for(const t of towers){
      const cfg=TYPES[t.type]||TYPES.pulse;t.cooldown=(t.cooldown||0)-dt;
      if(t.cooldown>0)continue;
      let target=null,best=-1;
      for(const e of this.enemies){const d=distance(t,e);if(d<=cfg.range&&e.index>best){target=e;best=e.index;}}
      if(!target)continue;
      t.cooldown=cfg.rate/(1+(t.level-1)*.13);
      const damage=cfg.damage*(1+(t.level-1)*.68);
      if(t.type==="beam"){
        target.hp-=damage;this.effects.push({x:target.x,y:target.y,life:.22,color:cfg.color,beam:{x:t.x,y:t.y}});
        this.checkKill(target);
      }else{
        this.shots.push({x:t.x,y:t.y,target,damage,speed:cfg.speed,color:cfg.color,r:cfg.projectile});
      }
    }
    for(let i=this.shots.length-1;i>=0;i--){
      const p=this.shots[i],e=p.target;
      if(!this.enemies.includes(e)){this.shots.splice(i,1);continue;}
      const dx=e.x-p.x,dy=e.y-p.y,d=Math.hypot(dx,dy),step=p.speed*dt;
      if(d<=step+.08){e.hp-=p.damage;this.effects.push({x:e.x,y:e.y,life:.22,color:p.color});this.shots.splice(i,1);this.checkKill(e);}
      else{p.x+=dx/d*step;p.y+=dy/d*step;}
    }
    for(let i=this.effects.length-1;i>=0;i--){this.effects[i].life-=dt;if(this.effects[i].life<=0)this.effects.splice(i,1);}
    if(this.spawned>=this.totalToSpawn&&this.enemies.length===0&&this.shots.length===0){
      this.intermission+=dt;
      if(this.intermission>=2.5){
        if(this.wave>=30){this.finished="won";this.onChange("won");return;}
        this.energy+=28+this.wave*3;this.wave++;this.spawned=0;this.totalToSpawn=8+Math.min(18,this.wave);this.spawnClock=.8;this.intermission=0;
        this.onChange("wave");
      }
    }
  }
  checkKill(enemy){
    if(enemy.hp>0)return;
    const i=this.enemies.indexOf(enemy);if(i<0)return;
    this.enemies.splice(i,1);this.kills++;this.energy+=enemy.reward;
    this.effects.push({x:enemy.x,y:enemy.y,life:.65,color:enemy.boss?"#ffb45d":"#8affbd",text:"+"+enemy.reward+" E"});
  }
  draw(ctx,layout){
    const {x,y,cell}=layout;
    for(const p of this.shots){const px=x+(p.x+.5)*cell,py=y+(p.y+.5)*cell;ctx.save();ctx.shadowColor=p.color;ctx.shadowBlur=14;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(px,py,Math.max(2,p.r*cell*.55),0,Math.PI*2);ctx.fill();ctx.restore();}
    for(const e of this.enemies){const px=x+(e.x+.5)*cell,py=y+(e.y+.5)*cell,r=cell*e.r;ctx.save();ctx.shadowColor=e.boss?"#ff9d57":"#ff668d";ctx.shadowBlur=e.boss?22:12;ctx.fillStyle=e.boss?"#8d3d2d":"#8d3157";ctx.strokeStyle=e.boss?"#ffd08a":"#ff91b6";ctx.lineWidth=2;ctx.beginPath();ctx.arc(px,py,r,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.shadowBlur=0;ctx.fillStyle="#fff";ctx.fillRect(px-r,py-r-7,r*2,3);ctx.fillStyle=e.boss?"#ffc36e":"#ff6c9d";ctx.fillRect(px-r,py-r-7,r*2*clamp(e.hp/e.maxHp,0,1),3);ctx.restore();}
    for(const fx of this.effects){const px=x+(fx.x+.5)*cell,py=y+(fx.y+.5)*cell;ctx.save();ctx.globalAlpha=clamp(fx.life*3,0,1);ctx.strokeStyle=fx.color;ctx.shadowColor=fx.color;ctx.shadowBlur=13;ctx.lineWidth=2;ctx.beginPath();ctx.arc(px,py,cell*(.2+(1-fx.life)*.5),0,Math.PI*2);ctx.stroke();if(fx.text){ctx.fillStyle=fx.color;ctx.font="900 10px system-ui";ctx.textAlign="center";ctx.fillText(fx.text,px,py-cell*.6);}if(fx.beam){ctx.globalAlpha=.8;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x+(fx.beam.x+.5)*cell,y+(fx.beam.y+.5)*cell);ctx.lineTo(px,py);ctx.stroke();}ctx.restore();}
  }
}
export { TYPES as TOWER_TYPES };
