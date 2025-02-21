const { default: mongoose } = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  maxParticipants: { type: Number },
});

module.exports = mongoose.model('Activity', ActivitySchema);
