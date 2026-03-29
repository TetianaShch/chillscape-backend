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

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh

### Users

- GET /api/users/current
- GET /api/users/:userId

### Locations

- GET /api/locations
- GET /api/locations/:locationId
- POST /api/locations (private)
- PATCH /api/locations/:locationId (private)

Query params:

- page
- limit
- region
- type
- search

### Categories

- GET /api/categories
- GET /api/categories/location-types

### Feedbacks

- GET /api/feedbacks/:placeId
- POST /api/feedbacks (private)

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
