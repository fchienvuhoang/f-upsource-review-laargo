/**
 * Created by vuchien on 8/20/16.
 */
import multer from 'multer';
import fs from 'fs-extra';
import gm from 'gm';
import {uploadProduct} from '../config';
import {fetchStoreLoggedServer} from '../components/logged';
import {guidShort, checkMineTypeImage, getDateTodayWithNoSpace} from '../components/commons';
import {divImages as keyImages} from '../config';
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';
import {PRODUCT_FOLDER} from './uploadConfig';

const ORIGIN_FOLDER_NAME = "/origin"; // to store origin image before resize
const TEMP_FOLDER_NAME = "/temp";
const MAX_WIDTH_ALLOW = 1024;
const _PREFIX = "IMG-EDT";

// path root for upload product
const pathUploadProductRoot_Temp = uploadProduct.pathRootTempUpload;
const fileHandling = {fileName: "", fileExtend: ""};

export default function imageEditorUpload(app) {
  /* Upload image handle */
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
  app.post('/image-editor-upload', uploadProductImage.any(), function (req, res) {
    resizeHandling(req.files, req, (result)=> {
      res.status(200).send(JSON.stringify(result));
      res.end(req.file);
    });
  });
  /* Upload image handle */
  /********************************************************************************************************************/
  /* Copy image handle */
  app.post('/apply-images-editor-handling', function (req, res) {
    try {
      const data = req.body.form.data;
      const jsonData = JSON.parse(data);
      jsonData.map(item=> {
        const imageTempAbsolutePathFrom = item.f; // imageTempAbsolutePathFrom
        const imageTempAbsolutePathTo = item.t; // imageTempAbsolutePathTo

        const tempImageTempAbsolutePathFrom = AES.decrypt(imageTempAbsolutePathFrom, keyImages);
        const desImageTempAbsolutePathFrom = tempImageTempAbsolutePathFrom.toString(enc);

        const tempImageTempAbsolutePathTo = AES.decrypt(imageTempAbsolutePathTo, keyImages);
        const desImageTempAbsolutePathTo = tempImageTempAbsolutePathTo.toString(enc);

        // copy handle
        fs.copySync(desImageTempAbsolutePathFrom, desImageTempAbsolutePathTo);
      });
      res.status(200).send({status: "ok"});
    }
    catch (err) {
      res.status(200).send({status: "failed"});
    }
  });
  /* Copy image handle */
}

function resizeHandling(files, req, callback) {
  const pathFile = files[0].path;
  const fileName = fileHandling.fileName;
  const fileExtend = fileHandling.fileExtend;

  // file name
  const fileUpload = _PREFIX + "-" + fileName + fileExtend;

  const _storeId = fetchStoreLoggedServer(req);
  const _folderByStore_Temp = pathUploadProductRoot_Temp + "/" + _storeId + TEMP_FOLDER_NAME;
  const _relativePathByStoreId = _storeId + TEMP_FOLDER_NAME;

  // render for temp path
  const imageTempAbsolutePathFrom = _folderByStore_Temp + "/" + fileUpload;
  const imageTempViewPath = _relativePathByStoreId + "/" + fileUpload; // temp relative path

  // render to main path
  const pathFromStore = _storeId + PRODUCT_FOLDER + getDateTodayWithNoSpace() + "/";
  const imageTempAbsolutePathTo = uploadProduct.pathRootMainUpload + "/" + pathFromStore + fileUpload;
  const imagePath = pathFromStore + fileUpload; // real relative path

  const objResult = {
    imageTempViewPath: imageTempViewPath,
    imageTempAbsolutePathFrom: imageTempAbsolutePathFrom,
    imagePath: imagePath,
    imageTempAbsolutePathTo: imageTempAbsolutePathTo
  };

  try {
    fs.ensureDirSync(_folderByStore_Temp);
    gm(pathFile).size(function (err, value) {
      if (!err) {
        const width = value.width;
        if (width > MAX_WIDTH_ALLOW) {
          // let resize it to in a range allow
          gm(pathFile).resizeExact(MAX_WIDTH_ALLOW, '!').write(imageTempAbsolutePathFrom, function (err) {
            if (!err) {
              callback(objResult);
            } else {
              console.log(err);
            }
          });
        } else {
          // copy to temp folder
          fs.copySync(pathFile, imageTempAbsolutePathFrom);
          callback(objResult);
        }
      }
    });
  }
  catch (err) {
    console.log(err);
    callback("");
  }
}
