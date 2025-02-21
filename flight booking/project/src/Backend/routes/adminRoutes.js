const express = require('express');
const {
  getAllUsers,
  deleteUser,
  addFlight,
  deleteFlight,
  addHotel,
  deleteHotel,
  addDestination,
  deleteDestination,
} = require('../controllers/adminController');

const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Manage Users (Admin Only)
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

// ✅ Manage Flights (Admin Only)
router.post('/flights', authMiddleware, adminMiddleware, addFlight);
router.delete('/flights/:id', authMiddleware, adminMiddleware, deleteFlight);

// ✅ Manage Hotels (Admin Only)
router.post('/hotels', authMiddleware, adminMiddleware, addHotel);
router.delete('/hotels/:id', authMiddleware, adminMiddleware, deleteHotel);

// ✅ Manage Destinations (Admin Only)
router.post('/destinations', authMiddleware, adminMiddleware, addDestination);
router.delete('/destinations/:id', authMiddleware, adminMiddleware, deleteDestination);

module.exports = router;
