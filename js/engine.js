import {ITEMS,ROOMS,FRAGMENTS,BANTER} from './content.js';
export const SAVE_VERSION=1;
const FLAG_NAMES=['started','forum','origin','school','andre','career','ghost','drawn','voice','olli','felix','bridge','clarity','benny','journey','found','team','publish','core','won','bad','took_usb','took_firefox','took_pencil','took_sensor','took_tracker'];
export function initialState(){return {version:SAVE_VERSION,room:'newsroom',inventory:[],flags:Object.fromEntries(FLAG_NAMES.map(k=>[k,false])),slots:[],seen:[],turn:0,pending:null,progress:{},hintStep:0,hintKey:'',ending:null};}
export function restore(raw){
 try{
  const s=typeof raw==='string'?JSON.parse(raw):raw;
  if(!s||s.version!==SAVE_VERSION||!ROOMS[s.room]||!Array.isArray(s.inventory)||s.inventory.some(i=>!ITEMS[i])||new Set(s.inventory).size!==s.inventory.length||!s.flags||FLAG_NAMES.some(k=>typeof s.flags[k]!=='boolean')||!Array.isArray(s.slots)||s.slots.some(i=>!FRAGMENTS.includes(i))||new Set(s.slots).size!==s.slots.length||!Array.isArray(s.seen)||s.seen.some(i=>typeof i!=='string')||!Number.isSafeInteger(s.turn)||s.turn<0||!s.progress||typeof s.progress!=='object'||Object.values(s.progress).some(n=>!Number.isInteger(n)||n<0||n>5))return null;
  if(s.pending!==null&&(typeof s.pending!=='string'||!['forum','migration','school','career','drawing','bridge','journey','team','headline','andre','olli','felix','benny','caschy'].includes(s.pending)))return null;
  return {...initialState(),...s,flags:{...s.flags},inventory:[...s.inventory],slots:[...s.slots],seen:[...s.seen]};
 }catch{return null;}
}
export function unlocked(s,id){return id==='newsroom'||id==='archive'||(['workshop','lab','quay'].includes(id)&&s.flags.origin)||(id==='server'&&s.flags.found)||(id==='core'&&s.flags.core);}
export function visible(s,o){
 if(['usb','firefox','pencil','sensor','tracker'].includes(o.id)&&s.flags['took_'+o.id])return false;
 if(o.id==='ghost'&&s.flags.ghost)return false;
 return true;
}
export function objects(s){return ROOMS[s.room].objects.filter(o=>visible(s,o));}
const quiz={
 school:{question:'Welche frühe Station kommt als Nächstes?',answers:[['c','C16 / C64'],['a','Computer-AG'],['p','Schülerzeitung']],order:['c','a','p']},
 career:{question:'Lebenslauf-Schloss: Welche Station folgt?',answers:[['steel','Stahl- und Betonbauer'],['army','Bundeswehr'],['it','IT-Systemelektroniker'],['pc','Technischer Leiter bei PC-Spezialist'],['saturn','Neue Medien bei Saturn']],order:['steel','army','it','pc','saturn']},
 bridge:{question:'Felix: „Welche Schicht kommt als Nächstes?“',answers:[['thread','Thread-Netz aufbauen'],['matter','Matter-Gerät verbinden'],['offline','Geprüfte Offline-Firmware laden'],['cloud','Noch ein Cloud-Konto anlegen']],order:['thread','matter','offline']},
 journey:{question:'Vom Blog ins Business: Welche Station folgt?',answers:[['2008','Ende 2008: arbeitslos'],['power','Powerflasher über Blogkontakte'],['nnb','notebooksbilliger-Blog'],['self','Selbstständigkeit']],order:['2008','power','nnb','self']}
};
export function dialog(s){
 const p=s.pending;if(!p)return null;
 if(quiz[p]){const q=quiz[p],n=s.progress[p]||0;return {title:q.question,text:`Schritt ${n+1} von ${q.order.length}. Die Reihenfolge steht im Raum. Fehler kosten nichts.`,options:q.answers.map(([id,label])=>({id,label}))};}
 const tables={
 forum:{title:'The Bat! Supportforum',text:'Willkommen zurück. Wie sprechen deine Freunde „Caschy“ aus?',options:[{id:'kaschi',label:'Kaschi'},{id:'käschi',label:'Käschi'},{id:'cache',label:'Cache löschen'}]},
 drawing:{title:'Das Recht am eigenen Pixel',text:'700 Euro waren kein Witz. Hier geht es ohne fremdes Bildmaterial. Was zeichnen wir?',options:[{id:'own',label:'Eine eigene Bockwurst aus zwölf Pixeln'},{id:'copy',label:'Ein fremdes Foto einfach nachladen'},{id:'credit',label:'„Quelle: Internet“ drunterschreiben'}]},
 team:{title:'Das Team-Schloss',text:'Aufsteigende Eintrittsjahre, jeweils zweistellig: André → Benny → Olli → Felix. Acht Ziffern. Die Jahreszahlen stehen bei den Figuren.',input:true,options:[]},
 headline:{title:'Die letzte redaktionelle Entscheidung',text:'Der Algorithmus bietet Reichweite gegen Haltung. Der Artikel handelt vom wiederhergestellten Blog. Was veröffentlichen wir?',options:[{id:'clear',label:'Blog nach Störung wieder erreichbar'},{id:'bait',label:'DIESER GLATZKOPF SCHOCKT DAS INTERNET!'},{id:'vague',label:'Was dann geschah, hätte niemand erwartet …'}]},
 andre:{title:'André · Technik, Games & Serien · 2015',text:'„Ein 404-Poltergeist! Endlich darf ich ein Proton Pack testen. Aber Medienpädagogik sagt: erst erden, dann strahlen. Die Spule bekommst du von mir; das Kabel liegt im Lebenslauf-Schrank.“',options:[{id:'help',label:'Spule nehmen und den Plan besprechen'},{id:'novel',label:'Wie läuft der Roman?'}]},
 olli:{title:'Olli · Apple, Health & SAP · 2017',text:'„Die Cloud-Tür meldet: in der EU nicht verfügbar. Wir brauchen sie gar nicht. Felix repariert die Brücke. Kombiniere den lokalen Health-Sensor mit meiner Diagnose-Watch und zeig mir das Ergebnis.“',options:[{id:'help',label:'Diagnose-Watch ausleihen'},{id:'sap',label:'Ist das schon in SAP gebucht?'}]},
 felix:{title:'Felix · Lehrer & Smart Home · 2018',text:'„Des kriegen wir lokal hin. Erst Thread als Netz, dann Matter als Standard, dann geprüfte Offline-Firmware. Die Firmware liegt auf dem alten Schulrechner im Archiv. Benutze sie an der Brücke.“',options:[{id:'help',label:'Den Reparaturplan gemeinsam prüfen'},{id:'cost',label:'Wie teuer wird das?'}]},
 benny:{title:'Benny · Nordlicht & Technik · 2016',text:'„Der Serverschlüssel ist verschollen. Mein Find-Hub-Peiler braucht Ollis Akku. Benutze den aktiven Peiler dann an mir; ich kenne das Schlüsselsignal. Und löse den Berufungs-Fahrplan – Richtung haben hilft bei der Suche.“',options:[{id:'help',label:'Suche gemeinsam vorbereiten'},{id:'pocket',label:'Hast du in deinen Taschen gesucht?'}]},
 caschy:{title:'Caschy · Kaschi, nicht Cache',text:'„Freitag, fünf vor sechs. Der Algorithmus klaut meinen Artikel und will Clickbait. Holen wir den Anfang und unsere Haltung zurück. Niemand stirbt hier. Außer vielleicht mein Feierabend.“',options:[{id:'goal',label:'Was ist der Plan?'},{id:'hair',label:'Die Frisur sitzt.'}]}
 };
 if(p==='migration'){
  const n=s.progress.migration||0;
  return [
   {title:'Umzug · 1/3',text:'Auf welchem System begann das Blog 2005? Der Name steht außen am Terminal.',options:[{id:'b2',label:'b2evolution'},{id:'wp',label:'WordPress von Anfang an'},{id:'sap',label:'SAP R/3'}]},
   {title:'Umzug · 2/3',text:'Wohin zog das Blog bald danach um? Die Community half.',options:[{id:'wp',label:'WordPress'},{id:'space',label:'MySpace'},{id:'paper',label:'Faxverteiler'}]},
   {title:'Umzug · 3/3',text:'Welches Märzdatum 2005 ist belegt? Der Kalender erläutert die abweichenden Rückblicke.',options:[{id:'4',label:'4. März 2005 – 20-Jahre-Rückblick'},{id:'5',label:'5. März 2005 – 10-Jahre-Rückblick'},{id:'404',label:'404. März – laut Server'}]}
  ][n];
 }
 return tables[p]||null;
}
export function objective(s){
 const f=s.flags,has=i=>s.inventory.includes(i);
 if(!f.forum)return ['forum','Den Anfang finden','Sieh dich im Archiv um. Das Supportforum kennt Caschy noch.','Wie wird Caschy ausgesprochen? Rede ruhig auch mit ihm selbst.','Archiv → Benutzen → The Bat! Supportforum → Kaschi.'];
 if(!has('portable')&&!f.origin)return ['portable','Einen portablen Browser bauen','Zwei kleine Dinge gehören zusammen.','USB-Stick aus der Redaktion; Portable Firefox aus dem freigeschalteten Archivregal.','Beide nehmen. Im Inventar zuerst einen Gegenstand wählen, dann den anderen: USB + Portable Firefox.'];
 if(!f.origin)return ['origin','Den Blog-Anfang bergen','Der Browser kann den alten Umzugsassistenten starten.','Benutze Firefox auf USB am b2evolution-Terminal.','Antworten: b2evolution → WordPress → 4. oder 5. März 2005.'];
 if(!f.andre)return ['andre','André um Hilfe bitten','Die 404 hat sich in der Werkstatt breitgemacht.','André hat einen Plan für die Erscheinung.','Werkstatt → Rede mit André → Spule nehmen.'];
 if(!f.career)return ['career','Das Proton Pack erden','Ein Kabel liegt im Lebenslauf-Schrank.','Sieh den Schrank an und benutze ihn. Die Stationen sind beschriftet.','Stahl-/Betonbauer → Bundeswehr → IT-Systemelektroniker → PC-Spezialist → Saturn.'];
 if(!f.ghost)return ['ghost','Die Erscheinung entstören','Andrés Spule braucht eine sichere Verbindung.','Kombiniere Protonenspule mit Erdungskabel.','Geerdetes Proton Pack am 404-Geist in der Werkstatt benutzen.'];
 if(!f.drawn)return ['drawn','Eigene Pixel statt fremder Fotos','Das Geisterfach ist jetzt erreichbar.','Nimm den Pixelstift und benutze ihn am Zeichentisch.','Wähle die selbst gezeichnete Bockwurst. Keine fremden Fotos.'];
 if(!f.voice)return ['voice','Die Haltung zurückholen','Der Lizenzwächter wartet auf ein rechtmäßig erzeugtes Bild.','Deine selbst gezeichnete Bockwurst reicht völlig.','Eigene Pixel-Bockwurst am Lizenzwächter 2007 benutzen.'];
 if(!f.school)return ['school','Firmware aus der Frühzeit holen','Felix braucht etwas aus dem Schulrechner im Archiv.','Benutze C16/C64. Die Schülerzeitung nennt die Reihenfolge.','C16/C64 → Computer-AG → Schülerzeitung.'];
 if(!f.felix)return ['felix','Felix ins Boot holen','Das Smart-Home-Labor hat mehr Standards als funktionierende Lampen.','Rede mit Felix über die Reparatur.','Labor → Rede mit Felix → Reparaturplan prüfen.'];
 if(!f.bridge)return ['bridge','Die Brücke lokal reparieren','Die Offline-Firmware gehört an die Matter-/Thread-Brücke.','Erst das Netz, dann der Standard, dann das Update.','Firmware an Brücke benutzen → Thread → Matter → Offline-Firmware.'];
 if(!f.olli)return ['olli','Ollis Watch ausleihen','Ein lokaler Test ersetzt die gesperrte Cloud-Funktion.','Rede mit Olli über die Diagnose.','Labor → Rede mit Olli → Diagnose-Watch ausleihen.'];
 if(!f.clarity)return ['clarity','Lokale Diagnose statt EU-Sperre','Nach der Reparatur ist der Health-Sensor frei.','Nimm den Sensor, kombiniere ihn mit der Watch und zeige Olli die Diagnose.','Sensor + Watch im Inventar kombinieren; lokale Watch-Diagnose auf Olli benutzen.'];
 if(!f.benny)return ['benny','Benny beim Finden helfen','Der Hafen beherbergt einen Spezialisten für verlorene Dinge.','Rede mit Benny über den Schlüssel.','Hafen → Rede mit Benny → Suche vorbereiten.'];
 if(!f.journey)return ['journey','Den Weg ins Business ordnen','Der Fahrplan erzählt von Unterstützung und Neuanfang.','Benutze den Fahrkartenautomaten; der Fahrplan gibt die Stationen.','Ende 2008 → Powerflasher → notebooksbilliger-Blog → Selbstständigkeit.'];
 if(!f.found)return ['found','Den Serverschlüssel orten','Nimm den Peiler vom Hafen. Ein geladener Akku liegt in deinem Inventar.','Akku + Find-Hub-Peiler kombinieren. Benny kennt das Signal.','Aktiven Find-Hub-Peiler an Benny benutzen. Ja, die Jackentasche.'];
 if(!f.team)return ['team','Gemeinsam den Server öffnen','Im Serverkeller fragt das Schloss nach vier Eintrittsjahren.','André 2015, Benny 2016, Olli 2017, Felix 2018.','Team-Schloss benutzen und 15161718 eingeben.'];
 if(!f.publish)return ['publish','Vier Fragmente vereinen','Das Fragmentpult wartet auf Anfang, Haltung, Augenhöhe und Berufung.','Benutze die vier Fragmente nacheinander am Pult.','Jedes Fragment im Inventar anklicken, dann Fragmentpult. Daraus entsteht der Publish-Schlüssel.'];
 if(!f.core)return ['core','Zum Algorithmus vordringen','Die Tür im Serverkeller hat endlich einen passenden Schlüssel.','Der Publish-Schlüssel öffnet die letzte Tür.','Publish-Schlüssel an der Tür zum Algorithmus benutzen.'];
 return ['final','Klartext veröffentlichen','Im Kern liegt der gerettete Artikel am Überschriften-Pult.','Die Überschrift soll verständlich sagen, was passiert ist.','Benutze das Pult: „Blog nach Störung wieder erreichbar“.'];
}
export function dispatch(previous,event){
 const s=structuredClone(previous);let message='',tone='normal';
 const say=t=>{message=t;};const has=i=>s.inventory.includes(i);
 const gain=i=>{if(!has(i))s.inventory.push(i);};const remove=i=>{s.inventory=s.inventory.filter(x=>x!==i);};
 const open=id=>{s.pending=id;};const finish=()=>{s.pending=null;};
 const done=(flag,item,text)=>{s.flags[flag]=true;if(item)gain(item);finish();say(text);tone='success';};
 s.turn++;
 if(event.type==='start'){s.flags.started=true;s.ending=null;say('Caschy: „Der Artikel und der Publish-Knopf sind weg. Das Archiv ist unser erster Halt. Das Blog war schließlich mal mein ausgelagertes Gehirn.“');}
 else if(event.type==='close'){finish();say('Caschy: „Ich sehe mich erst noch um.“');}
 else if(event.type==='continue'){s.ending=null;s.flags.bad=false;s.room='core';say('Zurück am Pult. Kein Fortschritt verloren. Die klare Überschrift wartet noch.');}
 else if(event.type==='move'){
  if(!unlocked(s,event.room))say('Dieser Weg öffnet sich später. Das aktuelle Ziel steht im Notizbuch.');
  else{s.room=event.room;finish();say(ROOMS[s.room].subtitle);}
 }
 else if(event.type==='hint'){
  const [key,,...tips]=objective(s);if(s.hintKey!==key){s.hintKey=key;s.hintStep=0;}
  const n=Math.min(s.hintStep,2);say(`Hinweis ${n+1}/3: ${tips[n]}`);s.hintStep=Math.min(n+1,2);
 }
 else if(event.type==='combine'){
  const {a,b}=event;if(!has(a)||!has(b))say('Dafür müssen beide Dinge im Inventar sein.');
  else if(a===b)say('Ein Gegenstand, zwei Klicks. Das ist noch kein Duplikator.');
  else{
   const recipes=[['usb','firefox','portable','Firefox sitzt auf dem Stick. Ein ganzer Browser zum Mitnehmen, ohne Rollkoffer.'],['coil','cable','pack','Andrés Proton Pack ist geerdet. VDE trifft VHS-Horror.'],['watch','sensor','diagnostic','Die Watch liest den lokalen Sensor. Keine Cloud, keine Regionstricks, nur eine nachvollziehbare Diagnose.'],['battery','tracker','powered','Der Find-Hub-Peiler piept. Jetzt braucht er Benny als Signalexperten.']];
   const recipe=recipes.find(r=>r.slice(0,2).includes(a)&&r.slice(0,2).includes(b));
   if(recipe){remove(a);remove(b);gain(recipe[2]);say(recipe[3]);tone='success';}
   else if(FRAGMENTS.includes(a)&&FRAGMENTS.includes(b))say('Die Fragmente passen in das Serverpult. Freihändig wird daraus nur ein sehr kleiner Papierstau.');
   else say(`${ITEMS[a]} mit ${ITEMS[b]}? ${a==='sausage'||b==='sausage'?'Kein Gerät muss für meinen Senf herhalten.':a==='portable'||b==='portable'?'Firefox ist portabel, aber kein universelles Klebeband.':a==='watch'||b==='watch'?'Die Watch schließt damit höchstens den Verwirrungsring.':'Das wäre ein Gadget mit zwei Problemen und ohne Zielgruppe.'}`);
  }
 }
 else if(event.type==='act'){
  const o=objects(s).find(o=>o.id===event.target);
  if(!o)say('Das ist hier gerade nicht erreichbar. Kein Pixel-Hunting nötig: Alle Ziele stehen auch unter dem Bild.');
  else{
   const mark=s.room+':'+o.id;if(!s.seen.includes(mark))s.seen.push(mark);
   if(event.verb==='look')say(o.look);
   else if(event.verb==='talk'){
    if(['andre','olli','felix','benny','caschy'].includes(o.id))open(o.id);
    else if(o.id==='algorithm')say('Algorithmus: „Ich kann dir 900 Prozent mehr Aufmerksamkeit versprechen.“ Caschy: „Kannst du mir auch die Quelle nennen?“');
    else if(['ghost','troll','comments'].includes(o.id))say('„Nutze ich eh nicht!“ Caschy: „Danke für diesen völlig überraschenden Beitrag zur Sache.“');
    else say(`${o.name} antwortet nicht. ${o.id==='sap'?'Der Freigabeprozess läuft vermutlich noch.':o.id==='seagull'?'Die Möwe hat schon ihr eigenes Kommunikationskonzept.':'Endlich mal ein Gerät ohne Sprachassistent.'}`);
   }
   else if(event.verb==='take'){
    const checks={usb:[true,'usb'],firefox:[s.flags.forum,'firefox'],pencil:[s.flags.ghost,'pencil'],sensor:[s.flags.bridge,'sensor'],tracker:[true,'tracker']};
    if(checks[o.id]){const [ready,item]=checks[o.id];if(ready){s.flags['took_'+o.id]=true;gain(item);say(`Eingesteckt: ${ITEMS[item]}.`);tone='success';}else say({firefox:'Das Supportforum öffnet dieses Fach. Benutze seinen Bildschirm.',pencil:'Die 404-Erscheinung blockiert das Fach. André hat einen Plan.',sensor:'Die Schale öffnet sich, wenn Felix’ Brücke wieder funktioniert.'}[o.id]);}
    else say(`${o.name} bleibt hier. ${['andre','olli','felix','benny','caschy'].includes(o.id)?'Menschen gehören ins Team, nicht ins Inventar.':'Mein USB-Stick ist portabel. Nicht die ganze Einrichtung.'}`);
   }
   else if(event.verb==='use'){
    const item=event.item;if(item&&!has(item))say('Dieser Gegenstand ist nicht in deinem Inventar.');
    else if(item){
     if(item==='portable'&&o.id==='migration'){if(s.flags.origin)say('Der Blog-Anfang ist bereits gerettet. Firefox bleibt als treuer Begleiter dabei.');else open('migration');}
     else if(item==='pack'&&o.id==='ghost')done('ghost',null,'André: „Nicht die Strahlen kreuzen!“ Caschy: „Ich habe nur einen.“ Die 404 löst sich auf. Das Stiftfach ist frei.');
     else if(item==='pencil'&&o.id==='drawing'){if(s.flags.drawn)say('Die eigene Zeichnung ist bereits fertig. Zwölf Pixel, volle Rechte.');else open('drawing');}
     else if(item==='sausage'&&o.id==='license'){remove('sausage');done('voice','voice','Lizenzwächter: „Selbst gezeichnet. Akzeptiert.“ André: „Gemeinschaft hilft, aber Rechte vorher klären.“ Fragment HALTUNG geborgen.');}
     else if(item==='firmware'&&o.id==='bridge'){
      if(!s.flags.felix)say('Felix sollte vor der Reparatur seinen Plan erklären. Rede mit ihm.');
      else if(s.flags.bridge)say('Die Brücke läuft bereits. Never change a running Glühbirne.');else open('bridge');
     }
     else if(item==='diagnostic'&&o.id==='olli'){
      remove('diagnostic');gain('battery');done('clarity','clarity','Olli: „Alles lokal und verständlich. Die EU-Cloud-Tür können wir ignorieren.“ Er gibt dir den geladenen Peiler-Akku und Fragment AUGENHÖHE. Felix: „Und Strom spart’s au.“');
     }
     else if(item==='powered'&&o.id==='benny'){
      if(!s.flags.benny)say('Benny muss dir zuerst das Signal erklären. Rede mit ihm.');
      else if(!s.flags.journey)say('Benny: „Der Peiler braucht den richtigen Kurs. Sortiere erst die Stationen am Fahrkartenautomaten.“');
      else if(s.flags.found)say('Benny: „Den Schlüssel hast du schon. Meine andere Tasche ist privat.“');
      else{gain('key');done('found','compass','Benny kalibriert den Peiler auf das bekannte Signal. PIEP. Seine Jackentasche. „Da habe ich extra noch nicht gesucht.“ Serverschlüssel und Fragment BERUFUNG geborgen; Serverkeller zugänglich.');}
     }
     else if(item==='key'&&o.id==='lock'){open('team');say('Bennys Schlüssel öffnet die Abdeckung. Dahinter sitzt das Team-Schloss.');}
     else if(FRAGMENTS.includes(item)&&o.id==='slots'){
      if(!s.flags.team)say('Zuerst das Team-Schloss öffnen. Vier Eintrittsjahre, aufsteigend.');
      else{remove(item);if(!s.slots.includes(item))s.slots.push(item);say(`${ITEMS[item]} sitzt im Pult. ${s.slots.length}/4 Stimmen vereint.`);tone='success';if(s.slots.length===4)done('publish','publish','Vier Stimmen greifen ineinander. Ein Publish-Schlüssel entsteht. Caschy: „Teamarbeit. Kein geheimer Wachstumstrick.“');}
     }
     else if(item==='publish'&&o.id==='gate'){done('core',null,'Die Tür zum Algorithmus öffnet sich. Der Artikel ist da. Die Überschrift bestimmst du.');s.room='core';}
     else say(`${ITEMS[item]} an ${o.name}? ${item==='pack'?'André: „Das ist kein Staubsauger für beliebige Probleme.“':item==='sausage'?'Die Bockwurst löst eine Rechtefrage, keine Netzwerkstörung.':item==='portable'?'Ein Browser hilft bei Software, nicht bei jedem Möbelstück.':'Caschy: „Das könnte man machen. Es hätte nur keinen Nutzen. Wie ein Abo für Taschenlampen.“'}`);
    }
    else{
     const map={forum:'forum',c64:'school',career:'career',ticket:'journey',lock:'team',headline:'headline'};
     const completed={forum:'forum',c64:'school',career:'career',ticket:'journey',lock:'team'};
     if(map[o.id]){if(completed[o.id]&&s.flags[completed[o.id]])say('Das ist bereits erledigt. Es gibt hier keine tägliche Login-Belohnung.');else open(map[o.id]);}
     else if(['andre','olli','felix','benny','caschy'].includes(o.id))say('Menschen benutzen wir nicht. „Rede mit“ funktioniert deutlich besser.');
     else say({migration:'Der Assistent benötigt Firefox auf USB. Wähle den fertigen Stick im Inventar, dann diesen Bildschirm.',bridge:'Felix braucht die Offline-Firmware vom Schulrechner. Frage ihn nach dem Plan.',drawing:'Hier fehlt ein Pixelstift. André hilft beim Geisterfach.',license:'Eine eigene Pixel-Bockwurst besteht diese Prüfung.',eu:s.flags.clarity?'Lokale Diagnose erfolgreich. Die Cloud-Tür darf geschlossen bleiben.':'Olli kennt den lokalen Weg. Rede mit ihm.',slots:'Benutze deine vier Fragmente an diesem Pult.',gate:'Ein Publish-Schlüssel fehlt. Das Fragmentpult erzeugt ihn.',energy:'Klick. Ein Pixel Standby gespart. Felix nickt anerkennend.',rss:'Du abonnierst gedanklich den RSS-Feed. Der Algorithmus verliert ein winziges bisschen Macht.',desk:'Der Knopf wurde entführt. Im Archiv liegt der Anfang der Lösung.',cake:'Erst veröffentlichen, dann anschneiden. Sonst bekomme ich Krümel in den Schlussakt.',beer:'Das heben wir fürs Finale auf.'}[o.id]||BANTER[Math.floor(Math.random()*BANTER.length)]);
    }
   }
  }
 }
 else if(event.type==='choose'){
  const p=s.pending,id=event.id;
  if(!p)say('Gerade ist keine Frage offen.');
  else if(p==='team'){
   if(String(event.value||'').replace(/\s/g,'')==='15161718')done('team',null,'15–16–17–18. André, Benny, Olli, Felix. Das Schloss öffnet das Fragmentpult.');
   else say('Das Schloss bleibt zu. Vier zweistellige Jahre, aufsteigend. Kein Minuszeichen nötig.');
  }
  else if(!dialog(s)?.options.some(o=>o.id===id))say('Diese Antwort gehört nicht zu dieser Frage.');
  else if(quiz[p]){
   const q=quiz[p],n=s.progress[p]||0;
   if(id!==q.order[n])say('Noch nicht diese Station. Die Beschriftung im Raum gibt die Reihenfolge; dein bisheriger Fortschritt bleibt erhalten.');
   else{
    s.progress[p]=n+1;
    if(n+1<q.order.length)say('Richtig. Die nächste Station …');
    else if(p==='school')done('school','firmware','Der C64 druckt eine Offline-Firmwarekarte. „Von Rechnern über die AG zur Schülerzeitung. Verständlich schreiben fängt früh an.“');
    else if(p==='career')done('career','cable','Fünf Berufsstationen, ein handfestes Erdungskabel. Vom Stahl zum System: Frickeln hat eine Vorgeschichte.');
    else if(p==='bridge'){remove('firmware');done('bridge',null,'Felix: „Thread steht, Matter spricht, Firmware geprüft. So erklärt man Technik.“ Die Health-Sensor-Schale springt auf.');}
    else if(p==='journey')done('journey',null,'Die Route steht. Kein romantisierter Umweg: Kontakte halfen nach der Arbeitslosigkeit. Benny: „Berufung statt Plan B. Jetzt können wir das Schlüsselsignal peilen.“');
   }
  }
  else if(p==='migration'){
   const n=s.progress.migration||0,good=[['b2'],['wp'],['4','5']][n].includes(id);
   if(!good)say('Das passt nicht zum Archiv. Keine Daten verloren. Schau dir die Beschriftung und den Kalender an.');
   else if(n<2){s.progress.migration=n+1;say('Archiv bestätigt. Nächster Schritt …');}
   else done('origin','origin','b2evolution → WordPress. 4./5. März 2005: Beide Rückblicke bleiben dokumentiert. Fragment ANFANG geborgen. Werkstatt, Labor und Hafen sind jetzt zugänglich.');
  }
  else if(p==='forum'){if(id==='kaschi')done('forum',null,'„Willkommen, Kaschi!“ Das Portable-Regal klickt auf. Support hilft – sogar Jahrzehnte später.');else say(id==='cache'?'Du löschst gedanklich den Cache. Der Spitzname bleibt.':'Fast. Ganz einfach „Kaschi“, wie seine Freunde sagen.');}
  else if(p==='drawing'){if(id==='own')done('drawn','sausage','Zwölf eigene Pixel, null fremde Fotorechte. Ein köstlich kantiges Original fürs Lizenzterminal.');else say('Nein: Weder Nachladen noch „Quelle: Internet“ ersetzt Nutzungsrechte. Zeichne hier dein eigenes Pixelbild.');}
  else if(p==='headline'){
   finish();if(id==='clear'){s.flags.won=true;s.ending='good';say('„Blog nach Störung wieder erreichbar.“ Dem Algorithmus fehlt die Angriffsfläche. 200 OK. Artikel da, Haltung auch. Kuchen und Bier für alle.');tone='success';}
   else{s.flags.bad=true;s.ending='bad';say('Der Artikel erscheint zwischen 47 Kaufbuttons. Eine Affiliate-Konfettikanone verkauft dir dein eigenes Bier zurück. Caschy: „Nee. Wir redigieren das noch mal.“');}
  }
  else if(['andre','olli','felix','benny'].includes(p)){
   if(id==='help'){s.flags[p]=true;if(p==='andre'&&!s.flags.ghost&&!has('pack'))gain('coil');if(p==='olli'&&!s.flags.clarity&&!has('diagnostic'))gain('watch');finish();say({andre:'André reicht die Spule. „Das Erdungskabel steckt im Lebenslauf-Schrank. Danach beide kombinieren und an der Erscheinung testen.“',olli:'Olli gibt dir seine Diagnose-Watch. „Den Sensor nach Felix’ Reparatur nehmen, mit der Watch kombinieren und mir zeigen.“',felix:'Felix prüft den Plan mit dir: „Firmware aus dem Archiv an die Brücke. Thread → Matter → Offline-Update. Den Sensor gebe ich danach frei.“',benny:'Benny stimmt den Peiler auf das Schlüsselsignal ab. „Akku von Olli plus Peiler. Und erst den Berufungs-Fahrplan sortieren.“'}[p]);}
   else say({novel:'André: „Der Roman hat 404 Seiten. Also … bisher nicht gefunden.“',sap:'Olli: „Die Kostenstelle ist angelegt. Bis zur Freigabe nutzen wir eine Pflanze.“',cost:'Felix: „Nix. Wir reparieren, was da ist. Bloß koi neues Abo.“',pocket:'Benny: „Ich möchte diese ermittlungstaktische Frage noch nicht beantworten.“'}[id]);
  }
  else if(p==='caschy'){say(id==='hair'?'Caschy: „Ausgefallen. Im Wortsinn. Der Bart übernimmt die restlichen Aufgaben.“':'Caschy: „Archiv-Anfang holen, dem Team helfen, vier Fragmente ins Serverpult. Im Finale gewinnt Klartext. Das Notizbuch gibt stufenweise Tipps.“');finish();}
 }
 if(!message&&s.pending)message=dialog(s)?.text||'';
 return {state:s,message,tone};
}
