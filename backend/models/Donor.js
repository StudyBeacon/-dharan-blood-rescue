const mongoose = require('mongoose');
const { BLOOD_GROUPS } = require('../config/constants');

const donorSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: BLOOD_GROUPS
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 2 && 
                 v[0] >= -180 && v[0] <= 180 && 
                 v[1] >= -90 && v[1] <= 90;
        },
        message: props => `${props.value} is not a valid coordinate!`
      }
    }
  },
  lastDonationDate: {
    type: Date,
    validate: {
      validator: function(v) {
        return !v || v <= new Date();
      },
      message: 'Last donation date cannot be in the future'
    }
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  healthInfo: {
    weight: {
      type: Number,
      min: 50,
      max: 200
    },
    height: {
      type: Number,
      min: 140,
      max: 220
    },
    hasDiseases: Boolean,
    diseases: [String]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

donorSchema.index({ location: '2dsphere' });
donorSchema.index({ bloodGroup: 1, isAvailable: 1 });

module.exports = mongoose.model('Donor', donorSchema);