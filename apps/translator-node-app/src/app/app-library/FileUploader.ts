import * as multer from 'multer';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Sourcefile, IFileStorage } from './../../data-models/api-data-models';
import { storeFileUploadInfo, getWorkingFolder } from './global-data';
import * as path from 'path';

const fileUploadInfo: IFileStorage = {
  folderName: null,
  JsonTemplate: null,
  ExcelTemplate: null,
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = path.join(getWorkingFolder(), folderName);
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    fileUploadInfo.folderName = filePath;
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    if (file.originalname.indexOf('.xlsx') > -1) {
      fileUploadInfo.ExcelTemplate = file.originalname;
    } else {
      fileUploadInfo.JsonTemplate = file.originalname;
    }
    cb(null, file.originalname);
  },
});

export const endpoint = '/uploadfile';
export const urlencodedParser = bodyParser.urlencoded({ extended: false });
let folderName = null;
const upload = multer({ storage: storage });

export const preFileUpload = (request, response, next) => {
  folderName = uuidv4();
  next();
};
export const multerFileUploadKey = upload.fields([
  { name: 'sourceFile', maxCount: 1 },
  { name: 'templateFile', maxCount: 1 },
]);

export const processFileUpload = (request, response, next) => {
  //const body: Sourcefile = request.body;
  response.status(200).send({ success: true, key: folderName });
  next();
};
export const postFileUpload = (request, response, next) => {
  folderName = null;
  storeFileUploadInfo(fileUploadInfo);
  response.end();
};
