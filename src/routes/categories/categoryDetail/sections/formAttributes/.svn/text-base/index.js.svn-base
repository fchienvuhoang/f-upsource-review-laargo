/**
 * Created by vuchien on 7/6/16.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as categoryDetailActions from '../../../../../actions/categoryDetailActions';
import FormAttribute from './FormAttributes';

class index extends Component {
    render() {
        const {categoryDetailReducers, actions} = this.props;
        return (
            <FormAttribute initialValues={{attributeName: categoryDetailReducers.formAttribute.attributeName}}
                           onSubmit={this.handleSubmit.bind(this)} idPopup={this.props.idPopup}
                           categoryDetailReducers={categoryDetailReducers}
                           actions={actions}/>
        )
    }

    componentWillMount() {
        if (this.props.formType == "addNew") {
            // reset attribute form
            const {actions} = this.props;
            actions.resetAttributeForm();
        }
    }

    handleSubmit(data) {
        const {categoryDetailReducers, actions} = this.props;
        // append more cateId to data returned
        data.cateId = this.props.cateId;
        data.attributeId = categoryDetailReducers.formAttribute.attributeId;
        actions.createOrUpdateFormAttributeAction(data, categoryDetailReducers.formAttribute);
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
    mapDispatchToProps
)(index)
