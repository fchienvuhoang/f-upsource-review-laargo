/**
 * Created by vuchien on 7/3/16.
 */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FormAttributes.css';
import {unMaskBody} from '../../../../../core/ui/modal';
import {reduxForm} from 'redux-form';

export const fields = ['attributeName'];

class FormAttributes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attributeNameHasError: false,
      attributeNameHasErrorMessage: "",
      attributeName: ""
    }
  }

  formUnmaskBody() {
    unMaskBody(this.props.idPopup);
  }

  addNewAttributeOption() {
    // validation input attribute name
    if (this.state.attributeName.trim() == "") {
      this.setState({
        attributeNameHasError: true,
        attributeNameHasErrorMessage: "Vui lòng nhập giá trị thuộc tính"
      });
    } else {
      this.setState({
        attributeName: "",
        attributeNameHasError: false,
        attributeNameHasErrorMessage: ""
      });
      const {actions} = this.props;
      actions.addNewAttributeOptionAction(this.state.attributeName);
      // set attributeName to empty
    }
  }

  attributeNameChange(e) {
    const attributeName = e.target.value;
    this.setState({attributeName: attributeName});
  }

  attributeValueChange(event) {
    event.preventDefault();
    // if (e.keyCode == 13) {
    //   this.addNewAttributeOption();
    // }
    return false;
  }

  render() {
    const {categoryDetailReducers, fields: {attributeName}, handleSubmit} = this.props;
    return (
      <div className={s.panelPopup} id={this.props.idPopup}>
        <div data-border="hide"
             className={`${s.panel} ${s.popupContentPanel} ${s.formCreateAttributes}`}>
          <div className={`${s.panelHeader}`}>
            <h2 className={s.title}>Thuộc tính sản phẩm</h2>
            <span onClick={this.formUnmaskBody.bind(this)} title="Đóng" className={s.close}/>
          </div>
          <div className={s.panelBody}>
            <form onSubmit={handleSubmit}>
              <div className={s.wrapperInside}>
                <div
                  className={`${s.formGroup} ${s.wrapInputName} ${(attributeName.touched && attributeName.error ? s.hasError : '')}`}>
                  <input placeholder="Tên thuộc tính" className={s.input}
                         type="text" {...attributeName}/>
                  {attributeName.touched && attributeName.error &&
                  <div className={s.errorMessage}>{attributeName.error}</div>}
                </div>
                <div className={s.clear}></div>
              </div>
              <div id={s.wrapperListAttributes}>
                <div className={`${s.formGroup} ${s.formAttributeInline}`}>
                  <label className={s.title}>Giá trị thuộc tính</label>
                  <div className={`${s.formGroup} ${this.state.attributeNameHasError ? s.hasError : ''}`}>
                    <input onKeyUp={this.attributeValueChange.bind(this)}
                           onChange={this.attributeNameChange.bind(this)}
                           value={this.state.attributeName} type="text" className={s.input}/>
                    <div className={s.errorMessage}>{this.state.attributeNameHasErrorMessage}</div>
                  </div>
                </div>
                <a onClick={this.addNewAttributeOption.bind(this)}
                   className={`${s.btnDefaultLarge} ${s.btnAttrFormInline}`}>Thêm
                </a>
                <div className={s.clear}></div>
                <ul>
                  {categoryDetailReducers.formAttribute.attributeListOptions.map(item =>
                    <li key={item.option_id}>
                      <span className={s.closeItem}/>
                      <a>{item.option_value}</a>
                    </li>
                  )}
                </ul>
              </div>
              <div className={s.panelFooter}>
                <div className={s.insideFooter}>
                  <a onClick={this.formUnmaskBody.bind(this)}
                     className={`${s.btnDefaultLarge}`}>Đóng
                  </a>
                  {(()=> {
                    if (this.props.typeForm === "addNew") {
                      return (
                        <button type="submit"
                                className={`${s.btn} ${s.btnBlueLarge} ${s.margin}`}>Thêm mới
                        </button>
                      )
                    } else {
                      return (
                        <button type="submit"
                                className={`${s.btn} ${s.btnBlueLarge} ${s.margin}`}>Lưu thay
                          đổi</button>
                      )
                    }
                  })()}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

FormAttributes = reduxForm({
  form: 'formAttribute',
  fields,
  validate: validateForm
})(FormAttributes);

function validateForm(data) {
  let errors = {};
  if (!data.attributeName) {
    errors.attributeName = 'Vui lòng nhập tên thuộc tính'
  }
  return errors;
}

export default withStyles(s)(FormAttributes);
