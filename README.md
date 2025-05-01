# School Management API (Neon DB + Express)

### Features:
- Add new schools with lat/long
- List schools sorted by proximity

### Endpoints:
- `POST /addSchool` → Add school
- `GET /listSchools?latitude=..&longitude=..` → Sorted list

### Tech Stack:
- Node.js, Express, Neon PostgreSQL, Render

### Setup:
- `npm install`
- Create `.env` from `.env.example`
- Run with `npm run dev`

### Hosted API:
[[https://school-api.onrender.com](#)](https://school-management-1-tqep.onrender.com)
