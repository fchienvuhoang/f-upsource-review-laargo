/**
 * Created by vuchien on 7/29/16.
 */
import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FormAttributesProduct.css';
import {unMaskBody} from '../../../../../core/ui/modal';
import SelectBox from '../../../../../components/SelectBox';
import Link from '../../../../../components/Link';
import Loading from '../../../../../components/Loading';

import {
  DETAIL_ATTRIBUTES_PRODUCT_CATEGORY_CHANGE,
  DETAIL_ATTRIBUTES_PRODUCT_ITEM_OPTIONS
} from '../../../../../components/moduleConstants';

const MESS_EMPTY_DATA_ATTRIBUTES =
  "Danh mục này chưa có nhóm thuộc tính. Hãy truy cập phần quản lý chuyên mục để thêm thuộc tính.";
const MESS_NOT_SELECT_A_CATEGORY = "Vui lòng chọn 1 danh mục để hiển thị danh sách các thuộc tính";

class FormAttributesProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cateId: ""
    }
  }

  formUnmaskBody() {
    unMaskBody(this.props.idPopup);
  }

  onChangeSelectBox(name, id, attribute_id, valueSelect) {
    const {actions, productId} = this.props;
    switch (name) {
      case DETAIL_ATTRIBUTES_PRODUCT_CATEGORY_CHANGE:
        this.setState({cateId: id}); // set to state for direct to detail category manager
        actions.detailAttributesOnChangeCategory(id, productId, valueSelect);
        break;
      case DETAIL_ATTRIBUTES_PRODUCT_ITEM_OPTIONS:
        actions.updateAttributeOptionByAttributeId(attribute_id, id, valueSelect);
        break;
      default:
        break;
    }
  }

  movingToCategoryModule() {
    unMaskBody(this.props.idPopup);
  }

  submitSaveFormAttribute() {
    const {actions, productDetailReducers, productId} = this.props;
    actions.updateIsLoadingHandleSaveToTrue(); // call loading state
    actions.saveAttributes(productDetailReducers.detailAttributeProduct.updateObj,
      productId, productDetailReducers.detail.isUsed_tempProductId, productDetailReducers.detail.is_tempProductId);
  }

  componentDidUpdate() {
    const {productDetailReducers, actions} = this.props;
    const isSaved = productDetailReducers.detailAttributeProduct.updateObj.isSaved;
    if (isSaved) {
      actions.updateIsSavedAttributesToFalse();
      this.formUnmaskBody();
    }
  }

  render() {
    const {productDetailReducers} = this.props;
    const updateObj = productDetailReducers.detailAttributeProduct.updateObj;
    const listCategories = updateObj.listCategories;
    const listAttributeBundleOriginAndSelected = updateObj.listAttributeBundleOriginAndSelected;
    const categoryBelong = updateObj.categoryBelong;
    const isFetchingAttributesByChangeCateId = updateObj.isFetchingAttributesByChangeCateId;
    const isShowContentFormAttributes = updateObj.isShowContentFormAttributes;
    const isLoadingHandleSave = updateObj.isLoadingHandleSave;

    return (
      <div>
        <div className={`${s.panelPopup}`} id={this.props.idPopup}>
          <div data-border="show" className={`${s.panel} ${s.popupContentPanel} ${s.rootFormAttributesProduct}`}>
            <div className={s.panelHeader}>
              <span className={s.title}>Thông tin sản phẩm</span>
              <span onClick={this.formUnmaskBody.bind(this)} title="Đóng" className={s.close}/>
            </div>
            <div className={s.panelBody}>
              <div className={s.wrapperInside}>
                <div className={s.wrapperChoiceCategory}>
                  <div className={s.formGroupTable}>
                    <table>
                      <tbody>
                      <tr>
                        <td className={s.label}>
                          <label>Chọn danh mục</label>
                        </td>
                        <td className={s.value}>
                          <div className={s.wrapSelect}>
                            <SelectBox name={DETAIL_ATTRIBUTES_PRODUCT_CATEGORY_CHANGE}
                                       onChange={this.onChangeSelectBox.bind(this)}
                                       listSelectBox={listCategories}
                                       valueSelect={categoryBelong.category_name}
                                       idSelect={categoryBelong.category_id}/>
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className={s.wrapperListAttributes}>
                  <label className={s.titleList}>Danh sách thuộc tính</label>
                  <div data-show={isFetchingAttributesByChangeCateId} className={s.centerLoadingBg}/>
                  <div data-show={isShowContentFormAttributes} className={s.wrapperItems}>
                    <div className={s.formGroupTable}>
                      <table>
                        <tbody>
                        {(() => {
                          if (listAttributeBundleOriginAndSelected.length > 0) {
                            {
                              return (
                                listAttributeBundleOriginAndSelected.map((item, index)=>
                                  <tr key={index}>
                                    <td className={s.label}>
                                      <label>{item.name}</label>
                                    </td>
                                    <td className={s.value}>
                                      <div className={s.wrapSelect}>
                                        <SelectBox name={DETAIL_ATTRIBUTES_PRODUCT_ITEM_OPTIONS}
                                                   onChange={this.onChangeSelectBox.bind(this)}
                                                   idSelect={item.runtime_id_selected}
                                                   valueSelect={item.runtime_name_selected}
                                                   attributeId={item.attribute_id}
                                                   listSelectBox={item.options}/>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )
                            }
                          } else {
                            return (
                              <tr>
                                {(() => {
                                  if (this.state.cateId != "") {
                                    return (
                                      <td colSpan="2" className={s.emptyData}>
                                        {MESS_EMPTY_DATA_ATTRIBUTES} <Link
                                        onClick={this.movingToCategoryModule.bind(this)}
                                        to={"/danh-muc/" + this.state.cateId}>Chuyển tới
                                        Danh mục</Link>
                                      </td>
                                    )
                                  } else {
                                    return (
                                      <td colSpan="2" className={s.emptyData}>
                                        {MESS_NOT_SELECT_A_CATEGORY}
                                      </td>
                                    )
                                  }
                                })()}
                              </tr>
                            )
                          }
                        })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.panelFooter}>
                <div className={s.insideFooter}>
                  <a onClick={this.formUnmaskBody.bind(this)} className={`${s.btnDefaultLarge}`}>Đóng</a>
                  <button onClick={this.submitSaveFormAttribute.bind(this)} data-is-loading={isLoadingHandleSave}
                          disabled={isLoadingHandleSave}
                          className={`${s.margin} ${s.btnBlueLarge} ${s.btnLoading} ${(isLoadingHandleSave ? s.btnDisable : '')}`}>
                    <div className={s.wrapperLoading}>
                      <Loading scale="0.1"/>
                    </div>
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(FormAttributesProduct);
