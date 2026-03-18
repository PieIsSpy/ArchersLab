const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    user: {
        type: Number,
        ref: 'User',
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    room: {
        type: String,
        ref: 'Room',
        required: true
    },
    seats: {
        type: [Number]
    },
    resStatus: {
        type: String,
        default: "Upcoming"
    },
    reason: {
        type: String,
        default: ""
    },
    isAnnonymous: {
        type: Boolean,
        default: false
    },
    inpersonInfo: {
        name: {type: String},
        email: {type: String},
        _id: {type: Number}
    }
})

module.exports = mongoose.model('Reservation', reservationSchema);