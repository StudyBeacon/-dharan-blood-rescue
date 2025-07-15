const BloodRequest = require('../models/BloodRequest');

exports.createBloodRequest = async (req, res) => {
  try {
    const request = await BloodRequest.create({
      patient: req.user.id,
      ...req.body
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getActiveRequests = async (req, res) => {
  const requests = await BloodRequest.find({ 
    patient: req.user.id,
    status: { $in: ['pending', 'accepted'] } 
  });
  res.json(requests);
};