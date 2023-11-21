const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


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
        default: "employee"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password before save
userSchema.pre("save", async function(next) {
    // Only run this function if password was modified (not on other update functions)
    if(!this.isModified('password')) return next();

    // Hash password with strength of 10
    this.password = await bcrypt.hash(this.password, 10);
});

// compare Password from the request body
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);