const express = require('express');
const Ambulance = require('../models/Ambulance');
const router = express.Router();

// Book ambulance
router.post('/', async (req, res) => {
  try {
    const ambulance = await Ambulance.create(req.body);
    res.status(201).json(ambulance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;