const asyncHandler = require('express-async-handler')

const Reservation = require('../model/reservationModel')

// @desc    Get Reservation
// @route   GET /api/reservations
// @access  Private
const getReservations = asyncHandler(async (req, res) => {
    const reservations = await Reservation.find().populate('user', '-password').populate('room')

    res.status(200).json(reservations)
})

const getFilteredReservations = asyncHandler(async (req, res) => {
    const {id, ignoreAnonymous, redactAnonymous} = req.body;
    
    const query = {};
    if (id) {
        query.user = id;
    }

    if (ignoreAnonymous === true) {
        query.isAnonymous = false;
    }

    let reservations = await Reservation.find(query).populate('user', '-password').populate('room').lean()

    if (redactAnonymous === true) {
        reservations = reservations.map(r => {
            if (r.isAnonymous) {
                return {
                    ...r,
                    user: null,
                    inpersonInfo: null
                }
            }
            return r
        })
    }

    res.status(200).json(reservations)
})

// @desc    Create Reservation
// @route   POST /api/reservations
// @access  Private
const createReservation = asyncHandler(async (req, res) => {
    const { user, date, time, room, seats, resStatus, reason, isAnonymous, inpersonInfo } = req.body;

    if (!(user || inpersonInfo) || !date || !time || !room) {
        res.status(400)
        throw new Error('Invalid Creation')
    }

    const exists = await Reservation.find({date, time, room})
    if (exists.length > 0) {
        if (seats.length === 0) {
            res.status(400)
            throw new Error('Cannot reserve the entire room')
        }

        for (const reserved of exists) {
            if (reserved.seats.length === 0) {
                res.status(400)
                throw new Error('The room is already reserved')
            }

            const conflict = seats.some(seat => reserved.seats.includes(seat));
            if (conflict) {
                res.status(400)
                throw new Error('Some of the seats have already been reserved')
            }
        }
    }

    const reservation = await Reservation.create({
        user: user || null,
        date: date,
        time: time,
        room: room,
        seats: seats,
        resStatus: resStatus,
        reason: reason,
        isAnonymous: isAnonymous,
        inpersonInfo: inpersonInfo || null
    })

    const populatedRes = await Reservation.findById(reservation._id).populate('room').populate('user');

    res.status(200).json(populatedRes)
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
    getReservations, getFilteredReservations, createReservation, updateReservation, deleteReservation
}