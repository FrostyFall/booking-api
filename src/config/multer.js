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
    let filename = file.originalname;
    const { id: objId } = req.params;
    const fileMimeData = file.mimetype.split('/');
    const fileExtension = fileMimeData[fileMimeData.length - 1];

    if (file.fieldname === 'hotel_img') {
      filename = 'hotel_id_' + objId + '.' + fileExtension;
    } else if (file.fieldname === 'room_img') {
      filename = 'room_id_' + objId + '.' + fileExtension;
    }

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const acceptableMimeTypes = ['image/png', 'image/jpeg'];
  const { baseUrl } = req;
  const { fieldname } = file;

  if (!acceptableMimeTypes.includes(file.mimetype)) {
    return cb(
      new AppError(`Not acceptable mime type for '${file.originalname}'`, 400),
      false
    );
  }

  if (baseUrl === '/hotels' && fieldname !== 'hotel_img') {
    return cb(new AppError('File is not related to hotels', 400), false);
  }

  if (baseUrl === '/rooms' && fieldname !== 'room_img') {
    return cb(new AppError('File is not related to rooms', 400), false);
  }

  cb(null, true);
};

const maxImageSizeMb = process.env.MAX_IMAGE_SIZE_MB ?? 2;
const limits = {
  files: 1,
  fileSize: 1024 * 1024 * parseInt(maxImageSizeMb, 10),
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
