/**
 * Created by vuchien on 7/20/16.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FormInfoProduct.css';
import {maskBody, unMaskBody} from '../../../../../core/ui/modal';
import {formatVND} from '../../../../../components/commons';
import {reduxForm} from 'redux-form';
import FormUploadPreviewIndex from './formUploadPreview/index';
import Loading from '../../../../../components/Loading';
import {uploadProduct} from '../../../../../config';

export const fields = ['name', 'price'];
const MESS_PRODUCT_NAME = 'Vui lòng nhập tên sản phẩm';
const MESS_PRODUCT_PRICE = 'Vui lòng nhập giá sản phẩm';

class FormInfoProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputInfoIsError: false,
      inputInfoShowMsg: false,
      files: [],
      formUploadPreView: '',
      currentImageActive: '',
    };
    this.idPopupFormUploadPreview = 'idPopupFormUploadPreview';
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.resetFormEditInfoProduct();

    // set first id to currentImageActive
    const {productDetailReducers} = this.props;
    const detailCopy = productDetailReducers.detailCopy;
    if (detailCopy.listImages.length > 0) {
      this.setState({currentImageActive: 0});
    }
  }

  componentDidUpdate() {
    const {productDetailReducers, actions} = this.props;
    if (productDetailReducers.isAddedNewItemToListImageDetailCopy) {
      actions.updateAddedNewItemToListImageDetailCopyToFalse();
      // set active to last item inserted
      const lengthListImageCopy = productDetailReducers.detailCopy.listImages.length;
      const index = lengthListImageCopy - 1; // last id inserted
      this.itemImageClick(index);
    }
  }

  formUnmaskBody() {
    unMaskBody(this.props.idPopup);
  }

  priceOnChange(e) {
    const price = e.target.value;
    const priceFormat = formatVND(price);
    this.props.fields.price.onChange(priceFormat);
  }

  removeItemListImage(id) {
    const {actions} = this.props;
    actions.removeItemListImage(id);
  }

  removeItemHighLightInfo(id) {
    const {actions} = this.props;
    actions.removeHighLightInfoItem(id);
  }

  addNewTextHighLightInfo() {
    // get input value
    const infoValue = this.refs.txtInputInfo.value;
    if (infoValue.trim().length == 0) {
      this.setState({
        inputInfoIsError: true,
        inputInfoShowMsg: true,
      });
    } else {
      this.setState({
        inputInfoIsError: false,
        inputInfoShowMsg: false,
      });
      const {actions} = this.props;
      actions.addItemInfoHighLight(infoValue);

      // reset input value
      this.refs.txtInputInfo.value = '';
    }
  }

  showFormUploadPreview() {
    this.setState({formUploadPreView: ''}, function () {
      this.setState({
        formUploadPreView: <FormUploadPreviewIndex idPopup={this.idPopupFormUploadPreview}/>,
      });
    });
    maskBody(2);
  }

  itemImageClick(index) {
    this.setState({
      currentImageActive: index,
    });
    const {actions} = this.props;
    actions.changeProductSelectByIndexListImage_detailCopy(index);
  }

  render() {
    const {productDetailReducers, fields: {name, price}, handleSubmit} = this.props;
    const detailCopy = productDetailReducers.detailCopy;
    const urlProductImage = uploadProduct.urlProductImage;
    return (
      <div>
        <div>{this.state.formUploadPreView}</div>
        <div className={`${s.panelPopup}`} id={this.props.idPopup}>
          <div data-border="show" className={`${s.panel} ${s.popupContentPanel} ${s.wrapFormProductInfo}`}>
            <div className={s.panelHeader}>
              <span className={s.title}>Thông tin sản phẩm</span>
              <span onClick={this.formUnmaskBody.bind(this)} title="Đóng" className={s.close}/>
            </div>
            <div className={s.panelBody}>
              <form onSubmit={handleSubmit}>
                <div className={s.wrapperInside}>
                  <div className={s.rightInfoProduct}>
                    <div className={s.wrapperImageChoice}>
                      <div className={s.wrapImage}>
                        {(() => {
                          if (detailCopy.productSelected._id == '') {
                            return (
                              <div className={s.defaultImage}></div>
                            );
                          } else {
                            if (detailCopy.productSelected.fileXSmall_absolutePath == '') {
                              return (
                                <img src={urlProductImage + detailCopy.productSelected.image_medium}/>
                              );
                            } else {
                              return (
                                <img src={detailCopy.productSelected.image_medium}/>
                              );
                            }
                          }
                        })()}
                      </div>
                      <div className={s.wrapperImageList}>
                        <div className={s.imageItems}>
                          {detailCopy.listImages.map((item, index) =>
                            <div key={index} className={s.item}>
                              <div className={s.wrapperImage}>
                                <a className={this.state.currentImageActive == index ? s.active : ''}
                                   onClick={this.itemImageClick.bind(this, index)}
                                >
                                  {item.fileXSmall_absolutePath == '' ?
                                    <img src={urlProductImage + item.image_xsmall}/> : <img src={item.image_xsmall}/>}
                                </a>
                                <span onClick={this.removeItemListImage.bind(this, item._id)} className={s.closeIcon}/>
                              </div>
                            </div>
                          )}
                          <div className={s.item}>
                            <a onClick={this.showFormUploadPreview.bind(this)} title="Thêm ảnh sản phẩm"
                               className={s.iconAddNew}
                            />
                          </div>
                          <div className={s.clear}/>
                        </div>
                      </div>
                    </div>
                    <div className={s.wrapperInfoRight}>
                      <div className={s.wrapInside}>
                        <div
                          className={`${s.formGroup} ${(name.touched && name.error ? s.hasError : '')}`}
                        >
                          <label>Tên sản phẩm</label>
                          <input {...name} spellCheck="false" className={s.input} type="text"/>
                          {name.touched && name.error &&
                          <div className={s.errorMessage}>{name.error}</div>}
                        </div>
                        <div
                          className={`${s.formGroup} ${s.formPrice} ${(price.touched && price.error ? s.hasError : '')}`}
                        >
                          <label>Giá sản phẩm</label>
                          <div className={s.wrapperInline}>
                            <input {...price} onChange={this.priceOnChange.bind(this)} className={s.input} type="text"/>
                            <span className={s.priceUnit}>VNĐ</span>
                          </div>
                          {price.touched && price.error &&
                          <div className={s.errorMessage}>{price.error}</div>}
                          <div className={s.clear}/>
                        </div>
                        <div className={s.formGroup}>
                          <div className={s.wrapperListHighLightInfo}>
                            <div className={s.wrapperHeader}>
                              <label className={s.decryptionFeature}>Chức năng sản phẩm</label>
                            </div>
                            <div className={s.wrapperAction}>
                              <div
                                className={`${s.formGroup} ${s.formInputInfo} ${s.formGroupInline} ${(this.state.inputInfoIsError ? s.hasError : '')}`}>
                                <div className={s.wrapperTextInfo}>
                                  <textarea
                                    spellCheck="false"
                                    placeholder="Nhập nội dung"
                                    ref="txtInputInfo"
                                    className={`${s.input} ${s.inputInfo}`}
                                  />
                                  <div data-show={this.state.inputInfoShowMsg} className={s.errorMessage}>Vui lòng nhập
                                    nội dung
                                  </div>
                                </div>
                                <div className={s.wrapperBtnForm}>
                                  <a onClick={this.addNewTextHighLightInfo.bind(this)}
                                     className={s.btnDefaultLarge}
                                  >Thêm</a>
                                </div>
                                <div className={s.clear}></div>
                              </div>
                            </div>
                          </div>
                          <div className={s.wrapperListItemsHighLight}>
                            <ul>
                              {detailCopy.highLightInfo.map(item =>
                                <li key={item._id}>
                                  <span title="Xóa bản ghi" onClick={this.removeItemHighLightInfo.bind(this, item._id)}
                                        className={s.removeItem}
                                  />
                                  <a>{item.value}</a>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={s.clear}/>
                  </div>
                  <div className={s.clear}/>
                </div>
                <div className={s.panelFooter}>
                  <div className={s.insideFooter}>
                    <a onClick={this.formUnmaskBody.bind(this)}
                       className={`${s.btnDefaultLarge}`}
                    >Đóng
                    </a>
                    <button
                      disabled={productDetailReducers.isUpdatingProductInfo}
                      data-is-loading={productDetailReducers.isUpdatingProductInfo} type="submit"
                      className={`${s.btn} ${s.btnBlueLarge} ${s.margin} ${s.btnLoading} ${(productDetailReducers.isUpdatingProductInfo ? s.btnDisable : '')}`}
                    >
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
    );
  }
}

function validate(data) {
  const errors = {};
  if (!data.name) {
    errors.name = MESS_PRODUCT_NAME;
  }
  if (!data.price) {
    errors.price = MESS_PRODUCT_PRICE;
  }
  return errors;
}

FormInfoProduct = reduxForm({ // eslint-disable-line
  form: 'FormInfoProduct',
  fields,
  validate,
})(FormInfoProduct);

export default withStyles(s)(FormInfoProduct);
