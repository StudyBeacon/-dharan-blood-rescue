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
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: { type: String }
  },
  destination: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: { type: String }
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
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  estimatedTime: Number, // ETA in minutes
  actualTime: Number,    // Total trip time in minutes
  notes: { type: String }
}, {
  timestamps: true
});

// Geospatial indexes for live tracking and matching
ambulanceRequestSchema.index({ pickupLocation: '2dsphere' });
ambulanceRequestSchema.index({ destination: '2dsphere' });

// Optional: Track current status for quick queries
ambulanceRequestSchema.index({ status: 1 });

module.exports = mongoose.model('AmbulanceRequest', ambulanceRequestSchema);