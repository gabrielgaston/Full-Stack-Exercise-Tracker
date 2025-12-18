# Full-Stack Exercise Tracker

A full-stack CRUD exercise tracking application built with **React (Vite)** on the frontend and **Node.js + Express + MongoDB** on the backend. The app allows users to create, view, edit, and delete workout exercises through a clean UI backed by a RESTful API.

---

## Project Overview

This project demonstrates a complete modern web application workflow:

* A **React SPA** for user interaction
* A **REST API** built with Express
* **MongoDB** persistence via Mongoose
* Clear separation between frontend and backend responsibilities

The frontend communicates with the backend using JSON over HTTP and supports full CRUD functionality.

---

## Tech Stack

### Frontend (`exercises_react`)

* React 18
* React Router
* Vite
* Fetch API
* React Icons

### Backend (`exercises_rest`)

* Node.js
* Express
* MongoDB
* Mongoose
* date-fns
* dotenv

---

## Features

* Create new exercises
* View a list of all exercises
* Edit existing exercises
* Delete exercises
* Input validation on both client and server
* RESTful API design
* Clean component-based UI

---

## Data Model

Each exercise contains:

* **name** (string)
* **reps** (number)
* **weight** (number)
* **unit** (`lbs` or `kgs`)
* **date** (`MM-DD-YY` format)

---

## REST API Endpoints

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | `/exercises`     | Create a new exercise      |
| GET    | `/exercises`     | Retrieve all exercises     |
| GET    | `/exercises/:id` | Retrieve a single exercise |
| PUT    | `/exercises/:id` | Update an exercise         |
| DELETE | `/exercises/:id` | Delete an exercise         |

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repo-url>
cd exercise-tracker
```

---

### 2. Backend Setup (`exercises_rest`)

```bash
cd exercises_rest
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGODB_CONNECT_STRING=your_mongodb_connection_string
```

Start the backend:

```bash
npm start
```

The server will run on `http://localhost:3000`.

---

### 3. Frontend Setup (`exercises_react`)

```bash
cd exercises_react
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and proxy API requests to the backend.

---

## Architecture Notes

* The frontend uses **React Router** for navigation
* API requests are proxied through Vite to avoid CORS issues
* Backend input validation ensures data integrity
* Mongoose schemas enforce consistent database structure

---

## What This Project Demonstrates

* Full-stack development fundamentals
* RESTful API design
* Client–server communication
* MongoDB schema modeling
* Frontend state management
* Input validation and error handling

---

## Author

Gabriel Gaston

---

## License

This project is for educational and portfolio purposes.
