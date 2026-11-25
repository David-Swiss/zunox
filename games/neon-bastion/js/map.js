import { expandWaypoints } from "./pathing.js";

export class BastionMap{
  constructor(data){this.data=data;this.path=expandWaypoints(data.path);this.selected=null;this.layout={x:0,y:0,cell:32,width:0,height:0};}
  measure(width,height){
    const top=118,bottom=height<520?145:170,availableW=Math.max(180,width-28),availableH=Math.max(140,height-top-bottom);
    const cell=Math.max(13,Math.min(availableW/this.data.width,availableH/this.data.height));
    const w=cell*this.data.width,h=cell*this.data.height;
    this.layout={x:(width-w)/2,y:top+(availableH-h)/2,cell,width:w,height:h};
    return this.layout;
  }
  hitTest(px,py){
    const {x,y,cell}=this.layout,gx=Math.floor((px-x)/cell),gy=Math.floor((py-y)/cell);
    if(gx<0||gy<0||gx>=this.data.width||gy>=this.data.height)return null;
    return {x:gx,y:gy};
  }
  draw(ctx,width,height,{towers=[],selected=this.selected,clock=0}={}){
    const m=this.measure(width,height),theme=this.data.theme;
    ctx.save();
    ctx.fillStyle=theme.background;ctx.fillRect(0,0,width,height);
    const glow=ctx.createRadialGradient(width*.5,height*.48,10,width*.5,height*.48,Math.max(width,height)*.72);
    glow.addColorStop(0,"#17365333");glow.addColorStop(1,"#020610aa");ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
    ctx.translate(m.x,m.y);
    for(let y=0;y<this.data.height;y++)for(let x=0;x<this.data.width;x++){
      const px=x*m.cell,py=y*m.cell,isPath=this.path.some(c=>c.x===x&&c.y===y),isSpawn=x===this.data.spawn.x&&y===this.data.spawn.y,isCore=x===this.data.core.x&&y===this.data.core.y;
      ctx.fillStyle=isPath?"#122b42":"#0a1728";ctx.fillRect(px+1,py+1,m.cell-2,m.cell-2);
      ctx.strokeStyle=isPath?"#2b617a44":"#3b668322";ctx.lineWidth=1;ctx.strokeRect(px+.5,py+.5,m.cell-1,m.cell-1);
      if(isPath){ctx.fillStyle="#59f4ff12";ctx.fillRect(px+2,py+2,m.cell-4,m.cell-4);}
      if(isSpawn||isCore){ctx.save();ctx.shadowColor=isCore?theme.glow:theme.accent;ctx.shadowBlur=13;ctx.fillStyle=isCore?"#59f4ff":"#a879ff";ctx.beginPath();ctx.arc(px+m.cell/2,py+m.cell/2,m.cell*.22,0,Math.PI*2);ctx.fill();ctx.restore();}
    }
    ctx.beginPath();this.path.forEach((p,i)=>{const px=(p.x+.5)*m.cell,py=(p.y+.5)*m.cell;i?ctx.lineTo(px,py):ctx.moveTo(px,py);});
    ctx.strokeStyle="#59f4ff";ctx.lineWidth=Math.max(2,m.cell*.075);ctx.shadowColor="#59f4ff";ctx.shadowBlur=10;ctx.stroke();ctx.shadowBlur=0;
    for(const t of towers)this.drawTower(ctx,t,m.cell,clock);
    if(selected){ctx.strokeStyle="#c4ff75";ctx.lineWidth=2;ctx.strokeRect(selected.x*m.cell+2,selected.y*m.cell+2,m.cell-4,m.cell-4);}
    ctx.restore();
    this.drawLabels(ctx,width,height,m);
  }
  drawTower(ctx,t,cell,clock){
    const x=(t.x+.5)*cell,y=(t.y+.5)*cell,r=cell*.3;
    ctx.save();ctx.translate(x,y);ctx.shadowColor="#59f4ff";ctx.shadowBlur=10+Math.sin(clock*3)*2;
    ctx.fillStyle="#102b42";ctx.strokeStyle="#70f6ff";ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.rotate(clock*.4);ctx.strokeStyle="#c4ff75";ctx.lineWidth=Math.max(2,cell*.07);ctx.beginPath();ctx.moveTo(-r*.55,0);ctx.lineTo(r*.55,0);ctx.moveTo(0,-r*.55);ctx.lineTo(0,r*.55);ctx.stroke();
    ctx.restore();
  }
  drawLabels(ctx,width,height,m){
    ctx.save();ctx.font="800 10px system-ui";ctx.textAlign="center";ctx.fillStyle="#b9d7e9";ctx.fillText("EINGANG",m.x+m.cell*.5,m.y-8);
    ctx.fillStyle="#8ffaff";ctx.fillText("KERN",m.x+(this.data.core.x+.5)*m.cell,m.y+(this.data.core.y+1.02)*m.cell);ctx.restore();
  }
}