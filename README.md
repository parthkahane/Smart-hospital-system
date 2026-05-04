# Smart Hospital Management System

A full-stack hospital management app built with native frontend pages and an Express/MongoDB backend. It supports authentication, appointment management, and role-based dashboards.

## 🚀 Features

- Role-based user experience for Admin, Doctor, and Patient
- Secure authentication with JWT and bcrypt
- Appointment booking and queue management
- Admin dashboard with operational controls and analytics
- Static frontend served from the Express backend

## 🧰 Tech Stack

- Frontend:
  - HTML5, CSS3, Vanilla JavaScript
  - Static pages for login, registration, dashboard, and admin views
- Backend:
  - Node.js, Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - bcrypt for password hashing

## 📁 Project Structure

- `frontend/`
  - `index.html`, `login.html`, `register.html`
  - `admin/`, `doctor/`, `patient/` dashboard pages
  - `css/`, `js/` assets for UI and client-side behavior
- `backend/`
  - `server.js` - main Express server
  - `models/` - Mongoose schema definitions
  - `routes/` - API route handlers
  - `middleware/` - authentication or helper middleware
  - `scripts/` - utility scripts such as sample database population

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB running locally or accessible via URI

### Install and Run

1. Open a terminal at the project root.
2. Change to the backend folder:

```bash
cd backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file inside `backend/` with the following values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hospital-management
JWT_SECRET=your_jwt_secret_here
```

5. Start the server:

```bash
node server.js
```

6. Open the app in your browser:

```bash
http://localhost:5000
```

## 🧩 API Summary

- `GET /api/health` - health check endpoint
- `POST /api/auth/...` - authentication routes
- `GET/POST /api/appointments/...` - appointment management
- `/api/admin`, `/api/doctor`, `/api/patient` - role-specific API routes

## 💡 Notes

- The frontend is served from `backend/server.js` using `express.static` from `../frontend`.
- There is no `npm start` script configured in `backend/package.json`; use `node server.js`.
- Make sure MongoDB is running before starting the server.

## ✅ Quick Start

```bash
cd backend
npm install
node server.js
```

Then visit:

```bash
http://localhost:5000
```
