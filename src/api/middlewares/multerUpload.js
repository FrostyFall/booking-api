const multer = require('multer');
const multerUpload = require('../../config/multer').any();
const AppError = require('../../utils/appError');

module.exports = (req, res, next) => {
  multerUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(new AppError(err.message, 400));
    } else if (err) {
      next(new AppError('Unknown file upload error occured', 400));
    }

    next();
  });
};
