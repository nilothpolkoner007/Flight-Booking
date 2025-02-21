const express = require('express');
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createBooking);
router.get('/user', authMiddleware, getUserBookings);

module.exports = router;
