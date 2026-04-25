// contact.routes.js
const express = require("express");
const router = express.Router();

const { sendMessage } = require("../controllers/contact.controller");
const { validateContact } = require("../middleware/validation.middleware");

router.post("/send", validateContact, sendMessage);

module.exports = router;
