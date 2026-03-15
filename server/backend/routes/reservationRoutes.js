const express = require('express');
const router = express.Router();
const { getReservations, createReservation, updateReservation,  deleteReservation } = require('../controllers/ReservationController')

router.route('/').get(getReservations).post(createReservation);
router.route('/:id').put(updateReservation).delete(deleteReservation);

module.exports = router;