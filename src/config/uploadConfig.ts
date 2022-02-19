import multer from 'multer';
import path from 'path';

const directory = path.resolve(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: directory,
  filename: (req, file, callback) => {
    const { name } = req.query
    return callback(null, `${name}`)
  }
})

// referencia: https://stackoverflow.com/questions/38652848/filter-files-on-the-basis-of-extension-using-multer-in-express-js
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg') {
      return callback(new Error('Only jpg and png allowed'));
    }
    callback(null, true);
  }
});

export {
  upload,
}
