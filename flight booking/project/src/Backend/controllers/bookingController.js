const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const Hotel = require('../models/Hotel');
const Activity = require('../models/Activity');

// 🛫 Create a New Booking
exports.createBooking = async (req, res) => {
  try {
    const { flightId, hotelId, activityIds } = req.body;
    const userId = req.user.userId; // Retrieved from JWT token

    let totalPrice = 0;

    // Fetch flight price
    if (flightId) {
      const flight = await Flight.findById(flightId);
      if (!flight) return res.status(404).json({ error: 'Flight not found' });
      totalPrice += flight.price;
    }

    // Fetch hotel price
    if (hotelId) {
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
      totalPrice += hotel.price;
    }

    // Fetch activities price
    if (activityIds && activityIds.length > 0) {
      const activities = await Activity.find({ _id: { $in: activityIds } });
      totalPrice += activities.reduce((sum, act) => sum + act.price, 0);
    }

    // Create Booking
    const newBooking = new Booking({
      userId,
      flightId,
      hotelId,
      activityIds,
      totalPrice,
      paymentStatus: 'Pending',
    });

    await newBooking.save();

    res.status(201).json({
      message: 'Booking successful',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 📝 Get All Bookings for a User
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await Booking.find({ userId })
      .populate('flightId', 'name price')
      .populate('hotelId', 'name price')
      .populate('activityIds', 'name price');

    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.json({ bookings });
  } catch (error) {
    console.error('Fetch Bookings Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 🛫 Book a Flight Only (Future Use)
exports.bookFlight = async (req, res) => {
  res.json({ message: 'Flight booked successfully' });
};

// 🏨 Book a Hotel Only (Future Use)
exports.bookHotel = async (req, res) => {
  res.json({ message: 'Hotel booked successfully' });
};
