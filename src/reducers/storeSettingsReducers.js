/**
 * Created by vuchien on 7/26/16.
 */

import * as types from '../constants/storeSettingsTypes';

const initialState = {
  storeName: '--',
  name: '',
  storeThumbUrl: '',
};
export default function storeSettingsReducers(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_STORE_NAME:
      const storeName = action.payload.data.name;
      return {
        ...state,
        storeName,
      };
    case types.GET_STORE_INFO: {
      const data = action.payload.data;
      return {
        ...state,
        storeName: data.store_name,
        name: data.name,
        storeThumbUrl: data.store_thumb_url,
      };
    }
    case types.CHANGE_STORE_THUMB:
      return {
        ...state,
        storeThumbUrl: action.payload.data,
      };
    case types.CHANGE_STORE_NAME:
      return {
        ...state,
        storeName: action.payload.data,
      };
    default:
      return state;
  }
}
