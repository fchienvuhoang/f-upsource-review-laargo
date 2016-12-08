/**
 * Created by vuchien on 7/26/16.
 */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MainSection.css';
import {menuActive} from '../../../../../components/commons';
import {VIEW_CHANGE_PASSWORD} from '../../../../../components/viewConstants';
import {reduxForm} from 'redux-form';
import Loading from '../../../../../components/Loading';

export const fields = ['currentPassword', 'newPassword', 'reNewPassword'];
const MESS_CURRENT_PASSWORD = "Vui lòng nhập mật khẩu hiện tại";
const MESS_NEW_PASSWORD = "Vui lòng nhập mật khẩu mới";
const MESS_RE_NEW_PASSWORD = "Vui lòng nhập lại mật khẩu mới";
const MESS_COMPARE_PASSWORD = "Mật khẩu mới không khớp";

class MainSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {typeResult: "", resultMessage: ""};
  }

  componentDidMount() {
    menuActive(VIEW_CHANGE_PASSWORD);
  }

  componentDidUpdate() {
    const {authenticationReducers, actions} = this.props;
    if (authenticationReducers.isChangedPassword) {
      actions.updateChangePasswordStateToFalse();
      if (authenticationReducers.passwordChangeResultMessage == 2) {
        this.setState({typeResult: "notMatch", resultMessage: "Mật khẩu hiện tại không khớp"});
      } else if (authenticationReducers.passwordChangeResultMessage == 1) {
        this.setState({typeResult: "success", resultMessage: "Thay đổi mật khẩu thành công"});
      }
    }
  }

  render() {
    const {fields: {currentPassword, newPassword, reNewPassword}, handleSubmit, authenticationReducers} = this.props;
    const stateHandlingChangePassword = authenticationReducers.stateHandlingChangePassword;
    return (
      <div>
        <div className={s.wrapperNotice}>
          <div className={s.noticeWrapper}>
            <span data-type={this.state.typeResult}>{this.state.resultMessage}</span>
          </div>
        </div>
        <div className={s.panel}>
          <div className={s.panelHeader}>
            <label className={s.title}>Thay đổi mật khẩu</label>
          </div>
          <div className={`${s.panelBody}`}>
            <div className={s.wrapperInside}>
              <form onSubmit={handleSubmit}>
                <div className={s.wrapperChangePassword}>
                  <div
                    className={`${s.formGroup} ${(currentPassword.touched && currentPassword.error ? s.hasError : '')}`}>
                    <label>Mật khẩu hiện tại</label>
                    <input {...currentPassword} type="password" className={s.input}/>
                    {currentPassword.touched && currentPassword.error &&
                    <div className={s.errorMessage}>{currentPassword.error}</div>}
                  </div>
                  <div
                    className={`${s.formGroup} ${(newPassword.touched && newPassword.error ? s.hasError : '')}`}>
                    <label>Mật khẩu mới</label>
                    <input {...newPassword} type="password" className={s.input}/>
                    {newPassword.touched && newPassword.error &&
                    <div className={s.errorMessage}>{newPassword.error}</div>}
                  </div>
                  <div className={`${s.formGroup} ${(reNewPassword.touched && reNewPassword.error ? s.hasError : '')}`}>
                    <label>Nhắc lại mật khẩu mới</label>
                    <input {...reNewPassword} type="password" className={s.input}/>
                    {reNewPassword.touched && reNewPassword.error &&
                    <div className={s.errorMessage}>{reNewPassword.error}</div>}
                  </div>
                  <div className={s.wrapButtonAction}>
                    <button disabled={stateHandlingChangePassword}
                            data-is-loading={stateHandlingChangePassword}
                            type="submit"
                            className={`${s.btnBlueLarge} ${s.btnLoading} ${(stateHandlingChangePassword ? s.btnDisable : '')}`}>
                      <div className={s.wrapperLoading}>
                        <Loading scale="0.1"/>
                      </div>
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function validateForm(data) {
  let errors = {};
  if (!data.currentPassword) {
    errors.currentPassword = MESS_CURRENT_PASSWORD;
  }
  else if (!data.newPassword) {
    errors.newPassword = MESS_NEW_PASSWORD;
  }
  else if (!data.reNewPassword) {
    errors.reNewPassword = MESS_RE_NEW_PASSWORD;
  } else if (data.newPassword != data.reNewPassword) {
    errors.reNewPassword = MESS_COMPARE_PASSWORD;
  }
  return errors;
}

MainSection = reduxForm({
  form: 'formChangePassword',
  fields,
  validate: validateForm
})(MainSection);


export default withStyles(s)(MainSection);
