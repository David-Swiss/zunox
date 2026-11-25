import { keyOf } from "./utils.js";

export function expandWaypoints(waypoints){
  const cells=[];
  for(let i=0;i<waypoints.length-1;i++){
    const a=waypoints[i],b=waypoints[i+1],dx=Math.sign(b.x-a.x),dy=Math.sign(b.y-a.y);
    let x=a.x,y=a.y;cells.push({x,y});
    while(x!==b.x||y!==b.y){x+=dx;y+=dy;cells.push({x,y});}
  }
  if(waypoints.length===1)cells.push({...waypoints[0]});
  return cells;
}

export function findPath(map,blocked=new Set()){
  const start=map.spawn,goal=map.core,queue=[start],came=new Map([[keyOf(start.x,start.y),null]]),dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  while(queue.length){
    const cell=queue.shift(),key=keyOf(cell.x,cell.y);
    if(cell.x===goal.x&&cell.y===goal.y){
      const path=[];let cursor=key;
      while(cursor){const [x,y]=cursor.split(":").map(Number);path.push({x,y});cursor=came.get(cursor);}
      return path.reverse();
    }
    for(const [dx,dy] of dirs){
      const x=cell.x+dx,y=cell.y+dy,k=keyOf(x,y);
      if(x<0||y<0||x>=map.width||y>=map.height||blocked.has(k)||came.has(k))continue;
      came.set(k,key);queue.push({x,y});
    }
  }
  return null;
}

export function canPlaceTower(map,towers,x,y){
  if(x<0||y<0||x>=map.width||y>=map.height)return {ok:false,reason:"Außerhalb der Karte"};
  const cellKey=keyOf(x,y);
  if(expandWaypoints(map.path).some(c=>c.x===x&&c.y===y))return {ok:false,reason:"Der Pfad ist belegt"};
  if(towers.some(t=>t.x===x&&t.y===y))return {ok:false,reason:"Hier steht bereits ein Turm"};
  const blocked=new Set(towers.map(t=>keyOf(t.x,t.y)));blocked.add(cellKey);
  if(!findPath(map,blocked))return {ok:false,reason:"Damit würdest du den Weg blockieren"};
  return {ok:true,reason:"Bauplatz gesichert"};
}