const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/userVerify');

// IMPORT FROM EXPENSE CONTROLLER
const { createExpenseRecord, getExpenseRecord, 
    getAllExpenseRecord, getExpenseRecordByID,
    updateExpense} = require("../controllers/expense");


router.post("/addrecord/", verifyUser, createExpenseRecord);

router.get("/getrecord/", verifyUser , getExpenseRecord);

// HR routes
router.get("/getAllrecord/", verifyUser, getAllExpenseRecord);

router.get("/getExpenseById/", verifyUser, getExpenseRecordByID);

router.put("/updateExpense/", verifyUser, updateExpense);

module.exports = router;