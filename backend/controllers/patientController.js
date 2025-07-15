const BloodRequest = require('../models/BloodRequest');
const Patient = require('../models/Patient');
const { notifyDonors } = require('../services/notification');
const { REQUEST_STATUS } = require('../config/constants');

exports.createBloodRequest = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });
    if (!patient) {
      return res.status(404).json({ error: 'Patient profile not found' });
    }

    const request = await BloodRequest.create({
      patient: patient._id,
      ...req.body,
      status: REQUEST_STATUS.PENDING
    });

    await notifyDonors(request);

    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });
    if (!patient) {
      return res.status(404).json({ error: 'Patient profile not found' });
    }

    const requests = await BloodRequest.find({ patient: patient._id })
      .populate('donor', 'name phone bloodGroup')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });
    if (!patient) {
      return res.status(404).json({ error: 'Patient profile not found' });
    }

    const request = await BloodRequest.findOneAndUpdate(
      { _id: req.params.id, patient: patient._id },
      { status: REQUEST_STATUS.CANCELLED },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};