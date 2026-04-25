# Quiz-O-Buzz 🎯

A full-stack web application for creating and taking quizzes, built for teachers and students. Teachers can create and manage quizzes with time limits, while students can attempt them, view results, and download certificates.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Roles](#roles)

---

## Features

- **User Authentication** — Role-based signup and login for teachers and students
- **Quiz Management** — Teachers can create quizzes, set time limits, and publish or toggle quiz status
- **Attempt Quizzes** — Students can browse and attempt published quizzes
- **Results & Scores** — Scores are saved and viewable by both students and teachers
- **Certificates** — Students can download a certificate upon completing a quiz
- **Contact Form** — Users can submit messages via a contact page
- **Past Scores** — Students can review their quiz history

---

## Tech Stack

**Frontend**
- HTML5, CSS3, Vanilla JavaScript
- Multi-page client served as static files

**Backend**
- Node.js + Express.js (v5)
- Mongoose (MongoDB ODM)
- dotenv, cors, body-parser

**Database**
- MongoDB (connected via Mongoose)

---

## Project Structure

```
Quiz-O-Buzz-main/
├── client/                     # Frontend static files
│   ├── index.html              # Landing / home page
│   ├── login.html              # Login page
│   ├── signup1.html            # Signup page
│   ├── teacher.html            # Teacher dashboard
│   ├── student.html            # Student dashboard
│   ├── createquiz.html         # Quiz creation form
│   ├── quiz.html               # Quiz listing page
│   ├── quizpage.html           # Quiz browsing page
│   ├── attemptQuiz.html        # Quiz attempt interface
│   ├── result.html             # Result page after quiz
│   ├── certificate.html        # Certificate download page
│   ├── pastScores.html         # Student past scores
│   ├── studscores.html         # Student scores view
│   ├── submit.html             # Submission confirmation
│   ├── about.html              # About page
│   ├── contact.html            # Contact form
│   ├── logout.html             # Logout page
│   ├── script.js               # Shared client-side JS
│   └── style.css               # Global styles
│
├── server/                     # Backend Node.js app
│   ├── server.js               # Express app entry point
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── models/
│   │   ├── user.model.js       # User schema (name, email, password, role)
│   │   ├── quiz.model.js       # Quiz schema (title, questions, timeLimit, status)
│   │   ├── Result.js           # Result schema (name, score, timestamp)
│   │   └── contact.model.js    # Contact form schema
│   ├── controllers/
│   │   ├── auth.controllers.js
│   │   ├── quiz.controller.js
│   │   ├── result.controller.js
│   │   ├── user.controller.js
│   │   └── contact.controller.js
│   └── routes/
│       ├── auth.routes.js
│       ├── quiz.routes.js
│       ├── result.routes.js
│       ├── user.routes.js
│       └── contact.routes.js
│
├── package.json                # Root dependencies (mongodb)
└── test-api.js                 # API testing script
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Quiz-O-Buzz.git
   cd Quiz-O-Buzz
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables))

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

The Express server serves the `client/` folder as static files, so no separate frontend setup is needed.

---

## Environment Variables

Create a `.env` file inside the `server/` directory:

```env
MONGO_URI=mongodb://localhost:27017/quizobuzz
PORT=5000
```

| Variable    | Description                          | Default |
|-------------|--------------------------------------|---------|
| `MONGO_URI` | MongoDB connection string (required) | —       |
| `PORT`      | Port to run the server on            | `5000`  |

> ⚠️ **Note:** Passwords are currently stored in plain text. It is strongly recommended to add password hashing (e.g., `bcrypt`) before deploying to production.

---

## API Reference

### Auth — `/api/auth`

| Method | Endpoint    | Description           | Body                                      |
|--------|-------------|-----------------------|-------------------------------------------|
| POST   | `/register` | Register a new user   | `{ name, email, password, role }`         |
| POST   | `/login`    | Log in an existing user | `{ email, password }`                   |

`role` must be either `"teacher"` or `"student"`.

---

### Quizzes — `/api/quiz`

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| POST   | `/create`          | Create a new quiz                    |
| GET    | `/my-quizzes`      | Get all quizzes for a teacher        |
| GET    | `/:id`             | Get a quiz by ID                     |
| PUT    | `/:id/time`        | Update the time limit for a quiz     |
| PUT    | `/:id/publish`     | Publish a quiz                       |
| PUT    | `/toggle/:id`      | Toggle quiz active/inactive status   |

---

### Results — `/api/result`

| Method | Endpoint | Description              | Body                  |
|--------|-----------|--------------------------|-----------------------|
| POST   | `/`       | Save a quiz result       | `{ name, score }`     |
| GET    | `/`       | Retrieve all results     | —                     |

---

### Contact — `/api/contact`

| Method | Endpoint | Description              |
|--------|----------|--------------------------|
| POST   | `/`      | Submit a contact message |

---

## Roles

**Teacher**
- Create quizzes with custom questions and time limits
- Publish quizzes and toggle their availability
- View student scores on their quizzes

**Student**
- Browse and attempt published quizzes
- View results immediately after submission
- Download a completion certificate
- Review past scores

---

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is open source. Feel free to use and modify it.
