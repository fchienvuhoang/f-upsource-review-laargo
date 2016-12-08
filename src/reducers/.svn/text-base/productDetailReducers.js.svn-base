/**
 * Created by vuchien on 7/18/16.
 */
import
  * as types
  from '../constants/productDetailTypes';
import { guidShort } from '../components/commons';
import _indexOf from 'lodash/indexOf';
import _find from 'lodash/find';
import { uploadProduct } from '../config';

/**
 * A return from upload preview pass params to this below function,
 * this used for create new item image append to listImages of detailCopy
 * @param detailCopyUpload
 * @returns {{_id: *, name: string, image_xsmall: *, image_small: *, image_medium: *, image_large: *}}
 */
var itemListImageDefaultInit = (detailCopyUpload) => {
  const uuid = guidShort();
  return {
    _id: uuid, // this is just a key for react handle
    name: detailCopyUpload.name, // name file upload
    fileExtend: detailCopyUpload.fileExtend, // extension file upload
    image_xsmall: detailCopyUpload.fileXSmall, // relative path to preview via a host
    image_small: detailCopyUpload.fileSmall,
    image_medium: detailCopyUpload.fileMedium,
    image_large: detailCopyUpload.fileLarge,
    fileXSmall_absolutePath: detailCopyUpload.fileXSmall_absolutePath, // absolute path for copy to main folder
    fileSmall_absolutePath: detailCopyUpload.fileSmall_absolutePath,
    fileMedium_absolutePath: detailCopyUpload.fileMedium_absolutePath,
    fileLarge_absolutePath: detailCopyUpload.fileLarge_absolutePath,
  };
};

// init state main
const initialState = {
  isFetchingDetailStatus: false, // loading detail status first times
  detail: { // detail main object of product
    _id: 0,
    name: '--',
    publish: 0,
    time_create: '',
    image_thumb: '',
    price: '--',
    productSelected: {
      _id: '',
      name: '',
      image_xsmall: '',
      image_small: '',
      image_medium: '',
      image_large: '',
    },
    listImages: [],
    highLightInfo: [],
    categoryBelong: {
      category_id: '',
      category_name: '',
      attributesSelect: [],
    },
    /* two available below will be reset when new form detail loaded via RESET_DETAIL action */
    isUsed_tempProductId: false,
    is_tempProductId: '',
    /* -- */
  },
  isUpdatingProductInfo: false, // for show or hidden icon near button save
  isUpdatedProductInfo: false, // is flag status for hidden form update ProductInfo
  detailCopy: { // a copy to edit, delete, update
    _id: 0,
    name: '',
    publish: 0,
    time_create: '',
    image_thumb: '',
    price: 0,
    productSelected: {
      _id: '',
      name: '',
      image_xsmall: '',
      image_small: '',
      image_medium: '',
      image_large: '',
    },
    listImages: [],
    highLightInfo: [],
  },
  detailCopyUpload: { // temp object for upload new image with multiple size after uploaded
    name: '',
    fileExtend: '',
    fileXSmall: '',
    fileSmall: '',
    fileMedium: '',
    fileLarge: '',
    fileXSmall_absolutePath: '',
    fileSmall_absolutePath: '',
    fileMedium_absolutePath: '',
    fileLarge_absolutePath: '',
  },
  isLoadingDetailUpload: false, // handling after upload a new image
  isHandlingAddNewImageToListImages: false, // NOT USE, BUT VIEW STILL BINDING loading action, copy images in temp folder to main
  isAddedNewItemToListImageDetailCopy: false, // flag to active last item inserted to list images Detail copy object
  isAppendNewItemToListImageDetailCopy_previewZone: false, // flag to hidden form upload preview
  detailAttributeProduct: {
    updateObj: { // object for update when edit attributes product in a form
      receive: false, // status show popup edit attributes product
      isFetchingAttributesByChangeCateId: false, // status loading when change a new category
      isShowContentFormAttributes: true, // content list attributes by category is selected
      isLoadingHandleSave: false, // status loading when saving attributes list
      isSaved: false,
      listCategories: [],
      listAttributeBundleOriginAndSelected: [], // Display list attributes by category to select an item
      categoryBelong: {
        category_id: '',
        category_name: '',
      },
    },
  },
  detailDesign: [],
  isReceiveDetailDesignData: false,
};

export default function productDetailReducers(state = initialState, action) {
  switch (action.type) {
    /**
     * Status when fetching product detail data
     */
    case types.IS_FETCHING_PRODUCT_DETAIL:
      return state;
    /**
     * Data of the product is received
     */
    case types.RECEIVE_PRODUCT_DETAIL:
      const resultDetail = action.payload.result;
      const detail = resultDetail.detail;
      if (detail != null) {
        return Object.assign({}, state, resultDetail, {
          detailCopy: detail,
        });
      } else {
        // reset detail,detailCopy to default if API return a null value
        return Object.assign({}, state, {
          detail: initialState.detail,
          detailCopy: initialState.detailCopy,
        });
      }
    /**
     * Main action to save product info update
     */
    case types.CREATE_OR_UPDATE_PRODUCT_INFO:
      const result = action.payload.result;
      if (result.status == 'ok') {
        const product = action.payload.result.product;
        return {
          ...state,
          isUpdatedProductInfo: true,
          detail: {
            ...state.detail,
            price: product.price,
            name: product.name,
            listImages: product.listImages,
            highLightInfo: product.highLightInfo,
          },
        };
      }
      else {
        return {
          ...state,
          isUpdatedProductInfo: true,
        };
      }
    /**
     * Finished updated product info and hidden isUpdatingProductInfo status
     */
    case types.IS_UPDATE_PRODUCT_INFO_TO_FALSE:
      return {
        ...state,
        isUpdatedProductInfo: false,
        isUpdatingProductInfo: false,
      };
    case types.IS_UPDATING_PRODUCT_INFO_TO_TRUE:
      return {
        ...state,
        isUpdatingProductInfo: true,
      };
    /**
     * Remove item list image of DetailCopy object
     */
    case types.REMOVE_ITEM_LIST_IMAGE:
      const listImage = state.detailCopy.listImages;
      const idImg = action.payload.id;
      const indexImg = _indexOf(listImage, _find(listImage, { _id: idImg }));
      return {
        ...state,
        detailCopy: {
          ...state.detailCopy,
          listImages: [
            ...state.detailCopy.listImages.slice(0, indexImg).concat(...state.detailCopy.listImages.slice(indexImg + 1)),
          ],
        },
      };
    /**
     * Remove item highlight info item of DetailCopy object
     */
    case types.REMOVE_HIGHLIGHT_INFO_ITEM:
      const highLightInfo = state.detailCopy.highLightInfo;
      const idInfo = action.payload.id;
      const indexInfo = _indexOf(highLightInfo, _find(highLightInfo, { _id: idInfo }));
      return {
        ...state,
        detailCopy: {
          ...state.detailCopy,
          highLightInfo: [
            ...state.detailCopy.highLightInfo.slice(0, indexInfo).concat(...state.detailCopy.highLightInfo.slice(indexInfo + 1)),
          ],
        },
      };
    /**
     * Add item infoHighlight to DetailCopy object
     */
    case types.ADD_ITEM_INFO_HIGHLIGHT:
      const uid = guidShort();
      const highLightValue = action.payload.value;
      return {
        ...state,
        detailCopy: {
          ...state.detailCopy,
          highLightInfo: [
            ...state.detailCopy.highLightInfo,
            {
              _id: uid,
              value: highLightValue,
            },
          ],
        },
      };
    /**
     * Reset edit info when users click to edit product info, data form will renew
     */
    case types.RESET_EDIT_INFO_PRODUCT:
      return {
        ...state,
        detailCopy: state.detail,
      };
    /**
     * Add new object to detailCopyUpload to display preview after users uploaded a new Image
     */
    case types.UPDATE_DETAIL_UPLOAD_COPY:
      const data = action.payload.data;
      // get url for preview mode (1)ie: localhost:8001
      // (1)i.e = (for example)
      const urlProductImgTemp = uploadProduct.urlPreviewTempUploadImages;
      return {
        ...state,
        detailCopyUpload: {
          name: data.name,
          fileExtend: data.fileExtend,
          fileXSmall: urlProductImgTemp + data.fileXSmall,
          fileSmall: urlProductImgTemp + data.fileSmall,
          fileMedium: urlProductImgTemp + data.fileMedium,
          fileLarge: urlProductImgTemp + data.fileLarge,
          fileXSmall_absolutePath: data.fileXSmall_absolutePath,
          fileSmall_absolutePath: data.fileSmall_absolutePath,
          fileMedium_absolutePath: data.fileMedium_absolutePath,
          fileLarge_absolutePath: data.fileLarge_absolutePath,
        },
        isLoadingDetailUpload: false,
      };
    /**
     * Update state detail upload to false to show loading icon
     */
    case types.IS_LOADING_DETAIL_UPLOAD_TO_TRUE:
      return {
        ...state,
        isLoadingDetailUpload: true,
      };
    /**
     * Update state detail upload to false to hidden loading icon
     */
    case types.IS_LOADING_DETAIL_UPLOAD_TO_FALSE:
      return {
        ...state,
        isLoadingDetailUpload: false,
      };
    /**
     * Save upload product image to the DetailCopy object only
     */
    case types.SAVE_UPLOAD_PRODUCT_IMAGE:
      const item = itemListImageDefaultInit(state.detailCopyUpload);
      return {
        ...state,
        detailCopy: {
          ...state.detailCopy,
          listImages: [
            ...state.detailCopy.listImages,
            item,
          ],
        },
        isAppendNewItemToListImageDetailCopy_previewZone: true, // for hidden form upload preview
        isAddedNewItemToListImageDetailCopy: true, // for active last item inserted, DetailCopy object
      };
    /**
     * Finished add new image object to list image by product
     * This action will add new image to detailCopy object only
     */
    case types.UPDATE_IS_APPEND_NEW_ITEM_TO_LIST_IMAGE_DETAIL_COPY_TO_FALSE_PREVIEW_ZONE:
      return {
        ...state,
        isAppendNewItemToListImageDetailCopy_previewZone: false,
      };
    case types.CHANGE_PRODUCT_SELECT_BY_INDEX_DETAIL:
      const index = action.payload.index;
      const itemImage = state.detail.listImages[index];
      return {
        ...state,
        detail: {
          ...state.detail,
          productSelected: {
            ...state.detail.productSelected,
            _id: itemImage._id,
            name: itemImage.name,
            image_xsmall: itemImage.image_xsmall,
            image_small: itemImage.image_small,
            image_medium: itemImage.image_medium,
            image_large: itemImage.image_large,
          },
        },
      };
    /**
     *
     */
    case types.CHANGE_PRODUCT_SELECT_BY_INDEX_DETAIL_COPY:
      const index_copy = action.payload.index;
      const itemImage_copy = state.detailCopy.listImages[index_copy];
      return {
        ...state,
        detailCopy: {
          ...state.detailCopy,
          productSelected: {
            ...state.detailCopy.productSelected,
            _id: itemImage_copy._id,
            name: itemImage_copy.name,
            image_xsmall: itemImage_copy.image_xsmall,
            image_small: itemImage_copy.image_small,
            image_medium: itemImage_copy.image_medium,
            image_large: itemImage_copy.image_large,
            fileXSmall_absolutePath: itemImage_copy.fileXSmall_absolutePath,
            fileSmall_absolutePath: itemImage_copy.fileSmall_absolutePath,
            fileMedium_absolutePath: itemImage_copy.fileMedium_absolutePath,
            fileLarge_absolutePath: itemImage_copy.fileLarge_absolutePath,
          },
        },
      };
    /**
     *
     */
    case types.UPDATE_IS_ADDED_NEW_ITEM_TO_LIST_IMAGE_DETAIL_COPY_TO_FALSE:
      return {
        ...state,
        isAddedNewItemToListImageDetailCopy: false,
      };
    case types.RECEIVE_DETAIL_PRODUCT_ATTRIBUTE: { // to prevent Error Duplicate Const
      const result = action.payload.result;
      const listCategory = result.listCategories;
      const categoryBelong = result.categoryBelong;
      const belongCateId = categoryBelong.category_id;
      const belongCateName = categoryBelong.category_name;
      const listAttributeBundleOriginAndSelected = result.listAttributeBundleOriginAndSelected;

      return Object.assign({}, state, {
        detailAttributeProduct: {
          ...state.detailAttributeProduct,
          updateObj: {
            ...state.detailAttributeProduct.updateObj,
            receive: true,
            listCategories: listCategory,
            listAttributeBundleOriginAndSelected,
            categoryBelong: {
              ...state.detailAttributeProduct.updateObj.categoryBelong,
              category_id: belongCateId,
              category_name: belongCateName,
            },
          },
        },
      });
    }
    case types.UPDATE_DETAIL_ATTRIBUTE_PRODUCT_TO_FALSE:
      return Object.assign({}, state, {
        detailAttributeProduct: {
          ...state.detailAttributeProduct,
          updateObj: {
            ...state.detailAttributeProduct.updateObj,
            receive: false,
          },
        },
      });
    case types.RECEIVE_ATTRIBUTES_BY_CATE_ONCHANGE: {
      const result = action.payload.result;
      const cateId = action.payload.cateId;
      const cateName = action.payload.cateName;
      return Object.assign({}, state, {
        detailAttributeProduct: {
          ...state.detailAttributeProduct,
          updateObj: {
            ...state.detailAttributeProduct.updateObj,
            listAttributeBundleOriginAndSelected: result.listAttributeBundleOriginAndSelected,
            isFetchingAttributesByChangeCateId: false, // hide loading when change cateId
            isShowContentFormAttributes: true, // show content form attributes two,
            categoryBelong: {
              ...state.detailAttributeProduct.updateObj.categoryBelong,
              category_id: cateId,
              category_name: cateName,
            },
          },
        },
      });
    }
    case types.UPDATE_IS_FETCHING_ATTRIBUTES_BY_CATE_ID_TO_TRUE:
      return Object.assign({}, state, {
        detailAttributeProduct: {
          ...state.detailAttributeProduct,
          updateObj: {
            ...state.detailAttributeProduct.updateObj,
            isFetchingAttributesByChangeCateId: true,
            isShowContentFormAttributes: false, // hide content form attributes two
          },
        },
      });
    case types.UPDATE_ATTRIBUTE_OPTION_BY_ATTRIBUTE_ID: {
      const payload = action.payload;
      const attributeId = payload.attributeId;
      const optionIdSelect = payload.optionId;
      const optionNameSelect = payload.optionName;

      return Object.assign({}, state, {
        detailAttributeProduct: {
          ...state.detailAttributeProduct,
          updateObj: {
            ...state.detailAttributeProduct.updateObj,
            listAttributeBundleOriginAndSelected: state.detailAttributeProduct.updateObj.listAttributeBundleOriginAndSelected.map(attribute => {
              if (attribute.attribute_id == attributeId) {
                return Object.assign({}, attribute, {
                  runtime_id_selected: optionIdSelect,
                  runtime_name_selected: optionNameSelect, // name select of selectBox will not update because nameSelect has been set to state of selectBox in constructor
                });
              } else {
                return attribute;
              }
            }),
          },
        },
      });
    }
    case types.UPDATE_IS_LOADING_HANDLE_SAVE_TO_TRUE: {
      return {
        ...state,
        detailAttributeProduct: {
          ...state.detailAttributeProduct,
          updateObj: {
            ...state.detailAttributeProduct.updateObj,
            isLoadingHandleSave: true,
          },
        },
      };
    }
    case types.UPDATE_ATTRIBUTE_FINISHED: {
      const data = action.payload.data;
      const categoryBelong = data.product.categoryBelong;
      return {
        ...state,
        detail: {
          ...state.detail,
          categoryBelong,
        },
        detailAttributeProduct: {
          ...state.detailAttributeProduct,
          updateObj: {
            ...state.detailAttributeProduct.updateObj,
            isLoadingHandleSave: false,
            isSaved: true,
          },
        },
      };
    }
    case types.UPDATE_IS_SAVED_ATTRIBUTES_TO_FALSE:
      return {
        ...state,
        detailAttributeProduct: {
          ...state.detailAttributeProduct,
          updateObj: {
            ...state.detailAttributeProduct.updateObj,
            isSaved: false,
          },
        },
      };
    /**
     * This case will set isUsed_tempProductId to true and set is_tempProductId = last inserted productId
     */
    case types.IS_NEW_PRODUCT_INSERTED: {
      const data = action.payload.data;
      const productIdReturn = data.product._id;
      const categoryBelong = data.product.categoryBelong;
      return Object.assign({}, state, {
        detail: {
          ...state.detail,
          isUsed_tempProductId: true,
          is_tempProductId: productIdReturn,
          categoryBelong,
        },
      });
    }
    /**
     * Reset for add new type
     */
    case types.RESET_DETAIL_PRODUCT:
      return Object.assign({}, state, {
        detail: initialState.detail,
        detailCopy: initialState.detailCopy,
      });
    case types.RECEIVE_PRODUCT_DETAIL_DESIGN: {
      const data = action.payload.data;
      return Object.assign({}, state, { detailDesign: data.result.detail, isReceiveDetailDesignData: true });
    }
    case types.IS_RECEIVED_DETAIL_DESIGN_DATA:
      return {
        ...state,
        isReceiveDetailDesignData: false,
      };
    case types.ACTIVE_USED_TEMP_PRODUCT_MODE: {
      const productId = action.payload.productId;
      return {
        ...state,
        detail: {
          ...state.detail,
          isUsed_tempProductId: true,
          is_tempProductId: productId,
        },
      };
    }
    /**
     * Default comment
     */
    default:
      return state;
  }
}
