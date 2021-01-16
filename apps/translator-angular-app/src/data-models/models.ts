export interface ISourceMeta {
  SupportedLanguages: Array<string>;
  MaxRows: number;
  MaxCols: number;
}

export interface ISourceMetaResponse {
  sourceMeta: ISourceMeta;
  Id: string;
  success: boolean;
}

export interface ITranslatedContent {
  filePath: string;
  success: boolean;
}
