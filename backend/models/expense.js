const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    department: {
        type: String,
        required: [true, 'Please select a department'],
        enum: {
            values: ['marketing', 'sales', 'hr', 'finance', 'lnd', 'rnd', 'product_dev', 'admin', 'security'],
            message: 'Please a select a valid department'
        }
    },
    dateOfExpense: {
        type: Date,
        required: true
    },
    costOfExpense: {
        type: Number,
        required: true
    },
    expenseType: {
        type: String,
        required: [true, 'Please select a expense type'],
        enum: {
            values: ['travel', 'office Supplies', 'meals', 'software', 'stay', 'events', 'outing', 'other'],
            message: 'Please a select a valid expense type'
        }
    },
    paymentType: {
        type: String, 
        possibleValues: ['cash','card'],
        required: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    uploadFile: [
        {
            id: {
                type: String,
                required: true
            },
            secure_url: {
                type: String,
                required: true
            }
        }
    ],
    status: {
        type: String,
        default: 'processing'
    },
    message: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Expense', expenseSchema);


