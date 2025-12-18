const AppError = require('./appError');
const { StatusCodes } = require('http-status-codes');

class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, StatusCodes.BAD_REQUEST);
    this.code = 'VALIDATION_ERROR';
  }
}

module.exports = ValidationError;
