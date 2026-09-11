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
 newsroom:{name:'Redaktion',subtitle:'Freitag, 17:55 Uhr. Der Feierabend kann warten.',color:'#db9b50',objects:[
 h('desk','404-Monitor',33,31,19,28,'monitor','Auf dem Monitor steht nur noch "404". Der Artikel und der Veröffentlichen-Knopf sind verschwunden. Der Cookie-Banner dagegen arbeitet zuverlässig wie eh und je.'),
 h('usb','USB-Stick',19,61,9,10,'usb','Ein leerer USB-Stick. Früher passte darauf ein ganzer Werkzeugkasten. Heute bräuchte selbst der vermutlich ein Konto und ein Abo.'),
 h('brain','Ausgelagertes Gehirn',5,22,18,22,'shelf','In Caschys Notizen steht: Zuerst den Anfang bergen, dann das Team fragen und schließlich vier Fragmente im Serverpult sammeln. Daneben hat jemand "USB-Stick + Portable Firefox" gekritzelt. Das Blog war eben nicht umsonst sein ausgelagertes Gehirn.'),
 h('scarf','Schwarzgelber Schal',73,14,16,14,'scarf','Dortmund, Jahrgang 1977, später im Norden gelandet. Der Schal hat wahrscheinlich mehr Heimspiele gesehen als Caschys Browser geöffnete Tabs.'),
 h('clock','Freitagsuhr',57,8,10,17,'clock','Es ist 17:55 Uhr. Die Uhr läuft erst weiter, wenn die Geschichte es tut. Wenigstens dieses Spiel kennt keinen Zeitdruck.'),
 h('mug','Kaffeetasse',56,59,9,13,'mug','Auf der Tasse steht "Es gibt keinen Plan B". Jemand hat darunter "Aber noch Kaffee" ergänzt. Historisch verbürgt ist nur der erste Satz.'),
 h('hair','Frisur des Monats',6,66,13,17,'poster','Das Poster verspricht Caschys ausgefallene Frisur und hält sein Wort. Die Haare sind ausgefallen, die Brille ist geblieben.'),
 h('comments','Kommentarrohr',83,45,12,23,'pipe','Aus dem Rohr ruft jemand: "Nutze ich eh nicht!" Caschy deutet auf den Ausgang und schlägt vor, wenigstens den zu nutzen.'),
 h('caschy','Caschy',65,42,11,43,'caschy','Caschy steht vor seinem leeren Artikel und sieht aus, als hätte der Freitag gerade seine letzte Geduld verbraucht. Sein Spitzname wird übrigens "Kaschi" ausgesprochen.')
 ]},
 archive:{name:'Archiv 2005',subtitle:'Hier fing alles an. Nur das genaue Datum streitet sich.',color:'#66bbb0',objects:[
 h('forum','The Bat! Supportforum',6,23,20,26,'monitor','Vor dem Blog gab es Foren, eine Seite zu The Bat! und das deutsche Supportforum. Auf dem Bildschirm wartet eine alte Erkennungsfrage: "Wie sprechen deine Freunde deinen Spitznamen aus?"'),
 h('firefox','Portable-Regal',31,16,16,26,'shelf','Das Regal ist voller portabler Software und liebevoller Frickelei. Das Fach mit Firefox öffnet sich, sobald das Supportforum Caschy wiedererkennt.'),
 h('migration','b2evolution-Terminal',54,25,21,26,'monitor','Der alte Umzugsassistent arbeitet komplett offline. Für den Start verlangt er einen portablen Browser. Danach fragt er nach dem ursprünglichen Blogsystem, dem Ziel des Umzugs und dem Geburtsdatum des Blogs.'),
 h('c64','C16 / C64',21,62,23,20,'computer','Der Schulrechner trägt eine handschriftliche Notiz: "Erst C16 und C64, dann Computer-AG, dann Schülerzeitung." Im Drucker steckt außerdem eine Karte mit Offline-Firmware für das Labor.'),
 h('paper','Schülerzeitung',6,60,12,20,'paper','Die Schlagzeile lautet schlicht "Computer-AG hat Drucker". Kein Geheimtrick, keine Sensation, nur die saubere Reihenfolge vom Rechner über die AG zur Zeitung.'),
 h('calendar','März 2005',80,15,13,25,'calendar','Der Rückblick von 2015 nennt den 5. März 2005, der Rückblick von 2025 feiert am 4. März. Beide Angaben sind belegt, deshalb akzeptiert der Umzugsassistent auch beide.'),
 h('floppy','Diskettenbox',57,66,13,16,'box','Auf jede Diskette passen 1,44 Megabyte. Manche heutige Webseite bekäme darauf nicht einmal ihren Cookie-Banner unter.'),
 h('rss','RSS-Leuchtturm',81,58,13,22,'rss','RSS verbindet das Blog direkt mit seinen Lesern. Keine Reichweitenlotterie, keine Aufforderung zum Tanzen. Irgendwo im Serverkeller hustet beleidigt ein Algorithmus.')
 ]},
 workshop:{name:'Andrés Werkstatt',subtitle:'André hat Erfahrung mit Geistern. Zumindest theoretisch.',color:'#b299dc',objects:[
 h('andre','André',72,39,13,44,'andre','André schreibt seit 2015 über Technik, Games, Serien und Medienpädagogik. Das Proton Pack wäre vermutlich sein liebster Produkttest, wenn der 404-Geist nicht gerade den Raum besetzen würde.'),
 h('ghost','404-Erscheinung',46,19,16,31,'ghost','Unter dem Bettlaken steckt offenbar ein besonders hartnäckiger Fehler. André nennt ihn paranormalen Support. Caschy nennt ihn Freitag.'),
 h('career','Berufsstationen-Schrank',7,18,18,37,'cabinet','Hinter dem Lebenslauf-Schloss liegt ein Erdungskabel. Die fünf Schubladen zeigen den Weg vom Stahl- und Betonbauer über Bundeswehr, IT-Systemelektronik und PC-Spezialist bis zu Saturn.'),
 h('drawing','Zeichentisch',31,66,17,20,'paper','Auf dem Zeichentisch wartet ein leeres Raster. Mit dem Pixelstift ließe sich hier eine eigene Bockwurst zeichnen, ganz ohne fremdes Foto und spätere Post vom Anwalt.'),
 h('license','Lizenzwächter 2007',53,61,17,23,'monitor','2007 kostete ein Bockwurstfoto ohne passende Rechte 700 Euro Anwaltskosten. Der Lizenzwächter hat daraus gelernt und akzeptiert nur ein selbst gezeichnetes Motiv.'),
 h('pencil','Pixelstift',85,61,9,13,'pencil','Der Pixelstift liegt direkt hinter der Erscheinung. Sobald der Geist weg ist, kann Caschy ihn nehmen.'),
 h('novel','Unfertiger Roman',28,21,12,23,'book','Der Roman beginnt mit dem Satz "Der Cache kam aus einer anderen Dimension". André versichert, die ganze Trilogie sei im Kopf längst fertig. Nur auf dem Papier fehlen noch ein paar Seiten.'),
 h('console','Games & Serien',7,65,15,18,'console','Neben dem Controller stehen drei Serienboxen und ein medienpädagogischer Hinweis: Auch bei der besten Geschichte darf man gelegentlich auf Pause drücken.')
 ]},
 lab:{name:'Labor der Dinge',subtitle:'Olli und Felix setzen lieber auf lokale Lösungen.',color:'#7ebdd8',objects:[
 h('olli','Olli',14,39,12,44,'olli','Olli ist seit 2017 dabei und kümmert sich um Apple, Health, Gadgets und gelegentlich SAP. Seine Watch-Diagnose läuft bewusst lokal, weil nicht jede Messung erst eine Weltreise machen muss.'),
 h('felix','Felix',75,39,12,44,'felix','Felix schreibt seit 2018 über Smart Home, Unterricht und Technik aus Fernost. Als technophiler Schwabe spart er Strom, aber nie an einer guten Erklärung.'),
 h('bridge','Matter-/Thread-Brücke',37,30,21,24,'bridge','Auf dem Etikett von Felix steht die Reparaturreihenfolge: Zuerst das Thread-Netz aufbauen, dann das Matter-Gerät verbinden und zuletzt die geprüfte Offline-Firmware laden. Für ein weiteres Cloud-Konto ist hier kein Platz.'),
 h('eu','EU-Funktion',61,13,18,25,'door','Die Tür meldet "In der EU nicht verfügbar". Olli hat einen Zettel daruntergeklebt: Der lokale Health-Sensor funktioniert trotzdem. Man muss ihn nur mit seiner Diagnose-Watch verbinden und ihm das Ergebnis zeigen.'),
 h('sensor','Health-Sensor',37,67,12,16,'sensor','Der Health-Sensor arbeitet lokal, steckt aber noch in einer verriegelten Schale. Wenn Felix die Brücke repariert hat, springt sie auf.'),
 h('sap','SAP-Pflanze',5,17,12,23,'plant','Olli hat das Gießen beantragt. Der Workflow prüft noch, ob Wasser als konzernweite Ressource gilt und deshalb eine eigene Kostenstelle braucht.'),
 h('firmwarewall','Firmware-Tafel',85,12,11,26,'poster','Version 1 schaltet die Lampe ein. Version 2 macht sie smart. Version 3 verlangt ein Benutzerkonto. Felix streicht Version 3 durch und schreibt daneben: "Lokal und dokumentiert reicht."'),
 h('gadget','Fernost-Paket',59,65,12,19,'box','Auf dem Karton steht "Universal kompatibel*". Das Sternchen schränkt die Aussage auf das Universum des Herstellers ein. Felix hat den Beipackzettel vorsichtshalber schon übersetzt.'),
 h('energy','Schwäbischer Zähler',4,67,9,16,'meter','Der Zähler zeigt 0,4 Watt im Standby. Felix findet, dass auch Kleinvieh Strom verbraucht. Mit dem Testknopf lässt sich immerhin symbolisch ein Pixel sparen.')
 ]},
 quay:{name:'Hafen der Möglichkeiten',subtitle:'Benny sucht den Schlüssel und findet erst einmal den Norden.',color:'#ed9d75',objects:[
 h('benny','Benny / Benjamin',66,39,13,44,'benny','Benny ist seit 2016 im Team, kommt aus dem Norden und begeistert sich für Technik und das Bloggen. Sein Peiler findet fast alles. Nur aus seiner eigenen Jackentasche kommt auffällig wenig Signal.'),
 h('tracker','Find-Hub-Peiler',39,62,12,15,'tracker','Der Offline-Peiler ist leer. Mit dem geladenen Akku aus Ollis lokaler Diagnose dürfte er wieder anspringen.'),
 h('route','Berufungs-Fahrplan',8,21,22,28,'poster','Der Fahrplan beginnt Ende 2008 mit der Arbeitslosigkeit. Über Blogkontakte führte der Weg zu Powerflasher, dann zum notebooksbilliger-Blog und schließlich in die Selbstständigkeit.'),
 h('ticket','Fahrkartenautomat',6,59,16,24,'machine','Der Automat möchte den Weg vom Blog ins Berufsleben in die richtige Reihenfolge bringen. Es war kein schöner Umweg, aber an den entscheidenden Stellen halfen die richtigen Menschen.'),
 h('boat','Heimathafen',80,40,16,24,'boat','Bremerhaven und der Norden wurden irgendwann zum Heimathafen. Die Sehnsucht nach Dortmund passt zwar in kein Hafenbecken, aber offenbar trotzdem in ein neues Zuhause.'),
 h('buoy','Plan-B-Boje',28,57,8,25,'buoy','Es gibt keinen Plan B. Diese Boje sieht allerdings verdächtig nach Plan A mit Schwimmflügeln aus.'),
 h('seagull','Möwe',52,13,10,17,'bird','Die Möwe schreit "Meins!" und stürzt sich auf alles, was glänzt. Benny erkennt darin eine robuste, wenn auch ziemlich ungenaue Form der Geräteortung.'),
 h('bench','Community-Bank',80,68,16,15,'bench','Auf der Bank ist Platz für konstruktive Kommentare. Wer etwas beiträgt, darf gern bleiben. Für reines Gepöbel wird kein zusätzlicher Stuhl aufgestellt.')
 ]},
 server:{name:'Serverkeller',subtitle:'Vier Stimmen ergeben einen gemeinsamen Schlüssel.',color:'#70c993',objects:[
 h('lock','Team-Schloss',5,29,17,23,'monitor','Das Schloss verlangt die vier Eintrittsjahre von André, Benny, Olli und Felix in aufsteigender Reihenfolge. Gefragt sind jeweils nur die letzten beiden Ziffern. Es handelt sich um einen Rätselcode, nicht um ein echtes Passwort.'),
 h('slots','Fragmentpult',32,35,27,31,'desk','Das Pult hat vier Plätze für Anfang, Haltung, Augenhöhe und Berufung. Sobald das Team-Schloss offen ist, lassen sich die geborgenen Fragmente hier nacheinander einsetzen.'),
 h('gate','Tür zum Algorithmus',73,15,20,44,'door','Hinter dieser Tür wartet das Finale. Öffnen lässt sie sich nur mit dem Publish-Schlüssel, der aus den vier Fragmenten entsteht.'),
 h('rack','Server-Rack',8,62,15,21,'rack','Die Lüfter sind laut, die Cloud steht im Keller und die Daten bleiben unter eigener Kontrolle. Ziemlich viel Technik für ein kleines Blog, aber immer noch weniger bedrohlich als die Maschine hinter der Tür.'),
 h('backup','Backup-Band',59,68,10,15,'box','Ein Backup ist eine Liebeserklärung an das eigene zukünftige Ich. Das Spiel nimmt sich das zu Herzen und speichert nach jeder Aktion lokal.'),
 h('troll','Anonymer Kommentar',58,11,11,20,'ghost','Aus der Dunkelheit kommt ein mürrisches "Nutze ich eh nicht". Caschy fragt sich, warum der Absender dann den ganzen Weg bis in den Serverkeller auf sich genommen hat.'),
 h('manual','Handbuch Augenhöhe',28,8,17,22,'book','Das Handbuch macht kein Geheimnis daraus: Vier Teammitglieder, vier Eintrittsjahre und vier Fragmente öffnen den Weg. Die genauen Jahre stehen bei den Figuren.')
 ]},
 core:{name:'Im Algorithmus',subtitle:'Reichweite ersetzt keine gute Überschrift.',color:'#ff8f85',objects:[
 h('algorithm','Der Algorithmus',62,15,27,51,'algorithm','Die fiktive Maschine verspricht mehr Reichweite, wenn dafür jede persönliche Stimme durch austauschbaren Clickbait ersetzt wird. Ganz erfunden ist nur die Maschine. Die Sorge vor der Macht großer Plattformen ist real.'),
 h('headline','Überschriften-Pult',22,49,30,30,'desk','Der Artikel ist gerettet, aber eine Überschrift fehlt noch. Sie soll nüchtern sagen, was passiert ist, ohne Übertreibung und ohne ein Versprechen zu verschweigen.'),
 h('bait','Clickbait-Trichter',7,19,13,32,'pipe','Der Trichter schlägt vor: "Dieser geheime Trick ändert alles!" Gemeint ist wahrscheinlich, den Stecker wieder einzustecken.'),
 h('mirror','Persönliche Sicht',36,12,16,23,'poster','Verständlich schreiben, eine persönliche Perspektive zeigen und konstruktiv diskutieren. Unabhängigkeit macht niemanden unfehlbar, aber sie lässt die eigene Stimme hörbar.'),
 h('cake','Jubiläumskuchen',80,71,14,15,'cake','Der Kuchen ist wirklich gezeichnet und wird nach dem Finale gegessen. Im Boden versteckt sich weder ein Abo noch ein überraschender Rabattcode.'),
 h('beer','Feierabendbier',58,72,10,14,'beer','Für das Team stehen Kuchen, Bier und eine alkoholfreie Variante bereit. Der Algorithmus bleibt bei flüssigen Kennzahlen.')
 ]}
};
export const HOTSPOT_COUNT=Object.values(ROOMS).reduce((n,r)=>n+r.objects.length,0);
export const FRAGMENTS=['origin','voice','clarity','compass'];
export const BANTER=[
 'Caschy: "Dafür brauche ich weder ein Abo noch einen sechsten Versuch."',
 'Caschy: "Mein ausgelagertes Gehirn sucht noch nach dem zuständigen Fach."',
 'Caschy: "Technik-Gelöt klingt immer noch angenehmer als digitale Transformation."',
 'Caschy: "Wenn das klappt, schreibe ich einen verständlichen Artikel darüber. Wenn nicht, wahrscheinlich auch."',
 'Caschy: "Meine Frisur ist heute wieder vollständig aus dem Raster gefallen."'
];
