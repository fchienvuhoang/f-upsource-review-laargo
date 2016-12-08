/**
 * Created by vuchien on 8/30/16.
 */

import React from 'react';
import s from './Confirm.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {unMaskBody} from '../../core/ui/modal';

class Confirm extends React.Component {

  formUnmaskBody() {
    unMaskBody(this.props.id);
  }

  render() {
    return (
      <div className={s.panelPopup} id={this.props.id}>
        <div data-border="hide" className={`${s.panel} ${s.popupContentPanel} ${s.wrapperFormConfirm}`}>
          <div className={s.panelHeader}>
            <h2 className={s.title}>Xác nhận</h2>
            <span onClick={this.formUnmaskBody.bind(this)} title="Đóng" className={s.close}/>
          </div>
          <div className={s.panelBody}>
            <div className={s.wrapperInside}>
              <div className={s.wrapperConfirmAbstract}>
                <div className={s.wrapperAnswerYes}
                     onClick={() => this.props.deleteAction(this.props.itemId, this.props.index)}>
                  <div className={s.answerYes}/>
                </div>
                <div className={s.wrapperAnswerNo} onClick={() => this.props.hideConfirmForm()}>
                  <div className={s.answerNo}/>
                </div>
                <div className={s.clear}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withStyles(s)(Confirm);
