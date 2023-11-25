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
        let expense = await Expense.find({user: req.user._id}).populate("user", "name")
        res.status(200).json({
            success: true,
            expense
        });
        
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

module.exports = {
    createExpenseRecord,
    getExpenseRecord
}