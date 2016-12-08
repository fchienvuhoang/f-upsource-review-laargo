/**
 * Created by vuchien on 8/22/16.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditorProduction.css';
import {COMPONENT_IMAGE, COMPONENT_TITLE_TEXT, COMPONENT_PARAGRAPH} from '../../constants/productEditorTypes';
import {uploadProduct} from '../../config';
import {Editor, EditorState, convertFromRaw} from 'draft-js';

class EditorProduction extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {designData} = this.props;
    return (
      <div className={s.rootEditorProduction}>
        <div className={s.wrapperRows}>
          {
            designData.map((item, index)=> {
              return (
                <div key={index} className={s.row}>
                  <div className={s.wrapperColumns} data-column={item.column}>
                    {item.row.map((itemRow, indexRow) => {
                      return <div key={indexRow} className={s.column}>
                        {
                          <div className={s.wrapperItems}>
                            {
                              itemRow.items.map((itemColumn, indexItemsColumn)=> {
                                return <div key={indexItemsColumn} className={s.wrapItem}>
                                  {(() => {
                                    switch (itemColumn.type) {
                                      case COMPONENT_PARAGRAPH:
                                        return <RenderTextComponent key={itemColumn.id} raw={itemColumn.raw}/>;
                                      case COMPONENT_TITLE_TEXT:
                                        return <RenderTextComponent key={itemColumn.id} raw={itemColumn.raw}/>;
                                      case COMPONENT_IMAGE:
                                        return <RenderImageComponent key={itemColumn.id} img={itemColumn.imagePath}/>;
                                    }
                                  })()}
                                </div>
                              })
                            }
                          </div>
                        }
                      </div>
                    })}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

class RenderTextComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  componentDidMount() {
    const rawString = this.props.raw;
    const jsonRaw = JSON.parse(rawString);
    const blocks = convertFromRaw(jsonRaw);
    this.setState({editorState: EditorState.createWithContent(blocks)});
  }

  render() {
    return <div className={s.item} data-type="TEXT">
      <Editor editorState={this.state.editorState} readOnly="true"/>
    </div>
  }
}

const RenderImageComponent = (props) => {
  const {img} = props;
  return <div className={s.item} data-type="IMAGE">
    <img src={uploadProduct.urlProductImage + img}/>
  </div>
};

export default withStyles(s)(EditorProduction);
