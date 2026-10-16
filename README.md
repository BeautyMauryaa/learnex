# Learnex

Learnex is an AI-powered learning platform in active development, designed to bring student and teacher workflows—such as study materials, notes, assignments, and exams—into one place.

This is a work in progress. Some backend routes and AI integrations are connected, while other features and documentation are still being developed.

## Current direction

- Organize learning resources and study materials
- Support student and teacher workflows
- Explore AI-assisted learning features
- Connect frontend and backend services

## Tech stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Realtime:** Socket.IO
- **Integrations:** Google Generative AI, OpenAI, and supporting APIs where configured

## Repository layout

- `client/` — Vite frontend used for local development
- `server/` — Express API and backend services
- `Learnex-Frontend/` — additional frontend directory currently present in the repository; review before deciding which frontend copy should be kept long-term

## Run locally

You need Node.js and access to a MongoDB instance.

### 1. Configure the backend

```bash
cd server
npm install
```

Copy `server/.env.example` to `server/.env` and adjust the environment values for the features you run. The template includes examples:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/learnex
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_ORIGIN=http://localhost:5173
HF_API_KEY=
OPENAI_API_KEY=
GEMINI_API_KEY=
EMAIL_USER=
EMAIL_PASS=
```

Use your own credentials, keep `.env` files out of Git, and never use the example JWT value as a real secret. Leave optional integration keys empty if the corresponding feature is not being used.

Start the backend:

```bash
npm run dev
```

### 2. Configure the frontend

In a second terminal:

```bash
cd client
npm install
```

Copy `client/.env.example` to `client/.env` (or create the file with this value):

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Development notes

- Features may be incomplete or change while the project evolves.
- Keep API keys and credentials in local environment files, not in source control.
- Install dependencies with `npm install`; do not commit `node_modules/`.
- The repository currently contains both `client/` and `Learnex-Frontend/`. Compare them before removing or consolidating either directory.

## Author

**Beauty Mauryaa (Nova)**  
[GitHub profile](https://github.com/BeautyMauryaa)
