const Hotel = require('../models/Hotel');

exports.getHotels = async (req, res) => {
  try {
    const { location } = req.query;
    const hotels = await Hotel.find({ location });

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
