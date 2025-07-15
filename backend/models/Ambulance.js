const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
  driverName: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  available: { type: Boolean, default: true },
  vehicleNumber: { type: String, required: true }
});

module.exports = mongoose.model('Ambulance', ambulanceSchema);