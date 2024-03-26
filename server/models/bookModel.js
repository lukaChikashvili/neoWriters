const mongoose = require('mongoose');

// create book schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    }
}, {timestamps: true});


const Book = mongoose.model('book', bookSchema);

module.exports = {Book};