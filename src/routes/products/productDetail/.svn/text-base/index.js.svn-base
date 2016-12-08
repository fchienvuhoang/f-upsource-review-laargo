/**
 * Created by vuchien on 7/18/16.
 */
import React from 'react';
import ProductDetail from './ProductDetail';
import MainLayout from '../../../components/Layouts/MainLayout';
import {productUrlModule} from '../../../config';

export default {
  path: productUrlModule + ':productId',
  async action(state) {
    const title = 'Chi tiết sản phẩm';
    state.context.setTitle(title);
    const productId = state.params.productId;
    return <MainLayout>
      <ProductDetail productId={productId}/>
    </MainLayout>
  }
};
