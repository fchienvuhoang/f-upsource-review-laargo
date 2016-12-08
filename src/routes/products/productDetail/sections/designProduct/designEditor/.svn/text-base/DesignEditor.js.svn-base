/**
 * Created by vuchien on 8/17/16.
 */

import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DesignEditor.css';
import {unMaskBody, maskBody} from '../../../../../../core/ui/modal';
import ProductEditorDev from '../../../../../../components/ProductEditorDev/EditorDevIndex';
import Loading from '../../../../../../components/Loading';
import ImageComponentUpload from './imageComponentUpload/ImageComponentUpload';

class DesignEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {formImageComponentUpload: ""};
    this.ipPopupComponentImageUpload = "ipPopupComponentImageUpload";
  }

  componentDidUpdate() {
    const {productEditorReducers, actions, onFormSaved} = this.props;
    if (productEditorReducers.isSaveProductDesignSuccess) {
      // close form and update status to false
      actions.updateStatusProductSuccessToFalse();
      if (productEditorReducers.isTempProductId) {
        onFormSaved(productEditorReducers.tempProductId);
      } else {
        onFormSaved("");
      }
      this.closeForm();
    }

    // if image component calling for show form upload image
    if (productEditorReducers.isShowImageUploadForImageComponent) {
      actions.isShowImageUploadForImageComponentToFalse();
      this.setState({formImageComponentUpload: ""}, ()=> {
        this.setState({
          formImageComponentUpload: <ImageComponentUpload actions={actions} idPopup={this.ipPopupComponentImageUpload}/>
        })
      });
      maskBody(3);
    }

    // if image has uploaded, and need to hidden popup upload image component
    if (productEditorReducers.isHideImageUploadForImageComponent) {
      // update to false
      actions.updateIsHiddenUploadForImageComponentToFalse();

      this.setState({formImageComponentUpload: ""});
      unMaskBody(this.ipPopupComponentImageUpload, 3);
    }

    // is calling enable tempProductId from editor tool
    if (productEditorReducers.callingUsedTempProductId) {
      // call parent function from props to active tempProduct to true
      this.props.enableTempProduct(productEditorReducers.tempProductId);
      // update to false
      actions.isUpdateCallingUsedTempProductIdToFalse();
    }
  }

  closeForm() {
    unMaskBody(this.props.idPopup, 2);
  }

  saveDesign() {
    const {productEditorReducers, actions, productId, detailReducers} = this.props;
    if (productEditorReducers.allowSaveWhenFetchedData) {
      actions.saveProductDesign(productEditorReducers, productId, detailReducers);
    }
    else {
      console.info("now allow save, because data is not loaded");
    }
  }

  render() {
    const {productEditorReducers, productId} = this.props;
    const isSavingHandling = productEditorReducers.isSaveHandling;
    return (
      <div className={s.root}>
        {this.state.formImageComponentUpload}
        <div className={`${s.panelPopup}`} data-popup-level="2" id={this.props.idPopup}>
          <div data-border="show" className={`${s.panel} ${s.popupContentPanel} ${s.wrapperMain}`}>
            <div className={s.panelHeader} data-border-bottom="false">
              <span className={s.title}>&nbsp;</span>
              <span onClick={this.closeForm.bind(this)} title="Đóng" className={s.close}/>
            </div>
            <div className={s.panelBody}>
              <div className={s.wrapperInside}>
                <ProductEditorDev productId={productId}/>
              </div>
            </div>
            <div className={s.panelFooter}>
              <div className={s.insideFooter}>
                <a className={s.btnDefaultLarge} onClick={this.closeForm.bind(this)}>Đóng</a>
                <button data-is-loading={isSavingHandling}
                        disabled={isSavingHandling}
                        className={`${s.btnBlueLarge} ${s.margin} ${s.btnLoading} ${(isSavingHandling ? s.btnDisable : '')}`}
                        onClick={this.saveDesign.bind(this)}>
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
    )
  }
}

export default withStyles(s)(DesignEditor);
