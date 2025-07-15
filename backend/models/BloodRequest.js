const mongoose = require('mongoose');
const { BLOOD_GROUPS, REQUEST_STATUS } = require('../config/constants');

const bloodRequestSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor'
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: BLOOD_GROUPS
  },
  unitsRequired: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  hospital: {
    name: String,
    address: String,
    contact: String
  },
  status: {
    type: String,
    enum: Object.values(REQUEST_STATUS),
    default: REQUEST_STATUS.PENDING
  },
  notes: String
}, {
  timestamps: true
});

bloodRequestSchema.index({ location: '2dsphere' });
bloodRequestSchema.index({ status: 1 });
bloodRequestSchema.index({ bloodGroup: 1, status: 1 });

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);