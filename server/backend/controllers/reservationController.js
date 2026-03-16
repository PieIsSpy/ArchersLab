const asyncHandler = require('express-async-handler')

const Reservation = require('../../model/reservationModel')

// @desc    Get Reservation
// @route   GET /api/reservations
// @access  Private
const getReservations = asyncHandler(async (req, res) => {
    const reservations = await Reservation.find().populate('user').populate('room')

    res.status(200).json(reservations)
})

// @desc    Create Reservation
// @route   POST /api/reservations
// @access  Private
const createReservation = asyncHandler(async (req, res) => {
    const {user, date, time, room} = req.body;

    if (!user || !date || !time || !room) {
        res.status(400)
        throw new Error('Invalid Creation')
    }

    const reservation = await Reservation.create({
        user,
        date,
        time,
        room,
        seats,
        resStatus,
        isAnnonymous,
        inpersonInfo
    })

    res.status(200).json(reservation)
})

// @desc    Update Reservation
// @route   PUT /api/reservations/:id
// @access  Private
const updateReservation = asyncHandler(async (req, res) => {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
        res.status(400);
        throw new Error('Reservation not found');
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedReservation)
})

// @desc    Delete Reservation
// @route   DELETE /api/reservations/:id
// @access  Private
const deleteReservation = asyncHandler(async (req, res) => {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
        res.status(400);
        throw new Error('Reservation not found');
    }

    await reservation.deleteOne();
    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getReservations, createReservation, updateReservation, deleteReservation
}