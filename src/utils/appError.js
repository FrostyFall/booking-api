function AppError(message, statusCode) {
  this.message = message;
  this.status = 'error';
  this.statusCode = statusCode;
  this.isOperational = true;

  Error.stackTraceLimit = 8;
  Error.captureStackTrace(this);
}

module.exports = AppError;
