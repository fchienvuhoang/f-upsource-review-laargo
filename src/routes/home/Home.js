/**
 * Created by vuchien on 8/26/16.
 */

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as overviewActions from '../../actions/overviewActions';
import MainSection from './sections/MainSection';

class Categories extends React.Component {
  render() {
    const {overviewReducers, actions} = this.props;
    return (
      <MainSection overviewReducers={overviewReducers}
                   actions={actions}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    overviewReducers: state.overviewReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(overviewActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)
