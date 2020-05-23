const express = require('express');
const router = express.Router();
const Shribnotes = require("../models/shribnotes")

//Add the note
router.post("/addnote/:id", (req,res,next) => {
    console.log(req.params.id);
    let text = req.body.text;
    let newNote = new Shribnotes({
        url_id: req.params.id,
        text: text,
        created_at: Date.now()
    });
    newNote.save((err, notes)=>{
        if(err){
            res.json({msg: "Failed to add a note"+err})
        }else{
            res.json({msg: "Note Added successfully"})
        }
    });
})

//Select the notes based on the url_id where /:id refers to url_id
router.get("/note/:id",(req, res, next) => {
    console.log(req.params.id)
    Shribnotes.find({url_id: req.params.id}, (err, notes) => {
        if(err){
            console.log("Herereee");
            res.status(404).json({msg: "Error retrieving note with id " + req.params.id})
        }else if(notes.length == 0){
            console.log('No note found, will be directed by angular to a new note');
        }else{
            res.send(notes[0]);
        }
    })
})

//Update the note, Send the text in the body in the form x-www-url-encoded
router.put("/updatenote/:id", (req, res, next) => {
    console.log(req.params.id);
    console.log(req.body.text);
    Shribnotes.find({url_id: req.params.id}, (err, notes) => {
        if(err){
            console.log("Herereee");
            res.status(404).json({msg: "Error retrieving note with id " + req.params.id})
        }else if(notes.length == 0){
            res.json({msg: "Did not find the url id"})
        }else{
            const updatedNote = Shribnotes.updateOne({'url_id': req.params.id}, {$set:{"text" : req.body.text}}, (err)=>{
                if(err){
                    res.send(err)
                }else{
                    res.json({msg : "Updated Successfully"})
                }
            })
        }
    })
});

// Delete the note based on url id
router.delete("/deletenote/:id", (req, res, next) => {
    console.log(req.params.id);
    Shribnotes.find({url_id: req.params.id}, (err, notes) => {
        if(err){
            console.log("Herereee");
            res.status(404).json({msg: "Error retrieving note with id " + req.params.id})
        }else if(notes.length == 0){
            res.json({msg: "Did not find the url id"})
        }else{
            const updatedNote = Shribnotes.deleteOne({'url_id': req.params.id}, (err)=>{
                if(err){
                    res.send(err)
                }else{
                    res.json({msg: "Deleted successsfully"})
                }
            })
        }
    })
});

//get recent notes
router.get("/recentnotes",(req, res, next) => {
    let query = Shribnotes.find({}, {text: 0, __v: 0}).sort({"created_at":-1}).limit(10);
    query.exec((err, notes) => {
        if(err){
            console.log("Herereee");
            res.status(404).json({msg: "Error retrieving note with id " + errr})
        }else{
            res.send(notes);
        }
    });
})


module.exports = router;