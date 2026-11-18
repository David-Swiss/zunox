export class AudioEngine{
 constructor(){this.ctx=null;this.master=null;this.enabled=true;this.beat=0;this.intensity=0;this.timer=0;}
 init(){if(this.ctx){if(this.ctx.state==="suspended")this.ctx.resume();return;}const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;this.ctx=new AC();this.master=this.ctx.createGain();this.master.gain.value=.18;this.master.connect(this.ctx.destination);}
 setEnabled(v){this.enabled=v;if(this.master)this.master.gain.setTargetAtTime(v ? .18 : 0,this.ctx.currentTime,.04);}
 tone(freq=440,duration=.08,type="sine",volume=.2,slide=0){if(!this.enabled||!this.ctx)return;const t=this.ctx.currentTime,o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(25,freq+slide),t+duration);g.gain.setValueAtTime(volume,t);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.connect(g);g.connect(this.master);o.start(t);o.stop(t+duration+.02);}
 shoot(){this.tone(720,.055,"square",.035,-360);}
 hit(){this.tone(170,.09,"triangle",.09,-80);}
 kill(){this.tone(310,.11,"sawtooth",.055,250);}
 level(){this.tone(420,.18,"sine",.12,500);setTimeout(()=>this.tone(720,.22,"sine",.09,300),95);}
 hurt(){this.tone(105,.2,"sawtooth",.12,-55);}
 boss(){this.tone(90,.8,"sawtooth",.12,35);}
 update(dt,count){if(!this.enabled||!this.ctx)return;this.intensity+=(Math.min(1,count/40)-this.intensity)*Math.min(1,dt*2);this.timer-=dt;const interval=.62-this.intensity*.28;if(this.timer<=0){this.timer=interval;const f=this.beat++%4===0?68: this.beat%2?110:82;this.tone(f,.12,"triangle",.018+this.intensity*.018,-12);}}
}
