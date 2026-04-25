const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/auth.controllers");
const { validateSignup, validateLogin } = require("../middleware/validation.middleware");

router.post("/register", validateSignup, signup);
router.post("/login",    validateLogin,  login);

module.exports = router;
