import { clamp } from "./utils.js";

export class Engine{
  constructor(canvas,{update,render,onResize}){
    this.canvas=canvas;this.ctx=canvas.getContext("2d",{alpha:false});this.update=update;this.render=render;this.onResize=onResize;
    this.width=1;this.height=1;this.dpr=1;this.running=false;this.paused=true;this.speed=1;this.last=0;this.acc=0;this.step=1/60;this.zoom=1;this.raf=0;
    this.resize=this.resize.bind(this);this.frame=this.frame.bind(this);addEventListener("resize",this.resize,{passive:true});this.resize();this.bindPinch();
  }
  resize(){this.width=this.canvas.clientWidth||innerWidth;this.height=this.canvas.clientHeight||innerHeight;this.dpr=Math.min(2,devicePixelRatio||1);this.canvas.width=Math.round(this.width*this.dpr);this.canvas.height=Math.round(this.height*this.dpr);this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);this.onResize?.(this.width,this.height);}
  start(){if(this.running)return;this.running=true;this.last=0;this.raf=requestAnimationFrame(this.frame);}
  setPaused(value){this.paused=!!value;}
  setSpeed(value){this.speed=clamp(Number(value)||1,1,3);}
  frame(ts){
    if(!this.running)return;if(!this.last)this.last=ts;const dt=Math.min(.05,(ts-this.last)/1000);this.last=ts;
    if(!this.paused){
      this.acc=Math.min(.25,this.acc+dt*this.speed);let n=0;
      while(this.acc>=this.step&&n++<12&&!this.paused){this.update?.(this.step);this.acc-=this.step;}
    }
    const ctx=this.ctx;ctx.setTransform(this.dpr,0,0,this.dpr,0,0);ctx.clearRect(0,0,this.width,this.height);
    ctx.save();ctx.translate(this.width/2,this.height/2);ctx.scale(this.zoom,this.zoom);ctx.translate(-this.width/2,-this.height/2);
    this.render?.(ctx,this.width,this.height,{zoom:this.zoom,paused:this.paused,dt});ctx.restore();
    this.raf=requestAnimationFrame(this.frame);
  }
  bindPinch(){
    const points=new Map();let initial=0,base=this.zoom;
    this.canvas.addEventListener("pointerdown",e=>{if(e.pointerType!=="touch")return;points.set(e.pointerId,{x:e.clientX,y:e.clientY});if(points.size===2){const a=[...points.values()];initial=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);base=this.zoom;}},{passive:true});
    this.canvas.addEventListener("pointermove",e=>{if(!points.has(e.pointerId))return;points.set(e.pointerId,{x:e.clientX,y:e.clientY});if(points.size===2&&initial>0){const a=[...points.values()];this.zoom=clamp(base*Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)/initial,.78,1.55);}},{passive:true});
    const clear=e=>{points.delete(e.pointerId);if(points.size<2)initial=0;};this.canvas.addEventListener("pointerup",clear);this.canvas.addEventListener("pointercancel",clear);
  }
  screenToWorld(x,y){return {x:(x-this.width/2)/this.zoom+this.width/2,y:(y-this.height/2)/this.zoom+this.height/2};}
  destroy(){this.running=false;cancelAnimationFrame(this.raf);removeEventListener("resize",this.resize);}
}
