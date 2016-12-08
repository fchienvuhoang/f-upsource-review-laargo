/**
 * Created by vuchien on 7/14/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MainSection.css';
import {menuActive} from '../../../components/commons';
import {VIEW_PRODUCT} from '../../../components/viewConstants';
import Link from '../../../components/Link';
import {timeFormat} from '../../../components/commons';
import {productThumbDefaultImage, uploadProduct, productUrlModule} from '../../../config';
import Confirm from '../../../components/Confirm/Confirm';
import {maskBody, unMaskBody} from '../../../core/ui/modal';
import ChangeName from '../../../components/ChangeName/ChangeName';

class MainSection extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      confirmForm: '',
      keyWordTypingSearch: '',
      changeNameForm: '',
    };
    this.idConfirmForm = 'popupConfirmForm';
    this.idChangeNameForm = 'popupChangeNameForm';
  }

  onChangeKeywordSearch(e) {
    this.setState({keyWordTypingSearch: e.target.value});
  }

  componentDidMount() {
    menuActive(VIEW_PRODUCT);
    // reset detail product form before fetch data detail from server
    const {actions} = this.props;
    actions.fetchAllProducts();
    actions.resetDetaiProduct();
  }

  componentDidUpdate() {
    const {productsReducers, actions} = this.props;

    if (productsReducers.isRemovedProduct) {
      // update to false
      actions.resetStateRemoveProduct();
      // hide form confirm
      this.hideConfirmForm();
    }

    // if product name changed
    if(productsReducers.isChangedProductName){
      // update to false
      actions.resetStateChangeProductName();
      this.hideChangeNameForm();
    }
  }

  searchTyping() {
    const {actions} = this.props;
    actions.searchByKeyword(this.state.keyWordTypingSearch);
  }

  prevPaging() {
    const {productsReducers, actions} = this.props;
    actions.prevPageAction(productsReducers.paging.flagPrePage, productsReducers.paging.currentPage);
  }

  nextPaging() {
    const {productsReducers, actions} = this.props;
    actions.nextPageAction(productsReducers.paging.flagNextPage, productsReducers.paging.currentPage);
  }

  deleteAction(productId, productIndex) {
    const {actions} = this.props;
    actions.removeProduct(productId, productIndex);
  }

  editNameAction = (id, index, value) => {
    const {actions} = this.props;
    actions.changeProductName(id, index, value);
  };


  hideConfirmForm() {
    this.setState({confirmForm: ""});
    unMaskBody(this.idConfirmForm);
  }

  showConfirmForm = (productId, productIndex) => {
    this.setState({confirmForm: ""}, function () {
      this.setState({
        confirmForm: <Confirm id={this.idConfirmForm} hideConfirmForm={this.hideConfirmForm.bind(this)}
                              itemId={productId}
                              index={productIndex}
                              deleteAction={this.deleteAction.bind(this)}/>
      });
      maskBody();
    });
  };

  showChangeNameForm = (id, index, value) => {
    this.setState({changeNameForm: ''}, function () {
      this.setState({
        changeNameForm: <ChangeName editNameAction={(_id, _index, _value) => this.editNameAction(_id, _index, _value)}
                                    id={this.idChangeNameForm} itemId={id}
                                    index={index} value={value}/>
      });
      maskBody();
    });
  };

  hideChangeNameForm = () => {
    this.setState({changeNameForm: ""});
    unMaskBody(this.idChangeNameForm);
  };

  render() {
    const {productsReducers} = this.props;
    const urlProductImage = uploadProduct.urlProductImage;
    return (
      <div>
        {this.state.confirmForm}
        {this.state.changeNameForm}
        <div className={s.panel}>
          <div className={s.panelHeader}>
            <label className={s.title}>Sản phẩm</label>
            <div className={s.optionTable}>
              <Link className={`${s.btnBlueLarge} ${s.withIcon}`} to={productUrlModule + "isnew"}>
                <span className={s.addIcon}/>
                Tạo sản phẩm
              </Link>
            </div>
          </div>
          <div className={s.panelBody}>
            <div className={s.table}>
              <div className={s.header}>
                <div className={s.wrapperSearch}>
                  <input value={this.state.keyWordTypingSearch}
                         placeholder="Tìm kiếm..."
                         onChange={this.onChangeKeywordSearch.bind(this)} onKeyUp={this.searchTyping.bind(this)}
                         className={s.inputSearch} type="text"/>
                  <i className={s.iconSearch}/>
                </div>
                <div className={s.rightOption}>
                  <div className={s.paging}>
                    <span className={s.itemInfo}>{productsReducers.paging.pagingDes}</span>
                    <a onClick={this.prevPaging.bind(this)} data-visible={productsReducers.paging.flagPrePage}
                       className={`${s.prev}`}>
                      <i/>
                    </a>
                    <a onClick={this.nextPaging.bind(this)} data-visible={productsReducers.paging.flagNextPage}
                       className={`${s.next}`}>
                      <i/>
                    </a>
                  </div>
                </div>
                <div className={s.clear}></div>
              </div>
              <div className={s.body}>
                <div data-show={productsReducers.isFetchingListProducts} className={s.centerLoadingBg}/>
                <div className={s._wrap} data-show={productsReducers.showContentListProducts}>
                  <table id={s.productTable} data-hover="true">
                    <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th>T/g cập nhật</th>
                    </tr>
                    </thead>
                    {productsReducers.items.map((item, index) =>
                      <RenderRowItem showChangeNameForm={this.showChangeNameForm} index={index}
                                     showConfirmForm={this.showConfirmForm} key={index} item={item}
                                     urlProductImage={urlProductImage}/>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class RenderRowItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isShowOption: false}
  }

  componentWillMount() {
    if (typeof document != 'undefined') {
      document.addEventListener('click', this.handleClick.bind(this), false);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick.bind(this), false);
  }

  handleClick(e) {
    if (ReactDOM.findDOMNode(this.refs.area) != null) {
      if (ReactDOM.findDOMNode(this.refs.area).contains(e.target)) {
        return;
      } else {
        this.hideOption();
      }
    }
  }

  hideOption() {
    this.setState({isShowOption: false});
  }

  showOption() {
    this.setState({isShowOption: true});
  }

  showConfirmForm(productId, productIndex) {
    const {showConfirmForm} = this.props;
    showConfirmForm(productId, productIndex);
  }

  showChangeForm(id, index, value) {
    const {showChangeNameForm} = this.props;
    showChangeNameForm(id, index, value);
  }

  render() {
    const {item, urlProductImage, index} = this.props;
    return (
      <tbody onClick={this.showOption.bind(this)} ref='area'>
      <tr>
        <td>
          <div className={s.wrapperProductName}>
            <div className={s.wrapImage}>
              <img className={s.image}
                   src={item.productSelected.image_xsmall == "" ? productThumbDefaultImage : (urlProductImage + item.productSelected.image_xsmall)}/>
            </div>
            <div className={s.wrapName}>
              <Link className={s.categoryName}
                    to={productUrlModule + item._id}>{item.name}</Link>
            </div>
            <div className={s.clear}></div>
          </div>
        </td>
        <td>
          <div className={s.wrapperProductPrice}>
            <label>{item.price} <span className={s.unitPrice}>vnđ</span></label>
          </div>
        </td>
        <td>
          <p className={s.timeCreate}>{timeFormat(item.time_create)}</p>
        </td>
      </tr>
      <tr>
        <td colSpan="3" className={s.rowOption} data-show={this.state.isShowOption}>
          <div className={s.wrapperOptionTable}>
            <ul>
              <li>
                <a onClick={() => this.showConfirmForm(item._id, index)}><span className={`${s.icon}`}/><span
                  className={s.value}>Xóa</span></a>
                <span className={s.clear}/>
              </li>
              <li>
                <a onClick={() => this.showChangeForm(item._id, index, item.name)}><span
                  className={`${s.icon} ${s.editIcon}`}/><span className={s.value}>Sửa tên</span></a>
                <span className={s.clear}/>
              </li>
              <li className={s.clear}/>
            </ul>
          </div>
        </td>
      </tr>
      </tbody>
    )
  }

}

export default withStyles(s)(MainSection);
