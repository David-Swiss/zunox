import {clamp,TAU} from "./utils.js";
export const SHIPS=[
 {id:"scout",name:"SCOUT",desc:"Ausgewogenes Allround-Schiff.",weapon:"pulse",passive:"Präzisionskern: +8% Schaden.",color:"#51efff",price:0},
 {id:"wraith",name:"WRAITH",desc:"Schnell und schwer zu treffen.",weapon:"orbit",passive:"+18% Bewegungstempo.",color:"#ff4bd8",price:90},
 {id:"bulwark",name:"BULWARK",desc:"Ein schwerer, widerstandsfähiger Jäger.",weapon:"rocket",passive:"+35 maximale HP.",color:"#ffe36e",price:180}
];
export class Player{
 constructor(meta,shipId="scout"){this.meta=meta;this.ship=SHIPS.find(s=>s.id===shipId)||SHIPS[0];this.x=0;this.y=0;this.r=13;this.angle=-Math.PI/2;this.speed=235*(this.ship.id==="wraith"?1.18:1);this.maxHp=100+(meta.upgrades.hp||0)*12+(this.ship.id==="bulwark"?35:0);this.hp=this.maxHp;this.regen=0;this.damage=1+(meta.upgrades.damage||0)*.08;this.fireRate=1;this.projectileSize=1;this.magnet=125;this.luck=0;this.xpBonus=1+(meta.upgrades.xp||0)*.08;this.level=1;this.xp=0;this.nextXp=12;this.kills=0;this.weapons={};this.passives={};this.invuln=0;this.hitFlash=0;this.dash=0;}
 update(dt,input,world){const m=Math.hypot(input.x,input.y);if(m>.06){const f=Math.min(1,m);this.x+=input.x/m*this.speed*f*dt;this.y+=input.y/m*this.speed*f*dt;this.angle=Math.atan2(input.y,input.x);}this.regen+=dt;if(this.regen>1){this.regen=0;if(this.hp<this.maxHp)this.hp=Math.min(this.maxHp,this.hp+.35);}this.invuln=Math.max(0,this.invuln-dt);this.hitFlash=Math.max(0,this.hitFlash-dt);this.dash=Math.max(0,this.dash-dt);}
 damageBy(n){if(this.invuln>0)return false;this.hp=Math.max(0,this.hp-n);this.invuln=.55;this.hitFlash=.16;return true;}
 heal(n){this.hp=Math.min(this.maxHp,this.hp+n);}
 addXp(n){this.xp+=n*this.xpBonus;let levels=0;while(this.xp>=this.nextXp){this.xp-=this.nextXp;this.level++;this.nextXp=Math.floor(this.nextXp*1.24+5);levels++;}return levels;}
 draw(ctx){ctx.save();ctx.translate(this.x,this.y);ctx.rotate(this.angle+Math.PI/2);ctx.globalAlpha=this.invuln>0&&Math.floor(this.invuln*18)%2===0?.45:1;ctx.shadowBlur=18;ctx.shadowColor=this.ship.color;ctx.fillStyle=this.hitFlash>0?"#fff":this.ship.color;ctx.beginPath();ctx.moveTo(0,-19);ctx.lineTo(13,14);ctx.lineTo(0,9);ctx.lineTo(-13,14);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle="#071323";ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(4,7);ctx.lineTo(-4,7);ctx.fill();ctx.fillStyle="#ff9b55";ctx.globalAlpha=.8;ctx.beginPath();ctx.moveTo(-4,13);ctx.lineTo(0,22+Math.random()*5);ctx.lineTo(4,13);ctx.fill();ctx.restore();ctx.globalAlpha=1;}
}
