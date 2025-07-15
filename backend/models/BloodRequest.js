const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  hospital: { type: String, required: true },
  urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  fulfilled: { type: Boolean, default: false }
});

module.exports = mongoose.model('BloodRequest', requestSchema);