/**
 * Created by vuchien on 7/26/16.
 */
import React, {Component, PropTypes} from 'react';
import MainSection from './sections/MainSection';
import * as storeSettingsActions from '../../actions/storeSettingsActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MainLayout from '../../components/Layouts/MainLayout';
import {VIEW_STORE} from '../../components/viewConstants';

class StoreSettings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {storeSettingsReducers, actions} = this.props;
    return (
      <MainLayout leftMenu={true} type={VIEW_STORE}>
        <MainSection storeSettingsReducers={storeSettingsReducers} actions={actions}/>
      </MainLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    storeSettingsReducers: state.storeSettingsReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(storeSettingsActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreSettings)
