/**
 * Created by vuchien on 8/11/16.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditorTool.css';
import Options from './Options';
import DraftTitle from './commons/DraftTitle';
import DraftParagraph from './commons/DraftParagraph';
import Image from './commons/Image';
import * as types from '../../../constants/productEditorTypes';
import Loading from '../../../components/Loading';

class EditorTool extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowWrapDrop: false
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick.bind(this), false);
  }

  hideDropDownBox() {
    this.setState({isShowWrapDrop: false});
  }

  toggleDrop() {
    if (this.state.isShowWrapDrop) {
      this.setState({isShowWrapDrop: false});
    } else {
      this.setState({isShowWrapDrop: true});
    }
  }

  handleClick(e) {
    if (ReactDOM.findDOMNode(this.refs.area) != null) {
      if (ReactDOM.findDOMNode(this.refs.area).contains(e.target)) {
        return;
      } else {
        this.hideDropDownBox();
      }
    }
  }

  addRow(styleName) {
    const {actions} = this.props;
    actions.addRow(styleName);
  }

  componentDidMount() {
    const {actions, productId} = this.props;
    actions.fetchDetailProductDesign(productId);
  }

  componentDidUpdate() {
    const {productEditorReducers, actions} = this.props;
    // if up and down item is success
    if (productEditorReducers.isUpDownSuccess) {
      // set to false
      actions.isUpDownSuccess();
    }

    // if fetched data for edit mode
    if (productEditorReducers.isFetchedDesignData) {
      // update fetching status and fetchedDesign to false
      actions.updateFetchingAndFetchedStatusToFalse();
    }
  }

  render() {
    const {productEditorReducers, actions, initData, viewMode} = this.props;
    let rows;
    let _viewMode = false;
    if (viewMode != undefined && viewMode) { // is view mode true
      rows = initData;
      _viewMode = true;
    } else {
      rows = productEditorReducers.rows;
    }
    const isFetchingDesignData = productEditorReducers.isFetchingDesignData;
    return (
      <div className={s.root}>
        <div className={s.wrapperLoadingFetchingDesignData} data-view-mode={_viewMode} data-show={isFetchingDesignData}>
          <div className={s.wrapperInsideLoading}>
            <Loading scale="0.2" isBlack={true}/>
          </div>
        </div>
        <div className={s.wrapperMainEditor}>
          <div className={s.wrapperColumnItems} data-view-mode={_viewMode}>
            {rows.map((item, index) => {
              return (
                <RenderWrapColumns viewMode={viewMode} key={index} rowIndex={index} item={item} actions={actions}
                                   productEditorReducers={productEditorReducers}/>
              )
            })}
          </div>
          <div className={s.wrapperAddRow} data-view-mode={_viewMode}>
            <div className={s.wrapBtnAddRow} ref="area">
              <button className={s.btnAddRow} onClick={this.toggleDrop.bind(this)}>
                Thêm một dòng
              </button>
              <div className={s.wrapperRowStyles} data-show={this.state.isShowWrapDrop}>
                <div className={s.wrapperCaretUp}>
                  <i className={s.caret}/>
                  <i className={s.caretShaDown}/>
                </div>
                <div className={s.wrapperColumnStyles}>
                  <div className={s.wrapperStyleItem}>
                    <div className={s.wrapItem}>
                      <label className={s.styleName}>3 cột</label>
                      <div className={`${s.wrapperFullWith} ${s.column3}`}
                           onClick={this.addRow.bind(this, types.STYLE_THREE_COLUMN)}>
                        <div className={s.colItem}/>
                        <div className={s.colItem}/>
                        <div className={s.colItem}/>
                      </div>
                    </div>
                  </div>
                  <div className={s.wrapperStyleItem}>
                    <div className={s.wrapItem}>
                      <label className={s.styleName}>2 cột</label>
                      <div className={`${s.wrapperFullWith} ${s.column2}`}
                           onClick={this.addRow.bind(this, types.STYLE_TWO_COLUMN)}>
                        <div className={s.colItem}/>
                        <div className={s.colItem}/>
                      </div>
                    </div>
                  </div>
                  <div className={s.wrapperStyleItem}>
                    <div className={s.wrapItem}>
                      <label className={s.styleName}>1 cột</label>
                      <div className={`${s.wrapperFullWith} ${s.column1}`}
                           onClick={this.addRow.bind(this, types.STYLE_ONE_COLUMN)}>
                        <div className={s.colItem}/>
                      </div>
                    </div>
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

/**
 * Rows render
 * @param props
 * @returns {XML}
 * @constructor
 */
class RenderWrapColumns extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowWrapDrop: false
    };
    this.actions = this.props.actions;
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick.bind(this), false);
  }

  hideDropDownBox() {
    this.setState({isShowWrapDrop: false});
  }

  toggleDrop() {
    if (this.state.isShowWrapDrop) {
      this.setState({isShowWrapDrop: false});
    } else {
      this.setState({isShowWrapDrop: true});
    }
  }

  handleClick(e) {
    if (ReactDOM.findDOMNode(this.refs.area) != null) {
      if (ReactDOM.findDOMNode(this.refs.area).contains(e.target)) {
        return;
      } else {
        this.hideDropDownBox();
      }
    }
  }

  moveUp() {
    const {rowIndex} = this.props;
    this.hideDropDownBox();
    this.actions.rowMoveUpDown(rowIndex, (rowIndex - 1));
  };

  moveDown() {
    const {rowIndex} = this.props;
    this.hideDropDownBox();
    this.actions.rowMoveUpDown(rowIndex, (rowIndex + 1));
  }

  remove() {
    const {rowIndex} = this.props;
    this.hideDropDownBox();
    this.actions.removeRow(rowIndex);
  }

  render() {
    const {item, viewMode, rowIndex, productEditorReducers} = this.props;
    return (
      <div data-column={item.column} className={`${s.columnItems}`}>
        <div className={s.wrapColumns} data-view-mode={viewMode}>
          <div className={s.wrapRowOptions}>
            <div className={s.wrapperBtn} ref='area'>
              <a className={`${s.btnOptions}`} onClick={this.toggleDrop.bind(this)}>Tùy chọn</a>
              <div data-show={this.state.isShowWrapDrop} className={`${s.wrapperDropdown}`}>
                <div className={s.dropDown}>
                  <div className={s.dropBox}>
                    <ul className={s.dropItem} data-caret-left="true">
                      <li>
                        <a onClick={this.moveUp.bind(this)}>Di chuyển lên</a>
                      </li>
                      <li><a onClick={this.moveDown.bind(this)}>Di chuyển xuống</a></li>
                      <li>
                        <a onClick={this.remove.bind(this)}>Xóa hàng</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RenderColumn viewMode={viewMode} productEditorReducers={productEditorReducers}
                        rowIndex={rowIndex}
                        actions={this.actions} item={item}/>
        </div>
      </div>
    )
  }
}

const RenderColumn = (props) => {
  const item = props.item;
  const columns = item.row; // row content columns
  var indents = [];
  columns.map((item, index) => {
    indents.push(
      <RenderColumnItem columnIndex={index}
                        rowIndex={props.rowIndex}
                        productEditorReducers={props.productEditorReducers}
                        actions={props.actions}
                        key={index}
                        item={item}
                        viewMode={props.viewMode}/>
    );
  });
  return (
    <div className={s.columnSingleWrap}>
      {indents}
    </div>
  );
};

class RenderColumnItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {productEditorReducers, actions, item, columnIndex, rowIndex, viewMode} = this.props;
    const columnItems = item.items;
    const columnId = item.id;
    return (
      <div className={s.column} data-view-mode={viewMode}>
        <div className={s.wrapContentOptions} data-view-mode={viewMode}>
          <Options columnIndex={columnIndex} rowIndex={rowIndex} columnId={columnId}
                   productEditorReducers={productEditorReducers} actions={actions}/>
        </div>
        <div className={s.wrapperItemsInColumn} id={columnId}>
          {
            columnItems.map((item, index)=> {
              const params = {index: index, rowIndex: rowIndex, columnIndex: columnIndex, columnId: columnId};
              const itemId = item.id;
              return (
                <div key={index} className={s.item}>
                  {(() => {
                    switch (item.type) {
                      case types.COMPONENT_TITLE_TEXT:
                        return <DraftTitle raw={item.raw} key={itemId} params={params}
                                           actions={actions}/>;
                      case types.COMPONENT_PARAGRAPH:
                        return <DraftParagraph raw={item.raw} key={itemId} params={params}
                                               actions={actions}/>;
                      case types.COMPONENT_IMAGE:
                        return <Image actions={actions} key={itemId} params={params}
                                      imageTempViewPath={item.imageTempViewPath} imagePath={item.imagePath}/>;
                      default:
                        return (
                          <div key={itemId}>{item.type}</div>
                        )
                    }
                  })()}
                  <RenderItems columnId={columnId} actions={actions} index={index} rowIndex={rowIndex}
                               columnIndex={columnIndex}
                               itemId={itemId}/>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

class RenderItems extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowWrapDrop: false
    };
    this.actions = this.props.actions;
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick.bind(this), false);
  }

  handleClick(e) {
    if (ReactDOM.findDOMNode(this.refs.area) != null) {
      if (ReactDOM.findDOMNode(this.refs.area).contains(e.target)) {
        return;
      } else {
        this.hideDropDownBox();
      }
    }
  }

  hideDropDownBox() {
    this.setState({isShowWrapDrop: false});
  }

  toggleDrop() {
    if (this.state.isShowWrapDrop) {
      this.setState({isShowWrapDrop: false});
    } else {
      this.setState({isShowWrapDrop: true});
    }
  }

  upItem(indexItem, rowIndex, columnIndex, itemId) {
    this.hideDropDownBox();
    this.actions.upDownIndex(indexItem, (indexItem - 1), rowIndex, columnIndex, itemId);
  }

  downItem(indexItem, rowIndex, columnIndex, itemId) {
    this.hideDropDownBox();
    this.actions.upDownIndex(indexItem, (indexItem + 1), rowIndex, columnIndex, itemId);
  }

  removeItem(indexItem, rowIndex, columnIndex, columnId) {
    this.hideDropDownBox();
    this.actions.removeItem(indexItem, rowIndex, columnIndex, columnId);
  }

  render() {
    const {index, rowIndex, columnIndex, itemId, columnId} = this.props;
    return (
      <div className={`${s.contentOptionsItem}`} ref="area">
        <div data-active={this.state.isShowWrapDrop} id={itemId}
             className={`${s.navigatorOptionsColumn}`} onClick={this.toggleDrop.bind(this)}>
          <div className={s.centerIcon}/>
        </div>
        <div className={`${s.wrapperDropDownListOptionColumn}`} data-show={this.state.isShowWrapDrop}>
          <div className={s.dropDown}>
            <div className={s.dropBox}>
              <ul className={s.dropItem}>
                <li>
                  <a onClick={this.upItem.bind(this, index, rowIndex, columnIndex, itemId)}>Di chuyển
                    lên</a>
                </li>
                <li>
                  <a onClick={this.downItem.bind(this, index, rowIndex, columnIndex, itemId)}>Di chuyển
                    xuống</a>
                </li>
                <li>
                  <a onClick={this.removeItem.bind(this, index, rowIndex, columnIndex, columnId)}>Xóa bản
                    ghi</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(EditorTool);
