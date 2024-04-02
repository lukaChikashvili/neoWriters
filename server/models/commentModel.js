const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true
    }
}, {timestamps: true});


const Comment = mongoose.model('comment', commentSchema );

module.exports = {Comment};

