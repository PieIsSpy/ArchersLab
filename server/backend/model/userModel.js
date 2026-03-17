const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name']
    },
    nickname: {
        type: String,
        required: [false],
        default: ''
    },
    _id: {
        type: Number,
        required: [true, 'Please add your id number']
    },
    bio: {
        type: String,
        required: [false],
        default: ''
    },
    email: {
        type: String,
        required: [true, 'Please add your DLSU Email'],
    },
    college: {
        type: String,
        required: [true, 'Please add your College'],
    },
    program: {
        type: String,
        required: [true, 'Please add your Program'],
    },
    about: {
        type: String,
        required: [false],
        default: ''
    },
    pfp_url: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: [true, 'Please add your Password'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema);