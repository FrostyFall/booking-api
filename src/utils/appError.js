function AppError(message, statusCode) {
  this.message = message;
  this.status = 'fail';
  this.statusCode = statusCode;
  this.isOperational = true;

  Error.stackTraceLimit = 8;
  Error.captureStackTrace(this);
}

module.exports = AppError;
