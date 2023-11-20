const mongoose = require('mongoose');

const connectDb = async() => {
    try{
        const makeConnection = await mongoose.connect(process.env.MONGODB_ATLAS_URL);
        if(makeConnection) console.log('DB is connected!!');
    }catch(error){
        console.log('something went wrong unable to connect DB');
        console.log(error)
        process.exit(1);
    }
}

module.exports = connectDb;
