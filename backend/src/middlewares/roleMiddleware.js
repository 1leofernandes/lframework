const { AuthError } = require('../errors/authError');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return next(new AuthError('Authentication required'));

    // For now, assume user has roles via req.user.roles
    // In a real implementation, you'd fetch user roles from DB
    const userRoles = req.user.roles || [];
    const hasRole = roles.some(role => userRoles.includes(role));

    if (!hasRole) {
      return next(new AuthError('Insufficient permissions'));
    }

    next();
  };
};

module.exports = { authorize };
