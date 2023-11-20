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
        res.status(400).send({error: err.message});
    }
}


module.exports = {
    createUser
}