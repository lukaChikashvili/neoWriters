const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({

    img: {
        data: Buffer,
        contentType: String
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }

    
});

const Image = mongoose.model('Image', imageSchema);

module.exports = {Image};