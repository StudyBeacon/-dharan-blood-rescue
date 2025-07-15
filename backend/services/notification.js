const { NOTIFICATION_TYPES } = require('../config/constants');
const socket = require('./socket');

// Notify matching donors about a new blood request
exports.notifyDonors = async (bloodRequest) => {
  try {
    const io = socket.getIO();
    
    // In a real app, we would query donors matching the blood group and location
    io.emit('new_blood_request', {
      type: NOTIFICATION_TYPES.BLOOD_REQUEST,
      requestId: bloodRequest._id,
      bloodGroup: bloodRequest.bloodGroup,
      location: bloodRequest.location,
      urgency: bloodRequest.urgency,
      createdAt: bloodRequest.createdAt
    });

    console.log(`Notified donors about blood request ${bloodRequest._id}`);
  } catch (err) {
    console.error('Error notifying donors:', err);
  }
};

// Notify patient about request status
exports.notifyPatient = async (patient, notification) => {
  try {
    const io = socket.getIO();
    
    io.to(`user_${patient.user}`).emit('notification', notification);
    console.log(`Notified patient ${patient.user} with:`, notification);
  } catch (err) {
    console.error('Error notifying patient:', err);
  }
};

// Notify driver about new assignment
exports.notifyDriver = async (driverId, request) => {
  try {
    const io = socket.getIO();
    
    io.to(`user_${driverId}`).emit('new_assignment', {
      type: NOTIFICATION_TYPES.AMBULANCE_ASSIGNED,
      requestId: request._id,
      pickupLocation: request.pickupLocation,
      destination: request.destination,
      patient: request.patient
    });

    console.log(`Notified driver ${driverId} about new assignment`);
  } catch (err) {
    console.error('Error notifying driver:', err);
  }
};