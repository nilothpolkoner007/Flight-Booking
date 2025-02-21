const express = require('express');
const { processPayment } = require('../controllers/paymentController'); // ✅ Ensure correct destructuring
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Corrected Route
router.post('/pay', authMiddleware, processPayment);

module.exports = router;
