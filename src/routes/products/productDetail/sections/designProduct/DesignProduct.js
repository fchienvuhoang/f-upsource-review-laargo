/**
 * Created by vuchien on 8/16/16.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DesignProduct.css';
import {unMaskBody, maskBody} from '../../../../../core/ui/modal';
import DesignEditorIndex from './designEditor/index';
import Loading from '../../../../../components/Loading';
import EditorProduction from '../../../../../components/ProductEditorProduction/EditorProduction';

const MESS_EMPTY_DESIGN = "Sản phẩm này chưa có thiết kế chi tiết, Hãy tạo 1 thiết kế chi tiết cho sản phẩm bằng cách nhấn vào nút chỉnh sửa bên góc phải";

class DesignProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {formDesignEditor: ""};
    this.ipPopupDesignEditor = "ipPopupDesignEditor";
  }

  formUnmaskBody() {
    unMaskBody(this.props.idPopup);
  }

  enableTempProduct(productId) {
    const {actions} = this.props;
    actions.activeUsedTempProductMode(productId);
  }

  /**
   * function re fetching data after editor form is closed
   * @param productId passed from ProductEditorReducers,
   * will using this productId because this action will run before updateTemProduct mode in productDetailReducers
   */
  isFormDesignEditorSaved(newerProductId) {
    // re-fetching data
    const {actions} = this.props;
    let productId;
    if (newerProductId != "") {
      productId = newerProductId;
    } else {
      productId = this.props.productId;
    }
    // checking tempProductId is enable
    actions.fetchDetailProductDesign(productId);
  }

  showFormDesignEditor() {
    const {productDetailReducers} = this.props;
    const detailReducers = {
      isUsed_tempProductId: productDetailReducers.detail.isUsed_tempProductId,
      is_tempProductId: productDetailReducers.detail.is_tempProductId
    };
    // checking tempProductId is enable
    let productId;
    if (productDetailReducers.detail.isUsed_tempProductId) {
      productId = productDetailReducers.detail.is_tempProductId;
    } else {
      productId = this.props.productId;
    }

    this.setState({formDesignEditor: ""}, function () {
      this.setState({
        formDesignEditor: <DesignEditorIndex onFormSaved={this.isFormDesignEditorSaved.bind(this)}
                                             productId={productId}
                                             detailReducers={detailReducers}
                                             enableTempProduct={this.enableTempProduct.bind(this)}
                                             idPopup={this.ipPopupDesignEditor}/>
      })
    });
    maskBody(2);
  }

  render() {
    const {productDetailReducers} = this.props;
    const designData = productDetailReducers.detailDesign;
    const isFetchingForEditMode = false;
    return (
      <div>
        <div>{this.state.formDesignEditor}</div>
        <div className={`${s.panelPopup}`} id={this.props.idPopup}>
          <div data-border="show" className={`${s.panel} ${s.popupContentPanel} ${s.wrapDesignProductView}`}>
            <div className={s.panelHeader}>
              <span className={s.title}>Thiết kế thông tin sản phẩm</span>
              <span onClick={this.formUnmaskBody.bind(this)} title="Đóng" className={s.close}/>
            </div>
            <div className={s.panelBody}>
              <div className={s.wrapperInside}>
                <div className={s.wrapOptionDesignForm}>
                  <ul>
                    <li>
                      <button data-is-loading={isFetchingForEditMode} disabled={isFetchingForEditMode}
                              className={`${s.btnDefaultLarge} ${s.btnLoading} ${(isFetchingForEditMode ? s.btnDisable : '')}`}
                              onClick={this.showFormDesignEditor.bind(this)}>
                        <div className={s.wrapperLoading}>
                          <Loading scale="0.1" isBlack={true}/>
                        </div>
                        Thiết kế
                      </button>
                    </li>
                  </ul>
                  <div className={s.clear}></div>
                </div>
                <div className={s.wrapperDesignViewContent}>
                  {designData == undefined || designData.length == 0 ?
                    <div className={s.emptyBox}>
                      <label>{MESS_EMPTY_DESIGN}</label>
                    </div>
                    :
                    <EditorProduction designData={designData}/>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(DesignProduct);
