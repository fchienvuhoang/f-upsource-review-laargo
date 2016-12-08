/**
 * Created by vuchien on 8/15/16.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Draft.css';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';

class Draft1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  onChange(editorState) {
    const dataRaw = convertToRaw(editorState.getCurrentContent());
    const jsonRaw = JSON.stringify(dataRaw);
    const {actions} = this.props;
    actions.updateRawItem(jsonRaw, this.props.params);
    this.setState({editorState});
  }

  toggleBlock(toggledColor) {
    this._toggleBlock(toggledColor);
  }

  _toggleBlock(toggledColor) {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      toggledColor
    ))
  }

  componentDidMount() {
    // if edit type do not run this line because will toggle state header
    const rawString = this.props.raw;
    let blocks = "";
    if (this.props.raw == "" || this.props.raw == undefined) {
      blocks = "";
    } else {
      const jsonRaw = JSON.parse(rawString);
      blocks = convertFromRaw(jsonRaw);
    }
    if (blocks != "") {
      this.setState({editorState: EditorState.createWithContent(blocks)});
    } else {
    }
  }

  render() {
    return (
      <div className={s.draftRoot}>
        <div className={s.containerEditor}>
          <div className={s.wrapperControls}></div>
          <div className={s.wrapEditor} onClick={this.focus}>
            <Editor editorState={this.state.editorState} onChange={this.onChange.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Draft1);
