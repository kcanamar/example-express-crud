/////////////////////
// Setup
/////////////////////

const express = require('express');
const router = express.Router(); // make a default express router
const albumController = require('../controllers/album');

router.get('/index', albumController.index)
router.get("/new", albumController.newAlbum)
router.delete("/remove/:id", albumController.destroy)
router.put("/update/:id", albumController.update)
router.post("/", albumController.create)
router.get('/edit/:id', albumController.edit)
router.get('/show/:id', albumController.show)

/////////////////////
// Exports
/////////////////////
module.exports = router