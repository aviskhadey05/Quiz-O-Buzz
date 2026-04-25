const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const quizRoutes = require("./routes/quiz.routes");
const resultRoutes = require("./routes/result.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();

// middleware
app.use(cors({
    origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:3000",
        "https://aviskhadey05.github.io"
    ],
    credentials: true
}));
app.use(express.json());

// connect database
connectDB();

// serve frontend (client folder)
app.use(express.static(path.join(__dirname, "../client")));

// homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/contact", contactRoutes);

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});