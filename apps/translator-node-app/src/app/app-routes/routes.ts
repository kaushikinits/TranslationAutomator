import * as express from 'express';
import * as fileUploadControl from './../app-library/FileUploader';
import * as sourceMetaReader from './../app-library/GetSourceMetaData';
import * as createTranslatedJson from './../app-library/createTranslatedJson';

export const routes = express.Router();

/** api routes */
routes.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to Translator-Node-App!' });
});

routes.post(
  fileUploadControl.endpoint,
  fileUploadControl.urlencodedParser,
  fileUploadControl.preFileUpload,
  fileUploadControl.multerFileUploadKey,
  fileUploadControl.processFileUpload,
  fileUploadControl.postFileUpload
);

routes.post(
  sourceMetaReader.endpoint,
  sourceMetaReader.urlencodedParser,
  sourceMetaReader.processRequest
);

routes.post(
  createTranslatedJson.endpoint,
  createTranslatedJson.urlencodedParser,
  createTranslatedJson.processRequest
);
