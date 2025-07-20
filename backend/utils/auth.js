const jwt = require('jsonwebtoken');

exports.generateToken = ({ id, role, email }) => {
  if (!id || !role) {
    throw new Error('User ID and role are required');
  }
  return jwt.sign(
    { id, role, email, iss: 'bloodconnect-api', aud: 'bloodconnect-client' },
    process.env.JWT_SECRET,
    { expiresIn: '1d', algorithm: 'HS256' }
  );
};

exports.generateRefreshToken = ({ id, role, email }, rememberMe = false) => {
  if (!id || !role) {
    throw new Error('User ID and role are required');
  }
  return jwt.sign(
    { id, role, email, iss: 'bloodconnect-api', aud: 'bloodconnect-client' },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: rememberMe ? '30d' : '7d', algorithm: 'HS256' }
  );
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Auth header missing or invalid' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'bloodconnect-api',
      audience: 'bloodconnect-client'
    });
    if (!decoded.id || !decoded.role) throw new Error('Invalid token payload');
    req.user = { id: decoded.id, role: decoded.role, email: decoded.email };
    next();
  } catch (err) {
    const isExpired = err.name === 'TokenExpiredError';
    res
      .status(isExpired ? 403 : 401)
      .json({ error: isExpired ? 'Token expired' : 'Invalid token', details: err.message });
  }
};

exports.authorize = (...allowedRoles) => {
  if (!Array.isArray(allowedRoles)) {
    throw new Error('Roles must be an array');
  }
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
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