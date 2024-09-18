//////////////////////////
// Setup - Importing deps and creating app object
//////////////////////////
require('dotenv').config(); // importing the contents of .env and making the variables available in this module
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();

//////////////////////////
// Database Connection / Model
//////////////////////////
// MongoDB & Mongoose
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + "yeah.. that didn't work"))
db.on('connected', () => console.log(`Mongoose Connected`))
db.on('disconnected', () => console.log('mongoose disconnected'))

//////////////////////////
// Declare Middleware
//////////////////////////
app.use(morgan('dev'));

//////////////////////////
// Declare Routes 
//////////////////////////
app.get("/", (req, res) => {
    res.send('ET phone Me.')
})

//////////////////////////
// Server Listener
//////////////////////////
app.listen(PORT, () => console.log(`Listening for the owwwwwch on port: ${PORT}`))