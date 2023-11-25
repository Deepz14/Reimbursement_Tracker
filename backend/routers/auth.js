const express = require('express');
const router = express.Router();

// IMPORT FROM AUTH CONTROLLER
const { createUser, createHRUser, Login, Logout } = require("../controllers/auth");

router.post("/createuser/", createUser);
router.post('/login/', Login);
router.post('/logout/', Logout);

// HR account creation
router.post("/hr/createuser/", createHRUser);

module.exports = router;