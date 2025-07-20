const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../utils/auth');
const patientController = require('../../controllers/patientController');

// Protect all patient routes
router.use(verifyToken);

// Blood Requests
router.post('/requests', patientController.createBloodRequest);
router.get('/requests', patientController.getMyRequests);
router.put('/requests/:id/cancel', patientController.cancelRequest);

// Ambulance Request
router.post('/ambulance-request', patientController.createAmbulanceRequest);

// Dashboard Data
router.get('/dashboard', patientController.getDashboard);

module.exports = router;