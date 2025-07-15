const express = require('express');
const BloodRequest = require('../models/BloodRequest');
const router = express.Router();

// Create blood request
router.post('/', async (req, res) => {
  try {
    const request = await BloodRequest.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;