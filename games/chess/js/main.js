const {Chess}=await import("https://cdn.jsdelivr.net/npm/chess.js@1.4.0/+esm");
import {ChessGame,CLOCKS} from "./game.js";
import {BoardView} from "./board.js";
import {BOTS,chooseBotMove} from "./bots.js";
import {Engine} from "./engine.js";
import {Sound} from "./sound.js";
import {loadProfile,saveProfile,updateRating} from "./profile.js";
import {showScreen,$} from "./ui.js";
const game=new ChessGame(Chess),sound=new Sound(),profile=loadProfile();let bot=BOTS[2],human="w",thinking=false,clockFrame=0,coords=true;
const engine=new Engine(s=>$("engine-status").textContent=s);
if(!$("bot-select").options.length){BOTS.forEach((b,i)=>{const o=document.createElement("option");o.value=i;o.textContent=b[0]+" · "+b[1]+" Elo";$("bot-select").append(o);});}$("bot-select").value="2";
const board=new BoardView($("board"),game.chess,{onSquare:handleSquare,onDrop:(from,to)=>{if(thinking||game.result||game.turn()!==human)return;playMove({from,to});},onMark:s=>{$("game-message").textContent="Markierung: "+s;},});
function render(){board.game=game.chess;board.last=game.lastMove;board.coordinates=coords;board.theme="basic";board.root.classList.toggle("theme-blue",$("board-theme").value==="blue");board.root.classList.toggle("theme-mono",$("board-theme").value==="mono");board.render();$("turn-label").textContent=game.status();$("fen").value=game.fen();renderMoves();renderClocks();}
function renderMoves(){const h=game.historyVerbose(),root=$("moves");root.innerHTML="";for(let i=0;i<h.length;i+=2){const n=document.createElement("span");n.className="num";n.textContent=(i/2+1)+".";root.append(n);for(let j=i;j<Math.min(i+2,h.length);j++){const s=document.createElement("span");s.textContent=h[j].san;root.append(s);}}root.scrollTop=root.scrollHeight;$("captured-white").textContent=h.filter(m=>m.color==="b"&&m.captured).map(m=>({p:"♟",n:"♞",b:"♝",r:"♜",q:"♛"}[m.captured])).join(" ")||"—";$("captured-black").textContent=h.filter(m=>m.color==="w"&&m.captured).map(m=>({p:"♙",n:"♘",b:"♗",r:"♖",q:"♕"}[m.captured])).join(" ")||"—";}
function fmt(ms){if(!ms)return "∞";const s=Math.ceil(ms/1000);return Math.floor(s/60)+":"+String(s%60).padStart(2,"0");}
function renderClocks(){$("bot-clock").textContent=fmt(game.remaining[human==="w"?"b":"w"]);$("user-clock").textContent=fmt(game.remaining[human]);$("user-clock").classList.toggle("active",game.turn()===human);$("bot-clock").classList.toggle("active",game.turn()!==human);}
function handleSquare(sq){if(thinking||game.result||game.ended())return;const piece=game.get(sq);if(board.selected){const candidates=board.legal.filter(m=>m.to===sq);if(candidates.length){const promotions=candidates.filter(m=>m.promotion);if(promotions.length){showPromotion(promotions);return;}playMove({from:board.selected,to:sq});return;}if(piece&&piece.color===human){selectSquare(sq);return;}board.setSelection(null,[]);return;}if(piece&&piece.color===human)selectSquare(sq);}
function selectSquare(sq){const legal=game.moves({square:sq,verbose:true});board.setSelection(sq,legal);}
function showPromotion(moves){const box=$("promotion"),opts=$("promotion-options");opts.innerHTML="";for(const m of moves){const b=document.createElement("button");b.textContent=({q:"♕",r:"♖",b:"♗",n:"♘"})[m.promotion];b.onclick=()=>{box.classList.add("hidden");playMove({from:m.from,to:m.to,promotion:m.promotion});};opts.append(b);}box.classList.remove("hidden");}
function playMove(move){try{const from=String(move?.from||"").toLowerCase(),to=String(move?.to||"").toLowerCase();const legal=game.moves({verbose:true}).find(m=>m.from===from&&m.to===to&&(!m.promotion||m.promotion===(move.promotion||"q")));if(!legal){$("game-message").textContent="Dieser Zug ist in der aktuellen Stellung nicht legal.";board.setSelection(null,[]);return;}const result=game.move({from:legal.from,to:legal.to,...(legal.promotion?{promotion:legal.promotion}:{})});if(!result){$("game-message").textContent="Der Zug konnte nicht ausgeführt werden. Bitte wähle die Figur erneut.";board.setSelection(null,[]);return;}board.setSelection(null,[]);sound.play(result.captured?"capture":"move");if(game.isCheck())sound.play("check");render();if(game.ended()){finish();return;}if(game.turn()!==human)botTurn();}catch(e){console.error("Chess move failed:",e);$("game-message").textContent="Zugfehler: "+(e?.message||String(e));board.setSelection(null,[]);}}
async function botTurn(){if(thinking||game.result)return;thinking=true;$("game-message").textContent=bot[0]+" denkt …";const delay=350+Math.random()*700;await new Promise(r=>setTimeout(r,delay));let move=null;try{const legal=game.moves({verbose:true});move=await engine.bestMove(game.chess,bot[1]);}catch{}if(!move){const legal=game.moves({verbose:true});move=chooseBotMove(game.chess,legal,bot[1]);}thinking=false;if(move)playBotMove(move);}
function playBotMove(move){const result=game.move(move);if(!result)return;sound.play(result.captured?"capture":"move");render();if(game.ended())finish();else $("game-message").textContent=bot[0]+" hat gezogen.";}
let resultRecorded=false;
function renderProfile(){
 const ratings=profile.ratings||{bullet:800,blitz:800,rapid:800};
 $("rating-bullet").textContent=ratings.bullet??800;$("rating-blitz").textContent=ratings.blitz??800;$("rating-rapid").textContent=ratings.rapid??800;
 $("profile-games").textContent=profile.games||0;$("profile-wins").textContent=profile.wins||0;$("profile-draws").textContent=profile.draws||0;$("profile-losses").textContent=profile.losses||0;$("profile-puzzles").textContent=profile.puzzlesSolved||0;
 $("profile-summary").textContent=(profile.games||0)?"Dein Rating wird nach jeder beendeten Partie aktualisiert.":"Noch keine Partien gespielt.";
}
function finish(){
 game.running=false;const status=game.status();
 $("game-message").textContent=status+" · "+(game.chess.isCheckmate()?(game.turn()===human?"Du hast verloren.":"Du hast gewonnen."):"Partie beendet.");
 if(resultRecorded)return;resultRecorded=true;
 const raw=game.result||(game.chess.isCheckmate()?(game.turn()==="w"?"0-1":"1-0"):"1/2-1/2");
 const score=raw==="1/2-1/2"?.5:((raw==="1-0"&&human==="w")||(raw==="0-1"&&human==="b")?1:0);
 const key=game.clockKey.startsWith("bullet")?"bullet":game.clockKey.startsWith("blitz")?"blitz":"rapid";
 profile.ratings=profile.ratings||{bullet:800,blitz:800,rapid:800};
 profile.ratings[key]=updateRating(profile.ratings[key]??800,bot[1],score);
 profile.games=(profile.games||0)+1;
 if(score===1)profile.wins=(profile.wins||0)+1;else if(score===.5)profile.draws=(profile.draws||0)+1;else profile.losses=(profile.losses||0)+1;
 saveProfile(profile);renderProfile();
}
function newGame(){resultRecorded=false;game.reset();board.setSelection(null,[]);const [mins,inc]=CLOCKS[$("time-select").value];game.setClock($("time-select").value);bot=BOTS[Number($("bot-select").value)];const c=$("color-select").value;human=c==="random"?(Math.random()<.5?"w":"b"):c==="white"?"w":"b";board.flipped=human==="b";$("bot-name").textContent=bot[0]+" · "+bot[1];$("bot-avatar").textContent="♟";$("game-message").textContent=bot[3];thinking=false;render();if(human==="b")botTurn();}
$("new-game").addEventListener("click",()=>{try{newGame();}catch(e){console.error("Chess start failed:",e);$("game-message").textContent="Startfehler: "+(e?.message||String(e));}});$("undo").onclick=()=>{if(thinking)return;if(game.undo())game.undo();render();$("game-message").textContent="Zug zurückgenommen.";};$("resign").onclick=()=>{if(game.ended())return;game.result=human==="w"?"0-1":"1-0";finish();};$("offer-draw").onclick=()=>{$("game-message").textContent=bot[1]>=1500?"Der Bot lehnt das Remis ab.":"Der Bot nimmt das Remis an.";if(bot[1]<1500){game.result="1/2-1/2";finish();}};$("flip").onclick=()=>board.flip();$("coords").onclick=()=>{coords=!coords;render();$("coords").textContent="Koordinaten: "+(coords?"An":"Aus");};$("arrows").onclick=()=>{$("game-message").textContent="Alle Markierungen gelöscht.";};$("copy-fen").onclick=()=>navigator.clipboard?.writeText(game.fen());$("copy-pgn").onclick=()=>navigator.clipboard?.writeText(game.pgn());$("board-theme").onchange=render;$("coords-toggle").onchange=e=>{coords=e.target.checked;render();};$("sound-toggle").onchange=e=>sound.enabled=e.target.checked;
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>showScreen(b.dataset.screen));
function tick(){if(game.running&&!game.result){const result=game.tick(performance.now());renderClocks();if(result)finish();}clockFrame=requestAnimationFrame(tick);}document.addEventListener("visibilitychange",()=>{if(document.hidden&&thinking)engine.stop();});window.addEventListener("pagehide",()=>{cancelAnimationFrame(clockFrame);engine.stop();});render();
function setupPuzzle(){
 const fen="7k/8/5KQ1/8/8/8/8/8 w - - 0 1";
 const puzzle=new Chess(fen);let selected=null,solved=false;
 const view=new BoardView($("puzzle-board"),puzzle,{onSquare:sq=>{
  if(solved)return;
  const piece=puzzle.get(sq);
  if(selected){const legal=puzzle.moves({square:selected,verbose:true});
   if(legal.some(m=>m.to===sq)){
    const move=puzzle.move({from:selected,to:sq});
    if(move&&move.san==="Qg7#"){solved=true;profile.puzzlesSolved=(profile.puzzlesSolved||0)+1;saveProfile(profile);$("puzzle-message").textContent="Richtig! Schachmatt in einem Zug. Stark!";renderProfile();$("puzzle-score").textContent="Gelöst: "+profile.puzzlesSolved;view.setSelection(null,[]);return;}
    $("puzzle-message").textContent="Guter Versuch – aber das ist nicht das Matt. Starte das Puzzle neu.";
    view.setSelection(null,[]);return;
   }
  }
  if(piece&&piece.color==="w"){selected=sq;view.setSelection(sq,puzzle.moves({square:sq,verbose:true}));}else{selected=null;view.setSelection(null,[]);}
 },onDrop:(from,to)=>{if(!solved&&from==="g6"&&to==="g7"){const m=puzzle.move({from,to});if(m&&m.san==="Qg7#"){solved=true;profile.puzzlesSolved=(profile.puzzlesSolved||0)+1;saveProfile(profile);$("puzzle-message").textContent="Richtig! Schachmatt in einem Zug. Stark!";renderProfile();$("puzzle-score").textContent="Gelöst: "+profile.puzzlesSolved;view.render();}}}});
 $("puzzle-message").textContent="Weiß ist am Zug. Finde das Matt in einem Zug!";
}
function analyzeGame(){
 const h=game.historyVerbose(),box=$("analysis-summary"),list=$("analysis-moves");list.innerHTML="";
 if(!h.length){box.textContent="Noch keine Züge vorhanden. Spiele zuerst eine Partie.";return;}
 const captures=h.filter(m=>m.captured).length,checks=h.filter(m=>/[+#]$/.test(m.san)).length;
 box.innerHTML="<b>"+h.length+" Halbzüge analysiert</b><p>"+captures+" Schlagzüge · "+checks+" Schachgebote/Mattzüge</p><small>Hinweis: Das ist eine lokale Schnellbewertung, keine vollständige Stockfish-Engineanalyse.</small>";
 h.forEach((m,i)=>{const row=document.createElement("div");row.className="analysis-row";const quality=m.san.includes("#")?"Matt":m.san.includes("+")?"Schachgebot":m.captured?"Schlagzug":"Normaler Zug";row.innerHTML="<b>"+(Math.floor(i/2)+1)+(m.color==="w"?". ":"... ")+"</b><span>"+m.san+"</span><small>"+quality+"</small>";list.append(row);});
}
$("analyze-game").onclick=analyzeGame;
$("puzzle-reset").onclick=setupPuzzle;
$("puzzle-score").textContent="Gelöst: "+(profile.puzzlesSolved||0);
renderProfile();setupPuzzle();clockFrame=requestAnimationFrame(tick);
