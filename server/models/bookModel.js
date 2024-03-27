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
    },

    url: {
        type: String,
        required: true
    },

    
    price: {
        type: Number,
        required: true
    },


    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {timestamps: true});


const Book = mongoose.model('book', bookSchema);

module.exports = {Book};