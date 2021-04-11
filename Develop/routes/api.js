const fs = require('fs');
const path = require('path');
const data = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
  //GET for all notes in .json file
    app.get('/api/notes', function (req,res){
      res.sendFile(path.join(__dirname, '../db/db.json'))
    })

//POST for new notes into .json file 
    app.post('/api/notes', (req,res) => {
      
        let newNote = req.body;

      //assigns unique ID to new note
      newNote.id = uuidv4();
      
      data.push(newNote) 
      fs.writeFileSync('./db/db.json', JSON.stringify(data))
      res.json(data)
      
      console.log("new note has been added!")
    })

  //DELETE for selected note from .json file
    app.delete('/api/notes/:id', function (req, res) {
              let id = req.params.id
              const select = data.find(note => note.id === id)

              if (id === select.id){
                  data.splice(data.indexOf(select),1) 
                  fs.writeFileSync('./db/db.json', JSON.stringify(data))
              }
              res.json(data)
              console.log("note has been deleted!")
    })
}