import { Engine } from "./engine.js";
import { BastionMap } from "./map.js";
import { MAPS, DEFAULT_MAP_ID } from "../data/maps.js";
import { canPlaceTower } from "./pathing.js";
import { now, formatNumber } from "./utils.js";

const $=id=>document.getElementById(id);
const canvas=$("game"),hud=$("hud"),buildbar=$("buildbar"),speedbar=$("speedbar"),menu=$("menu"),pauseOverlay=$("pauseOverlay");
const mapData=MAPS.find(m=>m.id===DEFAULT_MAP_ID)||MAPS[0],board=new BastionMap(mapData);
let state="menu",energy=120,coreHealth=100,wave=0,kills=0,selected=null,towers=[],lastPlacement=null,clock=0,toastTimer=0;
const toast=message=>{const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),1700);};
const engine=new Engine(canvas,{update:dt=>{clock+=dt;if(lastPlacement&&now()-lastPlacement.time>3000)lastPlacement=null;refreshButtons();},render:(ctx,w,h)=>board.draw(ctx,w,h,{towers,selected,clock})});
function refreshHud(){$("coreHealth").innerHTML=coreHealth+'<span>%</span>';$("energy").textContent=formatNumber(energy);$("wave").innerHTML=String(wave).padStart(2,"0")+'<span>/30</span>';$("kills").textContent=kills;}
function refreshButtons(){
  const cell=selected?canPlaceTower(mapData,towers,selected.x,selected.y):{ok:false,reason:"Wähle ein freies Feld"};
  $("selectionText").textContent=selected?(cell.ok?"Bauplatz bereit":cell.reason):"Wähle ein freies Feld";
  $("pulseButton").disabled=state!=="playing"||!cell.ok||energy<60;
  $("undoButton").disabled=state!=="playing"||!lastPlacement||now()-lastPlacement.time>3000;
}
function beginRun(){state="playing";energy=120;coreHealth=100;wave=0;kills=0;selected=null;towers=[];lastPlacement=null;clock=0;menu.classList.add("hidden");pauseOverlay.classList.add("hidden");hud.hidden=false;buildbar.hidden=false;speedbar.hidden=false;$("pauseButton").disabled=false;engine.setPaused(false);refreshHud();refreshButtons();toast("Kern online · Bauphase gestartet");}
function placePulse(){if(!selected)return;const check=canPlaceTower(mapData,towers,selected.x,selected.y);if(!check.ok){toast(check.reason);return;}if(energy<60){toast("Nicht genug Energie");return;}energy-=60;const tower={id:globalThis.crypto?.randomUUID?.()||String(now()),type:"pulse",x:selected.x,y:selected.y,level:1,placedAt:now()};towers.push(tower);lastPlacement={tower,time:now()};refreshHud();refreshButtons();toast("Pulse-Turm platziert");}
function undoPlacement(){if(!lastPlacement||now()-lastPlacement.time>3000)return;const i=towers.indexOf(lastPlacement.tower);if(i<0)return;towers.splice(i,1);energy+=60;lastPlacement=null;refreshHud();refreshButtons();toast("Platzierung rückgängig");}
function togglePause(force){if(state==="menu")return;if(force==="menu"){state="menu";engine.setPaused(true);pauseOverlay.classList.add("hidden");menu.classList.remove("hidden");return;}if(state==="playing"){state="paused";engine.setPaused(true);pauseOverlay.classList.remove("hidden");}else if(state==="paused"){state="playing";engine.setPaused(false);pauseOverlay.classList.add("hidden");}}
canvas.addEventListener("pointerdown",e=>{if(state!=="playing"||e.pointerType==="touch"&&e.isPrimary===false)return;const rect=canvas.getBoundingClientRect(),p=engine.screenToWorld(e.clientX-rect.left,e.clientY-rect.top),cell=board.hitTest(p.x,p.y);if(!cell){selected=null;refreshButtons();return;}selected=cell;refreshButtons();if(towers.some(t=>t.x===cell.x&&t.y===cell.y))toast("Turm ausgewählt · Ausbau-Menü folgt in Phase 3");});
$("startButton").addEventListener("click",beginRun);
$("pulseButton").addEventListener("click",placePulse);
$("undoButton").addEventListener("click",undoPlacement);
$("pauseButton").addEventListener("click",()=>togglePause());
$("resumeButton").addEventListener("click",()=>togglePause());
$("menuButton").addEventListener("click",()=>togglePause("menu"));
$("soundButton").addEventListener("click",()=>toast("Audio-System kommt in Phase 6"));
document.querySelectorAll("[data-speed]").forEach(button=>button.addEventListener("click",()=>{engine.setSpeed(button.dataset.speed);document.querySelectorAll("[data-speed]").forEach(b=>b.classList.toggle("active",b===button));toast("Simulationsgeschwindigkeit "+button.dataset.speed+"×");}));
addEventListener("keydown",e=>{if(e.code==="Escape"&&!e.repeat)togglePause();});
engine.start();refreshHud();refreshButtons();
addEventListener("error",e=>{const el=$("bootError");el.hidden=false;el.textContent="SYSTEMFEHLER: "+(e.message||"Unbekannter Fehler");});