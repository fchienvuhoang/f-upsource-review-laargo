/**
 * Created by vuchien on 6/20/16.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as categoryDetailActions from '../../../actions/categoryDetailActions';
import DetailSection from './sections/DetailSection';
import {VIEW_CATEGORY} from '../../../components/viewConstants';
import {menuActive} from '../../../components/commons';

class CategoryDetail extends React.Component {
  render() {
    const {categoryDetailReducers, actions} = this.props;
    return (
      <DetailSection
        initialValues={{name: categoryDetailReducers.category.name}}
        onSubmit={this.handleSubmit.bind(this)}
        cateId={this.props.cateId}
        categoryDetailReducers={categoryDetailReducers}
        actions={actions}/>
    )
  }

  componentDidMount() {
    menuActive(VIEW_CATEGORY);
  }

  handleSubmit(data) {
    const {categoryDetailReducers, actions} = this.props;
    let currentCateName = categoryDetailReducers.category.name;
    let newCateName = data.name;
    // set cateId to object
    data.cateId = this.props.cateId;

    if (currentCateName == newCateName) {
        if (__DEV__) {
            console.info("category name is not change");
        }
        actions.hideFormUpdateCategory();
    } else {
        actions.changeCategoryName(data);
    }
  }
}

function mapStateToProps(state) {
  return {
    categoryDetailReducers: state.categoryDetailReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoryDetailActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryDetail)
