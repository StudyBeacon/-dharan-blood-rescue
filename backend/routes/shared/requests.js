const express = require('express');
const router = express.Router();
const { verifyToken, authorize } = require('../../utils/auth');
const requestController = require('../../controllers/requestController');

// Protect all routes
router.use(verifyToken);

// @route   GET api/requests/blood
// @desc    Get all blood requests (admin only)
// @access  Private/Admin
router.get('/blood', authorize('admin'), requestController.getBloodRequests);

// @route   GET api/requests/ambulance
// @desc    Get all ambulance requests (admin only)
// @access  Private/Admin
router.get('/ambulance', authorize('admin'), requestController.getAmbulanceRequests);

// @route   PUT api/requests/ambulance/:id/assign
// @desc    Assign driver to ambulance request (admin only)
// @access  Private/Admin
router.put('/ambulance/:id/assign', authorize('admin'), requestController.assignAmbulanceDriver);

module.exports = router;