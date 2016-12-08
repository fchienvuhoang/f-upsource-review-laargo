/**
 * Created by vuchien on 7/27/16.
 */
import * as types from '../constants/authenticationTypes';
import { fetchPost, renderForm } from '../components/api';
import { reset } from 'redux-form';

const PATH_CONTROLLER = 'stores/';

export function changePassword(obj) {
  return (dispatch) => {
    dispatch(changeStateHandlingPassword());
    const currentPassword = encodeURIComponent(obj.currentPassword);
    const newPassword = encodeURIComponent(obj.newPassword);
    const reNewPassword = encodeURIComponent(obj.reNewPassword);

    const bodyParams = encodeURIComponent('cp=' + currentPassword + '&np=' + newPassword + '&rnp='
      + reNewPassword);
    const formParams = renderForm(PATH_CONTROLLER + 'change-password', bodyParams);
    return fetchPost(formParams, result => {
      /**
       * 2: current password not equal
       * 1: change success
       */
      const message = result.message;
      dispatch({
        type: types.UPDATE_CHANGE_PASSWORD_STATUS,
        payload: {
          message,
        },
      });
    });
  };
}

export function updateChangePasswordStateToFalse() {
  return (dispatch) => {
    dispatch(reset('formChangePassword'));
    dispatch({ type: types.UPDATE_CHANGE_PASSWORD_STATUS_TO_FALSE });
  };
}


function changeStateHandlingPassword() {
  return {
    type: types.STATE_HANDLING_CHANGE_PASSWORD,
  };
}
