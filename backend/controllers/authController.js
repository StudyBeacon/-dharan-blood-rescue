// backend/controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Driver = require('../models/Driver');
const Donor = require('../models/Donor');
const Patient = require('../models/Patient');

const register = async (req, res) => {
  try {
    console.log('🔍 Incoming registration:', req.body);

    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password manually
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role
    });

    // Role-specific profile creation
    switch (role) {
      case 'driver': {
        const { licenseNumber, vehicle, currentLocation } = req.body;
        const driverData = {
          user: user._id,
          name,
          licenseNumber,
          vehicle,
          currentLocation
        };
        console.log('🚗 driverData:', driverData);
        await Driver.create(driverData);
        break;
      }
      case 'donor': {
        const { bloodGroup, age, location } = req.body;
        const donorData = {
          user: user._id,
          name,
          bloodGroup,
          age: Number(age),
          location
        };
        console.log('🩸 donorData:', donorData);
        await Donor.create(donorData);
        break;
      }
      case 'patient': {
        const { bloodGroup, age } = req.body;
        const patientData = {
          user: user._id,
          name,
          bloodGroup,
          age: Number(age)
        };
        console.log('🧍 patientData:', patientData);
        await Patient.create(patientData);
        break;
      }
    }

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(201).json({
      message: 'Registration successful',
      accessToken,
      user
    });
  } catch (err) {
    console.error('🛑 Registration error:', err);
    const message = err.errors
      ? Object.values(err.errors).map(e => e.message).join(', ')
      : err.message;
    return res.status(500).json({ message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password and role are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: `Account is registered as "${user.role}"` });
    }

    console.log('🧪 Incoming password:', password);
    console.log('🔐 Hashed password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔎 Comparison result:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    user.password = undefined;
    return res.status(200).json({
      message: 'Login successful',
      accessToken,
      user
    });
  } catch (err) {
    console.error('🛑 Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };