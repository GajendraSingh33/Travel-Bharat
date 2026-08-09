# Technical Architecture & Developer Guide - Travel Bharat

## 1. Project Directory Structure
```
Travel Bharat/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB Mongoose connection handler
│   ├── controllers/
│   │   ├── authController.js     # Admin registration & login logic
│   │   ├── templeController.js   # Temple CRUD & multi-field filtering
│   │   └── circuitController.js  # Pilgrimage circuit guide queries
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT & Admin role verification
│   ├── models/
│   │   ├── Temple.js             # Mongoose Temple Heritage Schema
│   │   ├── Circuit.js            # Mongoose Pilgrimage Circuit Schema
│   │   └── User.js               # User & Admin Schema with bcrypt hashing
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth
│   │   ├── templeRoutes.js       # /api/temples
│   │   ├── circuitRoutes.js      # /api/circuits
│   │   └── statsRoutes.js        # /api/stats
│   ├── seedData.js               # Rich sample dataset (10+ Indian temples)
│   ├── index.js                  # Express server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation header & drawer
│   │   │   ├── Footer.jsx        # Cultural footer & region links
│   │   │   └── TempleCard.jsx    # Reusable temple item card
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Hero search, KPI ticker, featured temples
│   │   │   ├── Explore.jsx       # Multi-filter search & state directory
│   │   │   ├── TempleDetail.jsx  # Tabbed heritage view & print helper
│   │   │   ├── Circuits.jsx      # Pilgrimage routes guide
│   │   │   ├── SavedTemples.jsx  # Local itinerary planner
│   │   │   ├── AdminDashboard.jsx# Admin CMS portal & editing modal
│   │   │   └── PRDDoc.jsx        # In-app interactive PRD documentation
│   │   ├── services/
│   │   │   └── api.js            # Axios HTTP client
│   │   ├── App.jsx               # React Router v7 setup
│   │   └── index.css             # Tailwind v4 & custom cultural theme
│   └── package.json
├── PRD.md                        # Product Requirements Document
└── TECHNICAL_DOCS.md             # Architecture & Setup Guide
```

---

## 2. API Endpoints Reference

### Public Endpoints
- `GET /api/temples` - Fetch temples list (Supports `search`, `state`, `city`, `deity`, `circuit` query params).
- `GET /api/temples/featured` - Fetch top featured temples for home page.
- `GET /api/temples/filters` - Fetch distinct states, cities, deities, and circuits for dynamic dropdown options.
- `GET /api/temples/:id` - Fetch single temple by ObjectId or slug.
- `GET /api/circuits` - Fetch pilgrimage circuits list with populated temple details.
- `GET /api/stats` - Fetch platform KPIs (listed temples count, state coverage, active pilgrims estimate).

### Admin Endpoints (Requires `Bearer <JWT_TOKEN>`)
- `POST /api/auth/login` - Admin authentication. Returns JWT token.
- `POST /api/temples` - Create new temple entry.
- `PUT /api/temples/:id` - Update existing temple details.
- `DELETE /api/temples/:id` - Delete temple record.
- `PATCH /api/temples/:id/approve` - Approve or reject temple submission.
- `POST /api/seed` - Trigger database re-seeding with authentic Indian temple dataset.

---

## 3. How to Run Locally

### Step 1: Start Backend Server
```bash
cd backend
npm install   # If dependencies not already installed
npm run dev   # Starts Express server on http://localhost:5000
```

### Step 2: Seed Database (Optional / Automatic)
You can trigger data seeding via terminal or by clicking **Seed Sample Data** in the Admin Portal (`admin@travelbharat.gov.in` / `admin123`).
```bash
curl -X POST http://localhost:5000/api/seed
```

### Step 3: Start Frontend Server
```bash
cd frontend
npm install   # If dependencies not already installed
npm run dev   # Starts Vite dev server on http://localhost:5173
```
