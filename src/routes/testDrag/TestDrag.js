/**
 * Created by vuchien on 7/17/16.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as testActions from '../../actions/testActions';
import MainSection from './sections/MainSection';

class TestDrag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {testDragReducers, actions} = this.props;
    return (
      <MainSection testDragReducers={testDragReducers}
                   actions={actions}/>
    )
  }
}
function mapStateToProps(state) {
  return {
    testDragReducers: state.testDragReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(testActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestDrag)
