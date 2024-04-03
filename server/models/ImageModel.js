const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    img: {
        data: Buffer,
        contentType: "image/png"
    }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = {Image};