const express = require("express");
const { sendEmail } = require("../controllers/emailController");

const router = express.Router();

router.post("/contact", sendEmail);

module.exports = router;
