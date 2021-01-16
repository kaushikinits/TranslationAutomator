import * as bodyParser from 'body-parser';
import { findFileNameInFolder, getDownloadsFolder } from './global-data';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import * as path from 'path';
import {
  ITranslationInit,
  IFileStorage,
} from './../../data-models/api-data-models';

export const endpoint = '/createTranslatedJson';
export const urlencodedParser = bodyParser.json();
export const processRequest = (request, response, next) => {
  const body: ITranslationInit = request.body;
  let translatedFilePath = scanForMetaData(
    body.id,
    body.FromLanguage,
    body.ToLanguage
  );
  const protocol: string = request.headers.referer.split(':')[0] + '://';
  translatedFilePath = protocol + request.get('host') + translatedFilePath;
  response.status(200).send({ success: true, filePath: translatedFilePath });
  response.end();
};

const scanForMetaData = (id: string, fromLang: string, toLang: string) => {
  const data: IFileStorage = findFileNameInFolder(id);
  if (data) {
    return initTranslationProcess(id, data, fromLang, toLang);
  }
  return null;
};

const initTranslationProcess = (
  id: string,
  data: IFileStorage,
  fromLang: string,
  toLang: string
) => {
  const XlWorkBook = openXlFile(data);
  const JsonObject = openJsonFile(data);
  if (XlWorkBook && JsonObject) {
    const returnJsonObject = readJsonContent(
      JsonObject,
      XlWorkBook,
      fromLang,
      toLang,
      {}
    ); // for every text in json this method will be called.
    const fileName = '/' + toLang + '.json';
    const filePath = path.join(getDownloadsFolder(), id);
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    fs.writeFileSync(
      filePath + fileName,
      JSON.stringify(returnJsonObject, null, 4)
    );
    return '/downloads/' + id + fileName;
  } else {
    return null;
  }
};
const openXlFile = (data: IFileStorage) => {
  const filePath = data.folderName + '/' + data.ExcelTemplate;
  const XlWorkBook = xlsx.readFile(filePath);
  return XlWorkBook;
};

const openJsonFile = (data: IFileStorage) => {
  const filePath = data.folderName + '/' + data.JsonTemplate;
  const JsonContent = fs.readFileSync(filePath);
  const JsonObj = JSON.parse(JsonContent.toString());
  return JsonObj;
};

const readJsonContent = (
  JsonContent: any,
  XlWorkBook: any,
  fromLang: string,
  toLang: string,
  JsonCopy: any
) => {
  for (const key in JsonContent) {
    const keyValue = JsonContent[key];
    if (typeof keyValue == 'string') {
      const translatedText = findTextInAllXlSheets(
        XlWorkBook,
        keyValue,
        fromLang,
        toLang
      );

      JsonCopy[key] = translatedText;
    } else if (typeof keyValue == 'object' && Array.isArray(keyValue)) {
      const translatedArray: Array<string> = [];
      for (const item of keyValue) {
        const response: string = findTextInAllXlSheets(
          XlWorkBook,
          item,
          fromLang,
          toLang
        );
        translatedArray.push(response);
      }
      JsonCopy[key] = translatedArray;
    } else if (typeof keyValue == 'object' && !Array.isArray(keyValue)) {
      const ret = readJsonContent(keyValue, XlWorkBook, fromLang, toLang, {});
      JsonCopy[key] = ret;
    }
  }
  return JsonCopy;
};

const findTextInAllXlSheets = (
  XlWorkBook: any,
  content: string,
  fromLang: string,
  toLang: string
) => {
  const allSheetNames = XlWorkBook.SheetNames;
  let translatedText = null;
  let match = false;
  for (const sheetName of allSheetNames) {
    const templateSheet = XlWorkBook.Sheets[sheetName];
    if (templateSheet) {
      const xlTemplateJson = xlsx.utils.sheet_to_json(templateSheet);
      for (const row in xlTemplateJson) {
        translatedText = content;
        if (
          xlTemplateJson[row][fromLang].trim().toLowerCase() ==
          content.trim().toLowerCase()
        ) {
          translatedText = xlTemplateJson[row][toLang];
          match = true;
          break;
        }
      }
      if (match) {
        break;
      }
    }
  }
  if (match) {
    return translatedText;
  } else {
    return translatedText + '__NO_MATCH_FOUND__';
  }
};
