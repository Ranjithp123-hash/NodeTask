const mongoose = require('mongoose');
require('dotenv').config();


// Define the MongoDB connection URL 
const mongoURL = process.env.LOCAL_DB_URL 


// Live Database server connection 

// const mongoAtlasURL = process.env.SERVER_DB_URL

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
