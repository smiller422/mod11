const express = require('express');
const path = require('path');
const fs = require("fs")
// const data = require('.. /../../db/db.json') //needs space after first set of double dots
const data = require('./db/db.json')
console.log(data)

const PORT = 3001;

const app = express();

//parse incoming request
app.use(express.json());

//TODO----- get a post req to api notes, and a get req to api notes, console.log those event handlers

// Middleware for parsing JSON and urlencoded form data

app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')) //changed index.html to notes.html 
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
{console.log("youre hitting api notes")
  res.json(data)}
);
app.post('/api/notes', (req, res) =>
{ let note = req.body 
  data.push(note)
  fs.writeFile('../Develop/db/db.json', JSON.stringify(data), (error) => {
    if (error) throw error;
  });
  }
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
