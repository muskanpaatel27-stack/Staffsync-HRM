# StaffSync — Modern Human Resource Management Solution

A starter MERN-stack HR management application for academic demonstration.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- API: REST

## Features
- Dashboard with employee/leave summary
- Employee directory: create, list, update and delete employees
- Leave requests: submit, list, approve/reject
- Search employees by name, department or email
- Responsive dark dashboard UI

## Requirements
- Node.js 18+
- MongoDB Community Server or a MongoDB Atlas connection

## Run locally

### 1. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
Set `MONGO_URI` in `backend/.env`. Default API port is 5000.

### 2. Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the URL printed by Vite (usually http://localhost:5173).

## Demo data
The API automatically seeds a few sample employees and leave requests when the database is empty.

## API endpoints
- `GET /api/health`
- `GET /api/employees`
- `POST /api/employees`
- `GET /api/employees/:id`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`
- `GET /api/leaves`
- `POST /api/leaves`
- `PATCH /api/leaves/:id/status`

## Important academic note
This is a functional academic starter project, not a production HR platform. Before real-world use, add authentication/authorization, input validation, audit logs, backups, secure secrets management, and tests. The current demo endpoints do not implement login.
