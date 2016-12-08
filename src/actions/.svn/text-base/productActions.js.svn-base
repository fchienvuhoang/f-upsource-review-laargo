/**
 * Created by vuchien on 7/5/16.
 */

import * as types from '../constants/ProductTypes';
import {fetchGet, renderAPI} from '../components/api';

const pagingItemNumber = 10;
const PATH_CONTROLLER = "products/";

export function fetchAllProducts() {
  return (dispatch) => {
    dispatch(fetchingListProductStatus());
    var pathAPI = PATH_CONTROLLER + "list?page=1&item=" + pagingItemNumber + "&keyword=";
    const url = renderAPI(pathAPI);
    return fetchGet(url, result => {
      dispatch({type: types.RECEIVE_PRODUCTS, payload: {data: result}})
    })
  }
}

export function nextPageAction(flagNext, currentPage) {
  if (flagNext == "true") {
    return (dispatch) => {
      const _currentPage = currentPage + 1;
      const pathAPI = PATH_CONTROLLER + "list?page=" + _currentPage + "&item=" + pagingItemNumber + "&keyword=";
      const url = renderAPI(pathAPI);
      return fetchGet(url, result => {
        dispatch(nextReceive(result, _currentPage))
      })
    };
  } else {
    if (__DEV__) {
      console.info("not allow");
    }
    return {
      type: ""
    }
  }
}

export function prevPageAction(flagPrev, currentPage) {
  if (flagPrev == "true") {
    return (dispatch) => {
      const _currentPage = currentPage - 1;
      const pathAPI = PATH_CONTROLLER + "list?page=" + _currentPage + "&item=" + pagingItemNumber + "&keyword=";
      const url = renderAPI(pathAPI);
      return fetchGet(url, result => {
        dispatch(prevReceive(result, _currentPage))
      })
    };
  } else {
    if (__DEV__) {
      console.info("not allow");
    }
    return {
      type: ""
    }
  }
}

export function searchByKeyword(keyword) {
  return (dispatch) => {
    const keywordEncode = encodeURIComponent(keyword);
    const pathAPI = PATH_CONTROLLER + "search?page=1&item=" + pagingItemNumber + "&keyword=" + keywordEncode;
    const url = renderAPI(pathAPI);
    return fetchGet(url, result => {
      dispatch(searchReceive(result))
    })
  }
}

export function removeProduct(productId, productIndex) {
  const pathAPI = `${PATH_CONTROLLER}remove-product?productId=${productId}`;
  const url = renderAPI(pathAPI);
  return (dispatch) => {
    fetchGet(url, result => {
      if (result.status === 'ok') {
        dispatch({
          type: types.REMOVE_PRODUCT,
          payload: {
            productId,
            productIndex,
          }
        });
      }
      else {
        if (__DEV__) {
          console.log("error remove category");
        }
      }
    });
  }
}

export function resetStateRemoveProduct(){
  return {
    type: types.RESET_STATE_REMOVE_PRODUCT
  }
}

export function changeProductName(id, index, value) {
  const pathAPI = `${PATH_CONTROLLER}change-product-name?productId=${id}&newValue=${encodeURIComponent(value)}`;
  const url = renderAPI(pathAPI);
  return (dispatch) => {
    fetchGet(url, result => {
      if (result.status === 'ok') {
        dispatch({
          type: types.CHANGE_PRODUCT_NAME,
          payload: {
            id,
            index,
            value,
          }
        });
      }
      else {
        if (__DEV__) {
          console.log("error change product name");
        }
      }
    });
  };
}

export function resetStateChangeProductName() {
  return {
    type: types.RESET_STATE_CHANGE_PRODUCT
  }
}

function fetchingListProductStatus() {
  return {
    type: types.IS_FETCHING_LIST_PRODUCTS
  }
}

function nextReceive(data, currentPage) {
  return {
    type: types.NEXT_PAGE,
    payload: {
      data: data,
      currentPage: currentPage,
      pagingItemNumber: pagingItemNumber
    }
  }
}

function prevReceive(data, currentPage) {
  return {
    type: types.PREVIOUS,
    payload: {
      data: data,
      currentPage: currentPage,
      pagingItemNumber: pagingItemNumber
    }
  }
}

function searchReceive(data) {
  return {
    type: types.SEARCH_RECEIVE,
    payload: {
      data: data,
      pagingItemNumber: pagingItemNumber
    }
  }
}

export function resetDetaiProduct() {
  return {
    type: types.RESET_DETAIL_PRODUCT
  }
}
