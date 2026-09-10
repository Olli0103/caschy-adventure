# Abnahmeprotokoll

Geprüft am **10.09.2026** im Projekt `caschy-adventure`. Die unten genannte Runtime wurde während des gesamten letzten Browserdurchlaufs **nicht verändert**; der Test vergleicht vor und nach dem Lauf ihren SHA-256-Digest. Das Deployment wird nach dem Push separat über die veröffentlichte URL geprüft.

## Reproduzierbare Ergebnisse

| Prüfung | Ergebnis |
|---|---|
| `npm run check` | Syntax von `content.js`, `engine.js`, `art.js`, `app.js`, `server.mjs` bestanden; `git diff --check` sauber |
| `npm test` | **15/15 bestanden**, 0 Fehler, 0 übersprungen |
| `npm run test:browser` | **69 Prüfungen bestanden**, echter Chromium 153.0.8010.12 |
| Desktop-Spielweg | Vollständiger Sieg mit normalen Mausklicks auf die Raumziele; 1440 × 1080 |
| Mobiler Spielweg | Unabhängiger vollständiger Sieg mit echten Playwright-Tap-Eingaben, 390 × 844, Touch + Reduced Motion |
| Save/Restore | UI-Neuladen nach Ollis Diagnose: identischer Zustand, Akku vorhanden, Weg zu Ende gespielt |
| Nebenende | Clickbait-Ende tatsächlich angezeigt, Rückkehr zum Pult, danach gutes Ende |
| Tastatur | Aktionen per 1–4, Auswahl/Antwort per Enter, Fokus nach Rätselantwort und beim nächsten Migrationsschritt erhalten |
| Fehler und Hinweise | Falsche Antwort blockiert nicht; drei Hinweisstufen; Neustart abbrechen und bestätigen geprüft |
| Audio | Erst nach freiwilligem Buttonklick aktiviert, wieder deaktivierbar; kein Autoplay |
| Hotspot-Abdeckung | Alle verbleibenden Hotspots per Maus angesehen, vorab aufgenommene/entfernte Objekte im Lösungsweg benutzt; **55/55 Entdeckungen** erreicht |
| Laufzeitfehler / externe Requests | **0 JavaScript-Page-Errors, 0 externe Spielanfragen** |
| Echte Canvas-Pixel | Titel-Canvas ausgelesen: 711 unterschiedliche dekodierte Farbwerte; zusätzlich tatsächliche Sichtkontrolle, nicht nur DOM-Nachweis |
| Screenshots | **22 PNGs** erzeugt und tatsächlich visuell geöffnet/inspektiert |

Maschinenlesbarer Browserbericht: [test-results/browser-report.json](test-results/browser-report.json).

Runtime-Digest:

```text
e28aa2e93e8156cd10a5154d5867e4822b6f328b9733af701a9dd21f2fcb9a9d
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

Alle folgenden PNGs wurden nach dem letzten erfolgreichen Durchlauf als Bilder geöffnet und visuell geprüft. Die erste Bildrunde hatte drei konkrete Verbesserungen ausgelöst: das Portable-Regal bleibt als Möbel nach Entnahme erhalten, Stiftfach/Sensorschale zeigen ihre Verriegelung, doppelte Dialogwiedergaben wurden entfernt. Danach wurden alle Screenshots neu erzeugt und erneut geprüft.

| PNG in `test-results/` | Sichtbefund |
|---|---|
| `01-title.png` | Titel, 404-Monitor und Caschy mit Glatze/weißem Bart/Brille sichtbar; eigener Stil; Text kollidiert nicht mit Figuren |
| `02-newsroom.png` | Redaktion, Schal, Notizregal, USB und klare Aktionsleiste; Nummern entsprechen der Objektliste |
| `room-archive.png` | Eigenständige grünliche Archivszene, The Bat!, C64 und 4/5-Kalender sichtbar; Portable-Fach zeigt LOCKED |
| `16-archive-shelf-after-pickup.png` | Möbel bleibt, entnommenes Portable-Paket und sein Ziel verschwinden; Gegenstand im Inventar vorhanden |
| `room-workshop.png` | Violette Werkstatt, André, 404-Geist, beschrifteter Lebenslauf und verriegeltes Stiftfach sichtbar |
| `03-andre-dialogue.png` | Lesbarer Dialog mit Antworten und nötigem Hinweis; keine doppelte Wiedergabe mehr |
| `04-inventory-hover.png` | Geerdetes Proton Pack gelb ausgewählt; korrekter Geist-Hover und eindeutige Benutzen-Zeile |
| `05-workshop-cleared.png` | Geist tatsächlich weg, Bereinigungsvermerk sichtbar, Stift nun frei; keine Rest-Hitbox |
| `room-lab.png` | Olli und Felix unterscheidbar, EU-Sperre, NO ROUTE und Sensorgitter sichtbar |
| `17-sensor-unlocked.png` | LOCAL OK, Gitter entfernt, Sensor sichtbar; freier Zustand unterscheidet sich klar vom gesperrten |
| `06-lab-repaired.png` | Nach Reload reparierte Brücke und lokale EU-Funktion; genommener Sensor nicht doppelt im Raum, Akku/Fragment im Inventar |
| `room-quay.png` | Deutlich andere Hafenszene mit Wasser, Kran, Schiff, Möwe und Benny; Ortungsobjekt erreichbar |
| `room-server.png` | Rack, vier noch leere Pultplätze und geschlossene Tür klar voneinander getrennt |
| `07-team-unlocked.png` | TEAM OK sichtbar, Fragmente noch im Inventar, nächstes Ziel korrekt |
| `08-core.png` | Fiktive Algorithmus-Maschine, Überschriften-Pult, Kuchen und Bier sichtbar; finales Raumlayout eigenständig |
| `09-finale-choice.png` | Alle drei Überschriften und Schließen-Button lesbar; kein duplizierter Dialogblock |
| `10-affiliate-ending.png` | Tatsächlich anderes Nebenende mit Konfetti; Rückkehrbutton sichtbar und benutzt |
| `11-good-ending.png` | Alle fünf Figuren am Tisch, Kuchen/Bier und klares 200-OK-Ende sichtbar |
| `12-mobile-title.png` | Titel/Intro umbrechend ohne horizontales Überlaufen, großer Startbutton |
| `13-mobile-newsroom.png` | Spielszene, beschriftete Touch-Ziele, Inventar und Notizbuch untereinander ohne Überdeckung |
| `14-mobile-dialogue.png` | Felix-Dialog, lange Hinweise und sechs Inventargegenstände sauber umbrochen; Bedienelemente bleiben erreichbar |
| `15-mobile-ending.png` | Ende vollständig lesbar, fünfköpfiges Team sichtbar, Fortsetzen-/Neustartbuttons ohne Clipping |

Die visuelle Beurteilung stützt sich auf die dekodierten Screenshots. DOM-, Pixel- und Zustandsprüfungen ergänzen sie, ersetzen sie aber nicht.

## Ehrliche Abdeckungsgrenzen

- Keine unvorbereitete menschliche 20–35-Minuten-Spielzeiterhebung; Dauer ist eine Designschätzung.
- Chromium und emuliertes Touchgerät geprüft; Safari, Firefox und physische Geräte nicht verifiziert.
- Keine vollständige Screenreader-/WCAG-Zertifizierung. Tastatur- und Fokusverhalten wurde an repräsentativen realen Interaktionen geprüft; zwei gesamte Wege wurden mit Maus bzw. Touch abgeschlossen.
- SFX-Schalter im Headless-Browser geprüft, keine akustische Qualitätsmessung. Kein Musiktrack vorgesehen.
- Stilisierte stehende Pixelkarikaturen; keine Laufanimation oder fotorealistische Porträtbehauptung.
- Die lokale Funktionsprüfung ist vom Hosting getrennt. GitHub Pages liefert dieselben statischen Dateien aus; Erreichbarkeit und Startszene werden nach dem Deployment zusätzlich an der öffentlichen URL geprüft.
