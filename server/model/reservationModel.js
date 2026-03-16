const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
        type: mongoose.Schema.Types.ObjectId,
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
    isAnnonymous: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Reservation', reservationSchema);