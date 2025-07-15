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

// Get single donor by ID
router.get('/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    res.json(donor);
  } catch (err) {
    res.status(404).json({ error: 'Donor not found' });
  }
});

// Update donor availability
router.patch('/:id/availability', async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { availability: req.body.availability },
      { new: true }
    );
    res.json(donor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// if (!req.body.name || !req.body.bloodGroup) {
//   return res.status(400).json({ error: "Missing required fields" });
// }

module.exports = router;