const jwt = require('jsonwebtoken');
const { ROLES } = require('../config/constants');

// Token generation with enhanced security
exports.generateToken = (userId, role) => {
  if (!userId || !role) {
    throw new Error('User ID and role are required for token generation');
  }

  return jwt.sign(
    {
      id: userId,
      role,
      iss: 'bloodconnect-api', // Issuer
      aud: 'bloodconnect-client' // Audience
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '1d',
      algorithm: 'HS256' // Explicitly specify algorithm
    }
  );
};

// Token verification with detailed error handling
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Check if Authorization header exists and is formatted correctly
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: 'Authentication failed',
      details: 'Authorization header missing or invalid' 
    });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'bloodconnect-api',
      audience: 'bloodconnect-client'
    });
    
    // Validate token structure
    if (!decoded.id || !decoded.role) {
      throw new Error('Invalid token payload');
    }
    
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    
    next();
  } catch (err) {
    let errorMessage = 'Invalid token';
    let statusCode = 401;

    if (err.name === 'TokenExpiredError') {
      errorMessage = 'Token expired';
      statusCode = 403;
    } else if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Token verification failed';
    }

    res.status(statusCode).json({ 
      error: errorMessage,
      details: err.message 
    });
  }
};

// Role authorization with improved validation
exports.authorize = (...allowedRoles) => {
  // Validate allowedRoles parameter
  if (!allowedRoles || !Array.isArray(allowedRoles)) {
    throw new Error('Invalid roles configuration');
  }

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'User not authenticated' 
      });
    }

    // Check if user role is included in allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Access denied',
        requiredRoles: allowedRoles,
        currentRole: req.user.role
      });
    }

    next();
  };
};

// Additional security utility
exports.sanitizeAuthHeader = (header) => {
  if (!header) return null;
  return header.replace(/[^a-zA-Z0-9\-._~+/=]/g, '');
};