export const TAU=Math.PI*2;
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const lerp=(a,b,t)=>a+(b-a)*t;
export const rand=(a,b)=>a+Math.random()*(b-a);
export const pick=a=>a[Math.floor(Math.random()*a.length)];
export const dist2=(a,b)=>{const x=a.x-b.x,y=a.y-b.y;return x*x+y*y};
export const norm=(x,y)=>{const d=Math.hypot(x,y)||1;return{x:x/d,y:y/d}};
export const fmtTime=s=>{s=Math.max(0,Math.floor(s));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")};
export function roundedRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
export function weightedPick(items){let sum=items.reduce((n,x)=>n+x.weight,0),r=Math.random()*sum;for(const x of items){r-=x.weight;if(r<=0)return x;}return items[items.length-1];}
export function angleTo(a,b){return Math.atan2(b.y-a.y,b.x-a.x);}
export function hashNoise(n){const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);}
