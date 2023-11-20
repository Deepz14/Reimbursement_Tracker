const mongoose = require('mongoose');
const config = require('./default.json');
const db = config.mongoURI;

const connectDb = async() => {
    try{
        const makeConnection = await mongoose.connect(db);
        if(makeConnection) console.log('DB is connected!!');
    }catch(error){
        console.log('something went wrong unable to connect DB');
        console.log(err)
        process.exit(1);
    }
}

module.exports = connectDb;
