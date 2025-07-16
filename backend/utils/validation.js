const { BLOOD_GROUPS, ROLES } = require('../config/constants');
const Joi = require('joi');

// Password requirements: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Enhanced validation messages
const customMessages = {
  'string.empty': '{{#label}} is required',
  'any.required': '{{#label}} is required',
  'string.email': 'Please enter a valid email address',
  'string.pattern.base': '{{#label}} must be a valid 10-digit phone number',
  'string.min': '{{#label}} must be at least {{#limit}} characters',
  'number.min': '{{#label}} must be at least {{#limit}}',
  'number.max': '{{#label}} must not exceed {{#limit}}',
  'any.only': '{{#label}} must be one of: {{#valids}}'
};

exports.registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      ...customMessages,
      'string.email': 'Please enter a valid email address'
    }),

  password: Joi.string()
    .pattern(passwordRegex)
    .required()
    .messages({
      ...customMessages,
      'string.pattern.base': 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character'
    }),

  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages(customMessages),

  role: Joi.string()
    .valid(...Object.values(ROLES))
    .required()
    .messages({
      ...customMessages,
      'any.only': `Role must be one of: ${Object.values(ROLES).join(', ')}`
    }),

  // Conditional fields based on role
  name: Joi.string()
    .min(2)
    .when('role', {
      is: Joi.valid(ROLES.DONOR, ROLES.PATIENT, ROLES.DRIVER),
      then: Joi.required()
    })
    .messages(customMessages),

  bloodGroup: Joi.string()
    .valid(...BLOOD_GROUPS)
    .when('role', {
      is: Joi.valid(ROLES.DONOR, ROLES.PATIENT),
      then: Joi.required()
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
      then: Joi.required()
    })
    .messages(customMessages),

  location: Joi.object({
    type: Joi.string()
      .valid('Point')
      .required()
      .messages(customMessages),
    coordinates: Joi.array()
      .items(Joi.number())
      .length(2)
      .required()
      .messages({
        ...customMessages,
        'array.length': 'Location must contain exactly 2 coordinates (longitude, latitude)'
      })
  })
  .when('role', {
    is: ROLES.DONOR,
    then: Joi.required()
  })
  .messages(customMessages)
})
.options({ abortEarly: false }); // Return all validation errors

exports.loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address'
    }),

  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required'
    })
})
.options({ abortEarly: false });

exports.bloodRequestSchema = Joi.object({
  bloodGroup: Joi.string()
    .valid(...BLOOD_GROUPS)
    .required()
    .messages({
      ...customMessages,
      'any.only': `Blood group must be one of: ${BLOOD_GROUPS.join(', ')}`
    }),

  unitsRequired: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages(customMessages),

  urgency: Joi.string()
    .valid('low', 'medium', 'high', 'critical')
    .default('medium')
    .messages({
      ...customMessages,
      'any.only': 'Urgency must be one of: low, medium, high, critical'
    }),

  location: Joi.object({
    type: Joi.string()
      .valid('Point')
      .required()
      .messages(customMessages),
    coordinates: Joi.array()
      .items(Joi.number())
      .length(2)
      .required()
      .messages({
        ...customMessages,
        'array.length': 'Location must contain exactly 2 coordinates'
      })
  })
  .required()
  .messages(customMessages),

  hospital: Joi.object({
    name: Joi.string()
      .required()
      .messages(customMessages),
    address: Joi.string()
      .required()
      .messages(customMessages),
    contact: Joi.string()
      .required()
      .messages(customMessages)
  })
  .optional(),

  notes: Joi.string()
    .optional()
    .max(500)
    .messages({
      'string.max': 'Notes cannot exceed 500 characters'
    })
})
.options({ abortEarly: false });