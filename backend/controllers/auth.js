const User = require('../models/user');
const cookieToken = require('../utils/cookieToken');

const createUser = async(req, res) => {
    
    try{
        const { name, email, password } = req.body;
        //console.log("request body: ", name, email, password);
        if (!name || !email || !password) {
            throw new Error('Name, Email and Password are required');
        }    

        // create a new user
        const user = await User.create({ 
            name, email, password
        });

        cookieToken(user, res);
    }catch(error){
        //console.log("error: ", error)
        res.status(400).send({error: error?.message});
    }
}


const createHRUser = async(req, res) => {
    try{
        const { name, email, password } = req.body;
        //console.log("request body: ", name, email, password);
        if (!name || !email || !password) {
            throw new Error('Name, Email and Password are required');
        }    

        // create a new user
        const user = await User.create({ 
            name, email, password, role: "hr"
        });

        res.status(200).json({ success: true});
    }catch(error){
        console.log("error: ", error)
        res.status(400).send({error: error?.message});
    }
}


const Login = async(req, res) => {
    try {
        // Get a email and password from the req body
        const { email, password } = req.body;
        
        // Check if the Email and Password is available on req body
        if(!email || !password){
            throw new Error('Email or Password is required');
        }

        // find the user by email
        const user = await User.findOne({email}).select('+password');

        if(!user){
            throw new Error('Unable to find your account Please try again with valid credentials or signup');
        }

        const is_correct = await user.comparePassword(password);

        // Check the Password is correct or not
        if(!is_correct){
            throw new Error('Email or Password is incorrect');
        }
        
        cookieToken(user, res);

    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

const Logout = (req, res) => {
    try {
        // cookie options
        const options = {
            expires: new Date(Date.now()),
            httpOnly: true
        }

        res.cookie('token', null, options);
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

module.exports = {
    createUser,
    createHRUser,
    Login,
    Logout
}