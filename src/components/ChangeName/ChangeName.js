/**
 * Created by vuchien on 8/30/16.
 */
import React from 'react';
import s from './ChangeName.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {unMaskBody} from '../../core/ui/modal';

class ChangeName extends React.Component {

  constructor(props) {
    super(props);
    this.state = {hasError: false, editInputName: ''}
  }

  formUnmaskBody() {
    unMaskBody(this.props.id);
  }

  componentDidMount() {
    this.setState({editInputName: this.props.value});
  }

  formSubmit = (e) => {
    e.preventDefault();
    const value = this.state.editInputName;
    if (value.trim().length == 0) {
      this.setState({hasError: true});
    } else {
      this.setState({hasError: false});
      const {itemId, index, editNameAction} = this.props;
      // call action props
      editNameAction(itemId, index, value);
    }
  };

  onChangeInputName = (e) => {
    this.setState({editInputName: e.target.value});
  };

  render() {
    return (
      <div className={s.panelPopup} id={this.props.id}>
        <div data-border='hide' className={`${s.panel} ${s.popupContentPanel} ${s.wrapperChangeCategory}`}>
          <div className={s.panelHeader}>
            <h2 className={s.title}>Sửa tên</h2>
            <span onClick={this.formUnmaskBody.bind(this)} title='Đóng' className={s.close}/>
          </div>
          <div className={s.panelBody}>
            <form onSubmit={(e) => this.formSubmit(e)}>
              <div className={s.wrapperInside}>
                <div className={`${s.formGroup} ${this.state.hasError == true ? s.hasError : ''}`}>
                  <input type='text' onChange={(e) => this.onChangeInputName(e)} value={this.state.editInputName}
                         className={s.input}/>
                  <div className={s.errorMessage} data-show={this.state.hasError}>Vui lòng nhập một giá trị</div>
                </div>
              </div>
              <div className={s.panelFooter}>
                <div className={s.insideFooter}>
                  <a onClick={this.formUnmaskBody.bind(this)}
                     className={`${s.btnDefaultLarge}`}>Đóng</a>
                  <button type='submit' className={`${s.btn} ${s.btnBlueLarge} ${s.margin}`}>Lưu thay đổi
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(ChangeName);
