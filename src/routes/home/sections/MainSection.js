/**
 * Created by vuchien on 8/26/16.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MainLayout from '../../../components/Layouts/MainLayout';
import s from './MainSection.css';
import {menuActive} from '../../../components/commons';
import {VIEW_DEFAULT} from '../../../components/viewConstants';

class MainSection extends React.Component {

  componentDidMount() {
    menuActive(VIEW_DEFAULT);
    const {actions} = this.props;
    actions.fetchStatistics();
  }

  render() {
    const {overviewReducers} = this.props;
    return (
      <MainLayout>
        <div className={s.rootHomeSection}>
          <div className={s.insideHomeSection}>
            <div className={s.panel}>
              <div className={s.panelHeader}>
                <span className={s.title}>Tổng quan</span>
              </div>
              <div className={s.panelBody}>
                <div className={s.wrapperInside}>
                  <div className={`${s.formGroupInline} ${s.formGroup}`}>
                    <div className={s.colLabel}><label>Tổng số danh mục</label></div>
                    <div className={s.colValue}><label className={s.value}>{overviewReducers.ccg}</label></div>
                  </div>
                  <div className={`${s.formGroupInline} ${s.formGroup}`}>
                    <div className={s.colLabel}><label>Tổng số sản phẩm</label></div>
                    <div className={s.colValue}><label className={s.value}>{overviewReducers.cpr}</label></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }
}

export default withStyles(s)(MainSection);
