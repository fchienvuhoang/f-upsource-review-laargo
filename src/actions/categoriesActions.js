/**
 * Created by vuchien on 6/18/16.
 */
import * as types from '../constants/CategoriesTypes';
const pagingItemNumber = 10;
import { fetchGet, renderAPI } from '../components/api';

const PATH_CONTROLLER = 'categories/';

export function fetchAllCategories() {
  return (dispatch) => {
    dispatch(fetchingStatus());
    var pathAPI = PATH_CONTROLLER + 'list?page=1&item=' + pagingItemNumber + '&keyword=';
    const url = renderAPI(pathAPI);
    return fetchGet(url, result => {
      dispatch(receivePosts(result));
    });
  };
}

export function addCategory(text) {
  return (dispatch) => {
    let categoryNameEncode = encodeURIComponent(text);
    let pathAPI = PATH_CONTROLLER + 'create?name=' + categoryNameEncode;
    const url = renderAPI(pathAPI);
    return fetchGet(url, result => {
      dispatch(addedCategory(result));
    });
  };
}

export function searchByKeyword(keyword) {
  return (dispatch) => {
    const keywordEncode = encodeURIComponent(keyword);
    const pathAPI = PATH_CONTROLLER + 'search?page=1&item=' + pagingItemNumber + '&keyword=' + keywordEncode;
    const url = renderAPI(pathAPI);
    return fetchGet(url, result => {
      dispatch(searchReceive(result));
    });
  };
}

export function nextPageAction(flagNext, currentPage) {
  if (flagNext == 'true') {
    return (dispatch) => {
      const _currentPage = currentPage + 1;
      const pathAPI = PATH_CONTROLLER + 'list?page=' + _currentPage + '&item=' + pagingItemNumber + '&keyword=';
      const url = renderAPI(pathAPI);
      return fetchGet(url, result => {
        dispatch(nextReceive(result, _currentPage));
      });
    };
  } else {
    if (__DEV__) {
      console.warn('not allow');
    }
    return {
      type: '',
    };
  }
}

export function prevPageAction(flagPrev, currentPage) {
  if (flagPrev === 'true') {
    return (dispatch) => {
      const _currentPage = currentPage - 1;
      const pathAPI = PATH_CONTROLLER + 'list?page=' + _currentPage + '&item=' + pagingItemNumber + '&keyword=';
      const url = renderAPI(pathAPI);
      return fetchGet(url, result => {
        dispatch(prevReceive(result, _currentPage));
      });
    };
  } else {
    if (__DEV__) {
      console.warn('not allow');
    }
    return {
      type: '',
    };
  }
}

export const removeCategory = (cateId, cateIndex) => {
  const pathAPI = `${PATH_CONTROLLER}remove-category?cateId=${cateId}`;
  const url = renderAPI(pathAPI);
  return (dispatch) => {
    fetchGet(url, result => {
      if (result.status === 'ok') {
        dispatch({
          type: types.REMOVE_CATEGORY,
          payload: {
            cateId,
            cateIndex,
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
};

export function resetStateRemoveCategory() {
  return {
    type: types.RESET_STATE_REMOVE_CATEGORY
  }
}

export function resetStateChangeCategory() {
  return {
    type: types.RESET_STATE_CHANGE_CATEGORY
  }
}

export function changeCategoryName(id, index, value) {
  const pathAPI = `${PATH_CONTROLLER}change-category-name?cateId=${id}&newValue=${encodeURIComponent(value)}`;
  const url = renderAPI(pathAPI);
  return (dispatch) => {
    fetchGet(url, result => {
      if (result.status === 'ok') {
        dispatch({
          type: types.CHANGE_CATEGORY_NAME,
          payload: {
            id,
            index,
            value,
          }
        });
      }
      else {
        if (__DEV__) {
          console.log("error change category name");
        }
      }
    });
  };
}

function nextReceive(data, currentPage) {
  return {
    type: types.NEXT_PAGE,
    payload: {
      data,
      currentPage,
      pagingItemNumber,
    },
  };
}

function prevReceive(data, currentPage) {
  return {
    type: types.PREV_PAGE,
    payload: {
      data,
      currentPage,
      pagingItemNumber,
    },
  };
}

function searchReceive(data) {
  return {
    type: types.SEARCH_RECEIVE,
    payload: {
      data,
      pagingItemNumber,
    },
  };
}

function addedCategory(result) {
  return {type: types.ADD_CATEGORY, result};
}

function receivePosts(json) {
  return {
    type: types.RECEIVE_CATEGORIES,
    payload: {
      data: json,
      receivedAt: Date.now(),
    },
  };
}

function fetchingStatus() {
  return {
    type: types.FETCHING_CATEGORIES,
  };
}

export function isAddedNewCategoryToFalse() {
  return {
    type: types.IS_ADDED_NEW_CATEGORY_TO_FALSE,
  };
}
