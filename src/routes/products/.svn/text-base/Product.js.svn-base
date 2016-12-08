/**
 * Created by vuchien on 6/17/16.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as productActions from '../../actions/productActions';
import MainSection from './sections/MainSection';
import MainLayout from '../../components/Layouts/MainLayout';

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {productsReducers, actions} = this.props;
    return (
      <MainLayout>
        <MainSection productsReducers={productsReducers}
                     actions={actions}/>
      </MainLayout>

    )
  }
}

function mapStateToProps(state) {
  return {
    productsReducers: state.productsReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
