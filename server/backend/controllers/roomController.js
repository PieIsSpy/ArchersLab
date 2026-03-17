const asyncHandler = require('express-async-handler')

const Room = require('../model/roomModel')

// @desc    Get Room
// @route   GET /api/rooms
// @access  Private
const getRooms = asyncHandler(async (req, res) => {
    const rooms = await Room.find()

    res.status(200).json(rooms)
})

// @desc    Create Room
// @route   POST /api/rooms
// @access  Private
const createRoom = asyncHandler(async (req, res) => {
    const {name, row, col, layout} = req.body;

    if (!name || !row || !col || !layout) {
        res.status(400)
        throw new Error('Invalid Creation')
    }

    const room = await Room.create({
        _id: name,
        row: row,
        col: col,
        layout: layout
    })

    res.status(200).json(room)
})

// @desc    Update Room
// @route   PUT /api/rooms/:id
// @access  Private
const updateRoom = asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);

    if (!room) {
        res.status(400);
        throw new Error('Room not found');
    }

    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedRoom)
})

// @desc    Delete Room
// @route   DELETE /api/rooms/:id
// @access  Private
const deleteRoom = asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);

    if (!room) {
        res.status(400);
        throw new Error('Room not found');
    }

    await room.deleteOne();
    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getRooms, createRoom, updateRoom, deleteRoom
}