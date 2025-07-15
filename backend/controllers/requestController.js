const BloodRequest = require('../models/BloodRequest');
const AmbulanceRequest = require('../models/AmbulanceRequest');

exports.getBloodRequests = async (req, res) => {
  try {
    const { status, bloodGroup } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (bloodGroup) filter.bloodGroup = bloodGroup;

    const requests = await BloodRequest.find(filter)
      .populate('patient donor', 'name phone')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAmbulanceRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    
    if (status) filter.status = status;

    const requests = await AmbulanceRequest.find(filter)
      .populate('patient driver', 'name phone')
      .sort({ requestedAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignAmbulanceDriver = async (req, res) => {
  try {
    const { driverId } = req.body;
    
    const request = await AmbulanceRequest.findByIdAndUpdate(
      req.params.id,
      { 
        driver: driverId,
        status: 'assigned',
        assignedAt: new Date()
      },
      { new: true }
    ).populate('driver patient');

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};