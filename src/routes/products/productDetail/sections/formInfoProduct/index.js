/**
 * Created by vuchien on 7/20/16.
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as productDetailActions from '../../../../../actions/productDetailActions';
import FormInfoProduct from './FormInfoProduct';
import {mainActionTimeout} from '../../../../../config';

class index extends Component {
  render() {
    const {productDetailReducers, actions} = this.props;
    return (
      <FormInfoProduct productId={this.props.productId} onSubmit={this.handleSubmit.bind(this)} initialValues={{
        name: productDetailReducers.detail.name,
        price: productDetailReducers.detail.price
      }} idPopup={this.props.idPopup} productDetailReducers={productDetailReducers} actions={actions}/>
    )
  }

  handleSubmit(data) {
    // bind extend data
    const {productDetailReducers, actions} = this.props;

    // more append from form submit
    data.productId = this.props.productId;
    data.listImages = productDetailReducers.detailCopy.listImages;
    data.highLightInfo = productDetailReducers.detailCopy.highLightInfo;

    // action to loading status
    actions.isUpdatingProductInfo();

    setTimeout(function () {
      actions.saveProductInfo(data, productDetailReducers.detail.isUsed_tempProductId, productDetailReducers.detail.is_tempProductId);
    }, mainActionTimeout);
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
