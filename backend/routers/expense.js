const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/userVerify');

// IMPORT FROM AUTH CONTROLLER
const { createExpenseRecord, getExpenseRecord, getAllExpenseRecord } = require("../controllers/expense");

router.post("/addrecord/", verifyUser, createExpenseRecord);

router.get("/getrecord/", verifyUser ,getExpenseRecord);

// HR routes
router.get("/getAllrecord/", verifyUser, getAllExpenseRecord);

module.exports = router;