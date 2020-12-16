// Dependencies
const { notes } = require("console");
const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 3001;

// Express parsing
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//API note List
var noteList = db;

// Routes


// * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function( req, res ){

    res.sendFile(path.join(__dirname, "public", "notes.html"))
})

// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function( req, res ){

    return res.json(db);

})

// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
// and then return the new note to the client.
app.post("/api/notes", function(req, res){

    var newNote = req.body;
    
    db.push( newNote );

})

// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, 
// you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, 
// and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function(req, res) {


    res.end();

});



// * GET `*` - Should return the `index.html` file
app.get("*", function( req, res ){

    res.sendFile(path.join(__dirname, "public", "index.html"))

})





// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, 
// you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, 
// and then rewrite the notes to the `db.json` file.

app.listen( PORT );