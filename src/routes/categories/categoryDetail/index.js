/**
 * Created by vuchien on 6/20/16.
 */
import React from 'react';
import CategoryDetail from './CategoryDetail';
import MainLayout from '../../../components/Layouts/MainLayout';

export default {

    path: '/danh-muc/:cateId',

    async action(state) {
        const title = 'Chi tiết danh mục sản phẩm';
        state.context.setTitle(title);
        let cateId = state.params.cateId;
        return <MainLayout>
            <CategoryDetail cateId={cateId}/>
        </MainLayout>
    }
};