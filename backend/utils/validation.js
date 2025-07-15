const { BLOOD_GROUPS, ROLES } = require('../config/constants');
const Joi = require('joi');

exports.registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string().pattern(/^\d{10}$/).required(),
  role: Joi.string().valid(...Object.values(ROLES)).required(),
  name: Joi.string().when('role', {
    is: Joi.valid(ROLES.DONOR, ROLES.PATIENT, ROLES.DRIVER),
    then: Joi.required()
  }),
  bloodGroup: Joi.string().valid(...BLOOD_GROUPS).when('role', {
    is: Joi.valid(ROLES.DONOR, ROLES.PATIENT),
    then: Joi.required()
  }),
  age: Joi.number().when('role', {
    is: Joi.valid(ROLES.DONOR, ROLES.PATIENT),
    then: Joi.required()
  }),
  location: Joi.object().when('role', {
    is: ROLES.DONOR,
    then: Joi.object({
      type: Joi.string().valid('Point').required(),
      coordinates: Joi.array().items(Joi.number()).length(2).required()
    }).required()
  })
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.bloodRequestSchema = Joi.object({
  bloodGroup: Joi.string().valid(...BLOOD_GROUPS).required(),
  unitsRequired: Joi.number().integer().min(1).max(5).required(),
  urgency: Joi.string().valid('low', 'medium', 'high', 'critical').default('medium'),
  location: Joi.object({
    type: Joi.string().valid('Point').required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required()
  }).required(),
  hospital: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    contact: Joi.string().required()
  }).optional(),
  notes: Joi.string().optional()
});