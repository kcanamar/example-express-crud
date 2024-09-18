////////////////////////
// Setup - Import deps
////////////////////////
const mongoose = require('mongoose');
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

///////////////////////
// Exports
///////////////////////
module.exports = Album;