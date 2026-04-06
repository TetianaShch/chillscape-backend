import multer from 'multer';

const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
    return;
  }

  cb(new Error('Only image files are allowed'));
};

export const uploadLocationImage = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 4 * 1024 * 1024, // 4 MB
  },
}).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 1 },
]);
