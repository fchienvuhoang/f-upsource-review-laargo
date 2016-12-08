/**
 * Created by vuchien on 8/15/16.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Image.css';
import {uploadProduct} from '../../../../config';

class Image extends Component {

  constructor(props) {
    super(props);
  }

  changePhoto() {
    const {actions, params} = this.props;
    actions.isShowImageUploadForImageComponent(params);
  }

  render() {
    const {imagePath, imageTempViewPath} = this.props;
    return (
      <div>
        <div className={s.imageRoot}>
          <div className={s.wrapInside}>
            <div className={s.wrapItemClick} onClick={this.changePhoto.bind(this)}>
              {(() => {
                if (imagePath != "") {
                  return (
                    <div className={s.imageBox}>
                      {
                        imageTempViewPath == "" ? <img src={uploadProduct.urlProductImage + imagePath}/> :
                          <img src={uploadProduct.urlPreviewTempUploadImages + imageTempViewPath}/>
                      }
                    </div>
                  )
                } else {
                  return (
                    <div className={s.defaultImage}>
                    </div>
                  )
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Image);
