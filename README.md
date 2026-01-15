# Developer Workout React & TypeScript

Schau dir das Projekt an und beantworte diese Fragen:

1- Wie startet man das Projekt lokal?
. Repository klonen
. Abhängigkeiten installieren: npm install
. Dev-Server starten: npm run dev
. Im Browser öffnen: [http://localhost:5173]

2- Was fehlt dem Projekt, damit es in einer Produktionsumgebung eingesetzt werden kann?

- Für Produktion würde ich ergänzen:

. Build/Deploy Ablauf (z. B. npm run build + Hosting)
. Konfiguration über Umgebungsvariablen (API-URL nicht hardcoded, z. B. .env)
. Fehlerbehandlung im UI (wenn API nicht erreichbar ist)
. Tests (mindestens einfache Smoke-/Component-Tests)
. CI Pipeline (automatisch build + lint + tests)
. Security/Updates (Dependencies aktuell halten)

3- Was sollte man ergänzen, wenn man mit mehreren Entwicklern daran arbeiten möchte?

- Ich würde hinzufügen:

. .env.example, damit jeder schnell starten kann
. .gitignore für .env, damit keine lokalen Werte ins Repo kommen
. Linting/Formatting (ESLint/Prettier) für einheitlichen Code
. kurze README Regeln (wie starten, wie committen)
. GitHub Actions (lint + build)

4- Welche Verbesserungen würdest du am Code vornehmen?

- Meine Verbesserungen / Vorschläge:

. Warenkorb-Logik in React-State (kein mutables Objekt ohne Re-Render)
. gleiche Produkte im Warenkorb zusammenfassen mit quantity
. Produkte nicht als Fake-Daten, sondern aus Backend laden
. Fehler anzeigen, wenn API nicht funktioniert (nicht nur console)
. Code etwas vereinfachen (weniger doppeltes JSX / bessere Typen)

5- Warum wird der Warenkorb beim Hinzufügen von Produkten nicht aktualisiert? Wie würdest du das Problem beheben?

- Der Warenkorb wurde früher nicht aktualisiert, weil:

. es eine mutable Struktur (z. B. Class/Set) war
. beim Hinzufügen wurde nur intern geändert (addItem)
. aber kein React-State Update gemacht → kein Re-Render

6- Kannst du die Produktliste aus einem Backend laden? Du kannst das Projekt dev-workout-backend-kotlin dafür verwenden.
7- Erstelle eine verbesserte Version des Projekts mit den von dir vorgeschlagenen Änderungen. Ähnliche Probleme /
   Fehler brauchst du nur einmal zu beheben
8- Optionale Zusatzaufgabe: Füge eine einfache Produktdetailseite hinzu, die angezeigt wird, wenn auf ein Produkt in der
   Produktliste geklickt wird. Nimm dazu ein zusätzliches Feld "description" in den Produktdaten auf und zeige diese
   Beschreibung auf der Detailseite an.
