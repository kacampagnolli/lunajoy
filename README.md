# Lunajoy Monorepo

This repository contains a **Server (Backend)** and a **Client (Frontend)** under one monorepo:

- **Server (Backend):** An Express-based application that uses Prisma for database management.

- **Client (Frontend):** A React (Vite) application that uses Tailwind CSS for styling.
---

## Environment Variables

You need to create `.env` files for both the **Server** and the **Client**.

### Server

Inside `packages/server/.env` (example):

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```
### Client

Inside `packages/client/.env` (example):

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

## Installation

From the **root** of the monorepo, run:

```bash
pnpm install
```

## Example Usage

```bash
# 1. Install dependencies
pnpm install

# 2. Create and apply migrations
pnpm run db:create

# 3. Run both server and client
pnpm run dev

```

> **Server**: Runs on [http://localhost:3000](http://localhost:3000)

> **Client**: Runs on [http://localhost:5173](http://localhost:5173) (default Vite port)

## Database Seeding

We're seeding the database with some fake data to help visualize the dashboard. The script creates 5 users with 10 health log entries each, generating random values for mood, anxiety, sleep, activity, and other fields. This makes it easier to test the dashboard's weekly and monthly filters.
