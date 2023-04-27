const express = require('express');
const path = require('path');
const fs = require("fs")
// const data = require('.. /../../db/db.json') //needs space after first set of double dots
const dataPath = require('./db/db.json')
// const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))



// const PORT = 3001;
const PORT = process.env.PORT || 3001

const app = express();

//parse incoming request
app.use(express.json());

//TODO----- get a post req to api notes, and a get req to api notes, console.log those event handlers

// Middleware for parsing JSON and urlencoded form data

app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')) //changed index.html to notes.html 
);

// GET Route for feedback page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//get route for notes data
app.get('/api/notes', (req, res) => {
  console.log('youre hitting api notes');
  const notesData = fs.readFileSync(dataPath, 'utf8');
  const parsedNotesData = JSON.parse(notesData);
  res.json(parsedNotesData);
});

//post route to add a new note
app.post('/api/notes', (req, res) => {
  const note = req.body;

  // Read notes data from file
   const notesData = fs.readFileSync(dataPath, 'utf8');
    const parsedNotesData = JSON.parse(notesData); 


    // Add a new note
    note.id = parsedNotesData.length + 1;
    parsedNotesData.push(note);

    // Update notes data in the file
    fs.writeFile(dataPath, JSON.stringify(parsedNotesData), (err) => {
      if (err) throw err;
      console.log('The notes been saved!');

      // Send the updated notes data as a response
      res.json(parsedNotesData);
    });
  });

  
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));