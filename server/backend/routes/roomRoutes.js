const express = require('express');
const router = express.Router();
const { getRooms, createRoom, updateRoom,  deleteRoom } = require('../controllers/roomController')

router.route('/').get(getRooms).post(createRoom);
router.route('/:id').put(updateRoom).delete(deleteRoom);

module.exports = router;