const mongoose = require('mongoose');
const { BLOOD_GROUPS } = require('../config/constants');

const patientSchema = new mongoose.Schema({
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
    min: 1,
    max: 120
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: BLOOD_GROUPS
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  },
  medicalHistory: [{
    condition: String,
    diagnosedDate: Date,
    treatment: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);