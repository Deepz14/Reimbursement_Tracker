const express = require('express');
const router = express.Router();

// IMPORT FROM AUTH CONTROLLER
const { createUser, Login } = require("../controllers/auth");

router.post("/createuser/", createUser);
router.post('/login/', Login);

module.exports = router;