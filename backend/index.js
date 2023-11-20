const app = require('./app');
require('dotenv').config();
const connectWithDatabase = require('./config/db');

const port = process.env.PORT || 8082;

// connect with database
connectWithDatabase();

app.listen(port, () => console.log(`Server running on port ${port}`));