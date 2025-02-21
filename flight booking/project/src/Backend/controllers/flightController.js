
const Flight = require('../models/Flight');

exports.getFlights = async (req, res) => {
  try {
    const { origin, destination } = req.query;
    const flights = await Flight.find({ origin, destination });

    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
