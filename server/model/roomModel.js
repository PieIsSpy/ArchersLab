const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    row: {
        type: Number,
        required: true
    },
    col: {
        type: Number,
        required: true
    },
    layout: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('User', roomSchema);