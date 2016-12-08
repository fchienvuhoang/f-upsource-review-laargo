/**
 * Created by vuchien on 8/25/16.
 */

import React from 'react';
import s from './MainSection.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {unMaskBody} from '../../../core/ui/modal';
import {fetchGet, renderAPI} from '../../../components/api';
import Loading from '../../../components/Loading';
import {mainActionTimeout} from '../../../config';

class MainSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feedbackEntry: "",
      hasErrorInput: false,
      hasSuccess: false,
      submitHandling: false
    }
  }

  formUnmaskBody() {
    unMaskBody(this.props.idPopup);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.feedbackEntry.trim().length == 0) {
      this.setState({hasErrorInput: true});
    } else {
      this.setState({submitHandling: true});
      setTimeout(this.handlingSubmit.bind(this), mainActionTimeout);
    }
  }

  handlingSubmit() {
    this.setState({hasErrorInput: false});
    const feedbackEntryEncode = encodeURIComponent(this.state.feedbackEntry);
    var pathAPI = "feedback/submit-feedback?contentFeedback=" + feedbackEntryEncode;
    const url = renderAPI(pathAPI);
    fetchGet(url, result => {
      if (result.status == "ok") {
        this.setState({feedbackEntry: ""});
        // display success message
        this.setState({hasSuccess: true, submitHandling: false});
      } else {
        this.setState({submitHandling: false});
      }
    })
  }

  onChangeFeedback(e) {
    this.setState({feedbackEntry: e.target.value});
  }

  render() {
    return (
      <div>
        <div className={`${s.panelPopup}`} id={this.props.idPopup}>
          <div data-border="show" className={`${s.panel} ${s.popupContentPanel} ${s.rootFeedback}`}>
            <div className={s.panelHeader}>
              <span className={s.title}>Phản hồi & Yêu cầu</span>
              <span onClick={this.formUnmaskBody.bind(this)} title="Đóng" className={s.close}/>
            </div>
            <div className={s.panelBody}>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className={s.wrapperInside}>
                  <div className={s.wrapperLineMessage}>
                    <div className={s.wrapperIcon}>
                      <div className={s.icon}></div>
                    </div>
                    <div className={s.wrapperMessage}>
                      <div className={s.insideMessage}>
                        <label>Hãy cùng chúng tôi cải thiện Laargo admin tốt hơn. Chúng tôi rất hoan nghênh sự đánh giá
                          và
                          đóng góp của bạn</label>
                      </div>
                    </div>
                    <div className={s.clear}></div>
                  </div>
                  <div className={s.wrapperLineForm}>
                    <div className={`${s.formGroup} ${this.state.hasErrorInput == true ? s.hasError : ""}`}>
                      <label>Nội dung</label>
                      <textarea spellCheck="false" colSpan="5" rows="5" onChange={this.onChangeFeedback.bind(this)}
                                value={this.state.feedbackEntry}
                                className={s.input}/>
                      <div className={s.errorMessage} data-show={this.state.hasErrorInput}>Vui lòng nhập nội dung</div>
                      <div className={s.successMessage} data-show={this.state.hasSuccess}>
                        Tuyệt vời, cảm ơn bạn đã gửi đánh giá và phản hồi cho chúng tôi
                      </div>
                    </div>
                  </div>
                </div>
                <div className={s.panelFooter}>
                  <div className={s.insideFooter}>
                    <a onClick={this.formUnmaskBody.bind(this)}
                       className={`${s.btnDefaultLarge}`}>Đóng
                    </a>
                    <button data-is-loading={this.state.submitHandling} disabled={this.state.submitHandling}
                            className={`${s.btnBlueLarge} ${s.margin} ${s.btnLoading} ${(this.state.submitHandling ? s.btnDisable : '')}`}>
                      Gửi phản hồi
                      <div className={s.wrapperLoading}>
                        <Loading scale="0.1"/>
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(MainSection);
