// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { ROLES } = require('../config/constants');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 8, 
    select: false
  },
  role: { 
    type: String, 
    required: true, 
    enum: Object.values(ROLES)
  },
  phone: { 
    type: String, 
    required: true, 
    validate: {
      validator: v => 
        // Accepts either 10-digit Nepalese numbers (e.g. 9800000000)
        // or international format with +977 prefix (e.g. +9779812345678)
        /^(\+977)?\d{10}$/.test(v),
      message: props => `${props.value} is not a valid Nepalese phone number!`
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual populate for role-specific profile
userSchema.virtual('profile', {
  ref: function() {
    return this.role;  // 'donor', 'patient', or 'driver'
  },
  localField: '_id',
  foreignField: 'user',
  justOne: true
});

module.exports = mongoose.model('User', userSchema);