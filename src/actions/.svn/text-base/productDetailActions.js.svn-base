/**
 * Created by vuchien on 7/18/16.
 */
import * as types from '../constants/productDetailTypes';
import fetch from '../core/fetch';
import {productUrlModule, productIsNew} from '../config';
import {fetchGet, fetchPost, renderAPI, renderForm} from '../components/api';
const PATH_CONTROLLER = "products/";

function bindPostParamJson(form) {
  return {
    method: 'POST',
    body: JSON.stringify({form}),
    headers: {'Accept': 'application/json', "Content-Type": "application/json", credentials: 'include'}
  };
}

/**
 * **********************************************************************************************************************
 * Product detail & productInfo
 */
export function fetchDetailProduct(productId) {
  /* have an id product */
  if (productId != undefined && productId != productIsNew) {
    return (dispatch) => {
      dispatch(fetchingProductDetailStatus());
      var pathAPI = PATH_CONTROLLER + "detail?productId=" + productId;
      const url = renderAPI(pathAPI);
      return fetchGet(url, result => {
        dispatch({type: types.RECEIVE_PRODUCT_DETAIL, payload: {result: result}})
      })
    }
  }
  else {
    // reset detail object, after display list product, has an action reset form detail to do
    // this will direct to an error page
    return {
      type: ""
    }
  }
}
/**
 *
 * @param data is detailCopy object
 * @param isUsed_tempProductId
 * @param is_tempProductId
 * @returns {function(*)}
 */
export function saveProductInfo(data, isUsed_tempProductId, is_tempProductId) {
  const _productId = data.productId;
  const productId = checkingIsUsedTempProductEnable(_productId, isUsed_tempProductId, is_tempProductId);
  const dataListImages = data.listImages;
  const _listImages = JSON.stringify(dataListImages);
  const _url = '/product-copy';
  const _form = {
    listImages: _listImages
  };
  return (dispatch) => {
    /**
     * Copy all new image to main folder of product images
     */

    fetch(_url, bindPostParamJson(_form)).then(response => response.json()).then(function (response) {
      response.map((item)=> {
        // check with listImages of detailObject and update it if match with name result form copy
        dataListImages.map((item1)=> {
          if (item.name == item1.name) {
            item1.image_xsmall = item.image_xsmall;
            item1.image_small = item.image_small;
            item1.image_medium = item.image_medium;
            item1.image_large = item.image_large
          }
        })
      });
      const name = data.name;
      const price = data.price;
      const encodeName = encodeURIComponent(name);
      const encodePrice = encodeURIComponent(price);
      const listImages = JSON.stringify(data.listImages);
      const highLightInfo = encodeURIComponent(JSON.stringify(encodeHighLightInfo(data.highLightInfo)));
      const bodyParams = encodeURIComponent(
        "productId=" + productId +
        "&name=" + encodeName +
        "&price=" + encodePrice +
        "&listImages=" + listImages +
        "&highLightInfo=" + highLightInfo
      );
      const formParams = renderForm(PATH_CONTROLLER + "save-product-info", bodyParams);
      return fetchPost(formParams, result => {
        const productIdReturn = result.product._id;
        // check product is create or update
        var isNewProduct = checkingProductIsCreateOrUpdate(productId, productIdReturn);
        /*
         if new product insert, this action will enable temp product mode(isUsed_tempProductId)
         and get productId from is_tempProductId
         * */
        if (isNewProduct) { // just dispatch not return
          dispatch({
            type: types.IS_NEW_PRODUCT_INSERTED,
            payload: {
              productId: productIdReturn,
              data: result
            }
          });
        }
        return dispatch({ // main return here
          type: types.CREATE_OR_UPDATE_PRODUCT_INFO,
          payload: {
            result: result
          }
        })
      });
    });
  };
}

function fetchingProductDetailStatus() {
  return {
    type: types.IS_FETCHING_PRODUCT_DETAIL
  }
}

export function isUpdatingProductInfo() {
  return {
    type: types.IS_UPDATING_PRODUCT_INFO_TO_TRUE
  }
}

/**
 * This function will change url with last productId insert by addNew type
 */
function checkingProductIsCreateOrUpdate(productIdBefore, productIdAfter) {
  /* checking if new type */
  if (productIdBefore == productIsNew) {
    // let change url with last productId
    var pageUrl = productUrlModule + productIdAfter;
    window.history.pushState('', '', pageUrl);
    return true;
  }
  else {
    return false;
  }
}

function checkingIsUsedTempProductEnable(productId, isUsedTemProduct, is_tempProductId) {
  if (isUsedTemProduct) {
    return is_tempProductId;
  } else {
    return productId;
  }
}

export function updateIsUpdatedProductInfoToFalse() {
  return {
    type: types.IS_UPDATE_PRODUCT_INFO_TO_FALSE
  }
}

export function removeItemListImage(id) {
  return {
    type: types.REMOVE_ITEM_LIST_IMAGE,
    payload: {
      id: id
    }
  }
}

export function removeHighLightInfoItem(id) {
  return {
    type: types.REMOVE_HIGHLIGHT_INFO_ITEM,
    payload: {
      id: id
    }
  }
}

export function addItemInfoHighLight(value) {
  return {
    type: types.ADD_ITEM_INFO_HIGHLIGHT,
    payload: {
      value: value
    }
  }
}

export function resetFormEditInfoProduct() {
  return {
    type: types.RESET_EDIT_INFO_PRODUCT
  }
}

export function updateDetailCopy(data) {
  const dataJson = JSON.parse(data);
  return {
    type: types.UPDATE_DETAIL_UPLOAD_COPY,
    payload: {data: dataJson}
  }
}

export function updateLoadingUploadCopyTrue() {
  return {
    type: types.IS_LOADING_DETAIL_UPLOAD_TO_TRUE
  }
}

export function updateLoadingUploadCopyToFalse() {
  return {
    type: types.IS_LOADING_DETAIL_UPLOAD_TO_FALSE
  }
}

export function saveUploadProduct() {
  return {
    type: types.SAVE_UPLOAD_PRODUCT_IMAGE
  }
}

export function updateIsAppendNewItemToListImageDetailCopyToFalse_previewZone() {
  return {
    type: types.UPDATE_IS_APPEND_NEW_ITEM_TO_LIST_IMAGE_DETAIL_COPY_TO_FALSE_PREVIEW_ZONE
  }
}

export function updateAddedNewItemToListImageDetailCopyToFalse() {
  return {
    type: types.UPDATE_IS_ADDED_NEW_ITEM_TO_LIST_IMAGE_DETAIL_COPY_TO_FALSE
  }
}

export function changeProductSelectByIndexListImage_detail(index) {
  return {
    type: types.CHANGE_PRODUCT_SELECT_BY_INDEX_DETAIL,
    payload: {
      index: index
    }
  }
}

export function changeProductSelectByIndexListImage_detailCopy(index) {
  return {
    type: types.CHANGE_PRODUCT_SELECT_BY_INDEX_DETAIL_COPY,
    payload: {
      index: index
    }
  }
}

/**
 * **********************************************************************************************************************
 * Product detail attributes
 */

export function fetchDetailAttributeByProduct(productId) {
  return (dispatch) => {
    dispatch(fetchingProductDetailStatus());
    var pathAPI = PATH_CONTROLLER + "fetch-detail-attribute?productId=" + productId;
    const url = renderAPI(pathAPI);
    fetchGet(url, result => {
      dispatch({type: types.RECEIVE_DETAIL_PRODUCT_ATTRIBUTE, payload: {result: result}})
    })
  }
}

export function detailAttributesOnChangeCategory(cateId, productId, newCateName) {
  return (dispatch) => {
    dispatch(fetchingAttributesByCateId());
    var pathAPI = PATH_CONTROLLER + "fetch-attributes-by-cateId?productId=" + productId + "&categoryId=" + cateId;
    const url = renderAPI(pathAPI);
    fetchGet(url, result => {
      dispatch({
        type: types.RECEIVE_ATTRIBUTES_BY_CATE_ONCHANGE,
        payload: {
          result: result,
          cateId: cateId,
          cateName: newCateName
        }
      })
    })
  }
}
/**
 * Save form attribute handle
 * @returns {function(*)}
 */
export function saveAttributes(updateObj, param_productId, isUsed_tempProductId, is_tempProductId) {
  return (dispatch) => {
    // checking IsUsed temp product mode is enable
    const productId = checkingIsUsedTempProductEnable(param_productId, isUsed_tempProductId, is_tempProductId);
    const cateBelong = JSON.stringify(updateObj.categoryBelong);
    const listAttributesBundle = JSON.stringify(updateObj.listAttributeBundleOriginAndSelected);
    const bodyParams = encodeURIComponent(
      "productId=" + productId +
      "&cateBelong=" + cateBelong +
      "&listAttributeBundle=" + listAttributesBundle
    );
    const formParams = renderForm(PATH_CONTROLLER + "save-attributes", bodyParams);
    fetchPost(formParams, result => {
      if (result.status == "ok") {
        const productIdReturn = result.product._id;
        // check product is create or update
        var isNewProduct = checkingProductIsCreateOrUpdate(productId, productIdReturn);
        // set new productId to detail, detailCopy
        if (isNewProduct) {
          dispatch({
            type: types.IS_NEW_PRODUCT_INSERTED, payload: {
              data: result
            }
          });
        }
        return dispatch({
          type: types.UPDATE_ATTRIBUTE_FINISHED,
          payload: {
            data: result
          }
        })
      }
      else {
        return {
          type: ""
        }
      }
    });
  };
}

export function updateProductAttributeReceiveToFalse() {
  return {
    type: types.UPDATE_DETAIL_ATTRIBUTE_PRODUCT_TO_FALSE
  }
}

export function updateIsLoadingHandleSaveToTrue() {
  return {
    type: types.UPDATE_IS_LOADING_HANDLE_SAVE_TO_TRUE
  }
}

export function updateIsSavedAttributesToFalse() {
  return {
    type: types.UPDATE_IS_SAVED_ATTRIBUTES_TO_FALSE
  }
}
function fetchingAttributesByCateId() {
  return {
    type: types.UPDATE_IS_FETCHING_ATTRIBUTES_BY_CATE_ID_TO_TRUE
  }
}

export function updateAttributeOptionByAttributeId(attributeId, optionId, newOptionName) {
  return {
    type: types.UPDATE_ATTRIBUTE_OPTION_BY_ATTRIBUTE_ID,
    payload: {
      attributeId: attributeId,
      optionId: optionId,
      optionName: newOptionName
    }
  }
}
/*****************************************************************************************************************/
/**
 *
 * @param productId
 * @returns {function(*)}
 */
export function fetchDetailProductDesign(productId) {
  return (dispatch) => {
    const pathAPI = PATH_CONTROLLER + "fetch-detail-design?productId=" + productId;
    const url = renderAPI(pathAPI);
    return fetchGet(url, (result) => {
      dispatch({
        type: types.RECEIVE_PRODUCT_DETAIL_DESIGN,
        payload: {data: result}
      })
    })
  }
}

export function isReceivedDetailProductDesignToFalse() {
  return {
    type: types.IS_RECEIVED_DETAIL_DESIGN_DATA
  }
}

export function activeUsedTempProductMode(productId) {
  return {
    type: types.ACTIVE_USED_TEMP_PRODUCT_MODE,
    payload: {
      productId: productId
    }
  }
}
/*****************************************************************************************************************/

function encodeHighLightInfo(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].value = encodeURIComponent(arr[i].value);
  }
  return arr;
}
