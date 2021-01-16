/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';
import { routes } from './app/app-routes/routes';
import * as path from 'path';
import {
  setWorkingFolder,
  setDownloadsFolder,
} from './app/app-library/global-data';

const app = express();
app.use(cors());
app.use('/api', routes);
// to serve template files
//app.use(express.static(path.join(__dirname, 'public')));
const uploadPath = path.join(__dirname, '..', '..', '..', 'uploads');
const downloadPath = path.join(__dirname, '..', '..', '..', 'public');
const templatePath = path.join(__dirname, '..', '..', '..', 'Templates');
const staticOptions = {
  setHeaders: function (res, path, stat) {
    res.append('Content-Type', 'application/octet-stream');
  },
};
app.use('/downloads', express.static(downloadPath, staticOptions));
app.use('/templates', express.static(templatePath, staticOptions));

setWorkingFolder(uploadPath);
setDownloadsFolder(downloadPath);
/** Starting Server */
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
