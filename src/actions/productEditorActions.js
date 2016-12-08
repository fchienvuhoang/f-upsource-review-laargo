/**
 * Created by vuchien on 8/13/16.
 */

import * as types from '../constants/productEditorTypes';
import {fetchGet, fetchPost, renderAPI, renderForm} from '../components/api';
import {divImages as kImageEditor, productUrlModule} from '../config';
const PATH_CONTROLLER = "products/";
import AES from 'crypto-js/aes';
import fetch from '../core/fetch';

function bindPostParamJson(form) {
  return {
    method: 'POST',
    body: JSON.stringify({form}),
    headers: {'Accept': 'application/json', "Content-Type": "application/json", credentials: 'include'}
  };
}
/**
 *
 * @param data
 * @param productId
 * @param detailReducers
 */
export function saveProductDesign(data, productId, detailReducers) {

  const isUsed_tempProductId = detailReducers.isUsed_tempProductId;
  const is_tempProductId = detailReducers.is_tempProductId;

  let _productId;
  let isNewProduct = false;
  if (isUsed_tempProductId) { // if tempProduct is enable
    _productId = is_tempProductId;
  } else {
    isNewProduct = true;
    _productId = productId;
  }

  return (dispatch) => {
    const storeTempImages = getStoreTempImages();
    if (storeTempImages.length > 0) {
      const encodeStoreTempImages = JSON.stringify(storeTempImages);
      const url = "/apply-images-editor-handling";
      const form = {
        data: encodeStoreTempImages
      };
      return fetch(url, bindPostParamJson(form)).then(response => response.json()).then(function (dataResult) {
        if (dataResult.status == "ok") {
          // reset store template images
          resetStoreTemplates();
          dispatch(handlingSaveDesignProduct(data, _productId, isNewProduct));
        } else {
          if (__DEV__) {
            console.log("apply image error");
          }
        }
      });
    } else {
      dispatch(handlingSaveDesignProduct(data, _productId, isNewProduct));
    }
  };
}

/**
 *
 * @param data
 * @param productId
 * @param isNewProduct
 * @returns {function(*)}
 */
function handlingSaveDesignProduct(data, productId, isNewProduct) {
  return (dispatch) => {
    const dataWithRawEncodeText = encodeDataInside(data);
    const rows = dataWithRawEncodeText.rows; // fetch rows only to update design data
    const stringify = JSON.stringify(rows);
    const dataEncode = encodeURIComponent(stringify);
    const bodyParams = encodeURIComponent("productId=" + productId + "&productDesignData=" + dataEncode);
    const formParams = renderForm(PATH_CONTROLLER + "save-product-design", bodyParams);
    dispatch({type: types.IS_SAVE_HANDLING_TO_TRUE});
    fetchPost(formParams, result => {
      if (result.status == "ok") {
        const idRecentlyInserted = result.p;
        // change url
        if (isNewProduct) {
          var pageUrl = productUrlModule + idRecentlyInserted;
          window.history.pushState('', '', pageUrl);
        }
        dispatch({
          type: types.SAVE_PRODUCT_DESIGN_SUCCESS,
          payload: {
            p: idRecentlyInserted // pass productId
          }
        });
      }
    });
  }
}

export function fetchDetailProductDesign(productId) {
  return (dispatch) => {
    dispatch({type: types.IS_FETCHING_DATA_FOR_EDIT});
    const pathAPI = PATH_CONTROLLER + "fetch-detail-design?productId=" + productId;
    const url = renderAPI(pathAPI);
    return fetchGet(url, (result) => {
      dispatch({
        type: types.RECEIVED_PRODUCT_DETAIL_DESIGN_FOR_EDIT,
        payload: {data: result}
      })
    })
  }
}

export function addRow(columnName) {
  return {
    type: types.ADD_ROW,
    payload: {
      columnName: columnName
    }
  }
}

export function insertComponent(component, rowIndex, columnIndex, columnId) {
  return {
    type: types.INSERT_COMPONENT,
    payload: {
      component: component,
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      columnId: columnId
    }
  }
}

export function upDownIndex(indexItem, newIndex, rowIndex, columnIndex, itemId) {
  return {
    type: types.UP_DOWN_INDEX,
    payload: {
      itemIndex: indexItem,
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      newIndex: newIndex,
      lastItemId: itemId
    }
  }
}

export function removeItem(indexItem, rowIndex, columnIndex, columnId) {
  return {
    type: types.REMOVE_ITEM,
    payload: {
      itemIndex: indexItem,
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      columnId: columnId
    }
  }
}

export function updateRawItem(raw, params) {
  return {
    type: types.UPDATE_RAW_ITEM,
    payload: {
      raw: raw,
      params: params
    }
  }
}
export function isUpDownSuccess() {
  return {
    type: types.IS_UP_DOWN_SUCCESS
  }
}

export function updateStatusProductSuccessToFalse() {
  return {
    type: types.UPDATE_PRODUCT_SUCCESS_TO_FALSE
  }
}

export function updateFetchingAndFetchedStatusToFalse() {
  return {
    type: types.UPDATE_FETCHING_AND_FETCHED_STATUS_TO_FALSE
  }
}

export function isShowImageUploadForImageComponent(params) {
  return {
    type: types.SHOW_UPLOAD_IMAGE_FOR_IMAGE_COMPONENT,
    payload: {
      params: params
    }
  }
}

export function isShowImageUploadForImageComponentToFalse() {
  return {
    type: types.SHOW_UPLOAD_IMAGE_FOR_IMAGE_COMPONENT_TO_FALSE
  }
}

export function rowMoveUpDown(rowIndex, toIndex) {
  return {
    type: types.ROW_MOVE_UP_DOWN,
    payload: {
      rowIndex: rowIndex,
      toIndex: toIndex
    }
  }
}

export function removeRow(rowIndex) {
  return {
    type: types.REMOVE_ROW,
    payload: {
      rowIndex: rowIndex
    }
  }
}

export function removeColumn(rowIndex, columnIndex) {
  return {
    type: types.REMOVE_COLUMN,
    payload: {
      rowIndex: rowIndex,
      columnIndex: columnIndex
    }
  }
}

export function saveImageTemPathComponent(imageObj) {
  storeTempImagesEditor(imageObj);
  return {
    type: types.SAVE_IMAGE_PATH_UPLOAD_COMPONENT,
    payload: {
      imageObj: imageObj
    }
  }
}

export function updateIsHiddenUploadForImageComponentToFalse() {
  return {
    type: types.IS_UPDATE_HIDDEN_IMAGE_UPLOAD_FOR_IMAGE_COMPONENT_TO_FALSE
  }
}

export function isUpdateCallingUsedTempProductIdToFalse() {
  return {
    type: types.IS_UPDATE_CALLING_USED_TEMP_PRODUCT_ID_TO_FALSE
  }
}


/**
 * Handling encodeURIComponent for text of Draft-js
 * @param data
 * @returns {*}
 */
function encodeDataInside(data) {
  return Object.assign({}, data, {
    rows: data.rows.map(rows => {
      return Object.assign({}, rows, {
        row: rows.row.map(rowItem => {
          return Object.assign({}, rowItem, {
            items: rowItem.items.map(item => {
              if (item.raw != undefined && item.raw != "" && item.raw != null) {
                const raw = JSON.parse(item.raw);
                const blocks = raw.blocks;
                for (var i = 0; i < blocks.length; i++) {
                  blocks[i].text = encodeURIComponent(blocks[i].text);
                }
                return Object.assign({}, item, {
                  raw: JSON.stringify(raw)
                });
              } else {
                return item;
              }
            })
          });
        })
      })
    })
  });
}

let arrObjTempImages = [];

function storeTempImagesEditor(imageObj) {
  const imageTempAbsolutePathFrom = AES.encrypt(imageObj.imageTempAbsolutePathFrom, kImageEditor).toString();
  const imageTempAbsolutePathTo = AES.encrypt(imageObj.imageTempAbsolutePathTo, kImageEditor).toString();
  // push to array
  arrObjTempImages.push({
    f: imageTempAbsolutePathFrom, // from file
    t: imageTempAbsolutePathTo // to file
  });
}

function getStoreTempImages() {
  return arrObjTempImages;
}

function resetStoreTemplates() {
  arrObjTempImages = [];
}
