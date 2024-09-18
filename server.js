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

// Destructure Model components from mongoose
const { Schema, model } = mongoose;

const albumSchema = new Schema(
    {
        title: String,
        year: Number,
        tracks: [String]
    },
    {
        timestamps: true
    }
)

const Album = model("Album", albumSchema);

//////////////////////////
// Declare Middleware
//////////////////////////
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true})); // expresses built in body parser x-www-form-urlencoded

//////////////////////////
// Declare Routes 
//////////////////////////
// INDUCES 
app.get("/", (req, res) => {
    res.send('ET phone Me.')
})

app.get('/index', async (req, res) => {
    try {
        const albums = await Album.find({})
        res.send(albums)
    } catch (error) {
        res.send(error)
    }
})

app.post("/", async (req, res) => {
     try {
        console.log(req.body)
        await Album.create(req.body)
        res.send('Album creation success')
     } catch (error) {
        res.send('There was an error creating an album')
     }
})

app.get('/show/:id', async (req, res) => {
    try {
    //    const album = await Album.findById({ _id: req.params.id })
       const album = await Album.findById(req.params.id)
       console.log(album)
       res.send(album)
    } catch (error) {
        res.send(error)
    }
})
//////////////////////////
// Server Listener
//////////////////////////
app.listen(PORT, () => console.log(`Listening for the owwwwwch on port: ${PORT}`))