import {rand,TAU} from "./utils.js";
export class ParticleSystem{
 constructor(max=850){this.pool=Array.from({length:max},()=>({x:0,y:0,vx:0,vy:0,life:0,max:1,size:1,color:"#fff",drag:1,active:false,kind:0}));this.cursor=0;this.active=[];}
 emit(x,y,count=8,color="#51efff",speed=120,size=3,life=.5,kind=0){for(let i=0;i<count;i++){const p=this.pool[this.cursor++%this.pool.length],a=rand(0,TAU),v=rand(speed*.25,speed);Object.assign(p,{x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:rand(life*.55,life),max:life,size:rand(size*.5,size),color,drag:rand(.88,.97),active:true,kind});}}
 update(dt){this.active.length=0;for(const p of this.pool){if(!p.active)continue;p.life-=dt;if(p.life<=0){p.active=false;continue;}p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=Math.pow(p.drag,dt*60);p.vy*=Math.pow(p.drag,dt*60);if(p.kind===1)p.vy-=12*dt;this.active.push(p);}}
 draw(ctx){for(const p of this.active){const a=Math.max(0,p.life/p.max);ctx.globalAlpha=a;ctx.fillStyle=p.color;ctx.beginPath();if(p.kind===2){ctx.arc(p.x,p.y,p.size*(.5+(1-a)),0,TAU);}else{ctx.rect(p.x-p.size/2,p.y-p.size/2,p.size,p.size);}ctx.fill();}ctx.globalAlpha=1;}
}
