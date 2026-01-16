# Developer Workout React & TypeScript

## 1) Wie startet man das Projekt lokal?

- Repo klonen und ins Projektverzeichnis gehen:
  - `cd dev-workout-react-typescript`

- Abhängigkeiten installieren:
  - `npm install`

- `.env` Datei anlegen (oder `.env.example` kopieren):
  - `VITE_API_BASE_URL=http://localhost:8080`

- Dev-Server starten:
  - `npm run dev`

- Im Browser öffnen:
  - [http://localhost:5173]

## 2) Was fehlt dem Projekt, damit es in einer Produktionsumgebung eingesetzt werden kann?

Für Produktion würde ich ergänzen / beachten:

- Build + Hosting Prozess (z. B. `npm run build` + Hosting wie Vercel)
- Umgebungsvariablen für API-URL (z. B. `.env` pro Umgebung)
- Monitoring / Error Tracking (z. B. Sentry) und sinnvolle Logs
- Tests (Unit-/Component-Tests)
- CI Pipeline (lint + build + tests)
- Security: Dependency Updates, ggf. Security Headers
- CORS sauber auf Prod-Domain begrenzen (Backend)

## 3) Was sollte man ergänzen, wenn man mit mehreren Entwicklern daran arbeiten möchte?

- `.env.example`, damit jeder schnell starten kann
- `.gitignore` für `.env`, damit keine lokalen Werte committed werden
- Linting/Formatting (ESLint + Prettier) für einheitlichen Code
- kurze Contributing-Regeln (z. B. Branch-Namen, Commits)
- GitHub Actions (lint + build)

## 4) Welche Verbesserungen würdest du am Code vornehmen?

Ich habe folgende Verbesserungen umgesetzt:

- Projektstruktur verbessert (`src/pages`, `src/components`, `src/context`, `src/types`)
- Routing mit `react-router-dom`:
  - `/` Produktliste
  - `/products/:id` Produktdetail
- Warenkorb in einen globalen React Context ausgelagert (sauberer State + Wiederverwendung)
- Warenkorb UX verbessert:
  - Cart Icon im Header
  - Dropdown mit Items, Menge +/-, Clear, Total
- Produktdaten kommen aus dem Backend (kein Fake-Sample im Frontend)
- Fehlerbehandlung + Loading-Komponente
- Path Alias `@/` für clean imports
- SEO/Meta:
  - meta tags in `index.html`
  - dynamische Titles/Descriptions pro Seite (Helmet)
- Favicon angepasst

## 5) Warum wird der Warenkorb beim Hinzufügen von Produkten nicht aktualisiert? Wie würdest du das Problem beheben?

Ursache im ursprünglichen Projekt:

- Der Warenkorb war ein mutables Objekt (Class/Set)
- Beim Hinzufügen wurde nur intern mutiert, aber React-State wurde nicht geändert
- Ergebnis: kein Re-Render → UI bleibt gleich

Fix:

- Warenkorb über React-State / Context verwalten (immutable updates)
- gleiche Produkte zusammenfassen mit `quantity`

## 6) Kannst du die Produktliste aus einem Backend laden? Du kannst das Projekt dev-workout-backend-kotlin dafür verwenden

Ja.

- Frontend lädt Daten mit:
  - `fetch(${VITE_API_BASE_URL}/products)`
- API Base URL kommt aus `.env`
- Backend läuft lokal z. B. auf:
  - [http://localhost:8080]

Wichtig:

- Für lokale Entwicklung brauchte es CORS. Dafür habe ich im Backend eine CORS-Konfiguration ergänzt, damit Requests von `http://localhost:5173` erlaubt sind.

## 7) Erstelle eine verbesserte Version des Projekts mit den von dir vorgeschlagenen Änderungen

Umgesetzt:

- Cart funktioniert zuverlässig (Context + immutable updates)
- Cart Dropdown im Header (bessere UX)
- Produktliste aus Backend
- Produktdetailseite (Bonus)
- `.env.example` + `.gitignore` angepasst
- Fehlerhandling + Loading UI
- Aliasing `@/` für Imports
- Meta Tags / SEO

## 8) Optionale Zusatzaufgabe: Produktdetailseite

Umgesetzt:

- Klick auf ein Produkt führt zu `/products/:id`
- Detailseite zeigt:
  - Name, Preis, Beschreibung
- Beschreibung kommt aus dem Backend-Feld `description`
- Zusätzlich: eigener Page Title und Meta Description

## Live Demo

Frontend (Vercel): [https://micromerce.vercel.app/]

Backend (Render): [https://dev-workout-backend-kotlin.onrender.com/products]
