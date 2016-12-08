/**
 * Created by vuchien on 6/20/16.
 */
import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DetailSection.css';
import {reduxForm} from 'redux-form';
import {maskBody, unMaskBody} from '../../../../core/ui/modal';
import {ShowLoadingPanel, HideLoadingPanel} from '../../../../components/commons';
import IndexFormAttribute from './formAttributes/index';
import {timeOutPopup} from '../../../../config';

export const fields = ['name'];

class DetailSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formAttribute: ""
    };
    this.idPopupFormAttribute = "idPopupFormAttribute";
  }

  componentDidMount() {
    const {actions} = this.props;
    const cateId = this.props.cateId;
    actions.fetchDetailCategoryById(cateId);
  }

  showFormUpdateCategory() {
    const {actions} = this.props;
    actions.showFormUpdateCategory();
  }

  hideFormUpdateCategory() {
    const {actions} = this.props;
    actions.hideFormUpdateCategory();
  }

  testOnChange(newValue) {
    console.log("run to test onchange:" + newValue);
  }

  showFormAttributes() {
    this.setState({formAttribute: ""}, function () {
      this.setState({
        formAttribute: <IndexFormAttribute formType="addNew"
                                           cateId={this.props.cateId}
                                           idPopup={this.idPopupFormAttribute}/>
      });
    });
    maskBody();
  }

  showFormAttributesEdit(attribute_id) {
    // append waiting for fetching data from API todo below
    ShowLoadingPanel();
    const {cateId, actions} = this.props;

    setTimeout(function () {
      let data = {attribute_id: attribute_id, cateId: cateId};
      actions.fetchDetailAttribute(data);
    }, timeOutPopup);
  }

  componentDidUpdate() {
    const {categoryDetailReducers, actions} = this.props;
    /**
     * Checking status of the fetching attribute
     */
    if (categoryDetailReducers.isFetchingDetailAttribute) {

      // show form update attribute and passing params & reset status of fetching attribute
      this.setState({formAttribute: ""}, function () {

        // hide loading panel
        HideLoadingPanel();

        // append attribute form and mask body when finished
        this.setState({
          formAttribute: <IndexFormAttribute formType="update"
                                             cateId={this.props.cateId}
                                             idPopup={this.idPopupFormAttribute}/>
        }, function () {
          maskBody();
        });
      });

      /**
       * Update status of fetching attribute to false
       */
      actions.updateStatusFetchDetailAttributeToFalse();
    }

    // checking createOrUpdate attribute is finished
    if (categoryDetailReducers.saveOrUpdateAttributeIsFinished) {
      // hide form attribute if create or update attribute is finished
      unMaskBody(this.idPopupFormAttribute);

      // update state for false
      actions.updateSaveOrUpdateAttributeIsFinishedToFalse();
    }
  }

  handleSubmit(data) {
    const {actions} = this.props;
    actions.createOrUpdateFormAttributeAction(data);
  }

  render() {
    const {categoryDetailReducers, fields: {name}, handleSubmit, submitting} = this.props;
    return (
      <div className={s.wrapperCateDetail}>
        <div>{this.state.formAttribute}</div>
        <div className={s.wrapperCategoryInfo}>
          <div data-show={categoryDetailReducers.isShowNameCategory} className={s.line1}>
            <h2 className={s.categoryName}>
              {name.value}
            </h2>
            <div className={s.rightOptions}>
              <a onClick={this.showFormUpdateCategory.bind(this)} className={s.btnDefaultLarge}>Sửa danh
                mục</a>
            </div>
            <div className={s.clear}></div>
          </div>
          <div data-show={categoryDetailReducers.isShowEditCategoryForm} className={s.line2}>
            <form onSubmit={handleSubmit}>
              <div
                className={`${s.formGroup} ${s.wrapInputName} ${(name.touched && name.error ? s.hasError : '')}`}>
                <input className={`${s.input} ${s.bgEdit}`} {...name} type="text"/>
                {name.touched && name.error && <div className={s.errorMessage}>{name.error}</div>}
              </div>
              <div className={s.wrapAction}>
                <button disabled={submitting} type="submit"
                        className={`${s.btnDefaultLarge} ${s.paddingShortText}`}>Lưu
                </button>
                <a onClick={this.hideFormUpdateCategory.bind(this)} className={s.cancel}>Đóng</a>
              </div>
            </form>
            <div className={s.clear}></div>
          </div>
        </div>
        <div className={s.wrapperPanelDefault}>
          <div className={s.panel}>
            <div className={s.panelHeader}>
              <span className={s.title}>Nhóm thuộc tính</span>
              <div className={s.optionTable}>
                <a onClick={this.showFormAttributes.bind(this)} className={`${s.btnBlueLarge} ${s.withIcon}`}>
                  <span className={s.addIcon}/>
                  Tạo thuộc tính</a>
              </div>
            </div>
            <div className={s.panelBody}>
              <div className={`${s.borderBottom} ${s.table}`}>
                <div className={s.header}></div>
                <div className={s.body}>
                  <div className={s.wrapperTableListAttribute}>
                    <table>
                      <tbody>
                      {categoryDetailReducers.category.attributes.map(item =>
                        <tr key={item.attribute_id}>
                          <td className={s.checkBox}/>
                          <td>
                            <a className={s.itemNameLink}>{item.name}</a>
                          </td>
                          <td>
                            <div className={s.listOption}>
                              <div className={s.wrapperExtraItems}>
                                <ul>
                                  {item.options.map(itemOption =>
                                    <li key={itemOption.option_id}>
                                      <a>{itemOption.option_value}</a></li>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </td>
                          <td>
                            <a onClick={() => this.showFormAttributesEdit(item.attribute_id)}
                               className={s.btnDefault}>Chỉnh sửa
                            </a>
                          </td>
                        </tr>
                      )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DetailSection.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  resetForm: PropTypes.func.isRequired
};

DetailSection = reduxForm({
  form: 'CategoryFormUpdate',
  fields,
  validate: validateForm
})(DetailSection);

function validateForm(data) {
  let errors = {};
  if (!data.name) {
    errors.name = 'Vui lòng nhập tên danh mục'
  }
  return errors;
}
export default withStyles(s)(DetailSection);
