/**
 * Created by vuchien on 7/23/16.
 */

import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FormUploadPreview.css';
import {unMaskBody} from '../../../../../../core/ui/modal';
import DropZone from 'react-dropzone';
import request from 'superagent';
import Loading from '../../../../../../components/Loading';

class FormUploadPreview extends Component {
  constructor(props) {
    super(props);
  }

  onDrop(files) {
    const {actions} = this.props;
    // show loading image
    actions.updateLoadingUploadCopyTrue();
    var req = request.post('/upload');
    files.forEach((file)=> {
      req.attach(file.name, file);
    });
    req.end(function (err, res) {
      if (err || !res.ok) {
        actions.updateLoadingUploadCopyToFalse();
      } else {
        actions.updateDetailCopy(res.text);
      }
    });
  }

  componentDidUpdate() {
    const {productDetailReducers, actions} = this.props;
    if (productDetailReducers.isAppendNewItemToListImageDetailCopy_previewZone) {
      actions.updateIsAppendNewItemToListImageDetailCopyToFalse_previewZone();
      this.closeForm(); // close form and update isAppendNewItemToListImageDetailCody to false
    }
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  closeForm() {
    unMaskBody(this.props.idPopup, 2);
  }

  saveUploadProduct() {
    const {actions} = this.props;
    actions.saveUploadProduct();
  }

  render() {
    const {productDetailReducers} = this.props;
    const detailCopyUpload = productDetailReducers.detailCopyUpload;
    return (
      <div className={`${s.panelPopup}`} data-popup-level="2" id={this.props.idPopup}>
        <div data-border="show" className={`${s.panel} ${s.popupContentPanel} ${s.wrapperMain}`}>
          <div className={s.panelHeader}>
            <span className={s.title}>Thêm ảnh sản phẩm</span>
            <span onClick={this.closeForm.bind(this)} title="Đóng" className={s.close}/>
          </div>
          <div className={s.panelBody}>
            <div className={s.wrapperInside}>
              <div className={s.wrapperBtnUpload}>
                <div className={s.wrapperButton}>
                  <DropZone ref="dropzone" multiple={false} accept="image/*" onDrop={this.onDrop.bind(this)}
                            className={s.wrapperForDropZone}
                            activeClassName={s.wrapperDropZoneActive}>
                    <a className={s.btnDefaultLarge}>Tải lên ảnh</a>
                  </DropZone>
                </div>
                <div className={s.wrapperDecryption}>
                  <span>Hình ảnh được tải lên chiều rộng cần lớn hơn 300px</span>
                </div>
              </div>
              <div className={s.wrapperPreviewImageUploaded}>
                <div className={s.wrapperTitle}>
                  <label>Xem truớc sau khi tải lên, hình ảnh được tối ưu để hiển thị trên các vị trí khác nhau trên
                    site</label>
                </div>
                <div data-show={productDetailReducers.isLoadingDetailUpload} className={s.centerLoadingBg}/>
                <div className={s.wrapperListImageAfterResize}>
                  <div data-size="large" className={`${s.item}`}>
                    <div className={s.wraperImageInside}>
                      <img src={detailCopyUpload.fileLarge}/>
                    </div>
                  </div>
                  <div data-size="medium" className={`${s.item}`}>
                    <div className={s.wraperImageInside}>
                      <img src={detailCopyUpload.fileMedium}/>
                    </div>
                  </div>
                  <div data-size="small" className={`${s.item}`}>
                    <div className={s.wraperImageInside}>
                      <img src={detailCopyUpload.fileSmall}/>
                    </div>
                  </div>
                  <div className={`${s.item}`}>
                    <div data-size="xsmall" className={s.wraperImageInside}>
                      <img src={detailCopyUpload.fileXSmall}/>
                    </div>
                  </div>
                  <div className={s.clear}></div>
                </div>
              </div>
            </div>
            <div className={s.panelFooter}>
              <div className={s.insideFooter}>
                <a onClick={this.closeForm.bind(this)} className={`${s.btnDefaultLarge}`}>Đóng
                </a>
                <a onClick={this.saveUploadProduct.bind(this)}
                   data-is-loading={productDetailReducers.isHandlingAddNewImageToListImages}
                   className={`${s.btn} ${s.btnBlueLarge} ${s.margin} ${s.btnLoading} ${(productDetailReducers.isHandlingAddNewImageToListImages ? s.btnDisable : '')}`}>
                  <div className={s.wrapperLoading}>
                    <Loading scale="0.1"/>
                  </div>
                  Lưu thay đổi
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(FormUploadPreview);
