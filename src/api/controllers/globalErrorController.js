const sendErrorDev = (err, res) => {
  res.status(err.statusCode ?? 500).json({
    status: err.status,
    name: err.name,
    message: err.message,
    err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Unknown Server Error occured',
    });
  }
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  } else {
    sendErrorDev(err, res);
  }
};
