/**
 * Created by vuchien on 7/27/16.
 */

import * as types from '../constants/authenticationTypes';

const initialState = {
  stateHandlingChangePassword: false,
  isChangedPassword: false,
  passwordChangeResultMessage: '',
};
export default function authenticationReducers(state = initialState, action) {
  switch (action.type) {
    case types.STATE_HANDLING_CHANGE_PASSWORD:
      return {
        ...state,
        stateHandlingChangePassword: true,
      };
    case types.UPDATE_CHANGE_PASSWORD_STATUS:
      const message = action.payload.message;
      return {
        ...state,
        stateHandlingChangePassword: false,
        isChangedPassword: true,
        passwordChangeResultMessage: message,
      };
    case types.UPDATE_CHANGE_PASSWORD_STATUS_TO_FALSE:
      return {
        ...state,
        isChangedPassword: false,
      };
    default:
      return state;
  }
}
