//////////////////////////
// Setup - Importing deps and creating app object
//////////////////////////
require('dotenv').config(); // importing the contents of .env and making the variables available in this module
const express = require('express');
const middleware = require('./middleware/index');
const albumRouter = require("./routes/album");
const PORT = process.env.PORT || 3000;
const app = express();
//////////////////////////
// Database Connection / Model
//////////////////////////
require('./config/db');
const Album = require("./models/Album");
//////////////////////////
// Declare Middleware
//////////////////////////
middleware(app)
//////////////////////////
// Declare Routes 
//////////////////////////
// INDUCES 
app.get("/", (req, res) => {res.send('ET phone Me.')})
app.use("/album", albumRouter)
//////////////////////////
// Server Listener
//////////////////////////
app.listen(PORT, () => console.log(`Listening for the owwwwwch on port: ${PORT}`))