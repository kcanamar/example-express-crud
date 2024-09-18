//////////////////////////
// Setup (Dependencies & Imports/Requires)
//////////////////////////
const mongoose = require('mongoose')

// MongoDB & Mongoose
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + "yeah.. that didn't work"))
db.on('connected', () => console.log(`Mongoose Connected`))
db.on('disconnected', () => console.log('mongoose disconnected'))
//////////////////////////
// Exports
//////////////////////////