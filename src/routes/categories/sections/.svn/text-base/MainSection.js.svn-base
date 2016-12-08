/**
 * Created by vuchien on 6/18/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MainLayout from '../../../components/Layouts/MainLayout';
import s from './MainSection.css';
import Link from '../../../components/Link';
import {timeFormat} from '../../../components/commons';
import CreateCategory from './createCategory/CreateCategory';
import {maskBody, unMaskBody} from '../../../core/ui/modal';
import {menuActive} from '../../../components/commons';
import {VIEW_CATEGORY} from '../../../components/viewConstants';
import Confirm from '../../../components/Confirm/Confirm';
import ChangeName from '../../../components/ChangeName/ChangeName';

class MainSection extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      createCategoryForm: '',
      confirmForm: '',
      changeNameForm: '',
      keyWordTypingSearch: '',
    };
    this.idPopupForm = 'popupFormCategories';
    this.idConfirmForm = 'popupConfirmForm';
    this.idChangeNameForm = 'popupChangeNameForm';
  }

  componentDidUpdate() {
    const {categoriesReducers, actions} = this.props;

    if (categoriesReducers.isAddedNewCategory) {
      // hide popup and update status isAddedNewCategory to false
      actions.isAddedNewCategoryToFalse();
      unMaskBody(this.idPopupForm);
    }

    // if removed a category
    if (categoriesReducers.isRemovedCategory) {
      actions.resetStateRemoveCategory();
      // hide form confirm
      this.hideConfirmForm();
    }

    // if changed a category name
    if (categoriesReducers.isChangedCateName) {
      // update state to false
      actions.resetStateChangeCategory();
      this.hideChangeNameForm();
    }
  }

  componentDidMount() {
    menuActive(VIEW_CATEGORY);
    const {actions} = this.props;
    actions.fetchAllCategories();
  }

  handleSubmit(data) {
    const {actions} = this.props;
    actions.addCategory(data.categoryName);
  }

  searchTyping() {
    const {actions} = this.props;
    actions.searchByKeyword(this.state.keyWordTypingSearch);
  }

  onChangeKeywordSearch(e) {
    this.setState({keyWordTypingSearch: e.target.value});
  }

  showCreateCategory() {
    // new component append
    this.setState({createCategoryForm: ''}, () =>
      this.setState({
        createCategoryForm: <CreateCategory onSubmit={this.handleSubmit.bind(this)} id={this.idPopupForm}/>,
      })
    );
    maskBody();
  }

  nextPaging() {
    const {categoriesReducers, actions} = this.props;
    actions.nextPageAction(categoriesReducers.paging.flagNextPage, categoriesReducers.paging.currentPage);
  }

  prevPaging() {
    const {categoriesReducers, actions} = this.props;
    actions.prevPageAction(categoriesReducers.paging.flagPrePage, categoriesReducers.paging.currentPage);
  }

  deleteAction(cateId, cateIndex) {
    const {actions} = this.props;
    actions.removeCategory(cateId, cateIndex);
  }

  editNameAction = (id, index, value) => {
    const {actions} = this.props;
    actions.changeCategoryName(id, index, value);
  };

  hideConfirmForm() {
    this.setState({confirmForm: ""});
    unMaskBody(this.idConfirmForm);
  }

  showConfirmForm = (cateId, cateIndex) => {
    this.setState({confirmForm: ''}, function () {
      this.setState({
        confirmForm: <Confirm id={this.idConfirmForm} hideConfirmForm={this.hideConfirmForm.bind(this)} itemId={cateId}
                              index={cateIndex}
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
    const {categoriesReducers} = this.props;
    return (
      <MainLayout>
        <div>{this.state.confirmForm}</div>
        <div>{this.state.changeNameForm}</div>
        <div>{this.state.createCategoryForm}</div>
        <div className={s.panel}>
          <div className={s.panelHeader}>
            <span className={s.title}>Danh mục</span>
            <div className={s.optionTable}>
              <button onClick={this.showCreateCategory.bind(this)}
                      className={`${s.btnBlueLarge} ${s.withIcon}`}>
                <span className={s.addIcon}/>
                Tạo danh mục
              </button>
            </div>
            <div className={s.clear}></div>
          </div>
          <div className={s.panelBody}>
            <div>
              <div className={s.table}>
                <div className={s.header}>
                  <div className={s.wrapperSearch}>
                    <input value={this.state.keyWordTypingSearch}
                           onChange={this.onChangeKeywordSearch.bind(this)}
                           placeholder="Tìm kiếm..." onKeyUp={this.searchTyping.bind(this)}
                           className={s.inputSearch} type="text"/>
                    <i className={s.iconSearch}/>
                  </div>
                  <div className={s.rightOption}>
                    <div className={s.paging}>
                      <span className={s.itemInfo}>{categoriesReducers.paging.pagingDes}</span>
                      <a onClick={this.prevPaging.bind(this)}
                         data-visible={categoriesReducers.paging.flagPrePage}
                         className={`${s.prev}`}>
                        <i />
                      </a>
                      <a onClick={this.nextPaging.bind(this)}
                         data-visible={categoriesReducers.paging.flagNextPage}
                         className={`${s.next}`}>
                        <i />
                      </a>
                    </div>
                  </div>
                  <div className={s.clear}></div>
                </div>
                <div className={s.body}>
                  <div data-show={categoriesReducers.isFetching} className={s.centerLoadingBg}/>
                  <div className={s._wrap} data-show={categoriesReducers.showContentListCategories}>
                    <table data-hover="true">
                      <thead>
                      <tr>
                        <th style={{display: 'none'}}>
                        </th>
                        <th>Tên danh mục</th>
                        <th>T/g cập nhật</th>
                      </tr>
                      </thead>
                      {categoriesReducers.items.map((item, index) =>
                        <RenderRowItem index={index} showChangeNameForm={this.showChangeNameForm}
                                       showConfirmForm={this.showConfirmForm} item={item} key={index}/>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

class RenderRowItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isShowOption: false};
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

  hideOption = () => {
    this.setState({isShowOption: false});
  };

  showOption = () => {
    this.setState({isShowOption: true});
  };

  showConfirmForm(cateId, cateIndex) {
    const {showConfirmForm} = this.props;
    showConfirmForm(cateId, cateIndex);
  }

  showChangeForm(id, index, value) {
    const {showChangeNameForm} = this.props;
    showChangeNameForm(id, index, value);
  }

  render() {
    const {item, index} = this.props;
    return (
      <tbody onClick={()=>this.showOption()} ref="area">
      <tr>
        <td style={{display: 'none'}} className={s.checkBox}>
          <input type="checkbox" name="thing"
                 value={item._id}
                 id={'checkbox-' + item._id}
          />
          <label htmlFor={'checkbox-' + item._id}/>
        </td>
        <td>
          <Link className={s.categoryName}
                to={'/danh-muc/' + item._id}
          >{item.name}</Link>
        </td>
        <td>
          <p className={s.timeCreate}>{timeFormat(item.time_create)}</p>
        </td>
      </tr>
      <tr>
        <td colSpan="2" className={s.rowOption} data-show={this.state.isShowOption}>
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
    );
  }
}

export default withStyles(s)(MainSection);
