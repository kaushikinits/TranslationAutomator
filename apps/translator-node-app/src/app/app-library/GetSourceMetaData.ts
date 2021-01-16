import * as bodyParser from 'body-parser';
import { findFileNameInFolder } from './global-data';
import * as xlsx from 'xlsx';
import {
  IId,
  IFileStorage,
  ISourceMetaResponse,
} from './../../data-models/api-data-models';

export const endpoint = '/getMetaDataFromSource';
export const urlencodedParser = bodyParser.json();
export const processRequest = (request, response, next) => {
  const body: IId = request.body;
  const responseObject = scanForMetaData(body.key);
  response.status(200).send({ success: true, ...responseObject });
  response.end();
};

const scanForMetaData = (id: string) => {
  const data: IFileStorage = findFileNameInFolder(id);
  if (data) {
    const metaData: ISourceMetaResponse = readMetaData(id, data);
    return metaData;
  }
};

const readMetaData = (id: string, data: IFileStorage) => {
  const returnData: ISourceMetaResponse = {
    Id: null,
    sourceMeta: { MaxRows: 0, MaxCols: 0, SupportedLanguages: [] },
  };
  returnData.Id = id;

  const filePath = data.folderName + '/' + data.ExcelTemplate;
  const XlWorkBook = xlsx.readFile(filePath);
  if (XlWorkBook) {
    const allSheetNames = XlWorkBook.SheetNames;
    const templateSheet = XlWorkBook.Sheets[allSheetNames[0]];
    if (templateSheet) {
      // parse template
      const templateJson = xlsx.utils.sheet_to_json(templateSheet);
      let maxRows = 0;
      let maxCols = 0;
      const blockData: any = templateJson[0];

      for (const rows in templateJson) {
        ++maxRows;
      }

      for (const cols in blockData) {
        returnData.sourceMeta.SupportedLanguages.push(cols);
        ++maxCols;
      }
      returnData.sourceMeta.MaxRows = maxRows;
      returnData.sourceMeta.MaxCols = maxCols;
      return returnData;
    } else {
      returnData.sourceMeta = null;
    }
  } else {
    return null;
  }
};
