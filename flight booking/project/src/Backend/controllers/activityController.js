const Activity = require('../models/Activity');

exports.getActivities = async (req, res) => {
  try {
    const { location } = req.query;
    const activities = await Activity.find({ location });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
