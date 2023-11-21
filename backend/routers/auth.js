const express = require('express');
const router = express.Router();

// IMPORT FROM AUTH CONTROLLER
const { createUser, Login, Logout } = require("../controllers/auth");

router.post("/createuser/", createUser);
router.post('/login/', Login);
router.post('/logout/', Logout);


module.exports = router;