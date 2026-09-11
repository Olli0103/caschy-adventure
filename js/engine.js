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
 school:{question:'Wie ging es nach den ersten Rechnern weiter?',answers:[['c','C16 / C64'],['a','Computer-AG'],['p','Schülerzeitung']],order:['c','a','p']},
 career:{question:'Welche Berufsstation kam als Nächstes?',answers:[['steel','Stahl- und Betonbauer'],['army','Bundeswehr'],['it','IT-Systemelektroniker'],['pc','Technischer Leiter bei PC-Spezialist'],['saturn','Neue Medien bei Saturn']],order:['steel','army','it','pc','saturn']},
 bridge:{question:'In welcher Reihenfolge reparieren wir die Brücke?',answers:[['thread','Thread-Netz aufbauen'],['matter','Matter-Gerät verbinden'],['offline','Geprüfte Offline-Firmware laden'],['cloud','Noch ein Cloud-Konto anlegen']],order:['thread','matter','offline']},
 journey:{question:'Wie führte der Weg vom Blog ins Berufsleben?',answers:[['2008','Ende 2008: arbeitslos'],['power','Powerflasher über Blogkontakte'],['nnb','notebooksbilliger-Blog'],['self','Selbstständigkeit']],order:['2008','power','nnb','self']}
};
export function dialog(s){
 const p=s.pending;if(!p)return null;
 if(quiz[p]){const q=quiz[p],n=s.progress[p]||0;return {title:q.question,text:`Du bist bei Station ${n+1} von ${q.order.length}. Alle nötigen Hinweise stehen im Raum, und eine falsche Antwort setzt deinen Fortschritt nicht zurück.`,options:q.answers.map(([id,label])=>({id,label}))};}
 const tables={
 forum:{title:'The Bat! Supportforum',text:'Das Forum erkennt Caschy beinahe wieder. Zur Sicherheit stellt es noch eine Frage: Wie sprechen seine Freunde den Spitznamen "Caschy" aus?',options:[{id:'kaschi',label:'Kaschi'},{id:'käschi',label:'Käschi'},{id:'cache',label:'Cache löschen'}]},
 drawing:{title:'Das Recht am eigenen Pixel',text:'Die 700 Euro Anwaltskosten waren leider echt. Diesmal verwenden wir deshalb kein fremdes Bild. Was soll Caschy selbst zeichnen?',options:[{id:'own',label:'Eine eigene Bockwurst aus zwölf Pixeln'},{id:'copy',label:'Ein fremdes Foto einfach nachladen'},{id:'credit',label:'"Quelle: Internet" dazuschreiben'}]},
 team:{title:'Das Team-Schloss',text:'Das Schloss möchte die Eintrittsjahre von André, Benny, Olli und Felix. Gib jeweils nur die letzten beiden Ziffern ein und sortiere die vier Zahlen aufsteigend. Die vollständigen Jahre findest du bei den Figuren.',input:true,options:[]},
 headline:{title:'Die letzte redaktionelle Entscheidung',text:'Der Artikel ist zurück. Jetzt versucht der Algorithmus, eine klare Überschrift gegen ein wenig billige Reichweite einzutauschen. Welche Fassung soll online gehen?',options:[{id:'clear',label:'Blog nach Störung wieder erreichbar'},{id:'bait',label:'DIESER GLATZKOPF SCHOCKT DAS INTERNET!'},{id:'vague',label:'Was dann geschah, hätte niemand erwartet ...'}]},
 andre:{title:'André · Technik, Games & Serien · 2015',text:'Da ist tatsächlich ein 404-Poltergeist. Ich würde ja gern endlich das Proton Pack testen, aber selbst bei paranormalem Support gilt: erst erden, dann strahlen. Die Spule gebe ich dir. Das passende Kabel steckt hinter dem Lebenslauf-Schloss.',options:[{id:'help',label:'Gib mir die Spule und erklär mir den Plan.'},{id:'novel',label:'Und wie läuft es mit dem Roman?'}]},
 olli:{title:'Olli · Apple, Health & SAP · 2017',text:'Die Cloud-Tür behauptet, ihre Funktion sei in der EU nicht verfügbar. Macht nichts, wir brauchen sie gar nicht. Sobald Felix die Brücke repariert hat, verbindest du den lokalen Health-Sensor mit meiner Diagnose-Watch und zeigst mir das Ergebnis.',options:[{id:'help',label:'Dann leihe mir bitte die Watch.'},{id:'sap',label:'Ist das schon in SAP gebucht?'}]},
 felix:{title:'Felix · Lehrer & Smart Home · 2018',text:'Das bekommen wir lokal hin. Zuerst bauen wir das Thread-Netz auf, dann verbinden wir das Matter-Gerät und zum Schluss spielen wir die geprüfte Offline-Firmware ein. Die Firmware findest du auf dem alten Schulrechner im Archiv.',options:[{id:'help',label:'Gehen wir den Reparaturplan zusammen durch.'},{id:'cost',label:'Was kostet uns das wieder?'}]},
 benny:{title:'Benny · Nordlicht & Technik · 2016',text:'Der Serverschlüssel ist verschwunden, aber mein Find-Hub-Peiler kennt sein Signal. Ihm fehlt nur der geladene Akku aus Ollis Diagnose. Bring außerdem den Berufungs-Fahrplan in Ordnung. Mit dem richtigen Kurs sucht es sich leichter.',options:[{id:'help',label:'Bereiten wir die Suche gemeinsam vor.'},{id:'pocket',label:'Hast du schon in deinen Taschen nachgesehen?'}]},
 caschy:{title:'Caschy · Kaschi, nicht Cache',text:'Freitag, fünf vor sechs, und der Algorithmus hat meinen Artikel samt Veröffentlichen-Knopf einkassiert. Wir holen jetzt den Anfang des Blogs und die Haltung dahinter zurück. Gefährlich wird das höchstens für meinen Feierabend.',options:[{id:'goal',label:'Wie gehen wir vor?'},{id:'hair',label:'Immerhin sitzt die Frisur.'}]}
 };
 if(p==='migration'){
  const n=s.progress.migration||0;
  return [
   {title:'Der Blogumzug · 1/3',text:'Auf welchem System startete das Blog im Jahr 2005? Der Name steht direkt am Terminal.',options:[{id:'b2',label:'b2evolution'},{id:'wp',label:'WordPress von Anfang an'},{id:'sap',label:'SAP R/3'}]},
   {title:'Der Blogumzug · 2/3',text:'Wohin zog das Blog kurze Zeit später mit Hilfe der Community um?',options:[{id:'wp',label:'WordPress'},{id:'space',label:'MySpace'},{id:'paper',label:'Faxverteiler'}]},
   {title:'Der Blogumzug · 3/3',text:'Welches Datum im März 2005 gilt als Bloggeburtstag? Der Kalender erklärt, warum zwei Antworten stimmen.',options:[{id:'4',label:'4. März 2005, laut 20-Jahre-Rückblick'},{id:'5',label:'5. März 2005, laut 10-Jahre-Rückblick'},{id:'404',label:'404. März, laut Server'}]}
  ][n];
 }
 return tables[p]||null;
}
export function objective(s){
 const f=s.flags,has=i=>s.inventory.includes(i);
 if(!f.forum)return ['forum','Den Anfang finden','Im Archiv kennt das alte Supportforum Caschy noch.','Das Forum fragt nach der Aussprache seines Spitznamens. Caschy selbst verrät sie ebenfalls.','Benutze im Archiv das The-Bat!-Supportforum und antworte mit "Kaschi".'];
 if(!has('portable')&&!f.origin)return ['portable','Einen portablen Browser bauen','Für den alten Umzugsassistenten brauchst du zwei Dinge.','Nimm den USB-Stick aus der Redaktion und Portable Firefox aus dem freigeschalteten Archivregal.','Wähle im Inventar einen der beiden Gegenstände und kombiniere ihn mit dem anderen.'];
 if(!f.origin)return ['origin','Den Blog-Anfang bergen','Der portable Browser kann den alten Umzugsassistenten starten.','Benutze Firefox auf USB am b2evolution-Terminal und folge den Fragen zum Blogumzug.','Die Antworten lauten b2evolution, WordPress und 4. oder 5. März 2005.'];
 if(!f.andre)return ['andre','André um Hilfe bitten','In Andrés Werkstatt blockiert ein 404-Geist den Weg.','André hat eine Idee, wie sich die Erscheinung vertreiben lässt.','Sprich in der Werkstatt mit André und bitte ihn um die Protonenspule.'];
 if(!f.career)return ['career','Das Proton Pack erden','Für das Proton Pack fehlt noch eine sichere Erdung.','Das Kabel liegt im Berufsstationen-Schrank. Seine fünf Schubladen verraten die Reihenfolge.','Benutze den Schrank und wähle Stahl- und Betonbauer, Bundeswehr, IT-Systemelektroniker, PC-Spezialist und Saturn.'];
 if(!f.ghost)return ['ghost','Die Erscheinung entstören','Mit Spule und Erdungskabel lässt sich Andrés Gerät sicher zusammensetzen.','Kombiniere die Protonenspule im Inventar mit dem Erdungskabel.','Benutze anschließend das geerdete Proton Pack am 404-Geist.'];
 if(!f.drawn)return ['drawn','Ein eigenes Bild zeichnen','Nach dem Verschwinden des Geistes ist das Stiftfach frei.','Nimm den Pixelstift und benutze ihn am Zeichentisch.','Entscheide dich dort für die selbst gezeichnete Bockwurst.'];
 if(!f.voice)return ['voice','Die Haltung zurückholen','Der Lizenzwächter akzeptiert nur ein Bild mit geklärten Rechten.','Für deine selbst gezeichnete Pixel-Bockwurst liegen die Rechte bei dir.','Benutze die eigene Pixel-Bockwurst am Lizenzwächter von 2007.'];
 if(!f.school)return ['school','Die Offline-Firmware holen','Felix braucht eine alte Firmwarekarte aus dem Archiv.','Benutze den C16/C64. Die Schülerzeitung daneben nennt die richtige Reihenfolge.','Wähle nacheinander C16/C64, Computer-AG und Schülerzeitung.'];
 if(!f.felix)return ['felix','Felix um Hilfe bitten','Die Brücke im Labor funktioniert nicht mehr.','Felix kennt die beteiligten Standards und kann die Reparatur erklären.','Sprich im Labor mit Felix und gehe den Reparaturplan mit ihm durch.'];
 if(!f.bridge)return ['bridge','Die Brücke lokal reparieren','Die Offline-Firmware aus dem Archiv gehört an die Matter-/Thread-Brücke.','Felix setzt zuerst das Netz auf, verbindet dann das Gerät und installiert zuletzt die Firmware.','Benutze die Firmware an der Brücke und wähle Thread, Matter und Offline-Firmware.'];
 if(!f.olli)return ['olli','Ollis Watch ausleihen','Die gesperrte Cloud-Funktion lässt sich durch einen lokalen Test ersetzen.','Olli kann dir die Watch für die Diagnose geben.','Sprich im Labor mit Olli und leihe dir seine Diagnose-Watch.'];
 if(!f.clarity)return ['clarity','Die lokale Diagnose abschließen','Nach der Reparatur gibt die Brücke den Health-Sensor frei.','Nimm den Sensor, kombiniere ihn mit der Watch und zeige Olli die fertige Diagnose.','Kombiniere Sensor und Watch im Inventar. Benutze die lokale Watch-Diagnose anschließend an Olli.'];
 if(!f.benny)return ['benny','Benny bei der Suche helfen','Am Hafen wartet jemand, der sich mit verlorenen Geräten auskennt.','Benny kann den Peiler auf das Signal des Serverschlüssels einstellen.','Sprich am Hafen mit Benny und bereite mit ihm die Suche vor.'];
 if(!f.journey)return ['journey','Den Berufsweg ordnen','Der Fahrplan erzählt, wie aus dem Blog nach einer schwierigen Zeit ein Beruf wurde.','Benutze den Fahrkartenautomaten. Der Fahrplan daneben nennt alle Stationen.','Wähle Ende 2008, Powerflasher, notebooksbilliger-Blog und Selbstständigkeit.'];
 if(!f.found)return ['found','Den Serverschlüssel orten','Der Peiler am Hafen braucht den geladenen Akku aus Ollis Diagnose.','Kombiniere Akku und Find-Hub-Peiler. Benny kennt das Signal des Schlüssels.','Benutze den aktiven Peiler an Benny. Diesmal lohnt sich der Blick in seine Jackentasche.'];
 if(!f.team)return ['team','Gemeinsam den Server öffnen','Im Serverkeller verlangt das Team-Schloss vier Eintrittsjahre.','André kam 2015, Benny 2016, Olli 2017 und Felix 2018 zum Team.','Benutze das Team-Schloss und gib 15161718 ein.'];
 if(!f.publish)return ['publish','Die vier Fragmente vereinen','Das Fragmentpult wartet auf Anfang, Haltung, Augenhöhe und Berufung.','Setze die vier geborgenen Fragmente nacheinander in das Pult ein.','Wähle jedes Fragment im Inventar und benutze es am Fragmentpult. Danach entsteht der Publish-Schlüssel.'];
 if(!f.core)return ['core','Zum Algorithmus vordringen','Die letzte Tür lässt sich jetzt öffnen.','Der Publish-Schlüssel passt in die Tür zum Algorithmus.','Benutze den Publish-Schlüssel an der Tür im Serverkeller.'];
 return ['final','Klartext veröffentlichen','Der gerettete Artikel wartet am Überschriften-Pult.','Eine gute Überschrift sagt verständlich, was passiert ist, ohne mehr zu versprechen.','Benutze das Pult und wähle "Blog nach Störung wieder erreichbar".'];
}
export function dispatch(previous,event){
 const s=structuredClone(previous);let message='',tone='normal';
 const say=t=>{message=t;};const has=i=>s.inventory.includes(i);
 const gain=i=>{if(!has(i))s.inventory.push(i);};const remove=i=>{s.inventory=s.inventory.filter(x=>x!==i);};
 const open=id=>{s.pending=id;};const finish=()=>{s.pending=null;};
 const done=(flag,item,text)=>{s.flags[flag]=true;if(item)gain(item);finish();say(text);tone='success';};
 s.turn++;
 if(event.type==='start'){s.flags.started=true;s.ending=null;say('Caschy: "Der Artikel und der Veröffentlichen-Knopf sind weg. Fangen wir im Archiv an. Wenn irgendwo eine Spur liegt, dann in meinem ausgelagerten Gehirn."');}
 else if(event.type==='close'){finish();say('Caschy: "Ich sehe mich noch ein wenig um."');}
 else if(event.type==='continue'){s.ending=null;s.flags.bad=false;s.room='core';say('Caschy geht zurück ans Pult. Alle Rätsel bleiben gelöst, nur die Überschrift braucht noch eine vernünftige Fassung.');}
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
  else if(a===b)say('Zweimal auf denselben Gegenstand zu klicken, reicht leider noch nicht für einen Duplikator.');
  else{
   const recipes=[['usb','firefox','portable','Portable Firefox ist jetzt auf dem USB-Stick eingerichtet. Ein kompletter Browser für die Hosentasche, ganz ohne Rollkoffer.'],['coil','cable','pack','Spule und Erdungskabel sitzen fest. Andrés Proton Pack ist einsatzbereit, irgendwo zwischen VDE-Prüfung und VHS-Horror.'],['watch','sensor','diagnostic','Die Watch liest den lokalen Sensor aus und erstellt eine nachvollziehbare Diagnose. Dafür braucht sie weder eine Cloud noch einen Regionstrick.'],['battery','tracker','powered','Mit dem geladenen Akku erwacht der Find-Hub-Peiler zum Leben. Jetzt muss Benny ihn nur noch auf das richtige Signal einstellen.']];
   const recipe=recipes.find(r=>r.slice(0,2).includes(a)&&r.slice(0,2).includes(b));
   if(recipe){remove(a);remove(b);gain(recipe[2]);say(recipe[3]);tone='success';}
   else if(FRAGMENTS.includes(a)&&FRAGMENTS.includes(b))say('Die beiden Fragmente gehören in das Serverpult. In der Hand ergeben sie höchstens einen sehr kleinen Papierstau.');
   else say(`${ITEMS[a]} mit ${ITEMS[b]}? ${a==='sausage'||b==='sausage'?'So dringend braucht kein Gerät Caschys Senf.':a==='portable'||b==='portable'?'Firefox ist zwar portabel, aber noch lange kein universelles Klebeband.':a==='watch'||b==='watch'?'Damit schließt die Watch höchstens den Verwirrungsring.':'Das wäre ein Gadget mit zwei Problemen und ohne erkennbare Zielgruppe.'}`);
  }
 }
 else if(event.type==='act'){
  const o=objects(s).find(o=>o.id===event.target);
  if(!o)say('Dieses Ziel ist hier gerade nicht erreichbar. Unter dem Bild stehen alle Objekte, die Caschy im Moment anklicken kann.');
  else{
   const mark=s.room+':'+o.id;if(!s.seen.includes(mark))s.seen.push(mark);
   if(event.verb==='look')say(o.look);
   else if(event.verb==='talk'){
    if(['andre','olli','felix','benny','caschy'].includes(o.id))open(o.id);
    else if(o.id==='algorithm')say('Algorithmus: "Ich verspreche dir 900 Prozent mehr Aufmerksamkeit." Caschy: "Gut. Und woher kommen die 900 Prozent?"');
    else if(['ghost','troll','comments'].includes(o.id))say('Aus der Richtung kommt wieder nur: "Nutze ich eh nicht!" Caschy bedankt sich für den erwartbar hilfreichen Beitrag.');
    else say(`${o.name} antwortet nicht. ${o.id==='sap'?'Vermutlich hängt die Antwort noch im Freigabeprozess.':o.id==='seagull'?'Die Möwe verfolgt offenbar ihr eigenes Kommunikationskonzept.':'Zur Abwechslung einmal ein Gerät ohne Sprachassistent.'}`);
   }
   else if(event.verb==='take'){
    const checks={usb:[true,'usb'],firefox:[s.flags.forum,'firefox'],pencil:[s.flags.ghost,'pencil'],sensor:[s.flags.bridge,'sensor'],tracker:[true,'tracker']};
    if(checks[o.id]){const [ready,item]=checks[o.id];if(ready){s.flags['took_'+o.id]=true;gain(item);say(`${ITEMS[item]} landet in Caschys Tasche.`);tone='success';}else say({firefox:'Das Fach ist noch verriegelt. Das alte Supportforum kann es öffnen.',pencil:'Die 404-Erscheinung steht direkt vor dem Stiftfach. André hat eine Idee, wie sie sich vertreiben lässt.',sensor:'Die Sensorschale bleibt zu, solange die Brücke nicht wieder funktioniert.'}[o.id]);}
    else say(`${o.name} bleibt besser hier. ${['andre','olli','felix','benny','caschy'].includes(o.id)?'Menschen gehören ins Team und nicht ins Inventar.':'Der USB-Stick ist portabel, die gesamte Einrichtung eher nicht.'}`);
   }
   else if(event.verb==='use'){
    const item=event.item;if(item&&!has(item))say('Dieser Gegenstand liegt nicht in Caschys Tasche.');
    else if(item){
     if(item==='portable'&&o.id==='migration'){if(s.flags.origin)say('Der Anfang des Blogs ist bereits gesichert. Portable Firefox bleibt trotzdem in Caschys Tasche. Man weiß ja nie.');else open('migration');}
     else if(item==='pack'&&o.id==='ghost')done('ghost',null,'André ruft noch "Nicht die Strahlen kreuzen!", da löst sich die 404-Erscheinung bereits auf. Caschy schaut auf das einzelne Proton Pack und verkneift sich die Rückfrage. Das Stiftfach ist jetzt frei.');
     else if(item==='pencil'&&o.id==='drawing'){if(s.flags.drawn)say('Die eigene Zeichnung ist längst fertig. Zwölf Pixel genügen offenbar für ein Original mit vollständig geklärten Rechten.');else open('drawing');}
     else if(item==='sausage'&&o.id==='license'){remove('sausage');done('voice','voice','Der Lizenzwächter erkennt das selbst gezeichnete Motiv und gibt das Fragment HALTUNG frei. André nickt: "Die Community hilft oft, aber die Bildrechte sollte man trotzdem vorher klären."');}
     else if(item==='firmware'&&o.id==='bridge'){
      if(!s.flags.felix)say('Bevor Caschy an der Brücke arbeitet, sollte Felix den Reparaturplan erklären.');
      else if(s.flags.bridge)say('Die Brücke läuft wieder. Never change a running Glühbirne.');else open('bridge');
     }
     else if(item==='diagnostic'&&o.id==='olli'){
      remove('diagnostic');gain('battery');done('clarity','clarity','Olli prüft die Diagnose und ist zufrieden: "Lokal, nachvollziehbar und ohne Umweg über die Cloud. Die gesperrte Tür können wir getrost ignorieren." Er gibt Caschy den geladenen Peiler-Akku und das Fragment AUGENHÖHE. Felix merkt an, dass der lokale Weg nebenbei auch Strom spart.');
     }
     else if(item==='powered'&&o.id==='benny'){
      if(!s.flags.benny)say('Benny muss den Peiler erst auf das Signal des Schlüssels einstellen. Sprich mit ihm.');
      else if(!s.flags.journey)say('Benny schüttelt den Kopf: "Dem Peiler fehlt noch der richtige Kurs. Bring zuerst die Stationen am Fahrkartenautomaten in Ordnung."');
      else if(s.flags.found)say('Benny zeigt auf den Serverschlüssel in Caschys Tasche. In seiner anderen Jackentasche möchte er trotzdem nicht suchen lassen.');
      else{gain('key');done('found','compass','Benny stellt den Peiler auf das bekannte Schlüsselsignal ein. Nach einem kurzen Piepen zeigt das Gerät ausgerechnet auf seine Jackentasche. "Da habe ich mit voller Absicht noch nicht nachgesehen", behauptet er. Caschy nimmt den Serverschlüssel und das Fragment BERUFUNG. Der Weg in den Serverkeller ist frei.');}
     }
     else if(item==='key'&&o.id==='lock'){open('team');say('Bennys Schlüssel öffnet die Abdeckung des Terminals. Darunter kommt das eigentliche Team-Schloss zum Vorschein.');}
     else if(FRAGMENTS.includes(item)&&o.id==='slots'){
      if(!s.flags.team)say('Öffne zuerst das Team-Schloss mit den vier aufsteigend sortierten Eintrittsjahren.');
      else{remove(item);if(!s.slots.includes(item))s.slots.push(item);say(`${ITEMS[item]} rastet im Pult ein. Damit sind ${s.slots.length} von 4 Stimmen vereint.`);tone='success';if(s.slots.length===4)done('publish','publish','Als das vierte Fragment einrastet, setzt das Pult die Stimmen zu einem Publish-Schlüssel zusammen. Caschy betrachtet das Ergebnis: "Teamarbeit. Völlig ohne geheimen Wachstumstrick."');}
     }
     else if(item==='publish'&&o.id==='gate'){done('core',null,'Der Publish-Schlüssel öffnet die letzte Tür. Dahinter liegt der verschwundene Artikel. Nur über seine Überschrift darf der Algorithmus noch nicht entscheiden.');s.room='core';}
     else say(`${ITEMS[item]} an ${o.name}? ${item==='pack'?'André weist vorsichtshalber darauf hin, dass das Proton Pack kein Staubsauger für beliebige Probleme ist.':item==='sausage'?'Die Pixel-Bockwurst löst eine Rechtefrage, aber leider keine Netzwerkstörung.':item==='portable'?'Ein portabler Browser hilft bei alter Software und nicht bei jedem Möbelstück.':'Caschy findet, man könnte das versuchen. Einen erkennbaren Nutzen hätte es allerdings nicht.'}`);
    }
    else{
     const map={forum:'forum',c64:'school',career:'career',ticket:'journey',lock:'team',headline:'headline'};
     const completed={forum:'forum',c64:'school',career:'career',ticket:'journey',lock:'team'};
     if(map[o.id]){if(completed[o.id]&&s.flags[completed[o.id]])say('Das ist bereits erledigt. Eine tägliche Login-Belohnung gibt es dafür nicht.');else open(map[o.id]);}
     else if(['andre','olli','felix','benny','caschy'].includes(o.id))say('Caschy entscheidet sich gegen den Versuch, einen Menschen zu benutzen. Ein Gespräch wirkt deutlich vernünftiger.');
     else say({migration:'Der Umzugsassistent braucht Firefox auf USB. Wähle den fertigen Stick im Inventar und benutze ihn an diesem Terminal.',bridge:'Für die Reparatur fehlt noch die Offline-Firmware vom Schulrechner. Felix kann erklären, was danach zu tun ist.',drawing:'Auf dem Zeichentisch fehlt der Pixelstift. Er liegt im Fach hinter der 404-Erscheinung.',license:'Der Lizenzwächter wartet auf ein selbst gezeichnetes Motiv. Die Pixel-Bockwurst wäre dafür genau richtig.',eu:s.flags.clarity?'Die lokale Diagnose war erfolgreich. Die Cloud-Tür darf geschlossen bleiben.':'Olli kennt einen lokalen Weg an der gesperrten Cloud-Funktion vorbei.',slots:'Setze die vier geborgenen Fragmente nacheinander in das Pult ein.',gate:'Für diese Tür fehlt noch der Publish-Schlüssel. Das Fragmentpult kann ihn aus den vier Stimmen zusammensetzen.',energy:'Der Zähler klickt und spart symbolisch ein Pixel Standby-Strom. Felix nimmt das mit ernster Zufriedenheit zur Kenntnis.',rss:'Caschy abonniert gedanklich den RSS-Feed. Der Algorithmus verliert ein winziges bisschen Macht.',desk:'Der Veröffentlichen-Knopf bleibt verschwunden. Im Archiv wartet immerhin die erste Spur.',cake:'Caschy würde den Kuchen gern anschneiden, möchte aber keine Krümel im Schlussakt riskieren.',beer:'Das Bier bleibt bis zum Finale kaltgestellt.'}[o.id]||BANTER[Math.floor(Math.random()*BANTER.length)]);
    }
   }
  }
 }
 else if(event.type==='choose'){
  const p=s.pending,id=event.id;
  if(!p)say('Im Moment wartet keine Frage auf eine Antwort.');
  else if(p==='team'){
   if(String(event.value||'').replace(/\s/g,'')==='15161718')done('team',null,'Die Folge 15, 16, 17 und 18 steht für André, Benny, Olli und Felix. Das Team-Schloss bestätigt den Code und gibt das Fragmentpult frei.');
   else say('Der Code stimmt noch nicht. Gesucht sind vier zweistellige Eintrittsjahre in aufsteigender Reihenfolge, ohne Trennzeichen.');
  }
  else if(!dialog(s)?.options.some(o=>o.id===id))say('Diese Antwort gehört nicht zu dieser Frage.');
  else if(quiz[p]){
   const q=quiz[p],n=s.progress[p]||0;
   if(id!==q.order[n])say('Diese Station kommt noch nicht an die Reihe. Die Beschriftung im Raum verrät die Reihenfolge, und deine bisherigen Antworten bleiben erhalten.');
   else{
    s.progress[p]=n+1;
    if(n+1<q.order.length)say('Das stimmt. Welche Station folgte darauf?');
    else if(p==='school')done('school','firmware','Der C64 bestätigt die Reihenfolge und druckt die alte Firmwarekarte aus. Auf dem Rand steht: "Von den ersten Rechnern über die Computer-AG zur Schülerzeitung. Verständlich schreiben fängt früh an."');
    else if(p==='career')done('career','cable','Das Schloss akzeptiert alle fünf Berufsstationen und öffnet die letzte Schublade. Darin liegt ein erstaunlich handfestes Erdungskabel. Offenbar hat auch das Frickeln eine Vorgeschichte.');
    else if(p==='bridge'){remove('firmware');done('bridge',null,'Felix prüft noch einmal alle drei Schritte. Das Thread-Netz steht, das Matter-Gerät antwortet und die Firmware ist sauber eingespielt. Mit einem leisen Klicken öffnet sich die Schale des Health-Sensors.');}
    else if(p==='journey')done('journey',null,'Der Automat bestätigt die Route. Nach der Arbeitslosigkeit halfen Blogkontakte beim Wechsel zu Powerflasher, später führte der Weg über den notebooksbilliger-Blog in die Selbstständigkeit. Benny schaut auf den Peiler: "Jetzt hat das Ding einen Kurs."');
   }
  }
  else if(p==='migration'){
   const n=s.progress.migration||0,good=[['b2'],['wp'],['4','5']][n].includes(id);
   if(!good)say('Diese Antwort passt nicht zu den Unterlagen im Archiv. Deine bisherigen Angaben bleiben erhalten. Sieh noch einmal auf das Terminal und den Kalender.');
   else if(n<2){s.progress.migration=n+1;say('Das Archiv bestätigt die Antwort und lädt den nächsten Teil der Umzugsgeschichte.');}
   else done('origin','origin','Der Assistent rekonstruiert den Umzug von b2evolution zu WordPress. Beim Datum bewahrt er beide belegten Angaben, den 4. und den 5. März 2005. Danach gibt er das Fragment ANFANG frei. Werkstatt, Labor und Hafen sind jetzt erreichbar.');
  }
  else if(p==='forum'){if(id==='kaschi')done('forum',null,'Das Forum begrüßt "Kaschi" und entriegelt das Portable-Regal. Guter Support hält offenbar länger als manche Hardware.');else say(id==='cache'?'Der Cache ist jetzt gedanklich leer, am Spitznamen ändert das nichts.':'Fast. Seine Freunde sprechen den Namen ganz einfach "Kaschi" aus.');}
  else if(p==='drawing'){if(id==='own')done('drawn','sausage','Caschy zeichnet eine kantige Bockwurst aus zwölf eigenen Pixeln. Das Ergebnis ist vielleicht keine große Kunst, gehört dafür aber vollständig ihm.');else say('Weder das Nachladen eines fremden Fotos noch der Hinweis "Quelle: Internet" klärt die Nutzungsrechte. Auf diesem Tisch entsteht deshalb ein eigenes Pixelbild.');}
  else if(p==='headline'){
   finish();if(id==='clear'){s.flags.won=true;s.ending='good';say('Die klare Überschrift geht online, ohne dem Algorithmus eine Angriffsfläche zu bieten. Der Server antwortet mit 200 OK. Artikel und Haltung sind zurück, jetzt dürfen Kuchen und Bier auf den Tisch.');tone='success';}
   else{s.flags.bad=true;s.ending='bad';say('Der Artikel landet zwischen 47 Kaufbuttons, während eine Affiliate-Konfettikanone Caschy sein eigenes Feierabendbier verkaufen möchte. Er liest die Überschrift ein zweites Mal und schüttelt den Kopf: "Nein. Das redigieren wir noch einmal."');}
  }
  else if(['andre','olli','felix','benny'].includes(p)){
   if(id==='help'){s.flags[p]=true;if(p==='andre'&&!s.flags.ghost&&!has('pack'))gain('coil');if(p==='olli'&&!s.flags.clarity&&!has('diagnostic'))gain('watch');finish();say({andre:'André gibt Caschy die Protonenspule. Das Erdungskabel liegt im Berufsstationen-Schrank. Sobald beide Teile verbunden sind, kann das fertige Pack an der Erscheinung getestet werden.',olli:'Olli reicht Caschy seine Diagnose-Watch. Nach der Reparatur muss nur noch der Health-Sensor genommen, mit der Watch kombiniert und das Ergebnis zurückgebracht werden.',felix:'Felix geht die Reparatur noch einmal in Ruhe durch: Die Firmware aus dem Archiv kommt an die Brücke. Dort wird zuerst Thread eingerichtet, dann Matter verbunden und zuletzt das Offline-Update geladen.',benny:'Benny stellt den Peiler schon einmal auf das bekannte Schlüsselsignal ein. Jetzt fehlen noch Ollis Akku und die richtige Reihenfolge am Berufungs-Fahrplan.'}[p]);}
   else say({novel:'André räuspert sich: "Der Roman soll 404 Seiten haben. Im Moment sind allerdings die meisten davon noch nicht gefunden."',sap:'Olli nickt ernst: "Die Kostenstelle ist angelegt. Bis zur Freigabe müssen wir weiterhin mit der Pflanze arbeiten."',cost:'Felix winkt ab: "Nichts. Wir reparieren, was schon da ist. Ganz sicher kaufen wir dafür kein neues Abo."',pocket:'Benny weicht der Frage aus: "Zu meiner Ermittlungstaktik kann ich im laufenden Verfahren leider nichts sagen."'}[id]);
  }
  else if(p==='caschy'){say(id==='hair'?'Caschy streicht sich über die Glatze: "Ausgefallen, ja. Im wörtlichen Sinn. Der Bart übernimmt inzwischen die restlichen Aufgaben."':'Caschy fasst den Plan zusammen: "Wir holen den Anfang aus dem Archiv, helfen den anderen und setzen ihre vier Fragmente im Serverpult zusammen. Am Ende veröffentlichen wir Klartext. Wenn du festhängst, gibt dir das Notizbuch nach und nach deutlichere Hinweise."');finish();}
 }
 if(!message&&s.pending)message=dialog(s)?.text||'';
 return {state:s,message,tone};
}
