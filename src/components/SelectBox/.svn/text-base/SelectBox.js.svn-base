/**
 * Created by vuchien on 7/11/16.
 */
import withStyles from "isomorphic-style-loader/lib/withStyles";
import React, {Component, PropTypes} from "react";
import s from "./SelectBox.css";
import {classWrapperExtraDropdownSelect, classItemClickShowDropDown} from "../../config";
import {hiddenDropdownSelectOutRangeClick, storeStateSelectBox} from "../commons";
import {DETAIL_ATTRIBUTES_PRODUCT_ITEM_OPTIONS, DETAIL_ATTRIBUTES_PRODUCT_CATEGORY_CHANGE} from '../moduleConstants';

const defaultChoiceName = "--Lựa chọn--";

class SelectBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowWrapperExtra: false,
      idSelect: this.props.idSelect,
      valueSelect: this.props.valueSelect
    };
  }

  showWrapperExtra() {
    storeStateSelectBox(this);
    if (this.state.isShowWrapperExtra == false) {
      this.setState({isShowWrapperExtra: true});
    } else {
      this.setState({isShowWrapperExtra: false});
    }
  }

  hideWrapperExtra() {
    if (this.state.isShowWrapperExtra) {
      this.setState({isShowWrapperExtra: false});
    }
  }

  componentDidMount() {
    hiddenDropdownSelectOutRangeClick(this);
  }

  itemSelectBoxClick(index, id, value) {
    this.setState({idSelect: id, valueSelect: value});
    // call parent function
    if (this.props.onChange != undefined) {
      switch (this.props.name) {
        case DETAIL_ATTRIBUTES_PRODUCT_CATEGORY_CHANGE:
          this.props.onChange(this.props.name, id, undefined, value);
          break;
        case DETAIL_ATTRIBUTES_PRODUCT_ITEM_OPTIONS:
          this.props.onChange(this.props.name, id, this.props.attributeId, value);
          break;
        default:
          this.props.onChange(this.props.name, id);
          break;
      }
    }
  }

  renderItem(index, id, value, idSelect) {
    return (
      <li key={index}><a
        className={`${idSelect == id ? s.active : ""}`}
        onClick={() => this.itemSelectBoxClick(index, id, value)}>{value}</a></li>
    )
  }

  render() {
    const {listSelectBox} = this.props;
    return (
      <div className={s.root}>
        <a onClick={this.showWrapperExtra.bind(this)}
           className={`${s.item} ${classItemClickShowDropDown}`}>
          {(this.state.valueSelect != undefined && this.state.valueSelect) != "" ? this.state.valueSelect : defaultChoiceName}
          <span className={s._variable_caretDown}/>
        </a>
        <div data-show={this.state.isShowWrapperExtra}
             className={`${s.wrapperExtraItems} ${classWrapperExtraDropdownSelect}`}>
          <ul>
            {(() => {
              if (listSelectBox != undefined) {
                {
                  switch (this.props.name) {
                    case DETAIL_ATTRIBUTES_PRODUCT_ITEM_OPTIONS:
                      return (
                        listSelectBox.map((item, index) =>
                          this.renderItem(index, item.option_id, item.option_value, this.state.idSelect)
                        )
                      );
                    default:
                      return (
                        listSelectBox.map((item, index) =>
                          this.renderItem(index, item._id, item.name, this.state.idSelect)
                        )
                      )
                  }
                }
              }
            })()}
          </ul>
        </div>
      </div>
    )
  }
}


SelectBox.PropTypes = {
  listSelectBox: PropTypes.array
};


export default withStyles(s)(SelectBox);
