const User = require('../models/User');
const Flight = require('../models/Flight');
const Hotel = require('../models/Hotel');
const Destination = require('../models/Destination');

// ✅ Get All Users (Admin Only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// ✅ Delete a User (Admin Only)
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// ✅ Add a Flight (Admin Only)
const addFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json({ message: 'Flight added successfully', flight });
  } catch (error) {
    res.status(500).json({ message: 'Error adding flight', error });
  }
};

// ✅ Delete a Flight (Admin Only)
const deleteFlight = async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Flight deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting flight', error });
  }
};

// ✅ Add a Hotel (Admin Only)
const addHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json({ message: 'Hotel added successfully', hotel });
  } catch (error) {
    res.status(500).json({ message: 'Error adding hotel', error });
  }
};

// ✅ Delete a Hotel (Admin Only)
const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel', error });
  }
};

// ✅ Add a Destination (Admin Only)
const addDestination = async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json({ message: 'Destination added successfully', destination });
  } catch (error) {
    res.status(500).json({ message: 'Error adding destination', error });
  }
};

// ✅ Delete a Destination (Admin Only)
const deleteDestination = async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting destination', error });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  addFlight,
  deleteFlight,
  addHotel,
  deleteHotel,
  addDestination,
  deleteDestination,
};
