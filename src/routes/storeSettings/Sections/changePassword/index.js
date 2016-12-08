/**
 * Created by vuchien on 7/26/16.
 */
import React from 'react';
import ChangePassword from './ChangePassword';
import MainLayout from '../../../../components/Layouts/MainLayout';
import {VIEW_CHANGE_PASSWORD} from '../../../../components/viewConstants';

export default {
  path: '/doi-mat-khau',
  async action(state) {
    const title = 'Thay đổi mật khẩu';
    state.context.setTitle(title);
    return <MainLayout leftMenu={true} type={VIEW_CHANGE_PASSWORD}>
      <ChangePassword/>
    </MainLayout>;
  },
};
