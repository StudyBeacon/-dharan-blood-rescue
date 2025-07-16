const User = require('../models/User');
const Donor = require('../models/Donor');
const Patient = require('../models/Patient');
const Driver = require('../models/Driver');
const { generateToken } = require('../utils/auth');
const { ROLES } = require('../config/constants');
const { registerSchema, loginSchema } = require('../utils/validation');

exports.register = async (req, res) => {
  try {
    // 1. Validate Request Body
    const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => ({
        field: err.path.join('.'),
        message: err.message.replace(/['"]+/g, '')
      }));
      return res.status(400).json({ errors });
    }

    const { email, password, phone, role, ...profileData } = value;

    // 2. Check for Existing User
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        errors: [{ field: 'email', message: 'Email already in use' }] 
      });
    }

    // 3. Create User and Profile
    const user = await User.create({ email, password, phone, role });
    
    let profile;
    switch(role) {
      case ROLES.DONOR:
        profile = await Donor.create({ 
          user: user._id,
          name: profileData.name,
          bloodGroup: profileData.bloodGroup,
          location: profileData.location,
          // Add other donor-specific fields
        });
        break;
        
      case ROLES.PATIENT:
        profile = await Patient.create({ 
          user: user._id,
          name: profileData.name,
          bloodGroup: profileData.bloodGroup,
          // Add other patient-specific fields
        });
        break;
        
      case ROLES.DRIVER:
        profile = await Driver.create({ 
          user: user._id,
          name: profileData.name,
          licenseNumber: profileData.licenseNumber,
          vehicle: profileData.vehicle
        });
        break;
        
      default:
        await User.findByIdAndDelete(user._id);
        return res.status(400).json({ 
          errors: [{ field: 'role', message: 'Invalid role specified' }] 
        });
    }

    // 4. Generate Token (excluding sensitive data)
    const token = generateToken(user._id, user.role);
    
    // 5. Prepare Response
    const userResponse = {
      _id: user._id,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profile
    };

    res.status(201).json({ 
      status: 'success',
      token,
      data: {
        user: userResponse
      }
    });

  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ 
      status: 'error',
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.login = async (req, res) => {
  try {
    // 1. Validate Request
    const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => ({
        field: err.path.join('.'),
        message: err.message.replace(/['"]+/g, '')
      }));
      return res.status(400).json({ errors });
    }

    const { email, password } = value;

    // 2. Find User with Password
    const user = await User.findOne({ email }).select('+password +active');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ 
        status: 'fail',
        message: 'Invalid email or password'
      });
    }

    // 3. Check if Account is Active
    if (!user.active) {
      return res.status(403).json({
        status: 'fail',
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // 4. Get Role-Specific Profile
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

    // 5. Generate Token
    const token = generateToken(user._id, user.role);

    // 6. Prepare Response (excluding sensitive data)
    const userResponse = {
      _id: user._id,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profile
    };

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: userResponse
      }
    });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};