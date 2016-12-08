import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';

function Footer() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.leftSide}>
          <div className={s.wrapperListItems}>
            <ul>
              <li>
                <a>© 2016 Laargo, Phiên bản thử nghiệm. </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={s.rightSide}></div>
        <div className={s.clear}></div>
      </div>
    </div>
  );
}

export default withStyles(s)(Footer);
