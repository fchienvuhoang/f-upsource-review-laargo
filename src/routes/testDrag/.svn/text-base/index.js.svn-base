/**
 * Created by vuchien on 7/17/16.
 */
import React from 'react';
import TestDrag from './TestDrag';
import EditorIndex from './editor/EditorIndex';
import CropImage from './cropImage/CropImage';

export default {

  path: '/example-zone/:zoneName',

  async action(state) {
    const title = 'Test drag';
    state.context.setTitle(title);

    const zoneName = state.params.zoneName;
    switch (zoneName) {
      case "upload":
        return <TestDrag/>;
      case "editor":
        return <EditorIndex/>;
      case 'cropimage':
        return <CropImage/>
      default:
        return <TestDrag/>;
    }
  }
};
