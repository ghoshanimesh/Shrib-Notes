const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
  url_id: {
    type: String,
    required: [true, 'Url ID is required']
  },
  text: {
    type: String,
    required: [true, 'Data is required']
  },
  created_at: {
    type: Date,
    required: [true, 'Created date is required']
  }
})

const ShribNotes = module.exports = mongoose.model('Shribnotes', notesSchema)