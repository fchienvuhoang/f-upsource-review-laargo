/**
 * Created by vuchien on 8/24/16.
 */

import multer from 'multer';
import fs from 'fs-extra';
import gm from 'gm';
import {fetchStoreLoggedServer} from '../components/logged';
import {uploadProduct} from '../config';
import {guidShort, checkMineTypeImage} from '../components/commons';
import {STORE_THUMB_FOLDER} from './uploadConfig';

const ORIGIN_FOLDER_NAME = "/origin"; // to store origin image before resize
// path root for upload product
const pathUploadProductRoot_Temp = uploadProduct.pathRootTempUpload;
const fileHandling = {fileName: "", fileExtend: ""};

const STANDARD_WITH = 320;
const STANDARD_HEIGHT = 320;
const _PREFIX = "STORE-THUMB-";

export default function storeSettingUpload(app) {
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
        })
      }
    },
    filename: function (req, file, cb) {
      fileHandling.fileName = guidShort();
      fileHandling.fileExtend = checkMineTypeImage(file.mimetype);
      cb(null, (fileHandling.fileName + fileHandling.fileExtend));
    }
  });
  var upload = multer({storage: storage});
  app.post('/store-setting-upload', upload.any(), function (req, res) {
    resizeHandling(req.files, req, (result) => {
      res.send(JSON.stringify(result));
    });
  });
}

function resizeHandling(files, req, callback) {

  const pathFile = files[0].path;
  const fileName = fileHandling.fileName;
  const fileExtend = fileHandling.fileExtend;

  // file name
  const fileUpload = _PREFIX + fileName + fileExtend;
  const _storeId = fetchStoreLoggedServer(req);
  const pathFromStore = _storeId + STORE_THUMB_FOLDER;

  const absoluteMainUpload = uploadProduct.pathRootMainUpload;

  // make sure thumb folder is exists
  fs.ensureDirSync(absoluteMainUpload + "/" + pathFromStore);

  const imagePath = pathFromStore + fileUpload; // real relative path
  const imageMainAbsolutePath = absoluteMainUpload + "/" + imagePath;

  const objResult = {
    imagePath: imagePath
  };
  try {
    gm(pathFile).size(function (err, value) {
      const width = value.width;
      if (width > STANDARD_WITH) {
        gm(pathFile).resizeExact(STANDARD_WITH, STANDARD_HEIGHT).write(imageMainAbsolutePath, function (err) {
          if (!err) {
            callback(objResult);
          } else {
            console.log(err);
          }
        })
      } else {
        // copy to main --> thumb folder
        fs.copySync(pathFile, imageMainAbsolutePath);
        callback(objResult);
      }
    })
  }
  catch (err) {
    console.log(err);
  }
}
