////////////////////////
// Setup - Import deps
////////////////////////
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Album = require("../models/Album");

///////////////////////
// Custom Middleware
///////////////////////
const models = (req, res, next) => {
    req.models = {
        Album
    }
    next() // continues the flow of the server
}
///////////////////////
// Exports
///////////////////////
module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended: true})); // expresses built in body parser x-www-form-urlencoded
    app.use(methodOverride('_method')) // allows us to override the http method Post with Update or Delete
    app.use(models)
}