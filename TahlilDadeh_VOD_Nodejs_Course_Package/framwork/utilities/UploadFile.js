import path from "path";
import multer from "multer";

class UploadFile {
  static uploadImage = (imagePath) => {
    return multer({
      storage: multer.diskStorage({
        destination: (req, file, callback) => {
          callback(null, imagePath);
        },
        filename: (req, file, callback) => {
          let filename = file.originalname;
          let type = path.extname(filename);
          filename = filename.replace(type, "");
          let uniqueFileName = Date.now() + "_" + filename + type;
          callback(null, uniqueFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png"
        ) {
          let filename = file.originalname;
          let type = path.extname(filename);
          filename = filename.replace(type, "");
          if(filename.includes('.')) {
            return cb(Error('file format is not correct'),false)
          }
          cb(null, true);
        } else {
          cb(Error('error for file'), false);
        }
      },
      limits: {
        files: 1,
        fileSize: 1024000 * 100,
      },
    });
  };
  static uploadVideo = (videoPath) => {
    return multer({
      storage: multer.diskStorage({
        destination: (req, file, callback) => {
          callback(null, videoPath);
        },
        filename: (req, file, callback) => {
          let filename = file.originalname;
          let type = path.extname(filename);
          filename = filename.replace(type, "");
          let uniqueFileName = Date.now() + "_" + filename + type;
          callback(null, uniqueFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === "video/mp4" ||
          file.mimetype === "video/avi" ||
          file.mimetype === "video/mov"
        ) {
          let filename = file.originalname;
          let type = path.extname(filename);
          filename = filename.replace(type, "");
          if(filename.includes('.')) {
            return cb(Error('file format is not correct'),false)
          }
          cb(null, true);
        } else {
          cb(Error('error for file'), false);
        }
      },
      limits: {
        files: 1,
        fileSize: 1024000 * 1000,
      },
    });
  };
  
}

export default UploadFile
