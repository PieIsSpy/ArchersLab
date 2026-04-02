const asyncHandler = require('express-async-handler')

const Room = require('../model/roomModel')

// @desc    Get Room
// @route   GET /api/rooms
// @access  Private
const getRooms = asyncHandler(async (req, res) => {
    const rooms = await Room.find()

    res.status(200).json(rooms)
})

module.exports = {
    getRooms
}