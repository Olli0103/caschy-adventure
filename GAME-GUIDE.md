# Spielhandbuch und kompletter Walkthrough

[Direkt im Browser spielen](https://olli0103.github.io/caschy-adventure/) · [Zurück zur Übersicht](README.md)

Ein vollständiges Pixel-Point-and-Click-Adventure. Freitag, 17:55 Uhr: Der wichtigste Artikel und der Veröffentlichen-Knopf sind verschwunden. Der Algorithmus möchte aus dem unabhängigen Blog eine Clickbait-Maschine machen. Caschy reist durch seine Bloggeschichte und hilft André, Olli, Felix und Benny, bis vier Fragmente wieder einen Publish-Schlüssel ergeben.

**7 Räume, eigene Startszene, gutes Ende und reparierbares Clickbait-Nebenende; 55 konkrete anklickbare Hotspots.** Geplante Erstspielzeit mit Lesen und Erkunden: etwa **20–35 Minuten**. Kein Echtzeitlimit, Tod oder unumkehrbarer Fehlversuch. Ein bekannter Lösungsweg lässt sich natürlich deutlich schneller spielen.

## Lokal starten

Voraussetzung für den mitgelieferten Startbefehl: Node.js 20 oder neuer. Keine Installation von Paketen notwendig.

```sh
git clone https://github.com/Olli0103/caschy-adventure.git
cd caschy-adventure
npm start
```

Dann **http://127.0.0.1:8080** im Browser öffnen. Beenden: `Ctrl+C` im Serverterminal. Ein beliebiger statischer HTTP-Server funktioniert ebenfalls, etwa `python3 -m http.server 8080 --bind 127.0.0.1` im Projektordner. `file://` wird wegen JavaScript-Modulen nicht als Startweg unterstützt. Ein anderer Port ist mit `PORT=8081 npm start` möglich. Der mitgelieferte Server lauscht ausschließlich auf Loopback; er veröffentlicht nichts im Netz.

## Bedienung

- **Ansehen (1):** beschreiben lassen, Hinweise entdecken, historische Details lesen.
- **Nehmen (2):** tragbare Gegenstände einstecken. Gesperrte Fächer erklären ihre Voraussetzung.
- **Benutzen (3):** Gerät oder Rätsel öffnen. Für Gegenstände: Inventarobjekt auswählen, dann das Ziel im Raum anklicken.
- **Rede mit (4):** Gespräch mit einer Figur beginnen. Der Plan / „Helfen“-Gesprächszweig liefert nötige Gegenstände bzw. Mitarbeit. Optionale Dialogzweige liefern Gags.
- **Kombinieren:** im Inventar zuerst einen Gegenstand, dann einen zweiten wählen. Reihenfolge egal. Falsche Kombinationen verbrauchen nichts.
- **Auswahl aufheben:** Gegenstand erneut anklicken, den passenden Button verwenden, eine Aktion wählen oder `Escape` drücken.
- **Räume:** beschriftete Leiste über der Szene. Verschlossene Räume öffnen sich durch Fortschritt. Man kann jederzeit in bereits offene Räume zurück.
- **Kein Pixel-Hunting:** nummerierte Raumziele und die vollständige beschriftete Objektliste unter der Szene führen dieselben Aktionen aus. Auf Touch sind die Listenbuttons besonders bequem.
- **Tastatur:** `Tab`/`Shift+Tab`, `Enter`/Leertaste für alle Buttons; `1`–`4` wählen Aktionen. Eingabe im Team-Schloss normal per Tastatur. Dialoge sind schließbar; Quizfortschritt bleibt erhalten.
- **Notizbuch:** aktuelles Ziel, drei stufenweise Hinweise je Rätselschritt, letzte Antwort am Anfang und aufklappbarer Gesprächsverlauf. Kernhinweise sind deterministisch, optionale Objektkommentare teilweise zufällig.
- **Speichern:** nach jeder Spielaktion automatisch in `localStorage` unter `caschy-adventure-404-v1`. Nach erneutem Laden „Spiel fortsetzen“. Quizschritt, Inventar, Räume, Entdeckungen und Gesprächsverlauf bleiben erhalten. Gleichen Browser und dieselbe Adresse/Port verwenden.
- **Neustart:** besitzt eine spielinterne Rückfrage und ersetzt nur diesen Spielstand. Schließen der Rückfrage erhält den Fortschritt.
- **Ton:** standardmäßig aus; freiwillig zuschaltbare kurze Web-Audio-SFX, keine externen Audiodateien, keine automatisch startende Musik. Reduced Motion wird respektiert; es gibt keine nötigen zeitkritischen Animationen.

## Räume und Rätselbogen

| Raum | Nötiger Beitrag / Rätsel |
|---|---|
| Redaktion | Caschy, Auftrag, USB-Stick, ausgelagertes Gehirn |
| Archiv 2005 | The Bat!, Aussprache, Portable Firefox, b2evolution → WordPress, Datumsdifferenz; Schulrechner-Firmware |
| Andrés Werkstatt | André liefert Protonenspule; Berufsstationen ergeben Erdung; 404 entstören; eigene Pixel-Bockwurst statt Rechteverletzung |
| Labor der Dinge | Felix prüft und repariert Thread/Matter lokal; Olli liefert Watch und wertet kombinierte lokale Diagnose aus |
| Hafen der Möglichkeiten | Beruflicher Neuanfang als Reihenfolge; Benny kalibriert den Peiler und findet den Schlüssel – in seiner Tasche |
| Serverkeller | Teamjahre 15–16–17–18; vier Fragmente im Pult; Publish-Schlüssel |
| Im Algorithmus | Redaktionelle Entscheidung für eine klare Überschrift; Kuchen und Bier |

Es gibt vier echte Inventarrezepte und sieben mehrstufige bzw. entscheidungsbasierte Rätselstationen vor dem Teamcode/Finale, zusätzlich personenabhängige Benutzen- und Sammelschritte. Nach dem ersten Fragment können Werkstatt und Labor/Hafen weitgehend in anderer Reihenfolge bearbeitet werden. Jeder Kollege ist erforderlich: ohne André keine Spule, ohne Felix keine Brückenfreigabe, ohne Olli keine Watch/kein Akku, ohne Benny keine Signalortung/kein Serverschlüssel.

## Vollständiger Walkthrough — Spoiler

1. Neues Spiel beginnen. In der **Redaktion** den **USB-Stick nehmen**. Optional mit Caschy reden und das ausgelagerte Gehirn ansehen.
2. Ins **Archiv**. **The Bat! Supportforum benutzen**, **„Kaschi“** antworten. Dadurch wird das Portable-Regal entsperrt.
3. **Portable-Regal nehmen**: Du erhältst Portable Firefox, nicht das Möbelstück. Im Inventar **USB-Stick + Portable Firefox** kombinieren.
4. **Firefox auf USB** am **b2evolution-Terminal benutzen**. Antworten: **b2evolution → WordPress → 4. März 2005 ODER 5. März 2005**. Beide Quellenangaben sind richtig. Du bekommst **Fragment: Anfang**; Werkstatt, Labor und Hafen öffnen sich.
5. Im Archiv **C16/C64 benutzen**: **C16/C64 → Computer-AG → Schülerzeitung**. Die spielinterne Reihenfolge steht am Rechner und auf dem Blatt. Die **Offline-Firmware** mitnehmen (automatische Ausgabe).
6. In **Andrés Werkstatt** mit **André reden**, **„Spule nehmen und den Plan besprechen“** wählen. Du erhältst die Protonenspule.
7. **Berufsstationen-Schrank benutzen**: **Stahl- und Betonbauer → Bundeswehr → IT-Systemelektroniker → Technischer Leiter bei PC-Spezialist → Neue Medien bei Saturn**. Du bekommst ein Erdungskabel.
8. **Protonenspule + Erdungskabel** kombinieren. **Geerdetes Proton Pack** an der **404-Erscheinung** benutzen. Der Geist verschwindet; das Stiftfach öffnet sich.
9. **Pixelstift nehmen**, am **Zeichentisch benutzen**. **„Eine eigene Bockwurst aus zwölf Pixeln“** wählen. Andere Antworten kosten nichts, lösen die Rechtefrage aber nicht.
10. **Eigene Pixel-Bockwurst** am **Lizenzwächter 2007 benutzen**. Du erhältst **Fragment: Haltung**.
11. Im **Labor** mit **Felix reden**, **„Den Reparaturplan gemeinsam prüfen“** wählen. Dann **Offline-Firmware** an der **Matter-/Thread-Brücke benutzen**.
12. Reparaturfolge: **Thread-Netz aufbauen → Matter-Gerät verbinden → Geprüfte Offline-Firmware laden**. Die Sensorschale wird freigegeben. **Health-Sensor nehmen**.
13. Mit **Olli reden**, **„Diagnose-Watch ausleihen“**. **Watch + Health-Sensor** kombinieren. Die **lokale Watch-Diagnose an Olli benutzen**. Er gibt **geladenen Akku** und **Fragment: Augenhöhe**. Die gesperrte Cloud-Tür wird durch den lokalen Weg überflüssig.
14. Zum **Hafen**. Mit **Benny reden**, **„Suche gemeinsam vorbereiten“**. **Find-Hub-Peiler nehmen**.
15. **Fahrkartenautomat benutzen**: **Ende 2008: arbeitslos → Powerflasher über Blogkontakte → notebooksbilliger-Blog → Selbstständigkeit**. Der Fahrplan daneben nennt die Stationen.
16. **Geladener Akku + Find-Hub-Peiler** kombinieren. **Aktiven Peiler an Benny benutzen**. Er kalibriert das Signal, ortet die eigene Jackentasche und gibt **Serverschlüssel** sowie **Fragment: Berufung**. Der Serverkeller wird zugänglich.
17. Im **Serverkeller** den **Serverschlüssel am Team-Schloss benutzen** (Benutzen des Schlosses allein öffnet dieselbe Eingabe, sobald du Zugang zum Keller hast). **15161718** eingeben: André 2015, Benny 2016, Olli 2017, Felix 2018.
18. Die vier Inventarfragmente **Anfang, Haltung, Augenhöhe, Berufung** einzeln am **Fragmentpult benutzen**, Reihenfolge beliebig. Das Pult erzeugt den **Publish-Schlüssel**.
19. **Publish-Schlüssel an der Tür zum Algorithmus benutzen**. Du gelangst in den letzten Raum.
20. **Überschriften-Pult benutzen**. Für den Sieg **„Blog nach Störung wieder erreichbar“** wählen. Der Artikel ist zurück, das Blog bleibt sich treu, das Team feiert.
21. Optional eine der beiden reißerischen/unklaren Überschriften wählen: komisches Affiliate-Ende. **„Überschrift überarbeiten“** bringt dich ohne Verlust an das Pult zurück. Danach kann die klare Überschrift gewählt werden.
22. Nach dem guten Ende mit **„Weiter auf Easter-Egg-Suche“** in die Welt zurückkehren. Alle Räume und der Rätselerfolg bleiben erhalten.

### Inventarrezepte

| Kombination | Ergebnis |
|---|---|
| Leerer USB-Stick + Portable Firefox | Firefox auf USB |
| Protonenspule + Erdungskabel | Geerdetes Proton Pack |
| Watch im Diagnosemodus + lokaler Health-Sensor | Lokale Watch-Diagnose |
| Geladener Akku + Find-Hub-Peiler | Aktiver Find-Hub-Peiler |

Fragmente werden **nicht direkt miteinander kombiniert**, sondern im Serverpult eingesetzt. Werkzeuge, die noch in der Tasche bleiben, verursachen keine Sackgasse. Unpassende Kombinationen haben unter anderem eigene Browser-, Watch-, Bockwurst-, Proton-Pack- und Fragmentantworten.

## Alle 55 Easter Eggs / Hotspots

Diese Liste zählt eindeutige **Raumobjekte**, einschließlich Rätselobjekten und Figuren. Sie behauptet nicht, dass es zusätzlich 55 versteckte Bonusgeheimnisse gibt. Jeder Eintrag ist anklickbar und hat einen eigenen Ansehen-Text. Nötige Objekte haben weitere Aktionen; optionale Objekte laden zum Experimentieren ein. Fundzähler zählt das erstmalige Interagieren pro Objekt. Eine Aufnahme zählt vor dem Verschwinden mit.

### Redaktion — 9

1. **404-Monitor:** verschwundener Artikel, unverwüstlicher Cookie-Banner.
2. **USB-Stick:** echter Anfang der Browser-Kombination; tragbarer Werkzeugkasten ohne Abo.
3. **Ausgelagertes Gehirn:** historische Selbstbeschreibung als spielbares Notizmotiv.
4. **Schwarzgelber Schal:** Dortmund 1977, BVB und Exil im Norden.
5. **Freitagsuhr:** 17:55 ohne Echtzeitdruck.
6. **Kaffeetasse:** „Es gibt keinen Plan B“; erfundene Kaffee-Rückseite.
7. **Frisur des Monats:** das absichtlich leere Frisurposter.
8. **Kommentarrohr:** redet ausschließlich ungefragt „Nutze ich eh nicht“.
9. **Caschy:** eigener Dialog, Aussprache und trockener Frisurgag.

### Archiv 2005 — 8

10. **The Bat! Supportforum:** Vor-Blog-Historie und Kaschi-Zugang.
11. **Portable-Regal:** Portable Firefox freischalten und einstecken.
12. **b2evolution-Terminal:** Migration, WordPress-Community, erstes Fragment.
13. **C16/C64:** Schulrechner druckt wirklich nötige Offline-Firmware.
14. **Schülerzeitung:** verständliche Überschrift schon vor dem Blog.
15. **März-2005-Kalender:** quellenoffener 4./5.-März-Widerspruch als richtige Doppelantwort.
16. **Diskettenbox:** 1,44 MB gegen moderne Cookie-Banner.
17. **RSS-Leuchtturm:** Benutzen belohnt die direkte Leserbindung ohne Algorithmus.

### Andrés Werkstatt — 8

18. **André:** Jahr 2015, Spule, Games/Serien, Medienpädagogik und Roman-Nebenfrage.
19. **404-Erscheinung:** paranormaler Fehler mit beleidigt-anonymem Dialog; verschwindet sichtbar nach der Entstörung.
20. **Berufsstationen-Schrank:** fünf reale Stationen ergeben ein Erdungskabel.
21. **Zeichentisch:** eigene Pixel statt fremdem Bockwurstfoto.
22. **Lizenzwächter 2007:** 700-Euro-Lektion, Community und Rechteprüfung.
23. **Pixelstift / verriegeltes Stiftfach:** nach dem Geist erreichbar, für die Zeichnung nötig.
24. **Unfertiger Roman:** „Der Cache aus einer anderen Dimension“, 404 Seiten nicht gefunden.
25. **Games & Serien:** Controller, Serienboxen und die medienpädagogische Pause.

### Labor der Dinge — 9

26. **Olli:** Jahr 2017, Apple/Health/Watch, lokale Diagnose und nötiger Akku.
27. **Felix:** Jahr 2018, Smart Home, Lehrerrolle, Schwabe und aktive Brückenreparatur.
28. **Matter-/Thread-Brücke:** Netz vor Standard vor geprüftem Offline-Update.
29. **EU-Funktion:** „In der EU nicht verfügbar“; lokaler Weg statt Standorttrick.
30. **Health-Sensor:** vor Reparatur versiegelt, danach echtes Kombinationsobjekt.
31. **SAP-Pflanze:** Wasser wartet auf den Freigabeprozess; auch ansprechbar.
32. **Firmware-Tafel:** aus der Lampe wird ein Account-Problem.
33. **Fernost-Paket:** „universal kompatibel“ im Universum des Herstellers.
34. **Schwäbischer Zähler:** Benutzen spart symbolisch ein Standby-Pixel.

### Hafen der Möglichkeiten — 8

35. **Benny / Benjamin:** Jahr 2016, Find Hub, aktive Signalkalibrierung und ehrliche Taschenfrage.
36. **Find-Hub-Peiler:** leer nehmen, mit Ollis Akku aktivieren.
37. **Berufungs-Fahrplan:** Ende 2008, Blogkontakte, Powerflasher, NBB, Selbstständigkeit.
38. **Fahrkartenautomat:** die Unterstützungs-/Neuanfangsgeschichte als nötige Route.
39. **Heimathafen:** Bremerhaven und das Ankommen im Norden.
40. **Plan-B-Boje:** Plan A mit Schwimmflügeln.
41. **Möwe:** „MEINS!“ als alternative Geräteortung.
42. **Community-Bank:** konstruktive Kommentare bekommen einen Platz.

### Serverkeller — 7

43. **Team-Schloss:** die belegten Jahrgänge 15–16–17–18.
44. **Fragmentpult:** vier Stimmen werden sichtbar zu einem Schlüssel.
45. **Tür zum Algorithmus:** Publish-Schlüssel statt Wachstumshack.
46. **Server-Rack:** Cloud im Keller, unabhängiges Blog gegen große Maschinen.
47. **Backup-Band:** Liebeserklärung an das zukünftige Ich; Speicherhinweis.
48. **Anonymer Kommentar:** „Nutze ich eh nicht“ – aber bis in den Keller laufen.
49. **Handbuch Augenhöhe:** Rätsel verständlich erklären statt Wissen voraussetzen.

### Im Algorithmus — 6

50. **Der Algorithmus:** Rede mit ihm: große Versprechen, keine Quelle.
51. **Überschriften-Pult:** klare Fakten gewinnen; zwei schlechte Alternativen bleiben reparierbar.
52. **Clickbait-Trichter:** „GEHEIMER TRICK“ bedeutet offenbar Stecker rein.
53. **Persönliche Sicht:** Meinung, Haltung und die Möglichkeit eigener Fehler.
54. **Jubiläumskuchen:** eigene Pixel, kein Abo im Tortenboden.
55. **Feierabendbier:** auch alkoholfrei; die Maschine trinkt Kennzahlen.

## Historische Quellen

- [Ich blogge jetzt 10 Jahre und möchte euch etwas erzählen](https://stadt-bremerhaven.de/ich-blogge-jetzt-10-jahre-und-moechte-euch-etwas-erzaehlen/)
- [20 Jahre Caschys Blog](https://stadt-bremerhaven.de/20-jahre-caschys-blog/)

**[SOURCES.md](SOURCES.md)** trennt die belegten Anker, abweichende Datumsangaben, Vorgaben aus dem Nutzerbriefing und die vollständig erfundenen Dialoge/Gags. Das Spiel ist keine Behauptung, dass diese Freitagsstörung oder Aussagen tatsächlich stattgefunden hätten.

## Dateien und Architektur

```text
index.html                Semantische Oberfläche, Intro, Finale, Neustartdialog
style.css                 Responsive Layout, Fokus, Touch, Reduced Motion
js/content.js             7 Räume, 55 Hotspots, Inventar und Beschreibungen
js/engine.js              Autoritativer Zustand, Aktionen, Dialoge, Rätsel, Hinweise
js/art.js                 Eigenständige, zustandsabhängige Canvas-Pixelgrafik
js/app.js                 DOM-Adapter, Eingabe, lokale Speicherung, optionale SFX
server.mjs                Kleiner loopbackgebundener statischer HTTP-Server
package.json              Start- und Prüfkommandos; keine Runtime-Abhängigkeiten
SOURCES.md                Quellen und Abgrenzung zur Fiktion
README.md                 Dieses Handbuch inklusive vollständigem Lösungsweg
VERIFICATION.md           Prüf- und Sichtkontrollprotokoll
 tests/route.mjs           Gemeinsamer, ausschließlich befehlsbasierter Spielweg
 tests/state.test.mjs      Zustands- und Rätsellogiktests
 tests/browser.mjs         Echte Chromium-Maus- und Touch-Komplettdurchläufe
 test-results/             Screenshots, Browserbericht, Prüfnachweise
```

`engine.js` ist die einzige Autorität für Inventar, Sichtbarkeit und Rätselerfolg. Das UI schickt Aktionen an `dispatch`; es setzt keine Lösungsflags. Canvas und Hotspots verwenden denselben Sichtbarkeitszustand. Es gibt weder Hintergrundbild-Downloads noch asynchrone Raumassets, dadurch auch kein Asset-Nachladeflackern oder Atlas-Cropping. Alle Zeichnungen sind eigenständig. `caschy-run` wurde nicht verwendet.

## Prüfen

```sh
npm run check
npm test
npm run test:browser
```

- Syntaxprüfung aller Runtime-JS-Dateien und `git diff --check`.
- **15 Node-Tests:** kompletter Sieg, Save/Restore an jedem Schritt, andere Zweigreihenfolge, negative Antworten/Kombinationen, wiederholte Gespräche, Sichtbarkeit, beide Endvarianten, Hinweise, Datenvalidierung.
- **Echter Headless-Browser:** Desktop-Komplettweg über normale Raumklicks; zweiter kompletter Touch-Weg bei 390 × 844 und Reduced Motion; Tastatureingaben, Speicherstand-Neuladen mitten im Spiel, falsche Antwort, Hinweisstufen, Neustart abbrechen/bestätigen, Audio-Toggle, alle 55 Entdeckungen und reparierbares Nebenende.
- Der Browsertest startet und beendet seinen eigenen lokalen Server. Vor dem ersten Lauf `npm install` und `npx playwright install chromium` ausführen. Testprofil und temporäre Dateien liegen im eigenen Projekt und sind von Git ausgeschlossen.
- Screenshots in **[test-results/](test-results/)**: Titel, alle sieben Räume, Andrés Dialog, Inventarauswahl/Geister-Hover, verschwundener Geist, repariertes Labor, Team-Schloss, finale Entscheidung, beide Enden und mobile Ansichten. **[VERIFICATION.md](VERIFICATION.md)** dokumentiert tatsächliche visuelle Inspektion und bekannte Grenzen.

## Bekannte Grenzen

- Die Spielzeit ist eine Gestaltungsschätzung, kein gemessener unvorbereiteter Nutzertest. Wer den Walkthrough kennt, ist deutlich schneller.
- Getestet in Chromium Desktop und emuliertem Touch-Viewport. Safari/Firefox, ein physisches Handy und ein kompletter Screenreader-Audit wurden nicht geprüft. Native Buttons, Labels, Tastaturfokus, hohe Kontraste und Live-Meldungen sind vorhanden; dies ist keine formale WCAG-Zertifizierung.
- Ein lokaler Spielstand pro Browser-Origin. Browserdaten löschen, Privatmodus oder ein anderer Port können den bisherigen Stand unzugänglich machen. Bei Speicherfehlern warnt die Kopfzeile; das laufende Spiel bleibt bedienbar. Kein Export-/Import-Menü.
- Deutschsprachig, stilisierte stehende Figuren statt Laufanimationen; kurze SFX, kein Musik-Soundtrack. Keine Onlinefunktionen, Synchronisierung oder echten Gerätedienste.
- Die Browserprüfung verwendet Playwright 1.63.0 als Entwicklungsabhängigkeit. Das Spiel selbst bleibt unabhängig davon und läuft auf jedem statischen HTTP-Server.
