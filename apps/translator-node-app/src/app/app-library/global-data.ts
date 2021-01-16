const storeFileUploadInfoArray = [];
let workingFolder;
let downloadFolder;

export const storeFileUploadInfo = (record) => {
  storeFileUploadInfoArray.push(record);
};

export const findFileNameInFolder = (uuid) => {
  const result = storeFileUploadInfoArray.find((item) => {
    const match = item.folderName.indexOf('/' + uuid.trim()) > -1;
    if (match) {
      return item;
    } else {
      return null;
    }
  });
  if (result) {
    return result;
  } else {
    null;
  }
};

export const setWorkingFolder = (folderPath: string) => {
  workingFolder = folderPath;
};

export const getWorkingFolder = () => {
  return workingFolder;
};

export const setDownloadsFolder = (folderPath: string) => {
  downloadFolder = folderPath;
};

export const getDownloadsFolder = () => {
  return downloadFolder;
};
