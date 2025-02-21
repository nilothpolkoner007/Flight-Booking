const express = require('express');
const Flight = require('../models/Flight');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Get all flights (Public)
router.get('/flight', async (req, res) => {
  const flights = await Flight.find();
  res.json(flights);
});

// ✅ Add flight (Admin Only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const flight = new Flight(req.body);
  await flight.save();
  res.status(201).json(flight);
});

module.exports = router;
