/**
 * Created by vuchien on 7/19/16.
 */

import multer from 'multer';
import {guidShort, checkMineTypeImage} from '../components/commons';
import {uploadProduct, prefixImage, divCommon} from '../config';
import fs from 'fs-extra';
import gm from 'gm';
import {fetchStoreLoggedServer} from '../components/logged';
import AES from 'crypto-js/aes';

const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
const TEMP_FOLDER_NAME = "/temp"; // to store temp image for preview, there file inside will be remove in future
const ORIGIN_FOLDER_NAME = "/origin"; // to store origin image before resize
const DIMENSION_XSMALL_WIDTH = 70;
const DIMENSION_SMALL_WIDTH = 150;
const DIMENSION_MEDIUM_WIDTH = 500;
const DIMENSION_LARGE_WIDTH = 900;

// path root for upload product
const pathUploadProductRoot_Temp = uploadProduct.pathRootTempUpload;
const fileHandling = {fileName: "", fileExtend: ""};

export default function productUpload(app) {
  // path and filename config
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const _storeId = fetchStoreLoggedServer(req);
      if (_storeId != "") {
        // check exists dir
        const dirToday = pathUploadProductRoot_Temp + "/" + _storeId + ORIGIN_FOLDER_NAME;
        fs.ensureDir(dirToday, function (err) {
          if (!err) {
            cb(null, dirToday); // copy image to this folder.
          } else {
            console.log("error ensureDir: dirByStoreId");
          }
        });
      }
      else {
        console.log("upload product is empty result");
      }
    },
    filename: function (req, file, cb) {
      fileHandling.fileName = guidShort();
      fileHandling.fileExtend = checkMineTypeImage(file.mimetype);
      cb(null, (fileHandling.fileName + fileHandling.fileExtend));
    }
  });

  var uploadProductImage = multer({storage: storage});
  app.post('/upload', uploadProductImage.any(), function (req, res) {
    /**
     * Call resize handling
     */
    resizeHandling(req.files, req, function (status, result) {
      if (status == SUCCESS) {
        res.status(200).send(JSON.stringify(result));
        res.end(req.file);
      }
      else {
        res.status(200).send(ERROR);
        res.end(req.file);
      }
    });
  });
}

function resizeHandling(files, req, callback) {
  /**
   * get first element when single upload type
   * this below file is origin file uploaded by multer
   * Check this project on npm: todo https://www.npmjs.com/package/multer
   */
  const pathFile = files[0].path;
  const fileName = fileHandling.fileName;
  const fileExtend = fileHandling.fileExtend;

  const fileNameXsmall = "/" + fileName + prefixImage.xsmall + fileExtend;
  const fileNameSmall = "/" + fileName + prefixImage.small + fileExtend;
  const fileNameMedium = "/" + fileName + prefixImage.medium + fileExtend;
  const fileNameLarge = "/" + fileName + prefixImage.large + fileExtend;

  const _storeId = fetchStoreLoggedServer(req);
  const _folderByStore_Temp = pathUploadProductRoot_Temp + "/" + _storeId + TEMP_FOLDER_NAME;

  // absolute path to write to temp folder
  const pathFileXSmall = _folderByStore_Temp + fileNameXsmall;
  const pathFileSmall = _folderByStore_Temp + fileNameSmall;
  const pathFileMedium = _folderByStore_Temp + fileNameMedium;
  const pathFileLarge = _folderByStore_Temp + fileNameLarge;

  const _relativePathByStoreId = _storeId + TEMP_FOLDER_NAME;

  // relative path to display previews
  const relativePath_xsmall = _relativePathByStoreId + fileNameXsmall;
  const relativePath_small = _relativePathByStoreId + fileNameSmall;
  const relativePath_medium = _relativePathByStoreId + fileNameMedium;
  const relativePath_large = _relativePathByStoreId + fileNameLarge;

  const fileResults = {
    "name": fileName,
    // relative path to display previews
    "fileXSmall": relativePath_xsmall,
    "fileSmall": relativePath_small,
    "fileMedium": relativePath_medium,
    "fileLarge": relativePath_large,
    // absolute path to copy to main folder products upload
    "fileXSmall_absolutePath": AES.encrypt(pathFileXSmall, divCommon).toString(),
    "fileSmall_absolutePath": AES.encrypt(pathFileSmall, divCommon).toString(),
    "fileMedium_absolutePath": AES.encrypt(pathFileMedium, divCommon).toString(),
    "fileLarge_absolutePath": AES.encrypt(pathFileLarge, divCommon).toString(),
    "fileExtend": fileExtend
  };

  try {
    fs.ensureDir(_folderByStore_Temp, function (err) {
      if (!err) {
        // resize to xsmall
        gm(pathFile)
          .resizeExact(DIMENSION_XSMALL_WIDTH, '!')
          .write(pathFileXSmall, function (err) {
            if (!err) {
              gm(pathFile).resizeExact(DIMENSION_SMALL_WIDTH, '!').write(pathFileSmall, function (err) {
                if (!err) {
                  gm(pathFile).resizeExact(DIMENSION_MEDIUM_WIDTH, '!').write(pathFileMedium, function (err) {
                    if (!err) {
                      gm(pathFile).resizeExact(DIMENSION_LARGE_WIDTH, '!').write(pathFileLarge, function (err) {
                        if (!err) {
                          callback(SUCCESS, fileResults);
                        } else {
                          callback(ERROR);
                        }
                      });
                    } else {
                      callback(ERROR);
                    }
                  });
                } else {
                  callback(ERROR);
                }
              });
            } else {
              callback(ERROR);
            }
          });
      }
    });
  }
  catch (err) {
    console.log(err);
  }
}
