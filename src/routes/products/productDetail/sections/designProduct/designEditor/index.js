/**
 * Created by vuchien on 8/17/16.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as productEditorActions from '../../../../../../actions/productEditorActions';
import DesignEditor from './DesignEditor';

class index extends Component {
  render() {
    const {productEditorReducers, actions, detailReducers} = this.props;
    return (
      <DesignEditor actions={actions} onFormSaved={this.props.onFormSaved.bind(this)} detailReducers={detailReducers}
                    productEditorReducers={productEditorReducers}
                    enableTempProduct={this.props.enableTempProduct.bind(this)}
                    productId={this.props.productId}
                    idPopup={this.props.idPopup}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    productEditorReducers: state.productEditorReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productEditorActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index)
