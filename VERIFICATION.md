# Abnahmeprotokoll

Geprüft am **11.09.2026** im Projekt `caschy-adventure`. Die unten genannte Runtime wurde während des gesamten letzten Browserdurchlaufs **nicht verändert**; der Test vergleicht vor und nach dem Lauf ihren SHA-256-Digest.

## Öffentliche Version

GitHub Pages liefert das Spiel unter [olli0103.github.io/caschy-adventure](https://olli0103.github.io/caschy-adventure/) aus. Ein separater Chromium-Test gegen diese öffentliche URL erhielt HTTP 200 und bestätigte sowohl die neue zusammenhängende Einleitung als auch den überarbeiteten Caschy-Dialog. JavaScript-Fehler traten nicht auf; GitHub meldete den Pages-Build der Textfassung `082a54e` als `built`. Der Titel-Canvas enthielt weiterhin 727 dekodierte Farbwerte.

## Reproduzierbare Ergebnisse

| Prüfung | Ergebnis |
|---|---|
| `npm run check` | Syntax von `content.js`, `engine.js`, `art.js`, `app.js`, `server.mjs` bestanden; `git diff --check` sauber |
| `npm test` | **15/15 bestanden**, 0 Fehler, 0 übersprungen |
| `npm run test:browser` | **74 Prüfungen bestanden**, echter Chromium 153.0.8010.12 |
| Desktop-Spielweg | Vollständiger Sieg mit normalen Mausklicks auf die Raumziele; 1440 × 1080 |
| Mobiler Spielweg | Unabhängiger vollständiger Sieg mit echten Playwright-Tap-Eingaben, 390 × 844, Touch + Reduced Motion |
| Save/Restore | UI-Neuladen nach Ollis Diagnose: identischer Zustand, Akku vorhanden, Weg zu Ende gespielt |
| Nebenende | Clickbait-Ende tatsächlich angezeigt, Rückkehr zum Pult, danach gutes Ende |
| Tastatur | Aktionen per 1–4, Auswahl/Antwort per Enter, Fokus nach Rätselantwort und beim nächsten Migrationsschritt erhalten |
| Fehler und Hinweise | Falsche Antwort blockiert nicht; drei Hinweisstufen; Neustart abbrechen und bestätigen geprüft |
| Audio | Erst nach freiwilligem Buttonklick aktiviert, wieder deaktivierbar; kein Autoplay |
| Hotspot-Abdeckung | Alle verbleibenden Hotspots per Maus angesehen, vorab aufgenommene/entfernte Objekte im Lösungsweg benutzt; **55/55 Entdeckungen** erreicht |
| Laufzeitfehler / externe Requests | **0 JavaScript-Page-Errors, 0 externe Spielanfragen** |
| Echte Canvas-Pixel | Titel-Canvas ausgelesen: 727 unterschiedliche dekodierte Farbwerte; alle fünf 96 × 96-Porträts zusätzlich auf Abmessungen und Farbvielfalt geprüft |
| Screenshots | **26 PNGs** erzeugt und tatsächlich visuell geöffnet/inspektiert |

Maschinenlesbarer Browserbericht: [test-results/browser-report.json](test-results/browser-report.json).

Runtime-Digest:

```text
39b6353358b47e2bd0f88ac82ad30160caabe365cffee6f3e528664c9fee822d
```

Die Hashbildung umfasst der Reihe nach Dateinamen und Inhalt von `index.html`, `style.css`, `js/content.js`, `js/engine.js`, `js/art.js`, `js/app.js`, `server.mjs`. Die einzelnen Artefakthashes stehen in [test-results/artifact-manifest.json](test-results/artifact-manifest.json).

## Was die Logiktests abdecken

- Alle notwendigen Kollegen, Fragmente und Code-/Finalentscheidungen im vollständigen öffentlichen Befehlsweg.
- Speichern/Wiederherstellen an **jedem** Schritt dieses Wegs und jeweils vollständiges Weiterspielen.
- Keine Mutation des vorherigen Zustands durch die Engine.
- Gesperrte Räume und Gegenstände bleiben gesperrt, vorgetäuschte Inventarnutzung funktioniert nicht.
- Falsche Quizantworten erhalten den bereits erreichten Teilschritt; unpassende Kombinationen erhalten Gegenstände.
- Alle Paare des späten Inventars sind gefahrlos; Fragmente lassen sich nicht versehentlich zerstören.
- Beide dokumentierten Märzdatumsangaben lösen die Archivfrage.
- Labor/Hafen vor der Werkstatt ebenfalls bis zum Sieg spielbar.
- Wiederholte Dialoge erzeugen keine mehrfachen oder bereits verbrauchten Questgegenstände.
- Genommene Dinge und besiegter Geist verschwinden aus den autoritativen Hotspots.
- Beide schlechten Überschriften sind ohne Verlust reparierbar.
- Hinweise begrenzen sich auf drei Stufen und setzen sich für ein neues Ziel zurück.
- Beschädigte/ungültige Save-Strukturen werden abgefangen; IDs und Szenengeometrie sind konsistent.

## Tatsächliche Sichtkontrolle des finalen Stands

Alle folgenden PNGs wurden nach dem letzten erfolgreichen Durchlauf als Bilder geöffnet und visuell geprüft. In der aktuellen Runde wurden sämtliche 55 Objektbeschreibungen, alle Hauptdialoge, Rätseltexte, Hinweise, Rückmeldungen, die Startseite und beide Enden neu geschrieben. Die längeren, zusammenhängenden Fassungen wurden auf Desktop und Mobil ohne Überdeckung oder abgeschnittenen Text dargestellt. Die Referenzfotos der Figuren bleiben außerhalb des Builds.

| PNG in `test-results/` | Sichtbefund |
|---|---|
| `01-title.png` | Überarbeitete Einleitung als zusammenhängender Fließtext; Titel, 404-Monitor und Figuren ohne Kollisionen |
| `02-newsroom.png` | Redaktion, Schal, Notizregal, USB und klare Aktionsleiste; Nummern entsprechen der Objektliste |
| `portrait-caschy.png` | Glatze, dunkle Brille und weißer Vollbart im großen Porträt; Gespräch und Aktionsbuttons kollidieren nicht |
| `room-archive.png` | Eigenständige grünliche Archivszene, The Bat!, C64 und 4/5-Kalender sichtbar; Portable-Fach zeigt LOCKED |
| `16-archive-shelf-after-pickup.png` | Möbel bleibt, entnommenes Portable-Paket und sein Ziel verschwinden; Gegenstand im Inventar vorhanden |
| `room-workshop.png` | Violette Werkstatt, André, 404-Geist, beschrifteter Lebenslauf und verriegeltes Stiftfach sichtbar |
| `03-andre-dialogue.png` | Andrés vollständig neu geschriebener Dialog bleibt neben dem großen Porträt lesbar; Antworten ohne Clipping |
| `04-inventory-hover.png` | Geerdetes Proton Pack gelb ausgewählt; korrekter Geist-Hover und eindeutige Benutzen-Zeile |
| `05-workshop-cleared.png` | Geist tatsächlich weg, Bereinigungsvermerk sichtbar, Stift nun frei; keine Rest-Hitbox |
| `room-lab.png` | Olli und Felix durch Frisur, Brillenform und Bart klar unterscheidbar; EU-Sperre, NO ROUTE und Sensorgitter sichtbar |
| `portrait-felix.png` | Braunes Haar, dunkle Rundbrille und Lächeln; Porträt, Antworten und Laborszene ohne Überdeckung |
| `17-sensor-unlocked.png` | LOCAL OK, Gitter entfernt, Sensor sichtbar; freier Zustand unterscheidet sich klar vom gesperrten |
| `portrait-olli.png` | Kurzes dunkles Haar, rechteckige Brille und ausgeprägter Kinnbart; Dialog vollständig lesbar |
| `06-lab-repaired.png` | Nach Reload reparierte Brücke und lokale EU-Funktion; genommener Sensor nicht doppelt im Raum, Akku/Fragment im Inventar |
| `room-quay.png` | Deutlich andere Hafenszene mit Wasser, Kran, Schiff, Möwe und Benny; Ortungsobjekt erreichbar |
| `portrait-benny.png` | Glatze, schwarze Rechteckbrille und kurzer Kinnbart; Porträt und Hafendialog ohne Clipping |
| `room-server.png` | Rack, vier noch leere Pultplätze und geschlossene Tür klar voneinander getrennt |
| `07-team-unlocked.png` | TEAM OK sichtbar, Fragmente noch im Inventar, nächstes Ziel korrekt |
| `08-core.png` | Fiktive Algorithmus-Maschine, Überschriften-Pult, Kuchen und Bier sichtbar; finales Raumlayout eigenständig |
| `09-finale-choice.png` | Alle drei Überschriften und Schließen-Button lesbar; kein duplizierter Dialogblock |
| `10-affiliate-ending.png` | Tatsächlich anderes Nebenende mit Konfetti; Rückkehrbutton sichtbar und benutzt |
| `11-good-ending.png` | Alle fünf Figuren am Tisch, Kuchen/Bier und klares 200-OK-Ende sichtbar |
| `12-mobile-title.png` | Titel/Intro umbrechend ohne horizontales Überlaufen, großer Startbutton |
| `13-mobile-newsroom.png` | Spielszene, beschriftete Touch-Ziele, Inventar und Notizbuch untereinander ohne Überdeckung |
| `14-mobile-dialogue.png` | Felix' längerer, neu geschriebener Dialog und sechs Inventargegenstände sauber umbrochen; Bedienelemente bleiben erreichbar |
| `15-mobile-ending.png` | Ende vollständig lesbar, fünfköpfiges Team sichtbar, Fortsetzen-/Neustartbuttons ohne Clipping |

Die visuelle Beurteilung stützt sich auf die dekodierten Screenshots. DOM-, Pixel- und Zustandsprüfungen ergänzen sie, ersetzen sie aber nicht.

## Ehrliche Abdeckungsgrenzen

- Keine unvorbereitete menschliche 20–35-Minuten-Spielzeiterhebung; Dauer ist eine Designschätzung.
- Chromium und emuliertes Touchgerät geprüft; Safari, Firefox und physische Geräte nicht verifiziert.
- Keine vollständige Screenreader-/WCAG-Zertifizierung. Tastatur- und Fokusverhalten wurde an repräsentativen realen Interaktionen geprüft; zwei gesamte Wege wurden mit Maus bzw. Touch abgeschlossen.
- SFX-Schalter im Headless-Browser geprüft, keine akustische Qualitätsmessung. Kein Musiktrack vorgesehen.
- Detaillierte, stilisierte Pixelkarikaturen und Dialogporträts; keine Laufanimation oder fotorealistische Porträtbehauptung.
- Die lokale Funktionsprüfung ist vom Hosting getrennt. GitHub Pages liefert dieselben statischen Dateien aus; Erreichbarkeit, Titel-Canvas und Spielstart wurden zusätzlich an der öffentlichen URL geprüft.
