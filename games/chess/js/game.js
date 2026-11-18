export const CLOCKS={bullet1:[1,0],bullet2:[2,1],blitz3:[3,0],blitz32:[3,2],blitz5:[5,0],rapid10:[10,0],rapid15:[15,10],unlimited:[0,0]};
export class ChessGame{
 constructor(Chess){this.Chess=Chess;this.reset();}
 reset(){this.chess=new this.Chess();this.history=[];this.lastMove=null;this.clockKey="rapid10";this.remaining={w:600000,b:600000};this.increment=0;this.running=false;this.lastTick=0;this.result=null;this.premoves=[];}
 get(s){return this.chess.get(s)} turn(){return this.chess.turn()} isCheck(){return this.chess.isCheck()} moves(o){return this.chess.moves(o)} move(m){const r=this.chess.move(m);if(r){this.lastMove=[r.from,r.to];this.history.push(r);if(this.running&&this.increment)this.remaining[r.color]+=this.increment*1000;}return r;}
 undo(){if(!this.chess.history().length)return false;this.chess.undo();this.history.pop();this.lastMove=this.history.length?[this.history.at(-1).from,this.history.at(-1).to]:null;return true;}
 setClock(key){this.clockKey=key;const [min,inc]=CLOCKS[key];this.remaining={w:min*60000,b:min*60000};this.increment=inc;this.running=key!=="unlimited";this.lastTick=performance.now();}
 tick(now){if(!this.running||this.result)return null;const delta=now-this.lastTick;this.lastTick=now;const side=this.turn();this.remaining[side]=Math.max(0,this.remaining[side]-delta);if(this.remaining[side]===0){this.result=side==="w"?"0-1":"1-0";this.running=false;return this.result;}return null;}
 ended(){return this.chess.isGameOver();}
 status(){if(this.chess.isCheckmate())return "Schachmatt";if(this.chess.isStalemate())return "Patt";if(this.chess.isThreefoldRepetition())return "Dreifache Stellungswiederholung";if(this.chess.isDraw())return "Remis";if(this.chess.isCheck())return "Schach";return this.turn()==="w"?"Weiß am Zug":"Schwarz am Zug";}
 fen(){return this.chess.fen()} pgn(){return this.chess.pgn()} historyVerbose(){return this.chess.history({verbose:true});}
}