const User = require('../models/user');


const createUser = async(req, res) => {
    
    try{
        const { name, email, password } = req.body;
        console.log("request body: ", name, email, password);
        if (!name || !email || !password) {
            throw new Error('Name, Emmail and Password are required');
        }    

        // create a new user
        const user = await User.create({ 
            name, email, password
        });

        res.status(200).json({ success: true, user});
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
        
        res.status(200).json({ success: true, user});

    } catch (error) {
        res.status(400).send({error: error.message});
    }
}


module.exports = {
    createUser,
    Login
}