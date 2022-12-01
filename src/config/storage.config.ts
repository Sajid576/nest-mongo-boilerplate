import { diskStorage } from 'multer';
import { extname, parse } from 'path';

export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file: Express.Multer.File) {
  return `${parse(file.originalname).name}_${Date.now()}${extname(
    file.originalname,
  )}`;
}
