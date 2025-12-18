// Resposta padrão da API:

// {
//   "success": false,
//   "code": "AUTH_ERROR",
//   "message": "Token inválido"
// }


// Frontend agradece.

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;