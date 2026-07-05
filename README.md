# CareAble-by-CareForge
CSE5IDP 2026 - Team CareForge 

CareAble is a full-stack web application that allows caregivers to register, complete capability assessments, and receive digital certificates. Employers and administrators can manage users, review assessments, and monitor platform activity through dedicated dashboards.

## Team Members

| Name | GitHub |
|------|--------|
| Abilash Bandara | https://github.com/Abhilash316 |
| Amarathunga Perera | https://github.com/steffanperera |
| Poornima Gamage | https://github.com/Poornima-Gamage |
| Kavin Jayasinghe | https://github.com/knjayasinghe3-cyber |
| Sachintha Nipun | https://github.com/sachcha99 |
| Jubaer Ahamed | https://github.com/jubaerahamedbd |


## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [1. Clone the Repository](#1-clone-the-repository)
- [2. Database Setup](#2-database-setup)
- [3. Backend Setup](#3-backend-setup)
- [4. Frontend Setup](#4-frontend-setup)
- [5. Running the App](#5-running-the-app)
- [6. Building for Production](#6-building-for-production)
- [API Overview](#api-overview)
- [Database Schema](#database-schema)
- [Common Issues & Troubleshooting](#common-issues--troubleshooting)

## Project Structure

```
CareAble-by-CareForge-main/
├── backend/                  # Node.js + Express REST API
│   ├── config/
│   │   └── db.js             # MySQL connection (used by most routes)
│   ├── db.js                 # Alternate MySQL connection (legacy)
│   ├── models/               # Database query logic
│   │   ├── adminModel.js
│   │   ├── caregiversModel.js
│   │   ├── employersModel.js
│   │   ├── questionsModel.js
│   │   └── userModel.js
│   ├── routes/               # Express route handlers
│   │   ├── adminRoutes.js
│   │   ├── caregiversRoutes.js
│   │   ├── employersRoutes.js
│   │   ├── questionsRoutes.js
│   │   └── userRoutes.js
│   ├── server.js             # Entry point — starts Express on port 5000
│   └── package.json
├── front/                    # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── app/              # All pages and components
│   │   │   ├── admin/        # Admin panel pages
│   │   │   ├── caregiver/    # Caregiver dashboard pages
│   │   │   ├── components/   # Shared UI components
│   │   │   └── App.tsx       # Root app + routing
│   │   ├── config/
│   │   │   └── apiConfig.ts  # Central API base URL config
│   │   └── main.tsx          # React entry point
│   ├── public/               # Static assets (logos, images)
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── database/
│   └── dbscript.sql          # Full MySQL schema + seed data
└── documentation/            # PDF docs (user manual, system design, etc.)
```

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18, TypeScript, Vite, Tailwind CSS v4     |
| UI Libs   | Radix UI, shadcn/ui, MUI, Lucide Icons, Recharts|
| Backend   | Node.js, Express.js v5                          |
| Database  | MySQL 8.0+                                      |
| Auth      | bcrypt (password hashing)                       |
| HTTP      | Axios (frontend → backend)                      |
| Dev Tools | Nodemon, Vite HMR                               |

## Prerequisites

Make sure the following are installed on your machine before you begin:

| Tool | Minimum Version | Download |
|------|----------------|----------|
| Node.js | v18 LTS or higher | https://nodejs.org |
| npm | v9+ (comes with Node.js) | — |
| XAMPP | Any recent version | https://www.apachefriends.org |
| Git *(optional)* | Any recent version | https://git-scm.com |

> XAMPP bundles Apache and MySQL together and includes phpMyAdmin — no separate MySQL install needed.

**Verify your Node.js install** by running these in your terminal:

```bash
node -v   # Should print v18.x.x or higher
npm -v    # Should print 9.x.x or higher
```

## 1. Clone the Repository

```bash
git clone https://github.com/your-org/CareAble-by-CareForge.git
cd CareAble-by-CareForge-main
```

Or if you have the zip file, extract it and `cd` into the extracted folder.

## 2. Database Setup

This project uses **XAMPP** to run MySQL locally and **phpMyAdmin** as the database interface.

### Step 1 — Download and Install XAMPP

If you don't have XAMPP installed, download it from: https://www.apachefriends.org

Install it with the default settings.

### Step 2 — Start Apache and MySQL in XAMPP

1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **Apache**.
3. Click **Start** next to **MySQL**.

Both status indicators should turn green. Leave XAMPP running in the background while you use the app.

### Step 3 — Open phpMyAdmin

With XAMPP running, open your browser and go to:

```
http://localhost/phpmyadmin
```

### Step 4 — Create the database

1. In the left sidebar, click **New**.
2. In the **Database name** field, type: `careable`
3. Leave the collation as default (`utf8mb4_general_ci` is fine).
4. Click **Create**.

### Step 5 — Import the database script

1. In the left sidebar, click on the **`careable`** database you just created.
2. Click the **Import** tab at the top.
3. Click **Choose File** and navigate to the project's `database/` folder.
4. Select **`dbscript.sql`**.
5. Scroll down and click **Import**.

You should see a success message. All tables will now be created and populated automatically.

### Step 6 — Configure backend DB credentials

By default, XAMPP's MySQL root user has **no password**. The backend config is already set up for this, but double-check both files:

Open `backend/config/db.js`:

```js
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",   // leave blank for default XAMPP setup
  database: "careable"
});
```

Open `backend/db.js`:

```js
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',   // leave blank for default XAMPP setup
    database: 'careable'
});
```

> **Note:** If you've set a custom MySQL root password in XAMPP, replace `""` with your password in both files above.

## 3. Backend Setup

### Step 1 — Navigate to the backend folder

```bash
cd backend
```

### Step 2 — Install all dependencies

```bash
npm install
```

This installs all packages listed in `backend/package.json`, including:

| Package | Purpose |
|---------|---------|
| `express` | Web framework / REST API |
| `mysql2` | MySQL database driver |
| `bcrypt` | Password hashing |
| `cors` | Cross-Origin Resource Sharing |
| `body-parser` | Request body parsing |
| `nodemon` *(devDep)* | Auto-restart server on file changes |
| `mongoose` | (included as dep, not actively used) |

## 4. Frontend Setup

### Step 1 — Open a new terminal and navigate to the frontend folder

```bash
cd front
```

*(Run this from the project root, not from inside `backend/`)*

### Step 2 — Install all dependencies

```bash
npm install
```

This installs all packages listed in `front/package.json`, including:

| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | Core UI library |
| `react-router-dom` | Client-side routing |
| `axios` | HTTP requests to backend API |
| `tailwindcss` v4 | Utility-first CSS framework |
| `@radix-ui/*` | Accessible UI primitives (dropdowns, dialogs, etc.) |
| `@mui/material` | Material UI components |
| `lucide-react` | Icon library |
| `recharts` | Charts and data visualisation |
| `jspdf` | PDF certificate generation |
| `react-hook-form` | Form state management |
| `motion` | Animations |
| `sonner` | Toast notifications |
| `vite` *(devDep)* | Build tool and dev server |
| `@vitejs/plugin-react` *(devDep)* | Vite React plugin |

## 5. Running the App

You need **two terminals open** simultaneously — one for the backend, one for the frontend.

### Terminal 1 — Start the Backend

```bash
cd backend
npx nodemon server.js
```

> **Why `npx nodemon`?** The project's `package.json` doesn't define a `start` or `dev` script, so we invoke nodemon directly. Nodemon will automatically restart the server whenever you save changes to backend files.

If you prefer to start without auto-reload (one-off):

```bash
node server.js
```

**Expected output:**

```
Server running on port 5000
MySQL Connected...
```

The backend API is now available at: **`http://localhost:5000`**

---

### Terminal 2 — Start the Frontend

```bash
cd front
npm run dev
```

**Expected output:**

```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and go to: **`http://localhost:5173`**

---

### Verify Everything is Connected

1. Visit `http://localhost:5000` — you should see: `CareAble API is running...`
2. Visit `http://localhost:5173` — the CareAble landing page should load.
3. Try registering as a caregiver to confirm the frontend and backend are communicating correctly.

## 6. Building for Production

### Build the Frontend

```bash
cd front
npm run build
```

This generates an optimised static build inside `front/dist/`. You can serve this folder from any static host or web server (e.g. Nginx, AWS S3 + CloudFront).

### Run the Backend in Production with PM2

Install PM2 globally (process manager — keeps the server running and restarts it on crashes):

```bash
npm install -g pm2
```

Start the backend:

```bash
cd backend
pm2 start server.js --name careable-backend
```

Useful PM2 commands:

```bash
pm2 list                        # List all running processes
pm2 logs careable-backend       # View live logs
pm2 restart careable-backend    # Restart the server
pm2 stop careable-backend       # Stop the server
pm2 startup                     # Auto-start PM2 on system reboot
```

## API Overview

All API routes are served from `http://localhost:5000/api`.

| Prefix | File | Description |
|--------|------|-------------|
| `/api/user` | `routes/userRoutes.js` | User login and listing |
| `/api/caregivers` | `routes/caregiversRoutes.js` | Caregiver registration, profiles, assessments, onboarding, certificates |
| `/api/employers` | `routes/employersRoutes.js` | Employer registration and management |
| `/api/questions` | `routes/questionsRoutes.js` | Assessment questions CRUD |
| `/api/admin` | `routes/adminRoutes.js` | Admin login and certificate management |

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/user` | User login |
| `GET` | `/api/user` | Get all users |
| `POST` | `/api/admin` | Admin login |
| `GET` | `/api/admin/certificatelistAll` | Get all certificates (admin view) |
| `GET` | `/api/questions/random/:limit` | Get random assessment questions |
| `POST` | `/api/caregivers` | Register a new caregiver |
| `GET` | `/api/caregivers/onboarding/:id` | Get caregiver onboarding data |
| `POST` | `/api/caregivers/onboarding` | Submit onboarding details |
| `PUT` | `/api/caregivers/onboarding/:id` | Update onboarding details |
| `GET` | `/api/caregivers/certificatelist/:id` | Get certificates for a caregiver |

The frontend API base URL is configured in `front/src/config/apiConfig.ts`:

```ts
const API_BASE_URL = "http://localhost:5000/api";
```

If you deploy the backend to a different host or port, update this file.

## Database Schema

The `careable` database contains the following tables:

| Table | Description |
|-------|-------------|
| `user` | Base authentication table (all user types) |
| `admin` | Admin users (linked to `user`) |
| `caregivers` | Caregiver profile data |
| `caregiver_onboarding` | Onboarding questionnaire responses |
| `caregiver_questions` | Per-attempt assessment answers |
| `caregiver_skills` | Skills associated with a caregiver |
| `caregiver_care_types` | Care type tags for caregivers |
| `assessments` | Assessment results (score, grade, attempt number) |
| `questions` | Assessment question bank (60 questions across domains) |
| `employer` | Employer profiles |
| `application` | Job applications |
| `skills` | Skills reference table |
| `care_types` | Care type reference table |


## Common Issues & Troubleshooting

**`Error connecting to the database`**
- Open the XAMPP Control Panel and make sure both **Apache** and **MySQL** are showing green / running.
- Double-check that the password in both `backend/db.js` and `backend/config/db.js` is `""` (blank) for a default XAMPP install.
- Confirm the `careable` database exists by visiting `http://localhost/phpmyadmin` and checking the left sidebar.

**`npm install` fails or packages are missing**
- Make sure you're in the correct folder (`backend/` or `front/`) before running `npm install`.
- Try deleting `node_modules` and `package-lock.json`, then re-run `npm install`.

**Frontend shows blank page or network errors**
- Confirm the backend is running on port 5000 before starting the frontend.
- Check the browser console for CORS or connection errors.
- Make sure `front/src/config/apiConfig.ts` has `http://localhost:5000/api` as the base URL.

**`nodemon: command not found`**
- Use `npx nodemon server.js` instead of `nodemon server.js`, or install it globally: `npm install -g nodemon`.

**Port 5173 or 5000 already in use**
- Kill the process using the port:
  - Mac/Linux: `lsof -ti :5000 | xargs kill`
  - Windows: `netstat -ano | findstr :5000`, then `taskkill /PID <PID> /F`

**Frontend `npm run dev` gives TypeScript errors**
- These are usually non-blocking type warnings. The app will still run. Check the terminal for any fatal errors vs warnings.

## User Roles

| Role | Access |
|------|--------|
| **Caregiver** | Register, complete onboarding, take assessments, view & download certificates |
| **Employer** | Browse and search verified caregivers by location and status |
| **Admin** | Full user management, assessment question CRUD, certificate oversight, dashboard |

Admin panel is accessible at a separate route: `/admin` (see `front/src/app/admin/`).

---

*Built by Team CareForge — CSE5IDP 2026*
