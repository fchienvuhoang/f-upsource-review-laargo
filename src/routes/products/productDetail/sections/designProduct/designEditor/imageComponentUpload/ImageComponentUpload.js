/**
 * Created by vuchien on 8/19/16.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageComponentUpload.css';
import {unMaskBody} from '../../../../../../../core/ui/modal';
import DropZone from 'react-dropzone';
import request from 'superagent';

class ImageComponentUpload extends Component {

  constructor(props) {
    super(props);
  }

  closeForm() {
    unMaskBody(this.props.idPopup, 3);
  }

  onDrop(files) {
    var req = request.post('/image-editor-upload');
    files.forEach((file)=> {
      req.attach(file.name, file);
    });
    req.end((err, res) => {
      if (err || !res.ok) {
        console.log(err);
      } else {
        if (res.text != undefined) {
          const result = JSON.parse(res.text);
          const {actions} = this.props;
          actions.saveImageTemPathComponent(result);
        }
      }
    });
  }

  render() {
    return (
      <div>
        <div className={s.root}>
          <div className={`${s.panelPopup}`} data-popup-level="3" id={this.props.idPopup}>
            <div data-border="show" className={`${s.panel} ${s.popupContentPanel} ${s.wrapperMain}`}>
              <div className={s.panelHeader} data-border-bottom="false">
                <span className={s.title}>Tải ảnh</span>
                <span onClick={this.closeForm.bind(this)} title="Đóng" className={s.close}/>
              </div>
              <div className={s.panelBody}>
                <div className={s.wrapperInside}>
                  <DropZone className={s.dropUpload} accept="image/*" onDrop={this.onDrop.bind(this)} multiple={false}
                            ref="dropzone">
                    <button className={s.btnDefaultLarge}>Tải lên ảnh</button>
                  </DropZone>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(ImageComponentUpload);
