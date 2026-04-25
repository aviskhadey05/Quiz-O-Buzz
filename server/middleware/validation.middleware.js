const { body, param, validationResult } = require("express-validator");

/**
 * Helper — runs after validation rules.
 * If there are errors, returns 400 with a list of messages.
 * Otherwise calls next().
 */
const handleValidationErrors = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(e => ({
                field: e.path,
                message: e.msg
            }))
        });
    }

    next();

};


// ─── Auth ─────────────────────────────────────────────────────────────────────

exports.validateSignup = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 2, max: 50 }).withMessage("Name must be 2–50 characters"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

    body("role")
        .notEmpty().withMessage("Role is required")
        .isIn(["teacher", "student"]).withMessage("Role must be 'teacher' or 'student'"),

    handleValidationErrors
];

exports.validateLogin = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required"),

    handleValidationErrors
];


// ─── Quiz ──────────────────────────────────────────────────────────────────────

exports.validateCreateQuiz = [
    body("title")
        .trim()
        .notEmpty().withMessage("Quiz title is required")
        .isLength({ min: 3, max: 100 }).withMessage("Title must be 3–100 characters"),

    body("timeLimit")
        .notEmpty().withMessage("Time limit is required")
        .isInt({ min: 1, max: 180 }).withMessage("Time limit must be between 1 and 180 minutes"),

    body("questions")
        .isArray({ min: 1 }).withMessage("At least one question is required"),

    body("questions.*.text")
        .trim()
        .notEmpty().withMessage("Each question must have text"),

    body("questions.*.options")
        .isArray({ min: 2 }).withMessage("Each question must have at least 2 options"),

    body("questions.*.answer")
        .notEmpty().withMessage("Each question must have a correct answer"),

    handleValidationErrors
];

exports.validateUpdateTimeLimit = [
    body("timeLimit")
        .notEmpty().withMessage("Time limit is required")
        .isInt({ min: 1, max: 180 }).withMessage("Time limit must be between 1 and 180 minutes"),

    handleValidationErrors
];

exports.validateQuizId = [
    param("id")
        .isMongoId().withMessage("Invalid quiz ID format"),

    handleValidationErrors
];


// ─── Result ────────────────────────────────────────────────────────────────────

exports.validateSaveResult = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required"),

    body("score")
        .notEmpty().withMessage("Score is required")
        .isNumeric().withMessage("Score must be a number")
        .isFloat({ min: 0 }).withMessage("Score cannot be negative"),

    handleValidationErrors
];


// ─── Contact ───────────────────────────────────────────────────────────────────

exports.validateContact = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail(),

    body("message")
        .trim()
        .notEmpty().withMessage("Message is required")
        .isLength({ min: 10, max: 1000 }).withMessage("Message must be 10–1000 characters"),

    handleValidationErrors
];
