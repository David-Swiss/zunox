import { Engine } from "./engine.js";
import { BastionMap } from "./map.js";
import { MAPS, DEFAULT_MAP_ID } from "../data/maps.js";
import { COMMANDERS, MUTATORS, rollRelics } from "../data/progression.js";
import { canPlaceTower } from "./pathing.js";
import { now, formatNumber } from "./utils.js";
import { BattleSystem, TOWER_TYPES } from "./combat.js";

const $=id=>document.getElementById(id);
const canvas=$("game"),hud=$("hud"),buildbar=$("buildbar"),speedbar=$("speedbar"),menu=$("menu"),pauseOverlay=$("pauseOverlay");
let mapData=MAPS.find(m=>m.id===DEFAULT_MAP_ID)||MAPS[0];
let board=new BastionMap(mapData),battle=null;
let state="menu",selected=null,towers=[],lastPlacement=null,clock=0,toastTimer=0,buildType="pulse";
const selection={map:DEFAULT_MAP_ID,commander:COMMANDERS[0].id,mutator:MUTATORS[0].id};
const engine=new Engine(canvas,{
  update:dt=>{
    clock+=dt;
    if(state==="playing"&&battle)battle.update(dt,towers);
    if(lastPlacement&&now()-lastPlacement.time>3000)lastPlacement=null;
    refreshButtons();refreshHud();
  },
  render:(ctx,w,h)=>{
    board.draw(ctx,w,h,{towers,selected,clock});
    if(battle)battle.draw(ctx,board.layout);
  }
});
const toast=message=>{
  const el=$("toast");el.textContent=message;el.classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),1700);
};
function selectedItem(list,id){return list.find(item=>item.id===id)||list[0];}
function renderChoiceList(containerId,items,kind){
  const container=$(containerId);container.replaceChildren();
  for(const item of items){
    const button=document.createElement("button");
    button.type="button";button.className="choice-card";button.setAttribute("aria-pressed",String(selection[kind]===item.id));
    const kicker=document.createElement("small"),title=document.createElement("strong"),detail=document.createElement("span");
    if(kind==="map")kicker.textContent=(item.difficulty===1?"STANDARD":"GEFAHRENSTUFE "+Math.round(item.difficulty*10)/10)+" · "+(item.relays?.length||0)+" RELAIS";
    else kicker.textContent=kind==="commander"?"KOMMANDANT":"RUN-MUTATOR";
    title.textContent=item.name;detail.textContent=item.description;
    button.append(kicker,title,detail);
    button.addEventListener("click",()=>{selection[kind]=item.id;renderSelection();});
    container.append(button);
  }
}
function renderSelection(){
  renderChoiceList("mapChoices",MAPS,"map");
  renderChoiceList("commanderChoices",COMMANDERS,"commander");
  renderChoiceList("mutatorChoices",MUTATORS,"mutator");
}
function resetMenuCopy(){
  $("menuEyebrow").textContent="ZUNOX ORIGINAL · DEFENSE PROTOCOL 04";
  $("menuTitle").innerHTML="NEON <em>BASTION</em>";
  $("menuLead").textContent="Drei Fronten. Drei Kommandanten. Dein Relikt-Build entscheidet über den Kern.";
  $("startButton").textContent="RUN KONFIGURIEREN →";
}
function openLoadout(){
  resetMenuCopy();menu.classList.add("hidden");pauseOverlay.classList.add("hidden");
  $("relicOverlay").classList.add("hidden");$("selectionOverlay").classList.remove("hidden");
  renderSelection();
}
function refreshHud(){
  if(!battle)return;
  $("coreHealth").innerHTML=Math.round(battle.coreHealth/battle.coreMax*100)+'<span>%</span>';
  $("energy").textContent=formatNumber(battle.energy);
  $("wave").innerHTML=String(battle.wave).padStart(2,"0")+'<span>/30</span>';
  $("kills").textContent=battle.kills;
}
function towerCost(base){return battle?battle.towerCost(base):base;}
function upgradeCost(){
  const tower=towers.find(t=>selected&&t.x===selected.x&&t.y===selected.y);
  return tower&&battle?battle.upgradeCost(tower.level):9999;
}
function refreshButtons(){
  const cell=selected?canPlaceTower(mapData,towers,selected.x,selected.y):{ok:false,reason:"Wähle ein freies Feld"};
  $("selectionText").textContent=selected?(cell.ok?"Bauplatz bereit":cell.reason):"Wähle ein freies Feld";
  for(const button of document.querySelectorAll("[data-tower]")){
    const cfg=TOWER_TYPES[button.dataset.tower];
    button.classList.toggle("active",button.dataset.tower===buildType);
    button.disabled=state!=="playing"||!cell.ok||!battle||battle.energy<towerCost(cfg.cost);
  }
  $("undoButton").disabled=state!=="playing"||!lastPlacement||now()-lastPlacement.time>3000;
  $("upgradeButton").disabled=state!=="playing"||!selected||!towers.some(t=>t.x===selected.x&&t.y===selected.y)||!battle||battle.energy<upgradeCost();
}
function showRelicDraft(){
  const choices=rollRelics(battle.relicIds);
  $("relicWaveLabel").textContent="WELLE "+String(battle.wave-1).padStart(2,"0")+" ÜBERSTANDEN";
  const container=$("relicChoices");container.replaceChildren();
  if(!choices.length){state="playing";$("relicOverlay").classList.add("hidden");engine.setPaused(false);return;}
  for(const relic of choices){
    const button=document.createElement("button");button.type="button";button.className="relic-card";
    const icon=document.createElement("span"),name=document.createElement("strong"),desc=document.createElement("small");
    icon.className="relic-icon";icon.textContent=relic.icon;name.textContent=relic.name;desc.textContent=relic.description;
    button.append(icon,name,desc);
    button.addEventListener("click",()=>{
      battle.addRelic(relic);state="playing";$("relicOverlay").classList.add("hidden");
      engine.setPaused(false);refreshHud();toast(relic.name+" integriert");
    });
    container.append(button);
  }
  $("relicOverlay").classList.remove("hidden");
}
function handleBattleEvent(kind){
  refreshHud();
  if(kind==="wave"){
    state="draft";engine.setPaused(true);showRelicDraft();
    toast("NEUE WELLE VORBEREITET · RELIKT GEFUNDEN");
  }
  if(kind==="won"||kind==="lost")finishRun(kind);
}
function beginRun(){
  mapData=selectedItem(MAPS,selection.map);
  const commander=selectedItem(COMMANDERS,selection.commander),mutator=selectedItem(MUTATORS,selection.mutator);
  board=new BastionMap(mapData);battle=new BattleSystem(mapData,{commander,mutator},handleBattleEvent);
  state="playing";selected=null;towers=[];lastPlacement=null;clock=0;buildType="pulse";
  battle.start();$("selectionOverlay").classList.add("hidden");menu.classList.add("hidden");
  pauseOverlay.classList.add("hidden");$("relicOverlay").classList.add("hidden");
  hud.hidden=false;buildbar.hidden=false;speedbar.hidden=false;
  $("pauseButton").disabled=false;$("phaseLabel").textContent=mapData.name.toUpperCase()+" · "+commander.name.toUpperCase();
  engine.setPaused(false);refreshHud();refreshButtons();
  toast(mapData.name.toUpperCase()+" · WELLE 1 NÄHERT SICH");
}
function placeTower(type=buildType){
  if(!selected||!battle)return;
  const cfg=TOWER_TYPES[type],check=canPlaceTower(mapData,towers,selected.x,selected.y),cost=towerCost(cfg.cost);
  if(!check.ok){toast(check.reason);return;}
  if(battle.energy<cost){toast("Nicht genug Energie");return;}
  battle.energy-=cost;
  const relay=(mapData.relays||[]).some(c=>c.x===selected.x&&c.y===selected.y);
  const tower={id:globalThis.crypto?.randomUUID?.()||String(now()),type,x:selected.x,y:selected.y,level:1,cooldown:0,relay};
  towers.push(tower);lastPlacement={tower,time:now(),cost};
  refreshHud();refreshButtons();toast(TOWER_TYPES[type].name+(relay?" · RELAIS VERBUNDEN":"-Turm platziert"));
}
function upgradeTower(){
  const tower=towers.find(t=>selected&&t.x===selected.x&&t.y===selected.y);if(!tower||!battle)return;
  const cost=battle.upgradeCost(tower.level);if(battle.energy<cost)return;
  battle.energy-=cost;tower.level++;refreshHud();refreshButtons();toast("TURM AUF STUFE "+tower.level+" VERBESSERT");
}
function undoPlacement(){
  if(!lastPlacement||now()-lastPlacement.time>3000||!battle)return;
  const i=towers.indexOf(lastPlacement.tower);if(i<0)return;
  towers.splice(i,1);battle.energy+=lastPlacement.cost;lastPlacement=null;
  refreshHud();refreshButtons();toast("Platzierung rückgängig");
}
function finishRun(result){
  state="result";engine.setPaused(true);hud.hidden=true;buildbar.hidden=true;speedbar.hidden=true;
  pauseOverlay.classList.add("hidden");$("selectionOverlay").classList.add("hidden");$("relicOverlay").classList.add("hidden");
  menu.classList.remove("hidden");
  $("menuEyebrow").textContent=result==="won"?"DEFENSE PROTOCOL · ERFOLGREICH":"DEFENSE PROTOCOL · KERN VERLOREN";
  $("menuTitle").innerHTML=result==="won"?"BASTION <em>GERETTET</em>":"KERN <em>ZERSTÖRT</em>";
  $("menuLead").textContent=result==="won"?"30 Zyklen überstanden. Deine Verteidigung hat gehalten.":"Der Energiekern ist gefallen. Passe deinen Build an und versuche es erneut.";
  $("startButton").textContent="NEUEN RUN PLANEN →";
  $("menuMicro").textContent="Ergebnis: "+battle.kills+" Abschüsse · "+battle.wave+" Wellen · "+Math.round(battle.coreHealth/battle.coreMax*100)+"% Kernintegrität · "+battle.relicIds.length+" Relikte";
}
function togglePause(force){
  if(force==="menu"){
    state="menu";engine.setPaused(true);pauseOverlay.classList.add("hidden");
    $("selectionOverlay").classList.add("hidden");$("relicOverlay").classList.add("hidden");menu.classList.remove("hidden");resetMenuCopy();return;
  }
  if(state==="menu"||state==="result"||state==="draft")return;
  if(state==="playing"){state="paused";engine.setPaused(true);pauseOverlay.classList.remove("hidden");}
  else if(state==="paused"){state="playing";engine.setPaused(false);pauseOverlay.classList.add("hidden");}
}
canvas.addEventListener("pointerdown",e=>{
  if(state!=="playing"||e.pointerType==="touch"&&e.isPrimary===false)return;
  const rect=canvas.getBoundingClientRect(),p=engine.screenToWorld(e.clientX-rect.left,e.clientY-rect.top),cell=board.hitTest(p.x,p.y);
  if(!cell){selected=null;refreshButtons();return;}
  selected=cell;
  const tower=towers.find(t=>t.x===cell.x&&t.y===cell.y);
  if(tower){buildType=tower.type;toast(TOWER_TYPES[tower.type].name+" · Stufe "+tower.level+(tower.relay?" · Relais":"")+" · Upgrade "+upgradeCost()+" E");}
  refreshButtons();
});
$("startButton").addEventListener("click",openLoadout);
$("confirmRunButton").addEventListener("click",beginRun);
$("backSelectionButton").addEventListener("click",()=>{$("selectionOverlay").classList.add("hidden");menu.classList.remove("hidden");});
for(const button of document.querySelectorAll("[data-tower]"))button.addEventListener("click",()=>{buildType=button.dataset.tower;refreshButtons();placeTower(buildType);});
$("upgradeButton").addEventListener("click",upgradeTower);
$("undoButton").addEventListener("click",undoPlacement);
$("pauseButton").addEventListener("click",()=>togglePause());
$("resumeButton").addEventListener("click",()=>togglePause());
$("menuButton").addEventListener("click",()=>togglePause("menu"));
$("soundButton").addEventListener("click",()=>toast("Audio folgt in Phase 6"));
document.querySelectorAll("[data-speed]").forEach(button=>button.addEventListener("click",()=>{
  engine.setSpeed(button.dataset.speed);
  document.querySelectorAll("[data-speed]").forEach(b=>b.classList.toggle("active",b===button));
  toast("Simulationsgeschwindigkeit "+button.dataset.speed+"×");
}));
addEventListener("keydown",e=>{if(e.code==="Escape"&&!e.repeat)togglePause();});
engine.start();refreshHud();refreshButtons();
addEventListener("error",e=>{const el=$("bootError");el.hidden=false;el.textContent="SYSTEMFEHLER: "+(e.message||"Unbekannter Fehler");});
