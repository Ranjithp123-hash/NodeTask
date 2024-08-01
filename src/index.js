const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Connecting  Database
connectDB();

// Initializing Middleware
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/product'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
