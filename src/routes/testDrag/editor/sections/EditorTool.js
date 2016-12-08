/**
 * Created by vuchien on 8/11/16.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditorTool.css';
import Options from './Options';
import {
  reShowDropWhenUpDownItem
} from '../../../../components/commons';
import DraftTitle from './commons/DraftTitle';
import DraftParagraph from './commons/DraftParagraph';
import Image from './commons/Image';
import {navigatorOptionsColumn, wrapperOptionsColumn} from '../../../../config';
import * as types from '../../../../constants/productEditorTypes';

class EditorTool extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowListStylesRow: false
    }
  }

  addRow(styleName) {
    const {actions} = this.props;
    actions.addRow(styleName);
  }

  componentDidMount() {
    const {actions} = this.props;
  }

  componentDidUpdate() {
    const {productEditorReducers, actions} = this.props;

    // if inserted new component
    if (productEditorReducers.isInsertedComponent) {
      actions.isInsertedComponnet();
    }

    // if up and down item is success
    if (productEditorReducers.isUpDownSuccess) {
      reShowDropWhenUpDownItem(productEditorReducers.lastItemId);
      // set to false
      actions.isUpDownSuccess();
    }
  }

  toggleListStylesRow() {
    if (this.state.isShowListStylesRow) {
      this.setState({isShowListStylesRow: false})
    }
    else {
      this.setState({isShowListStylesRow: true})
    }
  }

  showData() {
    const {productEditorReducers, actions} = this.props;
    actions.saveProductDesign(productEditorReducers.rows);
  }

  render() {
    const {productEditorReducers, actions} = this.props;
    return (
      <div className={s.root}>
        <div className={s.wrapperMainEditor}>
          {productEditorReducers.rows.map((item, index) => {
            return (
              <RenderWrapColumns key={index} rowIndex={index} item={item} actions={actions}
                                 productEditorReducers={productEditorReducers}/>
            )
          })}
          <div className={s.wrapperAddRow}>
            <div className={s.wrapBtnAddRow}>
              <a onClick={this.showData.bind(this)}>Save</a><br/>
              <button className={s.btnAddRow} onClick={this.toggleListStylesRow.bind(this)}>Thêm một dòng</button>
              <div className={s.wrapperRowStyles} data-show={this.state.isShowListStylesRow}>
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
                        <div className={s.colItem}></div>
                        <div className={s.colItem}></div>
                        <div className={s.colItem}></div>
                      </div>
                    </div>
                  </div>
                  <div className={s.wrapperStyleItem}>
                    <div className={s.wrapItem}>
                      <label className={s.styleName}>2 cột</label>
                      <div className={`${s.wrapperFullWith} ${s.column2}`}
                           onClick={this.addRow.bind(this, types.STYLE_TWO_COLUMN)}>
                        <div className={s.colItem}></div>
                        <div className={s.colItem}></div>
                      </div>
                    </div>
                  </div>
                  <div className={s.wrapperStyleItem}>
                    <div className={s.wrapItem}>
                      <label className={s.styleName}>1 cột</label>
                      <div className={`${s.wrapperFullWith} ${s.column1}`}
                           onClick={this.addRow.bind(this, types.STYLE_ONE_COLUMN)}>
                        <div className={s.colItem}></div>
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

const RenderWrapColumns = (props) => {
  const {item} = props;
  return (
    <div data-column={item.column} className={`${s.columnItems}`}>
      <div className={s.wrapColumns}>
        <RenderColumn productEditorReducers={props.productEditorReducers} rowIndex={props.rowIndex}
                      actions={props.actions} item={item}/>
      </div>
    </div>
  )
};

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
                        column={item}/>
    );
  });
  return (
    <div>
      {indents}
    </div>
  );
};

class RenderColumnItem extends Component {

  constructor(props) {
    super(props);
  }

  upItem(indexItem, rowIndex, columnIndex, itemId) {
    this.setState({});
    const {actions} = this.props;
    actions.upDownIndex(indexItem, (indexItem - 1), rowIndex, columnIndex, itemId);
  }

  downItem(indexItem, rowIndex, columnIndex, itemId) {
    const {actions} = this.props;
    actions.upDownIndex(indexItem, (indexItem + 1), rowIndex, columnIndex, itemId);
  }

  removeItem(indexItem, rowIndex, columnIndex) {
    const {actions} = this.props;
    actions.removeItem(indexItem, rowIndex, columnIndex);
  }

  render() {
    const {productEditorReducers, actions, column, columnIndex, rowIndex} = this.props;
    const columnItems = column.items;
    return (
      <div className={s.column}>
        <Options columnIndex={columnIndex} rowIndex={rowIndex}
                 productEditorReducers={productEditorReducers} actions={actions}/>
        <div className={s.wrapperItemsInColumn}>
          {
            columnItems.map((item, index)=> {
              const params = {index: index, rowIndex: rowIndex, columnIndex: columnIndex};
              const itemId = item.id;
              return (
                <div key={index} className={s.item}>
                  {(() => {
                    switch (item.type) {
                      case types.COMPONENT_TITLE_TEXT:
                        return <DraftTitle raw={item.raw} params={params} actions={actions}/>;
                      case types.COMPONENT_PARAGRAPH:
                        return <DraftParagraph raw={item.raw} params={params} actions={actions}/>;
                      case types.COMPONENT_IMAGE:
                        return <Image/>;
                      default:
                        return (
                          <div>{item.type}</div>
                        )
                    }
                  })()}
                  <div className={`${s.contentOptionsItem}`}>
                    <div data-active="false" id={itemId}
                         className={`${s.navigatorOptionsColumn} ${navigatorOptionsColumn}`}>
                    </div>
                    <div className={`${s.wrapperDropDownListOptionColumn} ${wrapperOptionsColumn}`} data-show="false">
                      <div className={s.dropDown}>
                        <div className={s.dropBox}>
                          <ul className={s.dropItem}>
                            <li>
                              <a onClick={this.upItem.bind(this, index, rowIndex, columnIndex, itemId)}>Đẩy</a>
                            </li>
                            <li>
                              <a onClick={this.downItem.bind(this, index, rowIndex, columnIndex, itemId)}>Hạ</a>
                            </li>
                            <li>
                              <a onClick={this.removeItem.bind(this, index, rowIndex, columnIndex)}>Xóa</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default withStyles(s)(EditorTool);
