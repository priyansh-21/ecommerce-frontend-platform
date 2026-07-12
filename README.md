# 🧾 Stockroom — E-Commerce Frontend

[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg)](https://vitejs.dev)

A React storefront for the [Ecommerce Platform backend](https://github.com/priyansh-21/ecommerce-microservices-platform) — full shopping experience with auth, cart, checkout, order history, and a role-gated admin console for inventory management.

> Built by [Priyansh Gautam](https://github.com/priyansh-21)

**🔗 Live app:** [stockroom-jn8pjkiod-gautampriyanash21-2784s-projects.vercel.app](https://stockroom-jn8pjkiod-gautampriyanash21-2784s-projects.vercel.app)

> ⚠️ **Note:** The backend runs on Render's free tier and spins down after inactivity — **the first API call after idle time may take 30–60 seconds** while it wakes up. Products will show "Loading…" briefly on first visit; this is expected.

### Try it yourself
- **As a customer:** register a new account → browse the catalog → add to cart → checkout → view order history
- **As an admin:** log in with the seeded admin credentials to add, edit, or remove products

---

## Design

A "stockroom ledger" aesthetic — deep indigo, mustard, and parchment tones, with a die-cut ticket component (used for prices, totals, and order status) that echoes the inventory/stock theme of the backend.

## Features

- Product catalog reading live from the backend API
- JWT-based login/register, session persisted in `localStorage`
- Cart with quantity controls, stock-aware limits
- Checkout flow: places an order, then pays for it in one action (simulated payment)
- Order history with itemized receipts and status badges
- Admin console (role-gated) to create, edit, and delete products

## Tech Stack

React 18 · React Router · Vite · plain CSS with design tokens (no UI framework)

## Running Locally

```bash
git clone https://github.com/priyansh-21/ecommerce-frontend-platform.git
cd ecommerce-frontend-platform
npm install
cp .env.example .env   # then set VITE_API_URL to your backend URL
npm run dev
```

Visit `http://localhost:5173`. Make sure the [backend](https://github.com/priyansh-21/ecommerce-microservices-platform) is running and `VITE_API_URL` points at it.

## Building for Production

```bash
npm run build
```

Outputs static files to `dist/` — deployable to Vercel, Netlify, or any static host.

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the deployed backend, e.g. `https://ecommerce-platform-70zn.onrender.com` |

## Backend

This frontend pairs with the **Ecommerce Platform** Spring Boot backend:
👉 [github.com/priyansh-21/ecommerce-microservices-platform](https://github.com/priyansh-21/ecommerce-microservices-platform)

## About

Built as a companion frontend to practice full-stack integration — JWT auth flows, role-based UI, and consuming a REST API end-to-end from registration through checkout.
