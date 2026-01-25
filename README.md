# React Experiment – Technion Home Assignment

A browser-based experiment application built with **React + TypeScript**.  
The system guides users through a controlled, forward-only experiment flow, logs interactions, and stores completed runs locally in the browser.

All timestamps are recorded in **UTC**.

---

## 📌 Project Overview
This project implements a simple in-browser experiment system consisting of:
- A home page displaying previously completed experiment runs.
- A two-step experiment flow:
  - **Page 1**: stimulus display, Likert-scale input, random-word buttons, and click logging.
  - **Page 2**: results view with a table of recorded events (click events).
- Forward-only navigation enforced during the experiment to preserve data integrity.

⚠️ **Experiment Flow Limitation**

Refreshing the browser or navigating away from the application during
**Experiment Page 1** results in the loss of the current experiment state.
Incomplete experiments are not persisted.

---

## 🧱 Tech Stack
- **React** + **TypeScript**
- **React Router**
- **TanStack Table**
- **Vite**
- **Tailwind CSS**
- **Docker**
- **Nginx** (serving production build)

---

## ▶️ How to Run the Project

### 🔹 Run with Docker (Recommended – Production Setup)

This is the recommended way to run the project, as it reflects the final
production configuration (React production build served via Nginx).

```bash
# Clone the repository
git clone https://github.com/VitalBaruch/React-home-assignment-Technion.git
cd React-home-assignment-Technion

# Build Docker image
docker build -t react-experiment .

# Run Docker container
docker run --rm -p 8080:80 react-experiment

# Open in browser
http://localhost:8080