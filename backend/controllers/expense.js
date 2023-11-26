const Expense = require('../models/expense');
const cloudinary = require('cloudinary');

const createExpenseRecord = async(req, res) => {
    
    try {
        let expenseDocument = [];

        // check if the file is exist
        if(!req.files){
            throw new Error('Please provide a expense document');
        }

        // Upload document to cloudinary
        let file = req.files?.uploadFile;
       
        let fileUpload = await cloudinary.v2.uploader.upload(file?.tempFilePath, {
            folder: "expenses",
        });
        expenseDocument.push({
            id: fileUpload.public_id, 
            secure_url: fileUpload.secure_url
        });
        req.body.uploadFile = expenseDocument;
        req.body.user = req.user._id;
        
        const expense = await Expense.create(req.body);
        
        res.status(200).json({
            success: true,
            expense
        });
    } catch (err) {
        if (req.body?.uploadFile){
            await cloudinary.v2.uploader.destroy(req.body?.uploadFile?.id);
        }
        res.status(400).send({error: err.message});
    }
}


const getExpenseRecord = async(req, res) => {
    try {   
        let expenses = await Expense.find({user: req.user._id}).populate("user", "name")
        res.status(200).json({
            success: true,
            expenses
        });
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

const getAllExpenseRecord = async(req, res) => {
    try{
        console.log("req ", req);
        let expenses = await Expense.find().populate("user", "name")
        res.status(200).json({
            success: true,
            expenses
        });
    }catch(error){
        console.log("error: ", error);
        res.status(400).send({error: error.message});
    }
}

const getExpenseRecordByID = async(req, res) => {
    try{
        console.log("expense: ", req?.query?.expId)
        const expense = await Expense.findById(req?.query?.expId).populate("user", "name");

        if (!expense) {
            throw new Error('Expense Record not Found');
        }

        res.status(200).json({
            success: true,
            expense
        })
    }catch(error){
        res.status(400).send({error: error.message});  
    }
}

const updateExpense = async(req, res) => {
    try{
        console.log("expense: ", req?.query?.expId);
        console.log("expense body: ", req?.body);
        let expense = await Expense.findById(req?.query?.expId).populate("user", "name");

        if (!expense) {
            throw new Error('Expense Record not Found');
        }

        expense = await Expense.findByIdAndUpdate(req.query?.expId, req?.body, {
            new: true,
            runValidators: true
        });
    
        res.status(200).json({
            success: true,
            expense
        });
    }catch(error){
        res.status(400).send({error: error.message});  
    }
}

module.exports = {
    createExpenseRecord,
    getExpenseRecord,
    getAllExpenseRecord,
    getExpenseRecordByID,
    updateExpense
}