const multer = require('multer');
const path = require('path');
const { access, mkdir } = require('fs/promises');
const AppError = require('../utils/appError');

const createFolder = async (dirPath) => {
  try {
    await access(path.join(dirPath));
  } catch (err) {
    await mkdir(path.join(dirPath), { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    if (file.fieldname === 'hotel_img') {
      const dirPath = './public/uploads/hotels';

      await createFolder(dirPath);

      cb(null, dirPath);
    } else if (file.fieldname === 'room_img') {
      const dirPath = './public/uploads/rooms';

      await createFolder(dirPath);

      cb(null, dirPath);
    } else {
      cb(new AppError('Unknown field name', 400));
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'hotel_img') {
      cb(null, file.originalname);
    } else if (file.fieldname === 'room_img') {
      cb(null, file.originalname);
    }
  },
});

const fileFilter = (req, file, cb) => {
  const acceptableMimeTypes = ['image/png', 'image/jpeg'];
  console.log(file);

  if (!acceptableMimeTypes.includes(file.mimetype)) {
    cb(new AppError(`Not acceptable mime type for '${file.originalname}'`));
  }

  cb(null, true);
};

const limits = {
  files: 6,
  fileSize: 4 * 1024,
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
