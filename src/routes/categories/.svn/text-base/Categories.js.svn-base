/**
 * Created by vuchien on 6/17/16.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as categoriesActions from '../../actions/categoriesActions';
import MainSection from './sections/MainSection';

class Categories extends Component {
  render() {
    const {categoriesReducers, actions} = this.props;
    return (
      <MainSection categoriesReducers={categoriesReducers}
                   actions={actions}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    categoriesReducers: state.categoriesReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoriesActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)
