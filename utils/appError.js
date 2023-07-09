// We are using this in order to create new "Error" class that has new attributes.
class AppError extends Error {
  // To inherit from err..
  constructor(message, statusCode) {
    super(message); // We have set the 'message' properety using the parent constructor.

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
