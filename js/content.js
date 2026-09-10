export const ITEMS = {
 usb:'Leerer USB-Stick', firefox:'Portable Firefox', portable:'Firefox auf USB',
 firmware:'Offline-Firmware', coil:'Protonenspule', cable:'Erdungskabel', pack:'Geerdetes Proton Pack',
 pencil:'Pixelstift', sausage:'Eigene Pixel-Bockwurst', watch:'Watch im Diagnosemodus', sensor:'Lokaler Health-Sensor', diagnostic:'Lokale Watch-Diagnose',
 battery:'Geladener Akku', tracker:'Find-Hub-Peiler', powered:'Aktiver Find-Hub-Peiler', key:'Serverschlüssel',
 origin:'Fragment: Anfang', voice:'Fragment: Haltung', clarity:'Fragment: Augenhöhe', compass:'Fragment: Berufung', publish:'Publish-Schlüssel'
};
export const ICONS={usb:'▥',firefox:'♨',portable:'▥',firmware:'▤',coil:'◎',cable:'ϟ',pack:'▣',pencil:'╱',sausage:'≋',watch:'◷',sensor:'♡',diagnostic:'◷',battery:'▰',tracker:'⌖',powered:'⌖',key:'⚿',origin:'▧',voice:'▧',clarity:'▧',compass:'▧',publish:'⚿'};
const h=(id,name,x,y,w,height,kind,look)=>({id,name,x,y,w,h:height,kind,look});
export const ROOMS={
 newsroom:{name:'Redaktion',subtitle:'Freitag · 17:55 · Kein Feierabend in Sicht',color:'#db9b50',objects:[
 h('desk','404-Monitor',33,31,19,28,'monitor','404. Artikel weg. Veröffentlichen-Knopf weg. Nur der Cookie-Banner hat natürlich überlebt.'),
 h('usb','USB-Stick',19,61,9,10,'usb','Ein leerer USB-Stick. Früher passte ein Werkzeugkasten in die Hosentasche. Heute braucht er ein Abo.'),
 h('brain','Ausgelagertes Gehirn',5,22,18,22,'shelf','Meine Notizen: 1. Anfang bergen. 2. Team fragen. 3. Vier Fragmente im Serverpult sammeln. USB + Portable Firefox passt zusammen. Das Blog war mein „ausgelagertes Gehirn“.'),
 h('scarf','Schwarzgelber Schal',73,14,16,14,'scarf','Dortmund, 1977. Ein Dortmunder im Norden. Dieser Schal hat mehr Heimspiele gesehen als mein Browser Tabs.'),
 h('clock','Freitagsuhr',57,8,10,17,'clock','17:55. Die Uhr bleibt stehen, bis die Geschichte weitergeht. Kein Echtzeitlimit. Atmen erlaubt.'),
 h('mug','Kaffeetasse',56,59,9,13,'mug','„Es gibt keinen Plan B.“ Auf der Rückseite steht: „Aber noch Kaffee.“ Der zweite Satz ist neu.'),
 h('hair','Frisur des Monats',6,66,13,17,'poster','Meine ausgefallene Frisur. Die Haare sind halt ausgefallen. Die Brille blieb.'),
 h('comments','Kommentarrohr',83,45,12,23,'pipe','„Nutze ich eh nicht“, ruft es aus dem Rohr. Toll. Dann nutze wenigstens den Ausgang.'),
 h('caschy','Caschy',65,42,11,43,'caschy','Glatze, weißer Bart, Brille, trockener Humor. Ausgesprochen: Kaschi. Ich bin hier gleichzeitig Spielfigur und mein eigener Ansprechpartner.')
 ]},
 archive:{name:'Archiv 2005',subtitle:'Ein Anfang, zwei Datumsangaben, kein Cloud-Zwang',color:'#66bbb0',objects:[
 h('forum','The Bat! Supportforum',6,23,20,26,'monitor','Vor dem Blog: Foren, eine Seite zu The Bat! und das deutsche Supportforum. Am Bildschirm: „Wie sprechen Freunde deinen Spitznamen aus?“'),
 h('firefox','Portable-Regal',31,16,16,26,'shelf','Portable Software und Frickeleien. Das Fach öffnet sich, sobald das Supportforum dich erkennt.'),
 h('migration','b2evolution-Terminal',54,25,21,26,'monitor','Ein Umzugsassistent ohne Netzwerk. Er verlangt einen portablen Browser und fragt nach Ausgangssystem, Ziel und Geburtstag.'),
 h('c64','C16 / C64',21,62,23,20,'computer','Ein Schulrechner. Auf dem Rand: „Erst C16/C64, dann Computer-AG, dann Schülerzeitung.“ Die Druckausgabe enthält Offline-Firmware fürs spätere Labor.'),
 h('paper','Schülerzeitung',6,60,12,20,'paper','Schlagzeile: COMPUTER-AG HAT DRUCKER. Keine „Du wirst nicht glauben“-Zeile. Der Weg: Rechner → AG → Zeitung.'),
 h('calendar','März 2005',80,15,13,25,'calendar','Der Rückblick von 2015 nennt den 5. März 2005, der von 2025 feiert am 4. März. Beide Angaben sind belegt. Der Assistent akzeptiert beide.'),
 h('floppy','Diskettenbox',57,66,13,16,'box','1,44 MB. Die Hälfte heutiger Webseiten wäre beleidigt, wenn man nur ihren Cookie-Banner hier speichern wollte.'),
 h('rss','RSS-Leuchtturm',81,58,13,22,'rss','Direkte Verbindung zu Lesern. Keine Tanzpflicht, keine Reichweitenlotterie. Der Algorithmus hustet.')
 ]},
 workshop:{name:'Andrés Werkstatt',subtitle:'Paranormaler Support · seit 2015',color:'#b299dc',objects:[
 h('andre','André',72,39,13,44,'andre','André Westphal · seit 2015. Games, Serien, Medienpädagogik und angehender Romanheld. Das Proton Pack wäre sein Wunschtest.'),
 h('ghost','404-Erscheinung',46,19,16,31,'ghost','Ein Fehler mit Bettlaken. „Nutze ich eh nicht!“ André nennt es paranormal. Ich nenne es Freitag.'),
 h('career','Berufsstationen-Schrank',7,18,18,37,'cabinet','Erdung hinter einem Lebenslauf-Schloss: Stahl- und Betonbauer → Bundeswehr → IT-Systemelektroniker → PC-Spezialist → Saturn. Hinweise stehen auf den fünf Schubladen.'),
 h('drawing','Zeichentisch',31,66,17,20,'paper','Leeres Raster. Hier lässt sich eine eigene Bockwurst zeichnen. Kein fremdes Foto und keine Ausrede nötig.'),
 h('license','Lizenzwächter 2007',53,61,17,23,'monitor','2007: ein Bockwurstfoto ohne Rechte, 700 Euro Anwaltskosten. Eine schmerzhafte reale Lektion. Der Wächter akzeptiert nur eine selbst gezeichnete Pixel-Bockwurst.'),
 h('pencil','Pixelstift',85,61,9,13,'pencil','Ein Stift im Geisterfach. Nach der Entstörung ist er erreichbar.'),
 h('novel','Unfertiger Roman',28,21,12,23,'book','„Kapitel 1: Der Cache aus einer anderen Dimension.“ André: Die Trilogie ist im Kopf schon fertig. Die ersten drei Sätze auch.'),
 h('console','Games & Serien',7,65,15,18,'console','Ein Controller, drei Serienboxen und ein medienpädagogischer Zettel: Auch einmal Pause drücken.')
 ]},
 lab:{name:'Labor der Dinge',subtitle:'Olli + Felix · Lokal ist auch ein Standort',color:'#7ebdd8',objects:[
 h('olli','Olli',14,39,12,44,'olli','Oliver Posselt · seit 2017. Apple, Watch, Health, Gadgets und SAP. Seine Diagnose läuft bewusst lokal.'),
 h('felix','Felix',75,39,12,44,'felix','Felix Frank · seit 2018. Technophiler Schwabe, Lehrer, Smart Home und Technik aus Fernost. Spart Strom, nicht Erklärungen.'),
 h('bridge','Matter-/Thread-Brücke',37,30,21,24,'bridge','Felix’ Etikett: Thread ist das Netz; Matter spricht darauf. Erst Netz, dann Standard, zuletzt geprüfte Offline-Firmware. Kein endloser Cloud-Update-Kreis.'),
 h('eu','EU-Funktion',61,13,18,25,'door','„In der EU nicht verfügbar.“ Darunter klebt Olli: „Lokale Diagnose verfügbar. Health-Sensor mit meiner Watch kombinieren und mir zeigen.“'),
 h('sensor','Health-Sensor',37,67,12,16,'sensor','Ein lokaler Sensor. Die verriegelte Schale gibt ihn nach der Brückenreparatur frei.'),
 h('sap','SAP-Pflanze',5,17,12,23,'plant','Olli: Das Gießen ist beantragt. Der Workflow prüft gerade, ob Wasser eine konzernweite Ressource ist.'),
 h('firmwarewall','Firmware-Tafel',85,12,11,26,'poster','v1: Lampe an. v2: Lampe smart. v3: Lampe braucht Konto. Felix: Wir nehmen lokal und dokumentiert.'),
 h('gadget','Fernost-Paket',59,65,12,19,'box','„Universal kompatibel*“. *Mit dem Universum des Herstellers. Felix hat den Beipackzettel schon übersetzt.'),
 h('energy','Schwäbischer Zähler',4,67,9,16,'meter','0,4 Watt Standby. Felix: Kleinvieh macht auch Firmware. Der Testknopf spart symbolisch ein Pixel Strom.')
 ]},
 quay:{name:'Hafen der Möglichkeiten',subtitle:'Benny · Nordlicht mit Ortungsauftrag · seit 2016',color:'#ed9d75',objects:[
 h('benny','Benny / Benjamin',66,39,13,44,'benny','Benjamin Mamerow, genannt Benny · seit 2016. Nordlicht, technikverliebt und Blogger. Seine Jackentasche sendet verdächtig schlecht.'),
 h('tracker','Find-Hub-Peiler',39,62,12,15,'tracker','Ein leerer Offline-Peiler. Ein Akku aus Ollis lokaler Diagnose würde ihn wieder fit machen.'),
 h('route','Berufungs-Fahrplan',8,21,22,28,'poster','Ende 2008 arbeitslos → über Blogkontakte zu Powerflasher → notebooksbilliger-Blog → Selbstständigkeit. Der Fahrkartenautomat will diese Reihenfolge.'),
 h('ticket','Fahrkartenautomat',6,59,16,24,'machine','„Vom Blog ins Business“. Kein schöner Umweg, aber viel Unterstützung. Sortiere die vier Stationen des Fahrplans.'),
 h('boat','Heimathafen',80,40,16,24,'boat','Bremerhaven und der Norden. Heimweh nach Dortmund passt in kein Hafenbecken, aber irgendwann findet man einen Heimathafen.'),
 h('buoy','Plan-B-Boje',28,57,8,25,'buoy','Es gibt keinen Plan B. Diese Boje ist Plan A mit Schwimmflügeln.'),
 h('seagull','Möwe',52,13,10,17,'bird','Sie schreit „MEINS!“ Benny: Auch eine Form von Geräteortung. Nur deutlich unpräziser.'),
 h('bench','Community-Bank',80,68,16,15,'bench','Ein freier Platz für konstruktive Kommentare. Wer hilft, darf bleiben. Wer nur pöbelt, bekommt keinen Extra-Stuhl.')
 ]},
 server:{name:'Serverkeller',subtitle:'Vier Stimmen. Ein gemeinsamer Schlüssel.',color:'#70c993',objects:[
 h('lock','Team-Schloss',5,29,17,23,'monitor','Vier Eintrittsjahre, aufsteigend. André, Benny, Olli, Felix. Jeweils die letzten zwei Ziffern. Das ist ein Rätselcode, kein echtes Passwort.'),
 h('slots','Fragmentpult',32,35,27,31,'desk','Vier Plätze: Anfang, Haltung, Augenhöhe, Berufung. Benutze jedes geborgene Fragment hier. Das Team-Schloss muss zuerst offen sein.'),
 h('gate','Tür zum Algorithmus',73,15,20,44,'door','Dahinter wartet das Finale. Die Tür öffnet sich mit dem Publish-Schlüssel aus dem Fragmentpult.'),
 h('rack','Server-Rack',8,62,15,21,'rack','Lüfter: laut. Cloud: Keller. Datenhoheit: bei uns. Ein kleines unabhängiges Blog gegen eine sehr große Maschine.'),
 h('backup','Backup-Band',59,68,10,15,'box','Ein Backup ist eine Liebeserklärung an dein zukünftiges Ich. Dieses Spiel speichert lokal nach jeder Aktion.'),
 h('troll','Anonymer Kommentar',58,11,11,20,'ghost','„Nutze ich eh nicht.“ – „Dann war dein Weg bis in unseren Serverkeller erstaunlich aufwendig.“'),
 h('manual','Handbuch Augenhöhe',28,8,17,22,'book','Keine Geheimwissenschaft: vier Leute, vier Jahrgänge, vier Fragmente. Die genauen Jahre findest du beim Ansehen der Kollegen.')
 ]},
 core:{name:'Im Algorithmus',subtitle:'Reichweite ist keine Überschrift',color:'#ff8f85',objects:[
 h('algorithm','Der Algorithmus',62,15,27,51,'algorithm','Eine fiktive Maschine, die unabhängige Stimmen durch austauschbares Clickbait ersetzen will. Inspiriert von der realen Sorge um die Macht großer Tech-Plattformen.'),
 h('headline','Überschriften-Pult',22,49,30,30,'desk','Der Artikel ist gerettet. Jetzt fehlt eine nüchterne, klare Überschrift: Was ist passiert? Keine Übertreibung, kein verschwiegenes Versprechen.'),
 h('bait','Clickbait-Trichter',7,19,13,32,'pipe','„DIESER GEHEIME TRICK ÄNDERT ALLES!“ Gemeint ist vermutlich: Stecker wieder rein.'),
 h('mirror','Persönliche Sicht',36,12,16,23,'poster','Verständlich auf Augenhöhe, persönliche Perspektiven und konstruktive Kommentare. Unabhängig heißt nicht unfehlbar.'),
 h('cake','Jubiläumskuchen',80,71,14,15,'cake','Der Kuchen ist echt gezeichnet und wird nach dem Finale gegessen. Kein überraschendes Abo im Boden.'),
 h('beer','Feierabendbier',58,72,10,14,'beer','Kuchen und Bier fürs Team. Alkoholfrei steht auch bereit. Der Algorithmus trinkt flüssige Kennzahlen.')
 ]}
};
export const HOTSPOT_COUNT=Object.values(ROOMS).reduce((n,r)=>n+r.objects.length,0);
export const FRAGMENTS=['origin','voice','clarity','compass'];
export const BANTER=[
 'Caschy: „Dafür brauche ich weder ein Abo noch einen sechsten Versuch.“',
 'Caschy: „Mein ausgelagertes Gehirn sucht noch nach dem zuständigen Fach.“',
 'Caschy: „Technik-Gelöt. Das klingt weniger dramatisch als digitale Transformation.“',
 'Caschy: „Wenn das klappt, schreibe ich einen verständlichen Artikel darüber. Wenn nicht, auch.“',
 'Caschy: „Meine Frisur ist heute wieder komplett aus dem Raster gefallen.“'
];
