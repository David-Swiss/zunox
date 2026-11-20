// Peer-to-peer room transport for ZUNOX Chess. Signalling uses PeerJS Cloud.
export class Transport {
  connect(){throw new Error("Transport nicht konfiguriert");}
  send(_message){}
  onMessage(_callback){}
  disconnect(){}
}
export class PeerTransport extends Transport {
  constructor(){super();this.peer=null;this.connection=null;this.handlers=[];this.onStatus=()=>{};this.id="";}
  onMessage(callback){if(typeof callback==="function")this.handlers.push(callback);}
  emit(message){for(const handler of this.handlers){try{handler(message);}catch(error){console.error("Chess network handler:",error);}}}
  async loadPeer(){const module=await import("https://cdn.jsdelivr.net/npm/peerjs@1.5.5/+esm");return module.Peer||module.default?.Peer||module.default;}
  waitOpen(peer,timeout=12000){return new Promise((resolve,reject)=>{let settled=false;const done=(fn,value)=>{if(settled)return;settled=true;clearTimeout(timer);fn(value);};const timer=setTimeout(()=>done(reject,new Error("Zeitüberschreitung beim Verbindungsaufbau.")),timeout);peer.once("open",id=>done(resolve,id));peer.once("error",err=>done(reject,err));});}
  async host(){this.disconnect();this.onStatus("Online-Dienst wird verbunden …");const Peer=await this.loadPeer();this.peer=new Peer(undefined,{debug:0});this.id=await this.waitOpen(this.peer);this.peer.on("connection",conn=>{if(this.connection&&this.connection.open){conn.close();return;}this.attach(conn);});this.onStatus("Raum erstellt: "+this.id+" · Warte auf Mitspieler …");return this.id;}
  async join(id){this.disconnect();this.onStatus("Trete Raum bei …");const Peer=await this.loadPeer();this.peer=new Peer(undefined,{debug:0});await this.waitOpen(this.peer);const conn=this.peer.connect(String(id).trim(),{reliable:true});await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error("Raum nicht erreichbar oder Code falsch.")),12000);conn.once("open",()=>{clearTimeout(timer);resolve();});conn.once("error",e=>{clearTimeout(timer);reject(e);});});this.attach(conn);this.onStatus("Mitspieler verbunden.");return true;}
  attach(conn){this.connection=conn;conn.on("data",data=>this.emit(data));conn.on("open",()=>this.onStatus("Mitspieler verbunden."));conn.on("close",()=>{this.connection=null;this.onStatus("Verbindung zum Mitspieler getrennt.");});conn.on("error",e=>this.onStatus("Netzwerkfehler: "+(e?.message||e)));if(conn.open)this.onStatus("Mitspieler verbunden.");}
  send(message){if(this.connection?.open)this.connection.send(message);else this.onStatus("Noch keine Verbindung zum Mitspieler.");}
  disconnect(){try{this.connection?.close();}catch{}try{this.peer?.destroy();}catch{}this.connection=null;this.peer=null;this.id="";}
}
