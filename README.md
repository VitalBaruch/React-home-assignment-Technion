# React Experiment – Technion Home Assignment

A browser-based experiment application built with React + TypeScript.  
The system guides users through a controlled, forward-only experiment flow, logs user interactions, and stores completed experiment runs locally in the browser.

All timestamps are recorded in UTC.

---

## Project Overview

This project implements a simple in-browser experiment system designed to collect user interaction data in a controlled flow.

The application consists of:
- A Home page displaying previously completed experiment runs.
- A two-step experiment flow:
  - Experiment Page 1: stimulus display, Likert-scale input, random-word buttons, and click logging.
  - Experiment Page 2: results view with a table of recorded events (click events).
- A strict forward-only navigation policy during the experiment to preserve data integrity.

### Experiment Flow Limitation

Refreshing the browser or navigating away from the application during  
Experiment Page 1 results in the loss of the current experiment state.  
Incomplete experiments are not persisted.

This is an intentional design decision:
- The application is fully client-side.
- Experiment data is persisted only after explicit submission.
- No intermediate auto-save mechanism is implemented.

---

## Tech Stack

- React + TypeScript
- React Router
- TanStack Table
- Vite
- Tailwind CSS
- Docker
- Nginx (serving the production build)

---

## Run Locally (Development Mode)

This mode is intended for development and debugging.

```
npm install
npm run dev
```

Open in browser:
http://localhost:5173

Notes:
- Uses Vite’s development server.
- Hot Module Replacement (HMR) is enabled.
- This setup does not reflect the production environment.

---

## Production Build (Local, Without Docker)

To generate and run a production-ready build locally without Docker:

```
npm run build
npm run preview
```

This creates an optimized production build in the dist/ directory and serves it locally using Vite’s preview server.

---

## Docker – Production Build (Recommended)

The project is fully dockerized and can be run as a production-ready static application served by Nginx.

This setup represents the final production configuration of the application.

### How Docker Is Used

- The React application is built inside a Docker container using npm run build.
- The generated static files (dist/) are copied into a lightweight Nginx container.
- Nginx serves the application as static files.
- A SPA fallback is configured to support React Router deep links and page refreshes.

### Build and Run with Docker

```
git clone https://github.com/VitalBaruch/React-home-assignment-Technion.git
cd React-home-assignment-Technion
docker build -t react-experiment .
docker run --rm -p 8080:80 react-experiment
```

Open in browser:
http://localhost:8080

---

## Architecture / Design Decisions

- Forward-only flow: experiment routes are guarded to prevent navigating backwards during an active experiment (home is allowed).
- Persistence: completed experiment runs are stored locally in the browser, allowing review of previous results without a backend.
- UTC timestamps: all recorded timestamps use new Date().toISOString() to ensure timezone-independent logging.
- Serving strategy: the production build is served via Nginx, including SPA fallback to support React Router deep links and refresh.

---

## Project Structure (Main Files)

src/
 ├─ App.tsx
 ├─ router.tsx
 ├─ flow.ts
 ├─ pages/
 │   ├─ HomePage.tsx
 │   ├─ ExperimentPage1.tsx
 │   └─ ExperimentPage2.tsx
 └─ components/
     ├─ ClickLogsTable.tsx
     └─ ReturnToHomePageButton.tsx

---

## Notes & Assumptions

- The application is fully client-side.
- No environment variables or external configuration are required.
- Network access is used only for fetching random words.
- Incomplete experiments are intentionally not persisted.

---

## Submission Notes

- The project is fully dockerized.
- The production build is served via Nginx.
- The application runs without additional configuration.
- The repository can be cloned and executed directly using the instructions above.
