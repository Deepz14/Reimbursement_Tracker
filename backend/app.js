const express = require('express');
const app = express();
const cors = require('cors');

// IMPORT ALL ROUTES
const authRoutes = require('./routers/auth');

// MIDDLEWARES
app.use(express.json()); // TO RECOGNISE THE REQ OBJECT AS JSON
app.use(express.urlencoded({extended: true})); // TO RECOGNISE THE REQ OBJECT AS STRINGS AND ARRAYS
app.use(cors());

//ROUTER MIDDLEWARE
app.use('/api/auth', authRoutes);

// Welcome Route
app.get('/', (req, res) => {
    res.send('Hello, Welcome to the Application');
})

//Export app.js
module.exports = app;