/**
 * Created by vuchien on 8/6/16.
 */

import {uploadProduct, prefixImage, divCommon} from '../config';
import {getDateTodayWithNoSpace} from '../components/commons';
import fs from 'fs-extra';
import {fetchStoreLoggedServer} from '../components/logged';
import {PRODUCT_FOLDER} from './uploadConfig';
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

export default function productCopy(app) {
  app.post('/product-copy', function (req, res) {
    // parse to json object
    const listImages = JSON.parse(req.body.form.listImages);
    const storeId = fetchStoreLoggedServer(req);
    console.log('product copy storeId:', storeId);
    handleCopy(storeId, listImages, req, response => {
      res.status(200).send(JSON.stringify(response));
    });
  });
}

const handleCopy = (storeId, listImages, req, callback) => {
  let response = [];
  if (listImages != undefined) {
    // just handle if had data
    if (listImages.length > 0) {
      const pathFromStore = storeId + PRODUCT_FOLDER + getDateTodayWithNoSpace() + '/';
      // main path upload
      const rootFolderMainUpload = uploadProduct.pathRootMainUpload + '/' + pathFromStore;
      // make sure dir exists
      fs.ensureDirSync(rootFolderMainUpload);
      // loop for get all list images item
      listImages.map((item) => {
        // variable get info
        const fileName = item.name;
        const fileExtend = item.fileExtend;
        const _fileXsmall = fileName + prefixImage.xsmall + fileExtend;
        const _fileSmall = fileName + prefixImage.small + fileExtend;
        const _fileMedium = fileName + prefixImage.medium + fileExtend;
        const _fileLarge = fileName + prefixImage.large + fileExtend;

        // handling copy images from temp to main folder
        fsCopy(item, rootFolderMainUpload, _fileXsmall, _fileSmall, _fileMedium, _fileLarge);

        /**
         * Just push new item by fileXSmall_absolutePath is not empty
         * @type {Array}
         */
        if (item.fileXSmall_absolutePath != '') {
          const obj = {
            name: fileName,
            image_xsmall: pathFromStore + _fileXsmall,
            image_small: pathFromStore + _fileSmall,
            image_medium: pathFromStore + _fileMedium,
            image_large: pathFromStore + _fileLarge,
          };
          // main response push
          response.push(obj);
        }
      });
      // end of loop
      callback(response);
    } else {
      callback([]);
    }
  } else {
    callback([]);
  }
};

function decryptionAblPath(value) {
  try {
    const bytes = AES.decrypt(value, divCommon);
    const stateDescryption = bytes.toString(enc);
    return stateDescryption;
  }
  catch (err) {
    if (__DEV__) {
      console.log(err);
    }
  }
}

/**
 *
 * @param item
 * @param rootFolderMainUpload
 * @param _fileXsmall
 * @param _fileSmall
 * @param _fileMedium
 * @param _fileLarge
 */
function fsCopy(item, rootFolderMainUpload, _fileXsmall, _fileSmall, _fileMedium, _fileLarge) {
  const fileXSmall_absolutePath = decryptionAblPath(item.fileXSmall_absolutePath);
  const fileSmall_absolutePath = decryptionAblPath(item.fileSmall_absolutePath);
  const fileMedium_absolutePath = decryptionAblPath(item.fileMedium_absolutePath);
  const fileLarge_absolutePath = decryptionAblPath(item.fileLarge_absolutePath);

  // variable point file
  const pointPathXsmall = rootFolderMainUpload + _fileXsmall;
  const pointPathSmall = rootFolderMainUpload + _fileSmall;
  const pointPathMedium = rootFolderMainUpload + _fileMedium;
  const pointPathLarge = rootFolderMainUpload + _fileLarge;

  // copy x-small image
  if (fileXSmall_absolutePath != undefined && fileXSmall_absolutePath != '') {
    try {
      fs.copySync(fileXSmall_absolutePath, pointPathXsmall);
      fs.copySync(fileSmall_absolutePath, pointPathSmall);
      fs.copySync(fileMedium_absolutePath, pointPathMedium);
      fs.copySync(fileLarge_absolutePath, pointPathLarge);
    }
    catch (err) {
      console.log(err);
    }
  }
  else {
    // not temp image
  }
}
