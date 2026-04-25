const express = require("express");
const router = express.Router();

const {
    createQuiz,
    getQuizById,
    updateTimeLimit,
    getTeacherQuizzes,
    toggleQuizStatus,
    publishQuiz
} = require("../controllers/quiz.controller");

const { authMiddleware, requireRole } = require("../middleware/auth.middleware");
const {
    validateCreateQuiz,
    validateUpdateTimeLimit,
    validateQuizId
} = require("../middleware/validation.middleware");

// Teachers only
router.post("/create",       authMiddleware, requireRole("teacher"), validateCreateQuiz,    createQuiz);
router.get("/my-quizzes",    authMiddleware, requireRole("teacher"),                        getTeacherQuizzes);
router.put("/:id/time",      authMiddleware, requireRole("teacher"), validateUpdateTimeLimit, updateTimeLimit);
router.put("/:id/publish",   authMiddleware, requireRole("teacher"), validateQuizId,        publishQuiz);
router.put("/toggle/:id",    authMiddleware, requireRole("teacher"), validateQuizId,        toggleQuizStatus);

// Students and teachers can fetch a quiz
router.get("/:id",           authMiddleware,                         validateQuizId,        getQuizById);

module.exports = router;
