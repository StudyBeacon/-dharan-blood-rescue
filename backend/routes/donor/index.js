const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../utils/auth');
const donorController = require('../../controllers/donorController');

// Protect all donor routes
router.use(verifyToken);

// @route   GET api/donor/profile
// @desc    Get donor profile
// @access  Private
router.get('/profile', donorController.getProfile);

// @route   PUT api/donor/profile
// @desc    Update donor profile
// @access  Private
router.put('/profile', donorController.updateProfile);

// @route   GET api/donor/requests/nearby
// @desc    Get nearby blood requests
// @access  Private
router.get('/requests/nearby', donorController.getNearbyRequests);

// @route   PUT api/donor/requests/:id/accept
// @desc    Accept a blood request
// @access  Private
router.put('/requests/:id/accept', donorController.acceptRequest);

module.exports = router;