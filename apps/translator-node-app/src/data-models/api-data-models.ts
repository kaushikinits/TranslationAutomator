export interface multerUploadObject {
  dest: string;
}

export interface Sourcefile {
  name: string;
  sourceFile: File;
  templateFile: File;
}

export interface IId {
  key: string;
}

export interface IFileStorage {
  folderName: string;
  JsonTemplate: string;
  ExcelTemplate: string;
}

export interface ISourceMeta {
  SupportedLanguages: Array<string>;
  MaxRows: number;
  MaxCols: number;
}

export interface ISourceMetaResponse {
  sourceMeta: ISourceMeta;
  Id: string;
}

export interface ITranslationInit {
  id: string;
  FromLanguage: string;
  ToLanguage: string;
}
