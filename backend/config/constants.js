module.exports = {
  ROLES: {
    DONOR: 'donor',
    PATIENT: 'patient',
    DRIVER: 'driver',
    ADMIN: 'admin'
  },
  BLOOD_GROUPS: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  REQUEST_STATUS: {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    FULFILLED: 'fulfilled',
    CANCELLED: 'cancelled'
  },
  AMBULANCE_STATUS: {
    PENDING: 'pending',
    ASSIGNED: 'assigned',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
  },
  NOTIFICATION_TYPES: {
    BLOOD_REQUEST: 'blood_request',
    REQUEST_ACCEPTED: 'request_accepted',
    AMBULANCE_ASSIGNED: 'ambulance_assigned'
  },
  GEO_SEARCH_RADIUS: {
    DEFAULT: 10000, // 10km in meters
    URGENT: 50000   // 50km in meters
  }
};