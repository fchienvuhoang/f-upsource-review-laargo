/**
 * Created by vuchien on 6/18/16.
 */
import
  * as types
  from '../constants/CategoriesTypes';
import {Paging} from './common';
import update from 'react-addons-update';

const initialState = {
  isFetching: false,
  showContentListCategories: false,
  items: [],
  isAddedNewCategory: false, // status when add new a category
  isRemovedCategory: false,
  isChangedCateName: false,
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

export default function categoriesReducers(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CATEGORY:
      const result = action.result;
      if (result.status == 'ok') {
        return Object.assign({}, state, {
          isAddedNewCategory: true,
          items: [
            {
              _id: result.objectId,
              publish: 1,
              time_create: result.timeCreate,
              name: result.name,
            },
            ...state.items,
          ],
        });
      } else {
        return state;
      }
    case types.SEARCH_RECEIVE: {
      return Paging.setInfo(state, action.payload, 1);
    }
    case types.RECEIVE_CATEGORIES:
      const data = action.payload.data;
      const {pagingDes, flagNex} = Paging.receive(state, action.payload);
      return Object.assign({}, state, data,
        {
          isFetching: false,
          showContentListCategories: true,
          paging: Paging.assign(state, data, pagingDes, flagNex),
        }
      );
    case types.NEXT_PAGE: {
      return Paging.setInfo(state, action.payload, action.payload.currentPage);
    }
    case types.PREV_PAGE: {
      return Paging.setInfo(state, action.payload, action.payload.currentPage);
    }
    case types.FETCHING_CATEGORIES:
      return Object.assign({}, state, {isFetching: true});
    case types.IS_ADDED_NEW_CATEGORY_TO_FALSE:
      return Object.assign({}, state, {
        isAddedNewCategory: false,
      });
    case types.REMOVE_CATEGORY: {
      const cateIndex = action.payload.cateIndex;
      return update(state, {
        items: {$splice: [[cateIndex, 1]]},
        isRemovedCategory: {$set: true},
      });
    }
    case types.RESET_STATE_REMOVE_CATEGORY:
      return {
        ...state,
        isRemovedCategory: false
      };
    case types.CHANGE_CATEGORY_NAME: {
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
        isChangedCateName: {$set: true}
      })
    }
    case types.RESET_STATE_CHANGE_CATEGORY:
      return {
        ...state,
        isChangedCateName: false
      };
    default:
      return state;
  }
}
