const mongoose = require('mongoose');
const { AMBULANCE_STATUS } = require('../config/constants');

const ambulanceRequestSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  pickupLocation: {
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
  destination: {
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
  status: {
    type: String,
    enum: Object.values(AMBULANCE_STATUS),
    default: AMBULANCE_STATUS.PENDING
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  assignedAt: Date,
  completedAt: Date,
  locationUpdates: [{
    coordinates: [Number],
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  estimatedTime: Number, // in minutes
  actualTime: Number,    // in minutes
  notes: String
}, {
  timestamps: true
});

ambulanceRequestSchema.index({ pickupLocation: '2dsphere' });
ambulanceRequestSchema.index({ destination: '2dsphere' });
ambulanceRequestSchema.index({ status: 1 });

module.exports = mongoose.model('AmbulanceRequest', ambulanceRequestSchema);