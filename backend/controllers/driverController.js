const AmbulanceRequest = require('../models/AmbulanceRequest');
const Driver = require('../models/Driver');
const { AMBULANCE_STATUS } = require('../config/constants');

exports.getAssignedTrips = async (req, res) => {
  try {
    const trips = await AmbulanceRequest.find({
      driver: req.user.id,
      status: { $in: [AMBULANCE_STATUS.ASSIGNED, AMBULANCE_STATUS.IN_PROGRESS] }
    }).populate('patient', 'name phone');

    res.json(trips);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTripStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const trip = await AmbulanceRequest.findOneAndUpdate(
      { _id: req.params.id, driver: req.user.id },
      { status },
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json(trip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.body;
    
    // Update driver's current location
    await Driver.findOneAndUpdate(
      { user: req.user.id },
      { 
        currentLocation: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      }
    );

    // Add to trip history if on active trip
    await AmbulanceRequest.findOneAndUpdate(
      { 
        driver: req.user.id,
        status: AMBULANCE_STATUS.IN_PROGRESS 
      },
      { 
        $push: { 
          locationUpdates: { 
            coordinates: [longitude, latitude],
            timestamp: new Date()
          } 
        } 
      }
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};