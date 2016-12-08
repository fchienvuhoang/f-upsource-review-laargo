/**
 * Created by vuchien on 7/17/16.
 */
import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MainSection.css';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class MainSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  onDrop(files) {
    var req = request.post('/upload');
    files.forEach((file)=> {
      req.attach(file.name, file);
    });
    req.end(function (err, res) {
      if (err || !res.ok) {
        console.log("uploading error");
      } else {
        console.log(res.text);
      }
    });
    this.setState({
      files: files
    });
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  showFileInfo() {
    console.log(this.state.files);
  }

  componentDidMount() {
    $(function () {
      $(".dragItem").draggable({
        addClasses: true,
        containment: "#parent",
        cursor: "move",
        stack: "div",
        start: function () {
          var item = $(this);
          console.log("item left:", item.css("left"));
          console.log("item right:", item.css("right"));
        },
        drag: function () {
          var item = $(this);
          console.log("item left:", item.css("left"));
          console.log("item right:", item.css("right"));
        },
        stop: function () {
          var item = $(this);
          console.log("item left:", item.css("left"));
          console.log("item right:", item.css("right"));
        }
      });
    });
  }

  itemDragClick() {
    console.log("item drag click");
  }

  _crop() {
    // image in dataUrl
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  render() {
    const {testDragReducers, actions} = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div style={{display: "block"}}>
            <div className={s.loader}></div>
            <div style={{clear: "both"}}>
            </div>
            Test upload:
            <div>
              <Dropzone className={s.dropZone} multiple={false} name="files" accept="image/*" ref="dropzone"
                        onDrop={this.onDrop.bind(this)}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
              <br/>
              <br/>
              <br/>
              <button type="button" onClick={this.onOpenClick.bind(this)}>
                Open Dropzone
              </button>
              <a onClick={this.showFileInfo.bind(this)}>Show files info</a>
            </div>
            <div id={s.contentDragItems}>
              <div className={s.parent} id={`parent`}>
                {testDragReducers.itemsDrag.map(item =>
                  <div onClick={this.itemDragClick.bind(this)} style={{top: item.top, left: item.left}}
                       className={`dragItem ${s.dragItem}`} key={item.id}
                       id={item.id}>
                    {item.value}
                  </div>
                )}
                <div className={s.frameMove}>
                  <div className={s.leftLine}></div>
                  <div className={s.topLine}></div>
                  <div className={s.rightLine}></div>
                  <div className={s.bottomLine}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.wrapperEditorProduct}>

          </div>
        </div>
      </div>
    )
  }
}
export default withStyles(s)(MainSection);
