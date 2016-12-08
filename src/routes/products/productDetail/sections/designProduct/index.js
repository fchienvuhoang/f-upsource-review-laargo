/**
 * Created by vuchien on 8/16/16.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as productDetailActions from '../../../../../actions/productDetailActions';
import DesignProduct from './DesignProduct';

class index extends Component {
  render() {
    const {productDetailReducers, actions} = this.props;
    return (
      <DesignProduct actions={actions} productDetailReducers={productDetailReducers}
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
