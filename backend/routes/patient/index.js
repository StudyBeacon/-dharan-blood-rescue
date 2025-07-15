const router = require('express').Router();
const {
  createBloodRequest,
  getActiveRequests
} = require('../../controllers/patientController');
const auth = require('../../utils/auth');

router.use(auth.verifyToken);
router.get('/requests', getActiveRequests);
router.post('/blood-requests', createBloodRequest);

module.exports = router;