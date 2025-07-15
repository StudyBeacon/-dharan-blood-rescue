const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../utils/auth');
const driverController = require('../../controllers/driverController');

// Protect all driver routes
router.use(verifyToken);

// @route   GET api/driver/trips
// @desc    Get assigned trips
// @access  Private
router.get('/trips', driverController.getAssignedTrips);

// @route   PUT api/driver/trips/:id/status
// @desc    Update trip status
// @access  Private
router.put('/trips/:id/status', driverController.updateTripStatus);

// @route   POST api/driver/location
// @desc    Update driver location
// @access  Private
router.post('/location', driverController.updateLocation);

module.exports = router;