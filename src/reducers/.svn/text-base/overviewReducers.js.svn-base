/**
 * Created by vuchien on 8/26/16.
 */
import
  * as types
  from '../constants/overviewTypes';

const initialState = {};

export default function overviewReducers(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVED_STORE_STATISTICS: {
      const result = action.payload.result;
      return Object.assign({}, state, result);
    }
    default:
      return state;
  }
}
