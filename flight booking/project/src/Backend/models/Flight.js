const { default: mongoose } = require('mongoose');

const FlightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
});

module.exports = mongoose.model('Flight', FlightSchema);
