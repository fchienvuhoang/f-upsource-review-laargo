/**
 * Created by vuchien on 7/26/16.
 */
import React from 'react';
import StoreSettings from './StoreSettings';

export default {
  path: '/cai-dat',
  async action(state) {
    const title = 'Thông tin cửa hàng';
    state.context.setTitle(title);
    return <StoreSettings/>;
  }
};
