/**
 * Created by vuchien on 7/25/16.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Loading.css';

class Loading extends Component {

  render() {
    const {isBlack} = this.props;
    let dataBlack = "false";
    if (isBlack != undefined && isBlack) { // is true
      dataBlack = "true";
    }
    return (
      <div>
        {
          (() => {
            switch (this.props.type) {
              case "hor":
                return (
                  <div className={s.wrapperLoader}>
                    <div className={s.loader}></div>
                  </div>
                );
              default:
                return (
                  <div className={s.uilDefaultCss} style={{transform: "scale(" + this.props.scale + ")"}}>
                    <div className={`${s.item1} ${s.item}`} data-black={dataBlack}/>
                    <div className={`${s.item2} ${s.item}`} data-black={dataBlack}/>
                    <div className={`${s.item3} ${s.item}`} data-black={dataBlack}/>
                    <div className={`${s.item4} ${s.item}`} data-black={dataBlack}/>
                    <div className={`${s.item5} ${s.item}`} data-black={dataBlack}/>
                    <div className={`${s.item6} ${s.item}`} data-black={dataBlack}/>
                    <div className={`${s.item7} ${s.item}`} data-black={dataBlack}/>
                    <div className={`${s.item8} ${s.item}`} data-black={dataBlack}/>
                    <div className={`${s.item9} ${s.item}`} data-black={dataBlack}/>
                    <div className={`${s.item10} ${s.item}`} data-black={dataBlack}/>
                    <div className={`${s.item11} ${s.item}`} data-black={dataBlack}/>
                    <div className={`${s.item12} ${s.item}`} data-black={dataBlack}/>
                  </div>
                )
            }
          })()
        }
      </div>
    )
  }
}
export default withStyles(s)(Loading);
