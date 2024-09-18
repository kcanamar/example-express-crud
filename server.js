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
app.use(methodOverride('_method')) // allows us to override the http method Post with Update or Delete
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
        res.render('index.ejs', {
            data: albums
        })
    } catch (error) {
        res.send(error)
    }
})

app.get("/new", (req, res) => {
    res.render('new.ejs')
})

app.delete("/remove/:id", async (req, res) => {
    try {
        await Album.findByIdAndDelete(req.params.id)
        res.redirect('/index')
    } catch (error) {
        res.send(error)
    }
})

app.put("/update/:id", async (req, res) => {
    try {
       await Album.findByIdAndUpdate(req.params.id, req.body)
       res.redirect(`/show/${req.params.id}`)
    } catch (error) {
        res.send(error)
    }
})

app.post("/", async (req, res) => {
     try {
        console.log(req.body)
        await Album.create(req.body)
        res.redirect('/index')
     } catch (error) {
        res.send('There was an error creating an album')
     }
})

app.get('/edit/:id', async (req, res) => {
    try {
       const foundAlbum = await Album.findById(req.params.id)
       res.render("edit.ejs", {
        data: foundAlbum
       })
    } catch (error) {
        res.send(error)
    }
})

app.get('/show/:id', async (req, res) => {
    try {
    //    const album = await Album.findById({ _id: req.params.id })
       const album = await Album.findById(req.params.id)
       res.render('show.ejs', {
         data: album
       })
    } catch (error) {
        res.send(error)
    }
})
//////////////////////////
// Server Listener
//////////////////////////
app.listen(PORT, () => console.log(`Listening for the owwwwwch on port: ${PORT}`))