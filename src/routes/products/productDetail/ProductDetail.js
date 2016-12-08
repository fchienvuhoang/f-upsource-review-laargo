/**
 * Created by vuchien on 7/18/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as productDetailActions from '../../../actions/productDetailActions';
import {bindActionCreators} from 'redux';
import DetailSection from './sections/DetailSection';

class ProductDetail extends Component {
  render() {
    const {productDetailReducers, actions} = this.props;
    return (
      <DetailSection productId={this.props.productId} productDetailReducers={productDetailReducers} actions={actions}/>
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
)(ProductDetail)
