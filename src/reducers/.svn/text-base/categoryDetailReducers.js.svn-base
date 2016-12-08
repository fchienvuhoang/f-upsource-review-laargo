/**
 * Created by vuchien on 6/21/16.
 */
import * as types from '../constants/CategoryDetailTypes';
import { guid } from '../components/commons';
import merge from 'lodash/merge';
import _indexOf from 'lodash/indexOf';
import _find from 'lodash/find';

const _defaultAttributeId = 0;
const _defaultAttributeName = '';
const _defaultAttributeListOptions = [];

const initialState = {
  isFetching: false,
  isShowEditCategoryForm: false,
  isShowNameCategory: true,
  isFetchingDetailAttribute: false,
  saveOrUpdateAttributeIsFinished: false,
  isReceiveDetailData: false, // state when received data
  formAttribute: {
    attributeId: _defaultAttributeId,
    attributeName: _defaultAttributeName,
    attributeListOptions: _defaultAttributeListOptions,
  },
  category: {
    id: '',
    name: '',
    publish: '',
    time_create: '',
    attributes: [],
  },
};

export default function categoryDetailReducers(state = initialState, action) {
  if (action.type != null) {
    switch (action.type) {
      case types.FETCHING_DETAIL:
        return state;
      case types.RECEIVE_DETAIL:
        var data = action.data;
        return Object.assign({}, state, data, {
          isReceiveDetailData: true,
        });
      case types.UPDATE_RECEIVED_TO_FALSE:
        return {
          ...state,
          isReceiveDetailData: false,
        };
      case types.ONCHANGE_CATEGORY_NAME:
        let cateName = action.cateName;
        return merge({}, state, {
          isShowEditCategoryForm: false,
          isShowNameCategory: true,
          category: {
            name: cateName,
          },
        });
      case types.SHOW_FORM_UPDATE_CATEGORY:
        return {
          ...state,
          isShowEditCategoryForm: true,
          isShowNameCategory: false,
        };
      case types.HIDE_FORM_UPDATE_CATEGORY:
        return {
          ...state,
          isShowEditCategoryForm: false,
          isShowNameCategory: true,
        };
      case types.ADD_NEW_ATTRIBUTE_OPTION:
        const uuid = guid();
        return Object.assign({}, state, {
          formAttribute: {
            ...state.formAttribute,
            attributeListOptions: [
              {
                option_id: uuid,
                option_value: action.attributeOptionName,
              },
              ...state.formAttribute.attributeListOptions,
            ],
          },
        });
      case types.CREATE_OR_UPDATE_ATTRIBUTE:
        if (action.result.status == 'ok') {
          const attributeId = action.data.attributeId;
          if (attributeId == 0) {
            if (__DEV__) {
              console.log('add new attribute');
            }
            let _attrObj = action.result.attributeObject;
            let _attrId = _attrObj.attribute_id;
            let _attrName = _attrObj.name;
            let _attrListOption = _attrObj.options;

            return {
              ...state,
              category: {
                ...state.category,
                attributes: [
                  ...state.category.attributes,
                  {
                    attribute_id: _attrId,
                    name: _attrName,
                    options: _attrListOption,
                  },
                ],
              },
              saveOrUpdateAttributeIsFinished: true,
            };
          } else {
            if (__DEV__) {
              console.log('update attribute');
            }
            const _attrObj = action.result.attributeObject;
            const _attrId = _attrObj.attribute_id;
            const _attrName = _attrObj.name;
            const _attrListOption = _attrObj.options;

            // Find attribute index and update it
            let attributes = state.category.attributes;
            var index = _indexOf(attributes, _find(attributes, { attribute_id: _attrId }));
            attributes[index].name = _attrName;
            attributes[index].options = _attrListOption;

            return merge({}, state, {
              saveOrUpdateAttributeIsFinished: true,
              category: {
                attributes,
              },
            });
          }
        } else {
          if (__DEV__) {
            console.error('fail');
          }
        }
        return state;
      case types.RECEIVE_DETAIL_ATTRIBUTE:
        let data = action.result;
        var attributeName = data.attributes[0].name;
        var attributeId = data.attributes[0].attribute_id;
        var options = data.attributes[0].options;
        return {
          ...state,
          isFetchingDetailAttribute: true,
          formAttribute: {
            ...state.formAttribute,
            attributeName,
            attributeId,
            attributeListOptions: options,
          },
        };
      case types.UPDATE_STATUS_FETCH_DETAIL_TO_FALSE:
        return {
          ...state,
          isFetchingDetailAttribute: false,
        };
      case types.RESET_ATTRIBUTE_FORM:
        return {
          ...state,
          formAttribute: {
            ...state.formAttribute,
            attributeName: _defaultAttributeName,
            attributeId: _defaultAttributeId,
            attributeListOptions: _defaultAttributeListOptions,
          },
        };
      case types.SAVE_OR_UPDATE_ATTRIBUTE_IS_FINISHED_TO_FALSE:
        return merge({}, state, {
          saveOrUpdateAttributeIsFinished: false,
        });
      default:
        return state;
    }
  } else {
    return state;
  }
}
