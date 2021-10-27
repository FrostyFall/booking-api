function AppError(message, statusCode) {
  this.message = message;
  this.status = 'fail';
  this.statusCode = statusCode;
  this.isOperational = true;

  Error.captureStackTrace(this, this.constructor);
}

AppError.prototype = Object.create(Error.prototype);

module.exports = AppError;
