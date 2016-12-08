/**
 * Created by vuchien on 7/18/16.
 */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DetailSection.css';
import { VIEW_PRODUCT } from '../../../../components/viewConstants';
import { menuActive } from '../../../../components/commons';
import IndexFormInfoProduct from './formInfoProduct/index';
import IndexFormAttributesProduct from './formAttributesProduct/index';
import IndexDesignProduct from './designProduct/index';
import { maskBody, unMaskBodyWithoutId } from '../../../../core/ui/modal';
import { timeOutPopup, uploadProduct } from '../../../../config';
import { ShowLoadingPanel, HideLoadingPanel } from '../../../../components/commons';
import Feedback from '../../../../components/Feedback/Feedback';

class DetailSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formInfoProduct: '',
      formAttributesProduct: '',
      formDesignProductView: '',
      currentImageActive: '',
    };
    this.idPopupFormInfoProduct = 'idPopupFormInfoProduct';
    this.idPopupFormAttributesProduct = 'idPopupFormAttributesProduct';
    this.idPopupFormDesignProduct = 'idPopupFormDesignProduct';
  }

  componentDidMount() {
    menuActive(VIEW_PRODUCT);
    const { productDetailReducers, actions, productId } = this.props;
    // Fetch detail product
    actions.fetchDetailProduct(productId);
    // Set first id to currentImageActive
    const detailCopy = productDetailReducers.detailCopy;
    if (detailCopy.listImages.length > 0) {
      this.setState({ currentImageActive: detailCopy.listImages[0]._id });
    }
  }

  componentDidUpdate() {
    const { productDetailReducers, actions } = this.props;

    /**
     * update finished product info
     */
    if (productDetailReducers.isUpdatedProductInfo) {
      /**
       * Update isUpdatedProductInfo to false
       */
      actions.updateIsUpdatedProductInfoToFalse();

      // hidden form update product info
      this.setState({ formInfoProduct: '' });
      unMaskBodyWithoutId();
    }

    /**
     * Is received product attributes detail
     */
    if (productDetailReducers.detailAttributeProduct.updateObj.receive) {
      // hide loading panel and show form detail attribute product
      // update receive status to false
      actions.updateProductAttributeReceiveToFalse();
      HideLoadingPanel();

      this.setState({ formAttributesProduct: '' }, function () {
        this.setState({
          formAttributesProduct: <IndexFormAttributesProduct
            productId={this.props.productId}
            idPopup={this.idPopupFormAttributesProduct}
          />,
        });
      });
      maskBody();
    }

    /**
     * Is received product design data
     */
    if (productDetailReducers.isReceiveDetailDesignData) {
      // set to false status
      actions.isReceivedDetailProductDesignToFalse();
      HideLoadingPanel();
      this.setState({ formDesignProductView: '' }, function () {
        this.setState({
          formDesignProductView: <IndexDesignProduct productId={this.props.productId}
            idPopup={this.idPopupFormDesignProduct}
          />,
        });
      });
      maskBody();
    }
  }

  showFormInfoProduct() {
    this.setState({ formInfoProduct: '' }, function () {
      this.setState({
        formInfoProduct: <IndexFormInfoProduct productId={this.props.productId} idPopup={this.idPopupFormInfoProduct} />,
      });
    });
    maskBody();
  }

  showFormAttributesProduct() {
    ShowLoadingPanel();
    const { productDetailReducers, actions } = this.props;
    let productId;
    if (productDetailReducers.detail.isUsed_tempProductId) {
      productId = productDetailReducers.detail.is_tempProductId;
    } else {
      productId = this.props.productId;
    }

    setTimeout(function () {
      actions.fetchDetailAttributeByProduct(productId);
    }, timeOutPopup);
  }

  showFormDesignProductView() {
    ShowLoadingPanel();
    const { productDetailReducers, actions } = this.props;
    let productId;
    if (productDetailReducers.detail.isUsed_tempProductId) {
      productId = productDetailReducers.detail.is_tempProductId;
    } else {
      productId = this.props.productId;
    }
    setTimeout(() => {
      actions.fetchDetailProductDesign(productId);
    }, timeOutPopup);
  }

  imageItemClick(index) {
    const { actions } = this.props;
    actions.changeProductSelectByIndexListImage_detail(index);

    this.setState({
      currentImageActive: index,
    });
  }

  render() {
    const { productDetailReducers } = this.props;
    const detail = productDetailReducers.detail;
    const listImages = detail.listImages;
    const highLightInfo = detail.highLightInfo;
    const categoryBelong = detail.categoryBelong;
    const urlProductImage = uploadProduct.urlProductImage;
    return (
      <div>
        <div>{this.state.formInfoProduct}</div>
        <div>{this.state.formAttributesProduct}</div>
        <div>{this.state.formDesignProductView}</div>
        <Feedback />
        <div className={s.panel}>
          <div className={s.panelHeader}>
            <span className={s.title}>Thông tin chung</span>
            <div className={s.rightPanelHeaderOption}>
              <ul>
                <li>
                  <a onClick={this.showFormInfoProduct.bind(this)}
                    className={`${s.btnDefault}`}
                  >Chỉnh sửa</a>
                </li>
              </ul>
            </div>
            <div className={s.clear} />
          </div>
          <div className={s.panelBody}>
            <div className={s.wrapperInside}>
              <div className={s.wrapperProductInfo}>
                <div className={s.leftSide}>
                </div>
                <div className={s.rightSide}>
                  <div className={s.wrapperImageSelect}>
                    <div className={s.contentImage}>
                      {(() => {
                        if (detail.productSelected._id == '') {
                          return (
                            <div className={s.defaultImage}></div>
                          );
                        } else {
                          return (
                            <img style={{ display: 'block' }}
                              src={urlProductImage + detail.productSelected.image_medium}
                            />
                          );
                        }
                      })()}
                    </div>
                    <div className={s.wrapperListImage}>
                      <ul>               {listImages.map((item, index) => <li key={index}><a
                        className={this.state.currentImageActive == index ? s.active : ''}
                        onClick={this.imageItemClick.bind(this, index)}
                      > <img
                        src={urlProductImage + item.image_xsmall}
                      /> </a></li>)}             </ul>
                    </div>
                  </div>
                  <div className={s.wrapperRightInfoProduct}>
                    <div className={s.inside}>
                      <div className={s.productName}>
                        <h2>{detail.name}</h2>
                      </div>
                      <div className={s.lineSpare}></div>
                      <div className={`${s.formGroup} ${s.notPaddingBottom} ${s.formGroupInline} ${s.wrapperProductPrice}`}>
                        <div className={s.colLabel}>
                          <label className={s.labelProductPrice}>Giá sản phẩm</label>
                        </div>
                        <div className={s.colValue}>
                          <div className={s.productPrice}>
                            <span className={s.priceProduct}>{detail.price}</span>
                            <span className={s.priceUnit}>VNĐ</span>
                            <span className={s.clear} />
                          </div>
                        </div>
                        <div className={s.clear}></div>
                      </div>
                      <div className={s.lineSpare}></div>
                      <div className={s.productHighLightInfo}>
                        <ul>
                          {highLightInfo.map(item =>
                            <li key={item._id}>
                              <p>{item.value}</p>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={s.clear}></div>
                </div>
                <div className={s.clear}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.wrapperAttributesProducts}>
          <div className={s.panel}>
            <div className={s.panelHeader}>
              <span className={s.title}>Thuộc tính</span>
              <div className={s.rightPanelHeaderOption}>
                <ul>
                  <li>
                    <a onClick={this.showFormAttributesProduct.bind(this)}
                      className={`${s.btnDefault}`}
                    >Chỉnh sửa</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={s.panelBody}>
              <div className={`${s.insideForm} ${s.wrapperInside}`}>
                <div className={s.formGroupTable}>
                  <table>
                    <tbody>
                    <tr>
                      <td className={s.label}>
                        <label className={s.categoryLabel}>Danh mục</label>
                      </td>
                      <td className={s.value}>
                        <label>{categoryBelong.category_name}</label>
                      </td>
                    </tr>
                    {categoryBelong.attributesSelect.map((item, index) =>
                      <tr key={index}>
                        <td className={s.label}>
                          <label>{item.attribute_name}</label>
                        </td>
                        <td className={s.value}>
                          <label>{item.option_name}</label>
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
        <div className={s.panel}>
          <div className={s.panelHeader}>
            <span className={s.title}>Chi tiết</span>
            <div className={s.rightPanelHeaderOption}>
              <ul>
                <li>
                  <a className={`${s.btnDefault}`} onClick={this.showFormDesignProductView.bind(this)}>Xem & Chỉnh
                    sửa</a>
                </li>
              </ul>
            </div>
          </div>
          <div className={s.panelBody}>
            <div className={s.wrapperInside}>
            </div>
          </div>
        </div>
        <div className={s.panel} style={{ display: 'none' }}>
          <div className={s.panelBody}>
            <div className={s.wrapperInside}>
              <div className={s.wrapperListButton}>
                <a className={`${s.btnDefaultLarge} ${s.itemListButton}`}>Hủy bỏ</a>
                <button className={`${s.btnGreenLarge} ${s.itemListButton}`}>Lưu thay đổi</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(DetailSection);
