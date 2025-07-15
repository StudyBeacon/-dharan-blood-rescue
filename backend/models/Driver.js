const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  vehicle: {
    type: {
      type: String,
      enum: ['car', 'van', 'ambulance'],
      required: true
    },
    registration: {
      type: String,
      required: true,
      unique: true
    },
    model: String,
    capacity: Number
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  currentLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  }
}, {
  timestamps: true
});

driverSchema.index({ currentLocation: '2dsphere' });
driverSchema.index({ isAvailable: 1 });

module.exports = mongoose.model('Driver', driverSchema);