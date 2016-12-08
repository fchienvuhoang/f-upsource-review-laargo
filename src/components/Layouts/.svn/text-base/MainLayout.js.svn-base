/**
 * Created by vuchien on 6/18/16.
 */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LeftMenu from './../../components/LeftMenu';
import s from './MainLayout.css';

const MainLayout = (props) => {
  return (
    <div>
      <div className={s.root}>
        <div className={s.container}>
          { props.leftMenu == false ? "" : <LeftMenu type={props.type}/>}
          <div
            className={`${props.leftMenu == false ? s.wrapperRightMainContentWithoutLeftMenu : s.wrapperRightMainContent }`}>
            <div className={props.leftMenu == false ? "" : s.wrapperRightInside}>
              {props.children}
            </div>
          </div>
          <div className={s.clear}></div>
        </div>
      </div>
    </div>
  )
};

export default withStyles(s)(MainLayout)
