/**
 * Created by vuchien on 7/26/16.
 */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MainSection.css';
import {menuActive} from '../../../components/commons';
import {VIEW_STORE} from '../../../components/viewConstants';
import DropZone from 'react-dropzone';
import request from 'superagent';
import Feedback from '../../../components/Feedback/Feedback';
import {uploadProduct, urlDefaultStoreLogo} from '../../../config';

class MainSection extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isShowEditName: false,
      editNameValue: '',
      hasErrorEditName: false
    };
  }

  componentDidMount() {
    menuActive(VIEW_STORE);
    const {actions} = this.props;
    actions.getStoreInfo();
  }

  toggleShowEditInput() {
    const {storeSettingsReducers} = this.props;
    if (this.state.isShowEditName) {
      this.setState({isShowEditName: false});
    }
    else {
      this.setState({isShowEditName: true, editNameValue: storeSettingsReducers.storeName});
    }
  }

  editNameOnChange(e) {
    this.setState({editNameValue: e.target.value});
  }

  onDrop(files) {
    var req = request.post('/store-setting-upload');
    files.forEach((file)=> {
      req.attach(file.name, file);
    });
    req.end((err, res) => {
      if (err || !res.ok) {
        if (__DEV__) {
          console.log(err);
        }
      } else {
        if (res.text != undefined) {
          // update to database
          const {actions} = this.props;
          const imagePath = JSON.parse(res.text).imagePath;
          actions.changeUrlThumb(imagePath);
        }
      }
    })
  }

  submitChangeStoreName(e) {
    e.preventDefault();
    const storeName = this.refs.storeName.value;
    if (storeName.trim().length == 0) {
      this.setState({hasErrorEditName: true});
    } else {
      this.setState({hasErrorEditName: false});
      const {actions} = this.props;
      actions.changeStoreName(storeName);
      // hide form update
      this.toggleShowEditInput();
    }
  }

  render() {
    const {storeSettingsReducers} = this.props;
    const urlProductImage = uploadProduct.urlProductImage;
    return (
      <div className={s.wrapperSettings}>
        <Feedback/>
        <div className={s.panel}>
          <div className={s.panelHeader}>
            <label className={s.title}>Cửa hàng</label>
          </div>
          <div className={s.panelBody}>
            <div className={s.wrapperInside}>
              <div className={s.leftSite}>
                <div className={s.wrapperThumbStore}>
                  <img
                    src={storeSettingsReducers.storeThumbUrl == '' ? urlDefaultStoreLogo : urlProductImage + storeSettingsReducers.storeThumbUrl}/>
                  <DropZone multiple={false} onDrop={this.onDrop.bind(this)} ref="dropzone" accept="image/*"
                            className={s.changeImageLink}>
                    <a>Thay đổi</a>
                  </DropZone>
                </div>
                <div className={s.wrapperName}>
                  <label>{storeSettingsReducers.storeName}</label>
                  <div className={s.wrapperEdit}>
                    <span onClick={this.toggleShowEditInput.bind(this)} className={s.editIcon}/>
                  </div>
                </div>
                <div className={s.wrapperNameEdit} data-show={this.state.isShowEditName}>
                  <form onSubmit={this.submitChangeStoreName.bind(this)}>
                    <div className={`${s.formGroup} ${!this.state.hasErrorEditName ? "" : s.hasError}`}>
                      <input ref="storeName" value={this.state.editNameValue}
                             onChange={this.editNameOnChange.bind(this)}
                             type="text"
                             className={s.input}/>
                      <div className={s.wrapButton}>
                        <button className={s.btnDefaultLarge}>Lưu</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className={s.rightSite}>
                <div className={s.formGroup}>
                  <label>Đường dẫn truy cập</label>
                  <div className={s.wrapperStoreName}>
                  <span className={s.originDomain}>
                    <a href={"https://laargo.vn/" + storeSettingsReducers.name}
                       target="_blank">https://laargo.vn/{storeSettingsReducers.name}</a>
                  </span>
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

export default withStyles(s)(MainSection);
