const { BLOOD_GROUPS, ROLES } = require('../config/constants');
const Joi = require('joi');

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const customMessages = {
  'string.empty': '{{#label}} is required',
  'any.required': '{{#label}} is required',
  'string.email': 'Please enter a valid email address',
  'string.pattern.base': '{{#label}} must be a valid 10-digit phone number',
  'any.only': '{{#label}} must be one of: {{#valids}}'
};

// GeoJSON location schema
const locationSchema = Joi.object({
  type: Joi.string().valid('Point').required(),
  coordinates: Joi.array()
    .items(Joi.number().min(-180).max(180), Joi.number().min(-90).max(90))
    .length(2)
    .required()
});

// ✅ Vehicle schema for drivers
const vehicleSchema = Joi.object({
  type: Joi.string()
    .valid('car', 'van', 'ambulance')
    .required()
    .messages({
      'any.only': 'Vehicle type must be one of: car, van, ambulance',
      'any.required': 'Vehicle type is required'
    }),
  registration: Joi.string().required().messages({
    'string.empty': 'Vehicle registration is required',
    'any.required': 'Vehicle registration is required'
  }),
  model: Joi.string().optional(),
  capacity: Joi.number().optional()
});

exports.registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    ...customMessages,
    'string.email': 'Please enter a valid email address'
  }),

  password: Joi.string().pattern(passwordRegex).required().messages({
    ...customMessages,
    'string.pattern.base':
      'Password must contain at least 8 characters with uppercase, lowercase, number and special character'
  }),

  phone: Joi.string().pattern(/^\d{10}$/).required().messages(customMessages),

  role: Joi.string()
    .valid(...Object.values(ROLES))
    .required()
    .messages({
      ...customMessages,
      'any.only': `Role must be one of: ${Object.values(ROLES).join(', ')}`
    }),

  name: Joi.string().min(2).required().messages(customMessages),

  // Donor and Patient specific
  bloodGroup: Joi.string()
    .valid(...BLOOD_GROUPS)
    .when('role', {
      is: Joi.valid(ROLES.DONOR, ROLES.PATIENT),
      then: Joi.required(),
      otherwise: Joi.forbidden()
    })
    .messages({
      ...customMessages,
      'any.only': `Blood group must be one of: ${BLOOD_GROUPS.join(', ')}`
    }),

  age: Joi.number()
    .integer()
    .min(18)
    .max(100)
    .when('role', {
      is: Joi.valid(ROLES.DONOR, ROLES.PATIENT),
      then: Joi.required(),
      otherwise: Joi.forbidden()
    })
    .messages(customMessages),

  location: locationSchema
    .when('role', { is: ROLES.DONOR, then: Joi.required(), otherwise: Joi.forbidden() })
    .messages(customMessages),

  // Driver specific fields
  licenseNumber: Joi.string()
    .when('role', { is: ROLES.DRIVER, then: Joi.required(), otherwise: Joi.forbidden() })
    .messages(customMessages),

  vehicle: vehicleSchema
    .when('role', { is: ROLES.DRIVER, then: Joi.required(), otherwise: Joi.forbidden() }),

  isAvailable: Joi.boolean()
    .when('role', { is: ROLES.DRIVER, then: Joi.optional(), otherwise: Joi.forbidden() }),

  currentLocation: locationSchema
    .when('role', { is: ROLES.DRIVER, then: Joi.optional(), otherwise: Joi.forbidden() })
}).options({ abortEarly: false });

exports.loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  }),
  role: Joi.string()
    .valid(...Object.values(ROLES))
    .required()
    .messages({
      'any.only': `Role must be one of: ${Object.values(ROLES).join(', ')}`
    })
}).options({ abortEarly: false });