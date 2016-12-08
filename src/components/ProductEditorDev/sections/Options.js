/**
 * Created by vuchien on 8/12/16.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Options.css';
import * as types from '../../../constants/productEditorTypes';

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

  toggleDrop() {
    if (this.state.isShowWrapDrop) {
      this.setState({isShowWrapDrop: false});
    } else {
      this.setState({isShowWrapDrop: true});
    }
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

  toggle(e) {
    e.preventDefault();
    this.props.onToggle("BOLD");
  }

  insertComponent(component, rowId, columnIndex) {
    const {actions, columnId} = this.props;
    this.hideDropDownBox();
    actions.insertComponent(component, rowId, columnIndex, columnId);
  }

  removeColumn(rowIndex, columnIndex) {
    const {actions} = this.props;
    this.hideDropDownBox();
    actions.removeColumn(rowIndex, columnIndex);
  }

  render() {
    const {rowIndex, columnIndex} = this.props;
    return (
      <div className={s.wrapEditorControls} ref='area'>
        <div className={s.insideEditorControls}>
          <div className={s.leftOption}>
            <span/>
          </div>
          <div className={s.rightOption}>
            <ul className={s.optionColumn}>
              <li>
                <div className={s.wrapItem}>
                  <a className={`${s.option}`} onClick={this.toggleDrop.bind(this)}>
                    <div className={s.wrapDots}>
                      <span className={s.dot}/>
                      <span className={s.dot}/>
                      <span className={s.dot}/>
                    </div>
                  </a>
                  <div className={`${s.wrapDropBox}`} data-show={this.state.isShowWrapDrop}>
                    <div className={s.dropDown}>
                      <div className={s.dropBox}>
                        <ul className={s.dropItem}>
                          <li>
                            <a
                              onClick={this.insertComponent.bind(this, types.COMPONENT_TITLE_TEXT, rowIndex, columnIndex)}>Chèn
                              tiêu đề</a>
                          </li>
                          <li>
                            <a
                              onClick={this.insertComponent.bind(this, types.COMPONENT_PARAGRAPH, rowIndex, columnIndex)}>Chèn
                              nội dung</a>
                          </li>
                          <li>
                            <a
                              onClick={this.insertComponent.bind(this, types.COMPONENT_IMAGE, rowIndex, columnIndex)}>Chèn
                              hình
                              ảnh</a>
                          </li>
                          <li className={s.lineSpare}/>
                          <li>
                            <a onClick={this.removeColumn.bind(this, rowIndex, columnIndex)}>Xóa cột</a>
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
