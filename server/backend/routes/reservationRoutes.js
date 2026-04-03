const express = require('express');
const router = express.Router();
const { getReservations, getFilteredReservations, createReservation, updateReservation } = require('../controllers/reservationController')
const {isLoggedIn, isAdmin} = require('../middleware/authMiddleware')

router.get('/', isLoggedIn, isAdmin, getReservations)
router.post('/', isLoggedIn, createReservation);

router.put('/:id', isLoggedIn, updateReservation);
router.post('/filtered', isLoggedIn, getFilteredReservations)

module.exports = router;