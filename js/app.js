import {ROOMS,ITEMS,ICONS,HOTSPOT_COUNT,FRAGMENTS} from './content.js';
import {initialState,restore,dispatch,objects,unlocked,dialog,objective} from './engine.js';
import {drawScene,drawTitle,drawEnding,drawPortrait} from './art.js';
const $=id=>document.getElementById(id),SAVE_KEY='caschy-adventure-404-v1';
let state=initialState(),log=[],verb='look',selected=null,title=true,sound=false,audio=null,storageOK=true,dialogueOrigin=null;
try{const raw=localStorage.getItem(SAVE_KEY);if(raw){const data=JSON.parse(raw),saved=restore(data.state);if(saved){state=saved;log=Array.isArray(data.log)?data.log.filter(x=>typeof x==='string').slice(0,35):[];}else{$('save-status').textContent='Alter Speicherstand nicht lesbar. Neues Spiel bereit.';storageOK=false;}}}catch{storageOK=false;$('save-status').textContent='Lokaler Speicher nicht verfügbar.';}
function el(tag,attrs={},text=''){const n=document.createElement(tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text)n.textContent=text;return n;}
function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify({state,log}));storageOK=true;$('save-status').classList.remove('error');$('save-status').textContent='✓ Lokal gespeichert';}catch{storageOK=false;$('save-status').classList.add('error');$('save-status').textContent='Speichern nicht möglich – Tab offen lassen';}}
function sfx(success=false){if(!sound||!audio)return;try{const o=audio.createOscillator(),g=audio.createGain();o.type='square';o.frequency.setValueAtTime(success?523:220,audio.currentTime);if(success)o.frequency.setValueAtTime(784,audio.currentTime+.09);g.gain.setValueAtTime(.025,audio.currentTime);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+.18);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+.2);}catch{/* Audio is optional. */}}
function run(event){const previousPending=state.pending,origin=document.activeElement?.getAttribute('data-focus');const result=dispatch(state,event);if(!previousPending&&result.state.pending)dialogueOrigin=origin;state=result.state;if(result.message){log.unshift(result.message);log=log.slice(0,35);}if(selected&&!state.inventory.includes(selected))selected=null;save();render(result.tone);sfx(result.tone==='success');
 if(previousPending&&!state.pending){(document.querySelector(`[data-focus="${CSS.escape(dialogueOrigin||'verb-'+verb)}"]`)||document.querySelector(`[data-verb="${verb}"]`))?.focus({preventScroll:true});}
 if(state.pending&&state.pending!==previousPending){const target=$('dialogue').querySelector('input,button');target?.focus({preventScroll:true});if(matchMedia('(max-width:760px)').matches)$('dialogue').scrollIntoView({block:'start',behavior:'instant'});}
}
function target(id){run({type:'act',target:id,verb,item:selected});}
function render(tone='normal'){
 const active=document.activeElement,focusId=active?.getAttribute('data-focus');
 $('title-screen').hidden=!title;$('game').hidden=title||!!state.ending;$('ending').hidden=title||!state.ending;
 $('resume').hidden=!state.flags.started;$('start').hidden=state.flags.started;
 if(title){drawTitle($('title-canvas'));return;}
 if(state.ending){renderEnding();return;}
 $('map').replaceChildren();Object.entries(ROOMS).forEach(([id,r],i)=>{const b=el('button',{'data-room':id,'data-focus':'room-'+id,'aria-current':id===state.room?'page':'false','aria-label':`${r.name}${unlocked(state,id)?'':' – noch verschlossen'}`});b.append(el('span',{class:'room-index'},String(i+1).padStart(2,'0')),document.createTextNode(r.name+(unlocked(state,id)?'':' ▪')));b.disabled=!unlocked(state,id);b.addEventListener('click',()=>{selected=null;run({type:'move',room:id});});$('map').append(b);});
 const room=ROOMS[state.room];$('room-name').textContent=room.name;$('room-number').textContent=`KAPITEL ${String(Object.keys(ROOMS).indexOf(state.room)+1).padStart(2,'0')} / 07`;$('room-subtitle').textContent=room.subtitle;$('scene').setAttribute('aria-label',`Pixelszene ${room.name}. ${room.subtitle}. Alle interaktiven Objekte sind als Buttons zugänglich.`);drawScene($('scene'),state);
 $('hotspots').replaceChildren();$('object-list').replaceChildren();
 objects(state).forEach((o,i)=>{
  const b=el('button',{class:'hotspot','aria-label':o.name,'data-hotspot':o.id,'data-focus':'hotspot-'+o.id});b.style.cssText=`left:${o.x}%;top:${o.y}%;width:${o.w}%;height:${o.h}%`;b.append(el('span',{class:'dot','aria-hidden':'true'},String(i+1)),el('span',{class:'tooltip','aria-hidden':'true'},o.name));b.addEventListener('click',()=>target(o.id));b.addEventListener('mouseenter',()=>updateCommand(o.name));b.addEventListener('mouseleave',()=>updateCommand());b.addEventListener('focus',()=>updateCommand(o.name));b.addEventListener('blur',()=>updateCommand());$('hotspots').append(b);
  const list=el('button',{'data-object':o.id,'data-focus':'object-'+o.id});list.append(el('span',{class:'object-index','aria-hidden':'true'},String(i+1).padStart(2,'0')),document.createTextNode(o.name));list.addEventListener('click',()=>target(o.id));$('object-list').append(list);
 });
 document.querySelectorAll('[data-verb]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.verb===verb)));
 $('inventory').replaceChildren();$('inventory-count').textContent=String(state.inventory.length);$('cancel-item').hidden=!selected;
 if(!state.inventory.length)$('inventory').append(el('p',{class:'empty-inventory'},'Noch leer. Zum Glück keine Abo-Karten.'));
 state.inventory.forEach(id=>{const b=el('button',{class:'item','data-item':id,'data-focus':'item-'+id,'aria-label':ITEMS[id],'aria-pressed':String(selected===id)});b.append(el('span',{class:'icon','aria-hidden':'true'},ICONS[id]||'▧'),el('span',{},ITEMS[id]));b.addEventListener('click',()=>{if(selected&&selected!==id){run({type:'combine',a:selected,b:id});selected=null;render();}else{selected=selected===id?null:id;if(selected)verb='use';render();}});$('inventory').append(b);});
 const [,goal]=objective(state);$('objective').textContent=goal;$('progress').textContent=`${FRAGMENTS.filter(f=>state.flags[f]||state.slots.includes(f)||(f==='compass'&&state.flags.found)).length}/4 ◇`;
 $('discoveries').textContent=`${state.seen.length} / ${HOTSPOT_COUNT} Entdeckungen`;
 $('message').textContent=log[0]||'Wähle eine Aktion und ein Ziel.';$('message').className=tone;$('message').hidden=!!state.pending&&log[0]===dialog(state)?.text;
 $('log').replaceChildren(...log.slice(1).map(t=>el('li',{},t)));
 renderDialogue();updateCommand();
 if(focusId){const next=document.querySelector(`[data-focus="${CSS.escape(focusId)}"]`);(next||(state.pending?$('dialogue').querySelector('input,button'):null))?.focus({preventScroll:true});}
 if(!storageOK){$('save-status').classList.add('error');}
}
function renderDialogue(){
 $('dialogue').replaceChildren();const d=dialog(state);if(!d)return;
 const people=['caschy','andre','olli','felix','benny'],character=people.includes(state.pending)?state.pending:null;
 const heading=el('h3',{},d.title),copy=el('p',{},d.text);
 if(character){
  const profile=el('div',{class:'dialogue-profile'}),portrait=el('canvas',{class:'dialogue-portrait',role:'img','aria-label':`Detailliertes Pixelporträt von ${d.title.split(' · ')[0]}`}),text=el('div',{class:'dialogue-copy'});
  text.append(heading,copy);profile.append(portrait,text);$('dialogue').append(profile);drawPortrait(portrait,character);
 }else $('dialogue').append(heading,copy);
 const choices=el('div',{class:'choices'});
 if(d.input){const form=el('form'),label=el('label',{for:'team-code'},'Teamcode (8 Ziffern)'),input=el('input',{id:'team-code',name:'team-code',inputmode:'numeric',autocomplete:'off',maxlength:'12',placeholder:'·· ·· ·· ··','data-focus':'team-code'}),submit=el('button',{type:'submit','data-focus':'team-submit'},'Code prüfen');form.append(label,input,submit);form.addEventListener('submit',e=>{e.preventDefault();run({type:'choose',value:input.value});});choices.append(form);}
 else d.options.forEach(o=>{const b=el('button',{'data-choice':o.id,'data-focus':'choice-'+o.id},o.label);b.addEventListener('click',()=>run({type:'choose',id:o.id}));choices.append(b);});
 const close=el('button',{class:'close-dialogue','data-focus':'close-dialogue'},'Gespräch / Rätsel schließen');close.addEventListener('click',()=>run({type:'close'}));$('dialogue').append(choices,close);
}
function updateCommand(name='…'){const labels={look:'Ansehen',take:'Nehmen',use:'Benutzen',talk:'Rede mit'};$('command').textContent=selected?`${ITEMS[selected]} benutzen mit ${name}`:`${labels[verb]} ${name}`;}
function renderEnding(){const bad=state.ending==='bad';$('ending-kicker').textContent=bad?'NEBENENDE / DAS GEHT BESSER':'FEIERABEND / 200 OK';$('ending-title').textContent=bad?'Der Preis der Klicks':'Das Blog ist wieder da.';$('ending-text').textContent=bad?'47 Kaufbuttons, 12 Rabattcodes und ein Abo auf das eigene Feierabendbier. Der Algorithmus jubelt. Caschy nicht. Du kannst die Überschrift sofort ändern; alle Rätsel bleiben gelöst.':'André legt das Proton Pack ab. Felix schaltet die Lichter lokal. Olli schließt den Feierabendring. Benny findet das Bier – in der richtigen Tasche. Caschy: „Kein Clickbait. Kein Bullshit. Wir lesen uns.“ Kuchen für alle. Es gibt keinen Plan B.';drawEnding($('ending-canvas'),bad);$('ending-canvas').setAttribute('aria-label',bad?'Das ganze Team am Hafen, über dem Kuchen regnet Affiliate-Konfetti.':'Caschy, André, Benny, Olli und Felix feiern am Hafen mit Kuchen und Bier.');$('ending-actions').replaceChildren();
 const b=el('button',{class:'primary',id:bad?'return-headline':'explore'},bad?'Überschrift überarbeiten →':'Weiter auf Easter-Egg-Suche');b.addEventListener('click',()=>{if(bad)run({type:'continue'});else{state.ending=null;run({type:'move',room:'newsroom'});}});$('ending-actions').append(b);const restart=el('button',{},'Noch einmal spielen');restart.addEventListener('click',()=>$('restart-dialog').showModal());$('ending-actions').append(restart);
}
$('start').addEventListener('click',()=>{title=false;run({type:'start'});});$('resume').addEventListener('click',()=>{title=false;render();});
$('home').addEventListener('click',e=>{e.preventDefault();title=true;render();window.scrollTo(0,0);});
$('restart').addEventListener('click',()=>$('restart-dialog').showModal());$('restart-cancel').addEventListener('click',()=>$('restart-dialog').close());$('restart-confirm').addEventListener('click',()=>{$('restart-dialog').close();state=initialState();log=[];selected=null;verb='look';title=false;run({type:'start'});});
$('hint').addEventListener('click',()=>run({type:'hint'}));$('cancel-item').addEventListener('click',()=>{selected=null;render();});
$('sound').addEventListener('click',async()=>{sound=!sound;if(sound){try{audio??=new(window.AudioContext||window.webkitAudioContext)();await audio.resume();}catch{sound=false;}}$('sound').setAttribute('aria-pressed',String(sound));$('sound').textContent=sound?'Ton: an':'Ton: aus';sfx(true);});
 document.querySelectorAll('[data-verb]').forEach(b=>{b.setAttribute('data-focus','verb-'+b.dataset.verb);b.addEventListener('click',()=>{verb=b.dataset.verb;selected=null;render();});});
 document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA'].includes(e.target.tagName)||$('restart-dialog').open)return;if(e.key==='Escape'){selected=null;if(state.pending)run({type:'close'});else render();}if(!title&&!state.ending&&['1','2','3','4'].includes(e.key)){verb=['look','take','use','talk'][Number(e.key)-1];selected=null;render();}});
render();
