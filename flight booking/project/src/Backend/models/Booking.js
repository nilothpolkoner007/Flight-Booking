const { default: mongoose } = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  activityIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema);
