/**
 * Created by vuchien on 8/12/16.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Options.css';
import {itemClickToShowDropDownList, wrapperDropdownList} from '../../../../config';
import * as types from '../../../../constants/productEditorTypes';

class Controls extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowWrapDrop: false
    }
  }

  hideDropDownBox() {
    this.setState({isShowWrapDrop: false});
  }

  toggle(e) {
    e.preventDefault();
    this.props.onToggle("BOLD");
  }

  insertComponent(component, rowId, columnIndex) {
    const {actions} = this.props;
    actions.insertComponent(component, rowId, columnIndex);
  }

  render() {
    const {rowIndex, columnIndex} = this.props;
    return (
      <div className={s.wrapEditorControls}>
        <div className={s.insideEditorControls}>
          <div className={s.leftOption}>
            <span/>
          </div>
          <div className={s.rightOption}>
            <ul>
              <li>
                <div className={s.wrapItem}>
                  <a className={`${s.option} ${itemClickToShowDropDownList}`}>
                    <div className={s.wrapDots}>
                      <span className={s.dot}/>
                      <span className={s.dot}/>
                      <span className={s.dot}/>
                    </div>
                  </a>
                  <div className={`${s.wrapDropBox} ${wrapperDropdownList}`} data-show={this.state.isShowWrapDrop}>
                    <div className={s.dropDown}>
                      <div className={s.dropBox}>
                        <ul className={s.dropItem}>
                          <li>
                            <a
                              onClick={this.insertComponent.bind(this, types.COMPONENT_TITLE_TEXT, rowIndex, columnIndex)}>Chèn
                              tiêu
                              đề</a>
                          </li>
                          <li>
                            <a onClick={this.insertComponent.bind(this, types.COMPONENT_PARAGRAPH, rowIndex, columnIndex)}>Chèn
                              nội
                              dung</a>
                          </li>
                          <li>
                            <a onClick={this.insertComponent.bind(this, types.COMPONENT_IMAGE, rowIndex, columnIndex)}>Hình
                              ảnh</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className={s.clear}></div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Controls);
