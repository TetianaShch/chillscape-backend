# ChillScape Backend

Backend for ChillScape application — platform for discovering travel locations.

## Tech Stack

- Node.js
- Express
- CORS
- dotenv

## Getting Started

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Run in production

```bash
npm start
```

Server runs on:
http://localhost:3000

## Environment Variables

Create a `.env` file based on `.env.example`

- PORT
- MONGO_URL

Base Endpoint
GET /

## Response:

```json
{ "message": "Backend is running" }
```

## Authentication is handled via HTTP-only cookies:

- accessToken
- refreshToken
- sessionId

## API Endpoints

### Auth

- `POST /api/auth/register` — реєстрація нового користувача
- `POST /api/auth/login` — вхід у систему
- `POST /api/auth/logout` — вихід з акаунту (private)
- `POST /api/auth/refresh` — оновлення сесії

---

### Users

- `GET /api/users/current` — отримання даних поточного користувача (private)
- `GET /api/users/:userId` — отримання публічної інформації про користувача
- `GET /api/users/:userId/locations` — отримання локацій користувача
- `PATCH /api/users/` — оновлення профілю користувача (private)

---

### Locations

- `GET /api/locations` — отримання списку локацій
- `GET /api/locations/:locationId` — отримання деталей локації
- `POST /api/locations` — створення нової локації (private)
- `PATCH /api/locations/:locationId` — редагування локації (private)

---

### Feedbacks

- `GET /api/feedbacks` — отримання останніх відгуків
- `GET /api/feedbacks/:placeId` — отримання відгуків для конкретної локації
- `POST /api/feedbacks` — створення нового відгуку (private)

---

### Categories

- `GET /api/categories` — отримання списку регіонів
- `GET /api/categories/location-types` — отримання типів локацій

## Deployment

Deployed on Render:
https://chillscape-backend.onrender.com

## Project Structure

- server.js — entry point

- routes/ — API routes
- controllers/ — request handling
- services/ — business logic
- models/ — database models
- middlewares/ — middleware (auth, errors)
- validations/ — request validation
- db/ — MongoDB connection
- utils/ — helpers
- constants/ — app constants

## Git Workflow

- Work in feature branches (`feature/...`, `fix/...`)
- Do not push directly to `main`
- Create a Pull Request for all changes
- At least 1 approval is required before merging
