export const useUtils = () => {
  const filesToDataURL = async (files : any[]) => {
    return new Promise((resolve) => {
      Promise.all(
        files.map((file: any) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve({ fileName: file.name, data: reader.result });
          reader.onerror = error => reject(error);
        }))
      ).then((values) => {
        resolve(values);
      });
    })
  }
  
  const dataURLToFile = async (files: any[]) => {
    return new Promise((resolve) => {
      Promise.all(
        files.map((file: any) => new Promise(async (resolve) => {
          const blob = await (await fetch(file.data)).blob();
          resolve(new File([blob], file.fileName, {type: blob.type}));
        }))
      ).then((values) => {
        resolve(values);
      });
    })
  }
  
  const encodeFileToText = async (file : any) => {
    return file.text().then((text: any) => {
      return text;
    });
  }
  
  const getUniqFiles = async (newFiles: any, files: any[]) => {
    return new Promise((resolve) => {
        Promise.all(newFiles.map((inputFile : any) => encodeFileToText(inputFile))).then(
            (inputFilesText) => {
                Promise.all(
                  files.map((savedFile : any) => encodeFileToText(savedFile))
                ).then((savedFilesText) => {
                    let newFileList = files;
                    inputFilesText.forEach((inputFileText, index) => {
                      if (!savedFilesText.includes(inputFileText)) {
                        newFileList = newFileList.concat(newFiles[index]);
                      }
                    });
                    resolve(newFileList);
                });
            }
        );
    });
  }
  
  const arrayFilesToFileList = (filesList : any) => {
    return filesList.reduce((dataTransfer: any, file: any) => {
        dataTransfer.items.add(file);
        return dataTransfer;
    }, new DataTransfer()).files;
  }

  return {
    filesToDataURL,
    dataURLToFile,
    encodeFileToText,
    getUniqFiles,
    arrayFilesToFileList
  }
}

