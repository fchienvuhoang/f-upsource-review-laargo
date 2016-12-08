/**
 * Created by vuchien on 6/29/16.
 */
import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CreateCategory.css';
import {unMaskBody} from '../../../../core/ui/modal';
import {reduxForm} from 'redux-form';

export const fields = ['categoryName'];

class CreateCategory extends Component {
  constructor(props, context) {
    super(props, context);
  }

  formUnmaskBody() {
    unMaskBody(this.props.id);
  }

  render() {
    const {fields: {categoryName}, handleSubmit} = this.props;
    return (
      <div className={s.panelPopup} id={this.props.id}>
        <div data-border="hide" className={`${s.panel} ${s.popupContentPanel} ${s.FormCategoryPanel}`}>
          <div className={s.panelHeader}>
            <h2 className={s.title}>Tạo mới danh mục sản phẩm</h2>
            <span onClick={this.formUnmaskBody.bind(this)} title="Đóng" className={s.close}/>
          </div>
          <div className={s.panelBody}>
            <form onSubmit={handleSubmit}>
              <div className={s.wrapperInside}>
                <div
                  className={`${s.formGroup} ${s.wrapInputName} ${(categoryName.touched && categoryName.error ? s.hasError : '')}`}>
                  <label>Tên danh mục</label>
                  <input {...categoryName} type="text" id="cate-name" className={s.input}/>
                  {categoryName.touched && categoryName.error &&
                  <div className={s.errorMessage}>{categoryName.error}</div>}
                </div>
                <div className={s.clear}></div>
              </div>
              <div className={s.panelFooter}>
                <div className={s.insideFooter}>
                  <a onClick={this.formUnmaskBody.bind(this)}
                     className={`${s.btnDefaultLarge}`}>Đóng</a>
                  <button className={`${s.btn} ${s.btnBlueLarge} ${s.margin}`}>Lưu thay đổi
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CreateCategory = reduxForm({
  form: 'CreateCategory',
  fields,
  validate: validateForm
})(CreateCategory);

function validateForm(data) {
  let errors = {};
  if (!data.categoryName) {
    errors.categoryName = 'Vui lòng nhập tên danh mục'
  }
  return errors;
}
export default withStyles(s)(CreateCategory);
