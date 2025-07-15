const express = require('express');
const Donor = require('../models/Donor');
const router = express.Router();

// Add new donor
router.post('/', async (req, res) => {
  try {
    const donor = await Donor.create(req.body);
    res.status(201).json(donor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;