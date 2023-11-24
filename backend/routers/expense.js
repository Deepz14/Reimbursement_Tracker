const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/userVerify');

// IMPORT FROM AUTH CONTROLLER
const { createExpenseRecord, getExpenseRecord } = require("../controllers/expense");

router.post("/addrecord/", verifyUser, createExpenseRecord);

router.get("/getrecord/", verifyUser ,getExpenseRecord)

module.exports = router;