/**
 * Created by vuchien on 6/17/16.
 */
import React from 'react';
import Products from './Product';

export default {

    path: '/san-pham',

    async action(state) {
        const title = 'Sản phẩm';
        state.context.setTitle(title);
        return <Products/>;
    }
};
