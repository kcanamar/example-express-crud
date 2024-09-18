////////////////////////
// Setup - Import deps
////////////////////////

///////////////////////
// Exports
///////////////////////
module.exports = {
    index,
    newAlbum,
    destroy,
    create,
    update,
    edit,
    show
}

async function index(req, res) {
    try {
        const albums = await req.models.Album.find({})
        res.render('index.ejs', {
            data: albums
        })
    } catch (error) {
        res.send(error)
    }
}

function newAlbum(req, res) {
    res.render('new.ejs')
}

async function destroy(req, res) {
    try {
        await req.models.Album.findByIdAndDelete(req.params.id)
        res.redirect('/album/index')
    } catch (error) {
        res.send(error)
    }
}

async function update(req, res) {
    try {
       await req.models.Album.findByIdAndUpdate(req.params.id, req.body)
       res.redirect(`/album/show/${req.params.id}`)
    } catch (error) {
        res.send(error)
    }
}

async function create(req, res){
    try {
       console.log(req.body)
       await req.models.Album.create(req.body)
       res.redirect('/album/index')
    } catch (error) {
       res.send('There was an error creating an album')
    }
}

async function edit(req, res) {
    try {
       const foundAlbum = await req.models.Album.findById(req.params.id)
       res.render("edit.ejs", {
        data: foundAlbum
       })
    } catch (error) {
        res.send(error)
    }
}

async function show(req, res){
    try {
    //    const album = await Album.findById({ _id: req.params.id })
       const album = await req.models.Album.findById(req.params.id)
       res.render('show.ejs', {
         data: album
       })
    } catch (error) {
        res.send(error)
    }
}