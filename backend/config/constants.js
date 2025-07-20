module.exports = {
  // User Roles
  ROLES: {
    DONOR: 'donor',
    PATIENT: 'patient',
    DRIVER: 'driver',
    ADMIN: 'admin',
    // Helper method to get all roles
    getAll: () => ['donor', 'patient', 'driver', 'admin']
  },

  // Blood Groups
  BLOOD_GROUPS: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  
  // Request Statuses
  REQUEST_STATUS: {
    PENDING: 'pending',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    // Helper method
    getAll: () => ['pending', 'active', 'completed', 'cancelled', 'expired']
  },

  // Ambulance Statuses
  AMBULANCE_STATUS: {
    AVAILABLE: 'available',
    DISPATCHED: 'dispatched',
    ON_ROUTE: 'on-route',
    ARRIVED: 'arrived',
    COMPLETED: 'completed',
    MAINTENANCE: 'maintenance'
  },

  // Notification Types
  NOTIFICATION_TYPES: {
    BLOOD_REQUEST: 'blood_request',
    REQUEST_ACCEPTED: 'request_accepted',
    AMBULANCE_ASSIGNED: 'ambulance_assigned',
    DONATION_REMINDER: 'donation_reminder',
    URGENT_NEED: 'urgent_need',
    SYSTEM_ALERT: 'system_alert'
  },

  // Location Search Radius (in meters)
  SEARCH_RADIUS: {
    DEFAULT: 10000,    // 10km
    URGENT: 50000,     // 50km
    CITY_WIDE: 20000,  // 20km
    LOCAL: 5000        // 5km
  },

  // Donation Eligibility
  DONATION_RULES: {
    MIN_AGE: 18,
    MAX_AGE: 65,
    MIN_WEIGHT: 50, // kg
    FREQUENCY_DAYS: 56 // days between donations
  },

  // Time Constants (in milliseconds)
  TIME: {
    ONE_HOUR: 3600000,
    ONE_DAY: 86400000,
    ONE_WEEK: 604800000
  },

  // Priority Levels
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
  }
};