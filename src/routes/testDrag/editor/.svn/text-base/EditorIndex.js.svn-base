/**
 * Created by vuchien on 8/13/16.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as productEditorActions from '../../../actions/productEditorActions';
import EditorTool from './sections/EditorTool';

class EditorIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {productEditorReducers, actions} = this.props;
    return (
      <EditorTool actions={actions} productEditorReducers={productEditorReducers}/>
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
)(EditorIndex)
