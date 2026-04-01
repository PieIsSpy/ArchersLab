const express = require('express');
const router = express.Router();
const { getReservations, getFilteredReservations, createReservation, updateReservation,  deleteReservation } = require('../controllers/reservationController')

router.route('/').get(getReservations).post(createReservation);
router.route('/:id').put(updateReservation).delete(deleteReservation);
router.post('/filtered', getFilteredReservations)

module.exports = router;