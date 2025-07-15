const User = require('../models/User');
const Donor = require('../models/Donor');
const Patient = require('../models/Patient');
const Driver = require('../models/Driver');
const { generateToken } = require('../utils/auth');
const { ROLES } = require('../config/constants');

exports.register = async (req, res) => {
  try {
    const { email, password, phone, role, ...profileData } = req.body;
    
    // Create user
    const user = await User.create({ email, password, phone, role });

    // Create role-specific profile
    let profile;
    switch(role) {
      case ROLES.DONOR:
        profile = await Donor.create({ user: user._id, ...profileData });
        break;
      case ROLES.PATIENT:
        profile = await Patient.create({ user: user._id, ...profileData });
        break;
      case ROLES.DRIVER:
        profile = await Driver.create({ user: user._id, ...profileData });
        break;
      default:
        throw new Error('Invalid role');
    }

    const token = generateToken(user._id, user.role);
    res.status(201).json({ token, user: { ...user.toObject(), profile } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get role-specific profile
    let profile;
    switch(user.role) {
      case ROLES.DONOR:
        profile = await Donor.findOne({ user: user._id });
        break;
      case ROLES.PATIENT:
        profile = await Patient.findOne({ user: user._id });
        break;
      case ROLES.DRIVER:
        profile = await Driver.findOne({ user: user._id });
        break;
    }

    const token = generateToken(user._id, user.role);
    res.json({ token, user: { ...user.toObject(), profile } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};