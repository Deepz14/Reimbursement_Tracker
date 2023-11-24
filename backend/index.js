const app = require('./app');
require('dotenv').config();
const connectWithDatabase = require('./config/db');
const cloudinary = require('cloudinary');

const port = process.env.PORT || 8082;

// connect with database
connectWithDatabase();

// cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUDNIARY_NAME, 
    api_key: process.env.CLOUDNIARY_API_KEY, 
    api_secret: process.env.CLOUDNIARY_API_SECRET,
    secure: true
});

app.listen(port, () => console.log(`Server running on port ${port}`));