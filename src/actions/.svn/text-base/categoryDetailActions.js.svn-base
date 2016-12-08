/**
 * Created by vuchien on 6/21/16.
 */
import * as types from '../constants/CategoryDetailTypes';
import { fetchGet, fetchPost, renderAPI, renderForm } from '../components/api';

const PATH_CONTROLLER = 'categories/';

export function changeCategoryName(data) {
  return (dispatch) => {
    const newCategoryName = data.name;
    const cateId = data.cateId;
    const categoryNameEncode = encodeURIComponent(newCategoryName);
    // client only
    const pathAPI = PATH_CONTROLLER + 'change-category-name?cateId=' + cateId + '&newValue=' + categoryNameEncode;
    const url = renderAPI(pathAPI);
    return fetchGet(url, () => {
      dispatch({ type: types.ONCHANGE_CATEGORY_NAME, cateName: newCategoryName });
    });
  };
}

export function fetchDetailCategoryById(cateId) {
  return (dispatch) => {
    dispatch(fetchingStatus());
    const pathAPI = PATH_CONTROLLER + 'detail?cateId=' + cateId;
    const url = renderAPI(pathAPI);
    return fetchGet(url, (result) => {
      dispatch(receiveDetailData(result));
    });
  };
}

export function createOrUpdateFormAttributeAction(data, formAttribute) {
  return (dispatch) => {
    let jsonOptionList = JSON.stringify(formAttribute.attributeListOptions);
    const attributeName = data.attributeName;
    const cateId = data.cateId;
    const attributeId = data.attributeId;
    const encodeAttributeName = encodeURIComponent(attributeName);
    const bodyParams = encodeURIComponent('cateId=' + cateId + '&attributeId=' + attributeId + '&attributeName='
      + encodeAttributeName + '&optionList=' + jsonOptionList);
    const formParams = renderForm(PATH_CONTROLLER + 'create-or-update-attribute', bodyParams);
    return fetchPost(formParams, result => {
      dispatch({
        type: types.CREATE_OR_UPDATE_ATTRIBUTE,
        result,
        data,
      });
    });
  };
}

export function fetchDetailAttribute(data) {
  return (dispatch) => {
    const attributeId = data.attribute_id;
    const cateId = data.cateId;
    const bodyParams = encodeURIComponent('cateId=' + cateId + '&attributeId=' + attributeId);
    const formParams = renderForm(PATH_CONTROLLER + 'get-attribute-by-attributeId', bodyParams);
    return fetchPost(formParams, result => {
      dispatch({
        type: types.RECEIVE_DETAIL_ATTRIBUTE,
        result,
      });
    });
  };
}

export function resetAttributeForm() {
  return {
    type: types.RESET_ATTRIBUTE_FORM,
  };
}

export function addNewAttributeOptionAction(attributeOptionName) {
  return {
    type: types.ADD_NEW_ATTRIBUTE_OPTION,
    attributeOptionName,
  };
}

export function updateStatusFetchDetailAttributeToFalse() {
  return {
    type: types.UPDATE_STATUS_FETCH_DETAIL_TO_FALSE,
  };
}

export function showFormUpdateCategory() {
  return {
    type: types.SHOW_FORM_UPDATE_CATEGORY,
  };
}

export function hideFormUpdateCategory() {
  return {
    type: types.HIDE_FORM_UPDATE_CATEGORY,
  };
}

export function updateSaveOrUpdateAttributeIsFinishedToFalse() {
  return {
    type: types.SAVE_OR_UPDATE_ATTRIBUTE_IS_FINISHED_TO_FALSE,
  };
}

export function updateReceivedDetailToFalse() {
  return {
    type: types.UPDATE_RECEIVED_TO_FALSE,
  };
}

function receiveDetailData(data) {
  return {
    type: types.RECEIVE_DETAIL,
    data,
  };
}


function fetchingStatus() {
  return {
    type: types.FETCHING_DETAIL,
  };
}
