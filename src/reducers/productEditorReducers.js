/**
 * Created by vuchien on 8/13/16.
 */
import
  * as types
  from '../constants/productEditorTypes';
import update from 'react-addons-update';
import { guidShort } from '../components/commons';
// {
//   type: types.COMPONENT_TITLE_TEXT,
//   raw: "",
//   id: guidShort()
// }

const threeColumn = {
  row: [
    {
      id: guidShort(),
      items: [],
    },
    {
      id: guidShort(),
      items: [],
    },
    {
      id: guidShort(),
      items: [],
    },
  ],
  column: types.STYLE_THREE_COLUMN,
};

const twoColumn = {
  row: [
    {
      id: guidShort(),
      items: [],
    },
    {
      id: guidShort(),
      items: [],
    },
  ],
  column: types.STYLE_TWO_COLUMN,
};

const oneColumn = {
  row: [
    {
      id: guidShort(),
      items: [],
    },
  ],
  column: types.STYLE_ONE_COLUMN,
};

const initialState = {
  rows: [],
  allowSaveWhenFetchedData: false,
  isSaveHandling: false,
  isSaveProductDesignSuccess: false,
  lastItemId: '',
  lastComponentInserted: {}, // store column id for binding height dimension
  isUpDownSuccess: false,
  isFetchedDesignData: false,
  isFetchingDesignData: false,
  isShowImageUploadForImageComponent: false,
  isHideImageUploadForImageComponent: false,
  tempPositionImageUploadComponent: {}, // this store position when change an image of component, retrieve this data for update image path
  callingUsedTempProductId: false, // this state for call update tempProduct is used after a new product inserted
  isTempProductId: false,
  tempProductId: '',
};

export default function productEditorReducers(state = initialState, action) {
  switch (action.type) {
    case types.ADD_ROW: {
      const columnName = action.payload.columnName;
      switch (columnName) {
        case types.STYLE_THREE_COLUMN:
          return Object.assign({}, state, {
            rows: [
              ...state.rows,
              threeColumn,
            ],
          });
        case types.STYLE_TWO_COLUMN:
          return Object.assign({}, state, {
            rows: [
              ...state.rows,
              twoColumn,
            ],
          });
        case types.STYLE_ONE_COLUMN:
          return Object.assign({}, state, {
            rows: [
              ...state.rows,
              oneColumn,
            ],
          });
        default:
          return state;
      }
    }
    case types.INSERT_COMPONENT: {
      const payload = action.payload;
      const component = payload.component;
      const rowIndex = payload.rowIndex;
      const columnIndex = payload.columnIndex;
      const columnId = payload.columnId;
      return update(state, {
        rows: {
          [rowIndex]: {
            row: {
              [columnIndex]: {
                items: {
                  $push: [recordToInsertComponent(component)],
                },
              },
            },
          },
        },
        lastComponentInserted: { $set: { rowIndex, columnIndex, columnId } },
      });
    }
    case types.UP_DOWN_INDEX: {
      const payload = action.payload;
      const itemIndex = payload.itemIndex;
      const newIndex = payload.newIndex;
      const rowIndex = payload.rowIndex;
      const columnIndex = payload.columnIndex;
      const lastItemId = payload.lastItemId;
      return update(state, {
        rows: {
          [rowIndex]: {
            row: {
              [columnIndex]: {
                items: {
                  $apply(item) {
                    return _move(item, itemIndex, newIndex);
                  },
                },
              },
            },
          },
        },
        lastItemId: { $set: lastItemId },
        isUpDownSuccess: { $set: true },
      });
    }
    case types.UPDATE_RAW_ITEM: {
      const payload = action.payload;
      const raw = payload.raw;
      const index = payload.params.index;
      const rowIndex = payload.params.rowIndex;
      const columnIndex = payload.params.columnIndex;
      const columnId = payload.params.columnId;
      return update(state, {
        rows: {
          [rowIndex]: {
            row: {
              [columnIndex]: {
                items: {
                  [index]: { raw: { $set: raw } },
                },
              },
            },
          },
        },
        lastComponentInserted: { $set: { rowIndex, columnIndex, columnId } },
      });
    }
    case types.REMOVE_ITEM: {
      const payload = action.payload;
      const index = payload.itemIndex;
      const rowIndex = payload.rowIndex;
      const columnIndex = payload.columnIndex;
      const columnId = payload.columnId;
      return update(state, {
        rows: {
          [rowIndex]: {
            row: {
              [columnIndex]: {
                items: { $splice: [[index, 1]] },
              },
            },
          },
        },
        lastComponentInserted: { $set: { rowIndex, columnIndex, columnId } },
      });
    }
    case types.SAVE_PRODUCT_DESIGN_SUCCESS:
      const p = action.payload.p;
      return {
        ...state,
        isSaveProductDesignSuccess: true,
        isSaveHandling: false,
        callingUsedTempProductId: true,
        tempProductId: p,
        isTempProductId: true,
      };
    case types.UPDATE_PRODUCT_SUCCESS_TO_FALSE:
      return {
        ...state,
        isSaveProductDesignSuccess: false,
      };
    case types.IS_UP_DOWN_SUCCESS:
      return {
        ...state,
        isUpDownSuccess: false,
      };
    case types.IS_SAVE_HANDLING_TO_TRUE:
      return {
        ...state,
        isSaveHandling: true,
      };
    case types.RECEIVED_PRODUCT_DETAIL_DESIGN_FOR_EDIT: {
      const data = action.payload.data;
      const detail = data.result.detail;
      return Object.assign({}, state, {
        rows: detail,
        isFetchedDesignData: true,
      });
    }
    case types.IS_FETCHING_DATA_FOR_EDIT:
      return {
        ...state,
        isFetchingDesignData: true,
      };
    case types.UPDATE_FETCHING_AND_FETCHED_STATUS_TO_FALSE:
      return {
        ...state,
        isFetchedDesignData: false,
        isFetchingDesignData: false,
        allowSaveWhenFetchedData: true, //  allow save, this prevent in case data is not fetched
      };
    case types.SHOW_UPLOAD_IMAGE_FOR_IMAGE_COMPONENT: {
      const params = action.payload.params;
      const rowIndex = params.rowIndex;
      const columnIndex = params.columnIndex;
      const columnId = params.columnId;
      return {
        ...state,
        isShowImageUploadForImageComponent: true,
        tempPositionImageUploadComponent: params,
        lastComponentInserted: { rowIndex, columnIndex, columnId },
      };
    }
    case types.SHOW_UPLOAD_IMAGE_FOR_IMAGE_COMPONENT_TO_FALSE:
      return {
        ...state,
        isShowImageUploadForImageComponent: false,
      };
    case types.ROW_MOVE_UP_DOWN:
      const rowIndex = action.payload.rowIndex;
      const toIndex = action.payload.toIndex;
      return update(state, {
        rows: {
          $apply(item) {
            return _move(item, rowIndex, toIndex);
          },
        },
      });
    case types.REMOVE_ROW: {
      const rowIndex = action.payload.rowIndex;
      return update(state, {
        rows: { $splice: [[rowIndex, 1]] },
      });
    }
    case types.REMOVE_COLUMN: {
      const payload = action.payload;
      const rowIndex = payload.rowIndex;
      const columnIndex = payload.columnIndex;
      return update(state, {
        rows: {
          [rowIndex]: {
            row: { $splice: [[columnIndex, 1]] },
            column: {
              $apply(item) {
                return (item - 1);
              },
            },
          },
        },
      });
    }
    case types.SAVE_IMAGE_PATH_UPLOAD_COMPONENT: {
      const temPositionImgCom = state.tempPositionImageUploadComponent;
      const rowIndex = temPositionImgCom.rowIndex;
      const index = temPositionImgCom.index;
      const columnIndex = temPositionImgCom.columnIndex;

      const imageObj = action.payload.imageObj;
      const imageTempViewPath = imageObj.imageTempViewPath;
      const imagePath = imageObj.imagePath;

      return update(state, {
        rows: {
          [rowIndex]: {
            row: {
              [columnIndex]: {
                items: {
                  [index]: {
                    imageTempViewPath: { $set: imageTempViewPath }, // set temp path for display editor mode only
                    imagePath: { $set: imagePath }, // real path if saved
                  },
                },
              },
            },
          },
        },
        isHideImageUploadForImageComponent: { $set: true },
      });
    }
    case types.IS_UPDATE_HIDDEN_IMAGE_UPLOAD_FOR_IMAGE_COMPONENT_TO_FALSE:
      return {
        ...state,
        isHideImageUploadForImageComponent: false,
      };
    case types.IS_UPDATE_CALLING_USED_TEMP_PRODUCT_ID_TO_FALSE:
      return {
        ...state,
        callingUsedTempProductId: false,
      };
    default:
      return state;
  }
}

/* other handles */
function _move(arr, fromIndex, toIndex) {
  const length = arr.length;
  // move first to last
  if (fromIndex == 0 && toIndex == -1) {
    toIndex = length - 1;
  }
  // move last to first
  if (fromIndex == (length - 1) && toIndex == length) {
    toIndex = 0;
  }
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  return arr;
}

function recordToInsertComponent(component) {
  return {
    id: guidShort(),
    type: component,
    raw: '',
    imagePath: '',
    imageTempViewPath: '',
  };
}
