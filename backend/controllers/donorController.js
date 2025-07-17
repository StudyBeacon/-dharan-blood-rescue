const Donor = require('../models/Donor');
const BloodRequest = require('../models/BloodRequest');
const { notifyPatient } = require('../services/notification');
const { ROLES, REQUEST_STATUS } = require('../config/constants');

exports.getProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user.id });
    if (!donor) {
      return res.status(404).json({ error: 'Donor profile not found' });
    }
    res.json(donor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const donor = await Donor.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.json(donor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getNearbyRequests = async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user.id });
    if (!donor) {
      return res.status(404).json({ error: 'Donor profile not found' });
    }

    const requests = await BloodRequest.find({
      bloodGroup: donor.bloodGroup,
      status: REQUEST_STATUS.PENDING,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: donor.location.coordinates
          },
          $maxDistance: 10000 // 10km
        }
      }
    }).populate('patient', 'name phone');

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findOneAndUpdate(
      { _id: req.params.id, status: REQUEST_STATUS.PENDING },
      { 
        status: REQUEST_STATUS.ACCEPTED,
        donor: req.user.id 
      },
      { new: true }
    ).populate('patient');

    if (!request) {
      return res.status(404).json({ error: 'Request not found or already accepted' });
    }

    await notifyPatient(request.patient, {
      type: 'request_accepted',
      message: 'Your blood request has been accepted!',
      requestId: request._id
    });

    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.registerDonor = async (req, res) => {
  try {
    // If user id required, validate it here or ensure valid ObjectId is passed
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json(donor);
  } catch (error) {
    console.error("Error registering donor:", error);  // log full error object for debugging
    res.status(500).json({ error: "Failed to register donor", details: error.message });
  }
};
