/**
 * Created by vuchien on 7/29/16.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as productDetailActions from '../../../../../actions/productDetailActions';
import FormAttributesProduct from './FormAttributesProduct';

class index extends Component {
  render() {
    const {productDetailReducers, actions} = this.props;
    return (
      <FormAttributesProduct actions={actions} productDetailReducers={productDetailReducers}
                             idPopup={this.props.idPopup}
                             productId={this.props.productId}/>
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
