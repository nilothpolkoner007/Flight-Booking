const { default: mongoose } = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: [String],
  availableRooms: { type: Number, required: true },
});

module.exports = mongoose.model('Hotel', HotelSchema);
