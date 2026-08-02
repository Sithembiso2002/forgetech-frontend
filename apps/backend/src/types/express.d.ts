import { Multer } from 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
      files?: Multer.File[];
    }
    // This ensures Express.Multer is recognised
    namespace Multer {
      type File = Multer.File;
    }
  }
}