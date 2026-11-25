import { Engine } from "./engine.js";
import { BastionMap } from "./map.js";
import { MAPS, DEFAULT_MAP_ID } from "../data/maps.js";
import { canPlaceTower } from "./pathing.js";
import { now, formatNumber } from "./utils.js";
import { BattleSystem, TOWER_TYPES } from "./combat.js";

const $=id=>document.getElementById(id);
const canvas=$("game"),hud=$("hud"),buildbar=$("buildbar"),speedbar=$("speedbar"),menu=$("menu"),pauseOverlay=$("pauseOverlay");
const mapData=MAPS.find(m=>m.id===DEFAULT_MAP_ID)||MAPS[0],board=new BastionMap(mapData);
let state="menu",selected=null,towers=[],lastPlacement=null,clock=0,toastTimer=0,buildType="pulse";
const battle=new BattleSystem(mapData,kind=>{refreshHud();if(kind==="wave")toast("WELLE ÜBERSTANDEN · ENERGIE NACHGELADEN");if(kind==="won"||kind==="lost")finishRun(kind);});
const toast=message=>{const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),1700);};
const engine=new Engine(canvas,{update:dt=>{clock+=dt;battle.update(dt,towers);if(lastPlacement&&now()-lastPlacement.time>3000)lastPlacement=null;refreshButtons();refreshHud();},render:(ctx,w,h)=>{board.draw(ctx,w,h,{towers,selected,clock});battle.draw(ctx,board.layout);}});
function refreshHud(){
  $("coreHealth").innerHTML=battle.coreHealth+'<span>%</span>';$("energy").textContent=formatNumber(battle.energy);
  $("wave").innerHTML=String(battle.wave).padStart(2,"0")+'<span>/30</span>';$("kills").textContent=battle.kills;
}
function refreshButtons(){
  const cell=selected?canPlaceTower(mapData,towers,selected.x,selected.y):{ok:false,reason:"Wähle ein freies Feld"};
  $("selectionText").textContent=selected?(cell.ok?"Bauplatz bereit":cell.reason):"Wähle ein freies Feld";
  for(const button of document.querySelectorAll("[data-tower]")){const cfg=TOWER_TYPES[button.dataset.tower];button.classList.toggle("active",button.dataset.tower===buildType);button.disabled=state!=="playing"||!cell.ok||battle.energy<cfg.cost;}
  $("undoButton").disabled=state!=="playing"||!lastPlacement||now()-lastPlacement.time>3000;
  $("upgradeButton").disabled=state!=="playing"||!selected||!towers.some(t=>t.x===selected.x&&t.y===selected.y)||battle.energy<upgradeCost();
}
function upgradeCost(){const t=towers.find(t=>selected&&t.x===selected.x&&t.y===selected.y);return t?65*t.level:9999;}
function beginRun(){
  state="playing";selected=null;towers=[];lastPlacement=null;clock=0;battle.start();
  menu.classList.add("hidden");pauseOverlay.classList.add("hidden");hud.hidden=false;buildbar.hidden=false;speedbar.hidden=false;
  $("pauseButton").disabled=false;engine.setPaused(false);refreshHud();refreshButtons();toast("KERN ONLINE · WELLE 1 NÄHERT SICH");
}
function placeTower(type=buildType){
  if(!selected)return;const cfg=TOWER_TYPES[type],check=canPlaceTower(mapData,towers,selected.x,selected.y);
  if(!check.ok){toast(check.reason);return;}if(battle.energy<cfg.cost){toast("Nicht genug Energie");return;}
  battle.energy-=cfg.cost;const tower={id:globalThis.crypto?.randomUUID?.()||String(now()),type,x:selected.x,y:selected.y,level:1,cooldown:0};
  towers.push(tower);lastPlacement={tower,time:now(),cost:cfg.cost};refreshHud();refreshButtons();toast(cfg.name+"-Turm platziert");
}
function upgradeTower(){
  const tower=towers.find(t=>selected&&t.x===selected.x&&t.y===selected.y);if(!tower)return;
  const cost=65*tower.level;if(battle.energy<cost)return;battle.energy-=cost;tower.level++;refreshHud();refreshButtons();toast("TURM AUF STUFE "+tower.level+" VERBESSERT");
}
function undoPlacement(){if(!lastPlacement||now()-lastPlacement.time>3000)return;const i=towers.indexOf(lastPlacement.tower);if(i<0)return;towers.splice(i,1);battle.energy+=lastPlacement.cost;lastPlacement=null;refreshHud();refreshButtons();toast("Platzierung rückgängig");}
function finishRun(result){
  state="result";engine.setPaused(true);hud.hidden=true;buildbar.hidden=true;speedbar.hidden=true;
  menu.classList.remove("hidden");$("startButton").textContent=result==="won"?"NOCH EIN RUN →":"ERNEUT VERSUCHEN →";
  $("menuEyebrow").textContent=result==="won"?"DEFENSE PROTOCOL · ERFOLGREICH":"DEFENSE PROTOCOL · KERN VERLOREN";
  $("menuTitle").innerHTML=result==="won"?"BASTION <em>GERETTET</em>":"KERN <em>ZERSTÖRT</em>";
  $("menuLead").textContent=result==="won"?"30 Zyklen überstanden. Deine Verteidigung hat gehalten.":"Der Energiekern ist gefallen. Passe deine Turmaufstellung an und versuche es erneut.";
  $("menuMicro").textContent="Ergebnis: "+battle.kills+" Gegner ausgeschaltet · "+battle.wave+" Wellen erreicht · "+battle.coreHealth+"% Kernintegrität";
}
function togglePause(force){
  if(state==="menu"||state==="result")return;
  if(force==="menu"){state="menu";engine.setPaused(true);pauseOverlay.classList.add("hidden");menu.classList.remove("hidden");return;}
  if(state==="playing"){state="paused";engine.setPaused(true);pauseOverlay.classList.remove("hidden");}
  else if(state==="paused"){state="playing";engine.setPaused(false);pauseOverlay.classList.add("hidden");}
}
canvas.addEventListener("pointerdown",e=>{
  if(state!=="playing"||e.pointerType==="touch"&&e.isPrimary===false)return;
  const rect=canvas.getBoundingClientRect(),p=engine.screenToWorld(e.clientX-rect.left,e.clientY-rect.top),cell=board.hitTest(p.x,p.y);
  if(!cell){selected=null;refreshButtons();return;}selected=cell;
  const tower=towers.find(t=>t.x===cell.x&&t.y===cell.y);
  if(tower){buildType=tower.type;toast(TOWER_TYPES[tower.type].name+" · Stufe "+tower.level+" · Upgrade "+upgradeCost()+" E");}
  refreshButtons();
});
$("startButton").addEventListener("click",beginRun);
for(const button of document.querySelectorAll("[data-tower]"))button.addEventListener("click",()=>{buildType=button.dataset.tower;refreshButtons();placeTower(buildType);});
$("upgradeButton").addEventListener("click",upgradeTower);
$("undoButton").addEventListener("click",undoPlacement);
$("pauseButton").addEventListener("click",()=>togglePause());
$("resumeButton").addEventListener("click",()=>togglePause());
$("menuButton").addEventListener("click",()=>togglePause("menu"));
$("soundButton").addEventListener("click",()=>toast("Audio folgt in Phase 6"));
document.querySelectorAll("[data-speed]").forEach(button=>button.addEventListener("click",()=>{engine.setSpeed(button.dataset.speed);document.querySelectorAll("[data-speed]").forEach(b=>b.classList.toggle("active",b===button));toast("Simulationsgeschwindigkeit "+button.dataset.speed+"×");}));
addEventListener("keydown",e=>{if(e.code==="Escape"&&!e.repeat)togglePause();});
engine.start();refreshHud();refreshButtons();
addEventListener("error",e=>{const el=$("bootError");el.hidden=false;el.textContent="SYSTEMFEHLER: "+(e.message||"Unbekannter Fehler");});
