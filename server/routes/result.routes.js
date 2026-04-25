// result.routes.js
const express = require("express");
const router = express.Router();

const resultController = require("../controllers/result.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { validateSaveResult } = require("../middleware/validation.middleware");

router.post("/", authMiddleware, validateSaveResult, resultController.saveResult);
router.get("/",  authMiddleware,                     resultController.getResults);

module.exports = router;
