/**
 * Created by vuchien on 7/23/16.
 */

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as productDetailActions from '../../../../../../actions/productDetailActions';
import FormUploadPreview from './FormUploadPreview';

class index extends Component {
  render() {
    const {productDetailReducers, actions} = this.props;
    return (
      <FormUploadPreview idPopup={this.props.idPopup} productDetailReducers={productDetailReducers} actions={actions}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    productDetailReducers: state.productDetailReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productDetailActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index)
