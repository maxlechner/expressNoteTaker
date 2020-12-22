// Dependencies
const { notes } = require("console");
const { json } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

// Express parsing
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// variables

var returnFile;
var numbers = [0,1,2,3,4,5,6,7,8,9];
var randomID = [];
var returnId;

function generateID() {

    for ( let i = 0; i < 5; i++ ) {
      
        // select random character from numbers array
        let randomChar = numbers[ Math.floor( Math.random() * numbers.length )];
  
        // append randomchar to ID
        randomID.push( randomChar );
    }

    returnId = parseInt( randomID.toString().replace(/,/g, "") );
    console.log( returnId );
    return returnId;
}

// Routes

// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function( req, res ){

    //use the fs module to read the file
    fs.readFile(path.join(__dirname,"db","db.json"), function(error, data){
        if(error) {
            throw new error
        } else { //then parse the file contents with json.parse() to read the real data
        
            returnFile = JSON.parse( data );

        // send the parsed data back to the client with res.send()
        res.send( returnFile );
        }

    });

})


// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
// and then return the new note to the client.
app.post( "/api/notes", function( req, res ) {
    fs.readFile( path.join(__dirname, "db", "db.json" ), function( error, data ){
      if( error ) {
          throw new error
      }
      else {
        parsedArray =  JSON.parse( data )
        var note = req.body;
        note["id"] = generateID();
        parsedArray.push( note );
        jsonArray = JSON.stringify( parsedArray );
        fs.writeFile( path.join(__dirname, "db", "db.json" ), jsonArray, (err) => {
          if (err) throw err;
          res.sendStatus( 200 );
      });
        // writeToFile(pathname,jsonArray)
        console.log( "Note created" )
      }
  });
})

// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, 
// you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, 
// and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function( req, res ) {

    //access :id from req.params.id
    var id = req.params.id;
    console.log(req.params.id);
    
    //use the fs module to read the file
    fs.readFile( path.join(__dirname, "db", "db.json" ), function( error, data ) {
        if(error) {
            throw new error
        }
        else {
            //then parse the file contents with json.parse() to read the real data
            parsedArray =  JSON.parse( data )
        }

    //use the array.filter() method to filter out the matching element
    // parsedArray = parsedArray.filter( element => element.id == id );
    parsedArray.splice(parsedArray.findIndex( element => element.id == id ),1);
    jsonArray = JSON.stringify( parsedArray );
    fs.writeFile( path.join(__dirname, "db", "db.json" ), jsonArray, (err) => {
      if (err) throw err;
      res.sendStatus( 200 );
    });
    console.log( "Note deleted" );
    });
})

// * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function( req, res ){

    res.sendFile(path.join(__dirname, "public", "notes.html"))
})

// * GET `*` - Should return the `index.html` file
app.get("*", function( req, res ){

    res.sendFile(path.join(__dirname, "public", "index.html"))

})

app.listen( PORT );