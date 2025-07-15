const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../utils/auth');
const patientController = require('../../controllers/patientController');

// Protect all patient routes
router.use(verifyToken);

// @route   POST api/patient/requests
// @desc    Create blood request
// @access  Private
router.post('/requests', patientController.createBloodRequest);

// @route   GET api/patient/requests
// @desc    Get patient's blood requests
// @access  Private
router.get('/requests', patientController.getMyRequests);

// @route   PUT api/patient/requests/:id/cancel
// @desc    Cancel blood request
// @access  Private
router.put('/requests/:id/cancel', patientController.cancelRequest);

module.exports = router;