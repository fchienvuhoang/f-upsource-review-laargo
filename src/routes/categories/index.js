/**
 * Created by vuchien on 6/17/16.
 */
import React from 'react';
import Categories from './Categories';

export default {

  path: '/danh-muc',

  async action(state) {
    const title = 'Danh mục';
    state.context.setTitle(title);
    return <Categories/>;
  }
};
