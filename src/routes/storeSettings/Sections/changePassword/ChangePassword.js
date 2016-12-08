/**
 * Created by vuchien on 8/23/16.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React from 'react';
import * as authenticationActions from '../../../../actions/authenticationActions';
import MainSection from './section/MainSection';

class ChangePassword extends React.Component {
  render() {
    const {authenticationReducers, actions} = this.props;
    return (
      <MainSection onSubmit={this.handleSubmit.bind(this)} authenticationReducers={authenticationReducers}
                   actions={actions}/>
    )
  }

  handleSubmit(data) {
    const {actions} = this.props;
    actions.changePassword(data);
  }
}

function mapStateToProps(state) {
  return {
    authenticationReducers: state.authenticationReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authenticationActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword)
