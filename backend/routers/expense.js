const express = require('express');
const router = express.Router();
const { verifyUser, customRoles } = require('../middlewares/userVerify');

// IMPORT FROM EXPENSE CONTROLLER
const { createExpenseRecord, getExpenseRecord, 
    getAllExpenseRecord, getExpenseRecordByID,
    updateExpense} = require("../controllers/expense");


router.post("/addrecord/", verifyUser, createExpenseRecord);
router.get("/getrecord/", verifyUser , getExpenseRecord);

// HR routes
router.get("/getAllrecord/", verifyUser,  customRoles('hr'), getAllExpenseRecord);
router.get("/getExpenseById/", verifyUser, customRoles('hr'), getExpenseRecordByID);
router.put("/updateExpense/", verifyUser, customRoles('hr'), updateExpense);

module.exports = router;