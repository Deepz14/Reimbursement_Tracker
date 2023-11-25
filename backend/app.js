const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

// IMPORT ALL ROUTES
const authRoutes = require('./routers/auth');
const expenseRoutes = require('./routers/expense');

// MIDDLEWARES
app.use(express.json()); // TO RECOGNISE THE REQ OBJECT AS JSON
app.use(express.urlencoded({extended: true})); // TO RECOGNISE THE REQ OBJECT AS STRINGS AND ARRAYS
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use(morgan('tiny')); // HTTP REQUEST LOGGER

// ROUTER MIDDLEWARE
app.use('/api/auth', authRoutes);
app.use('/api/expense', expenseRoutes);

// Welcome Route
app.get('/', (req, res) => {
    res.send('Hello, Welcome to the Application');
})

//Export app.js
module.exports = app;