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

Create a `.env` file in the root directory:

```env
PORT=3000
```

## API

### Base endpoint

```
GET /
```

Response:

```json
{ "message": "Backend is running" }
```

## Deployment

Deployed on Render:
https://chillscape-backend.onrender.com

## Project Structure

server.js — server entry point (express app, middleware, routes, server start)
Folders
routes/ — API routes
controllers/ — request handling logic
services/ — business logic and data processing
models/ — database models
middlewares/ — custom middleware (auth, error handling, etc.)
validations/ — request validation schemas
db/ — database connection setup (MongoDB)
utils/ — helper functions
constants/ — application constants
