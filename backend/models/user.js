const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: [100, "Name should be under 100 characters"],
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        minlength: [8, "Password should be minimum 8 characters"],
        required: [true, "Password is required"],
        select: false // if user data is requested or queried password field data will not return 
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);