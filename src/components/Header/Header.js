import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import fetch from '../../core/fetch';
import s from './Header.css';
import Link from '../Link';
import {moduleUrl} from '../../config';

class Header extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isShowWrapDrop: false,
      account: '',
      storePath: ''
    }
  }

  componentWillMount() {
    if (typeof document != 'undefined') {
      document.addEventListener('click', this.handleClick.bind(this), false);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick.bind(this), false);
  }

  componentDidMount() {
    const url = "/fetch-session";
    return fetch(url, {credentials: 'include'})
      .then(response => response.json())
      .then(result => {
        this.setState({account: decodeURIComponent(result.account), storePath: result.storePath});
      })
  }

  hideDropDownBox() {
    this.setState({isShowWrapDrop: false});
  }

  toggleDrop() {
    if (this.state.isShowWrapDrop) {
      this.setState({isShowWrapDrop: false});
    } else {
      this.setState({isShowWrapDrop: true});
    }
  }

  handleClick(e) {
    if (ReactDOM.findDOMNode(this.refs.area) != null) {
      if (ReactDOM.findDOMNode(this.refs.area).contains(e.target)) {
        return;
      } else {
        this.hideDropDownBox();
      }
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.leftWrapper}>
            <div className={s.wrapperBrand}>
              <Link className={s.brand} to="/">
                <span className={s.betaText}>Beta</span>
              </Link>
            </div>
            <div className={s.wrapperSearch}>
              <div className={s.wrapInside}>
                <div className={s.wrapInput}>
                  <input type="text" placeholder="Tìm kiếm" className={s.mainInputSearch}/>
                </div>
              </div>
            </div>
            <div className={s.clear}></div>
          </div>
          <div className={s.rightWrapper}>
            <div className={s.wrapperListItems} ref="area">
              <div className={s.wrapperInfoLogin} onClick={this.toggleDrop.bind(this)}>
                <label className={s.storeName}>
                  {this.state.account}
                  <span className={s.caretDown}/>
                </label>
                <div data-show={this.state.isShowWrapDrop}
                     className={s.wrapperDropDownOption}>
                  <div className={s.wrapperCaret}>
                    <i className={s.caretUp}/>
                    <i className={s.caretUpShadow}/>
                  </div>
                  <ul>
                    <li>
                      <Link to="/cai-dat">Thông tin cửa hàng</Link>
                    </li>
                    <li>
                      <a target="_blank"
                         href={process.env.NODE_ENV == 'development' ? `${moduleUrl.pathLaargoLocal}${this.state.storePath}` :
                           `${moduleUrl.pathLaargoPublish}${this.state.storePath}`}>Chuyển
                        tới cửa hàng</a>
                    </li>
                    <li><a href="/thoat">Đăng xuất</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
