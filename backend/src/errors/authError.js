const AppError = require('./appError');
const { StatusCodes } = require('http-status-codes');

class AuthError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, StatusCodes.UNAUTHORIZED);
    this.code = 'AUTH_ERROR';
  }
}

module.exports = AuthError;
