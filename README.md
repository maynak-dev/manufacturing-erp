# Manufacturing ERP - Frontend

## Tech Stack
- React 18 + Vite + TypeScript
- Tailwind CSS
- TanStack React Query
- React Router v6
- Recharts (charts)
- Axios (HTTP)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and set your backend URL:
```bash
cp .env.example .env
```

3. Start dev server:
```bash
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add env variable: `VITE_API_URL=https://your-backend.vercel.app/api`
4. The `vercel.json` handles SPA routing

## Modules
- Dashboard with KPI cards
- Companies & Contacts (CRM)
- Products & BOM
- Orders with status tracking
- Production / Work Orders
- Inventory (Raw Materials, WIP, Finished Goods)
- Vendors & Purchase Orders
- Invoices & Payments
- Dispatch & Delivery
- Role-based authentication
