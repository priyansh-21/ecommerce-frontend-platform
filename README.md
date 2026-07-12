# 🧾 Stockroom — E-Commerce Frontend

[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg)](https://vitejs.dev)

A React frontend for the [Microservices E-Commerce Platform](../ecommerce-microservices)
backend — a full storefront with auth, cart, checkout, order history, and an admin
console for inventory management.

> Built by [Priyansh Gautam](https://github.com/priyansh-21)

## Design

A "stockroom ledger" aesthetic — deep indigo, mustard, and parchment, with a
die-cut ticket component (used for prices, totals, and order status) that echoes
the inventory/stock theme of the backend.

## Features

- Product catalog reading live from the backend API
- JWT-based login/register, session persisted in localStorage
- Cart with quantity controls, stock-aware limits
- Checkout flow: places an order, then pays for it in one action
- Order history with itemized receipts and status badges
- Admin console (role-gated) to create, edit, and delete products

## Running locally

```bash
npm install
cp .env.example .env   # then set VITE_API_URL to your backend URL
npm run dev
```

Visit `http://localhost:5173`. Make sure the backend (Project 1) is running
and `VITE_API_URL` points at it.

## Building for production

```bash
npm run build
```
Outputs static files to `dist/` — deployable to Vercel, Netlify, or any static host.

## Environment variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the deployed backend, e.g. `https://ecommerce-platform.onrender.com` |

## Tech stack
React 18 · React Router · Vite · plain CSS with design tokens (no UI framework)
