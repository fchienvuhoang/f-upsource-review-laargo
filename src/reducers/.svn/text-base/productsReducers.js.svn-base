/**
 * Created by vuchien on 7/5/16.
 */
import
  * as types
  from '../constants/ProductTypes';
import update from 'react-addons-update';
import {Paging} from './common';

const initialState = {
  isFetchingListProducts: false,
  showContentListProducts: false,
  items: [],
  isRemovedProduct: false,
  isChangedProductName: false,
  paging: { // using same structure for some reducer. Please find where using after change this
    totalItem: 0,
    totalPage: 0,
    currentPage: 1,
    beginItem: 1,
    endItem: 0,
    pagingDes: '',
    flagNextPage: 'false',
    flagPrePage: 'false',
  },
};

export default function productReducers(state = initialState, action) {
  switch (action.type) {
    case types.IS_FETCHING_LIST_PRODUCTS:
      return {
        ...state,
        isFetchingListProducts: true,
        showContentListProducts: false,
      };
    case types.RECEIVE_PRODUCTS:
      const data = action.payload.data;
      const {pagingDes, flagNex} = Paging.receive(state, action.payload);
      return {
        ...state,
        isFetchingListProducts: false,
        showContentListProducts: true,
        items: action.payload.data.items,
        paging: Paging.assign(state, data, pagingDes, flagNex),
      };
    case types.NEXT_PAGE:
      return Paging.setInfo(state, action.payload, action.payload.currentPage);
    case types.PREVIOUS:
      return Paging.setInfo(state, action.payload, action.payload.currentPage);
    case types.SEARCH_RECEIVE:
      return Paging.setInfo(state, action.payload, 1);
    case types.REMOVE_PRODUCT: {
      const productIndex = action.payload.productIndex;
      return update(state, {
        items: {$splice: [[productIndex, 1]]},
        isRemovedProduct: {$set: true},
      });
    }
    case types.RESET_STATE_REMOVE_PRODUCT:
      return {
        ...state,
        isRemovedProduct: false
      };
    case types.CHANGE_PRODUCT_NAME: {
      const index = action.payload.index;
      const value = action.payload.value;
      return update(state, {
        items: {
          [index]: {
            $apply(item){
              item.name = value;
              return item;
            }
          }
        },
        isChangedProductName: {$set: true}
      })
    }
    case types.RESET_STATE_CHANGE_PRODUCT:
      return {
        ...state,
        isChangedProductName: false
      };
    default:
      return state;
  }
}
