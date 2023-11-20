const express = require('express');
const router = express.Router();

// IMPORT FROM AUTH CONTROLLER
const { createUser } = require("../controllers/auth");

router.post("/createuser/", createUser);

module.exports = router;