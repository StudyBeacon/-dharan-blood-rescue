const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../utils/auth');
const donorController = require('../../controllers/donorController');

// 🆕 Public: Register donor
router.post("/register", donorController.registerDonor); // 👈 no verifyToken here

// Protect all other donor routes
router.use(verifyToken);

// Existing protected routes below...
router.get('/profile', donorController.getProfile);
router.put('/profile', donorController.updateProfile);
router.get('/requests/nearby', donorController.getNearbyRequests);
router.put('/requests/:id/accept', donorController.acceptRequest);

module.exports = router;
