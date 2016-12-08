/**
 * Created by vuchien on 7/26/16.
 */
import * as types from '../constants/storeSettingsTypes';
import {fetchGet, renderAPI} from '../components/api';

const PATH_API = "/stores/";

export function fetchStoreName() {
  return (dispatch) => {
    var pathAPI = PATH_API + "find-name-by-id?default=0"; // just for server append &storeId
    const url = renderAPI(pathAPI);
    return fetchGet(url, result => {
      dispatch({
        type: types.FETCH_STORE_NAME,
        payload: {
          data: result
        }
      })
    })
  };
}

export function getStoreInfo() {
  return (dispatch) => {
    var pathAPI = PATH_API + "get-store-info?default=0"; // just for server append &storeId
    const url = renderAPI(pathAPI);
    return fetchGet(url, result => {
      dispatch({
        type: types.GET_STORE_INFO,
        payload: {
          data: result
        }
      })
    })
  }
}

export function changeUrlThumb(urlThumb) {
  const urlThumbEncode = encodeURIComponent(urlThumb);
  return (dispatch) => {
    var pathAPI = PATH_API + "change-url-thumb?urlThumb=" + urlThumbEncode; // just for server append &storeId
    const url = renderAPI(pathAPI);
    return fetchGet(url, result => {
      dispatch({
        type: types.CHANGE_STORE_THUMB,
        payload: {
          data: urlThumb
        }
      })
    })
  }
}

export function changeStoreName(storeName) {
  const storeNameEncode = encodeURIComponent(storeName);
  return (dispatch) => {
    var pathAPI = PATH_API + "change-store-name?storeName=" + storeNameEncode; // just for server append &storeId
    const url = renderAPI(pathAPI);
    return fetchGet(url, result => {
      dispatch({
        type: types.CHANGE_STORE_NAME,
        payload: {
          data: storeName
        }
      })
    })
  }
}
