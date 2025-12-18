const AppError = require('./appError');
const { StatusCodes } = require('http-status-codes');

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, StatusCodes.NOT_FOUND);
    this.code = 'NOT_FOUND';
  }
}

module.exports = NotFoundError;
