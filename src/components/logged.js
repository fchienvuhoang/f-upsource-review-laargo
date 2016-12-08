/**
 * Created by vuchien on 8/10/16.
 */

import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';
import {divCookie, hostServices, cookieLogged} from '../config';
import fetch from '../core/fetch';
/**
 * Fetch session logged
 * @param req
 * @returns {*}
 */
export const fetchStoreLoggedServer = (req) => {
  if (req.session.authenticated != 'undefined' && req.session.authenticated != undefined) {
    const authenSession = req.session.authenticated;
    return authenSession.id;
  } else {
    return "";
  }
};

/**
 * Save session logged
 * @param req
 * @param obj
 */
export function saveToSessionLogin(req, obj) {
  /* save to session */
  req.session.authenticated = obj;
}

export const checkLogged = async(req, res) => {
  if (req.url === '/dang-nhap') {
    return false;
  } else {
    if (req.session.authenticated == undefined || req.session.authenticated == null || req.session.authenticated == "") {
      // check cookie
      var haveCookie = checkingCookie(req);
      if (haveCookie) {
        // parse cookie
        var objLogin = parseCookie(req);
        if (objLogin == undefined) {
          res.redirect("/dang-nhap");
          return false;
        } else {
          // handling login
          const account = objLogin.account;
          const password = objLogin.password;
          const storeId = objLogin.id;
          const storePath = objLogin.storePath;

          let pathAPI = "/stores/login?account=" + account + "&password=" + password;
          const url = hostServices + pathAPI;
          try {
            const response = await fetch(url);
            const resJson = await response.json();
            if (resJson.message == "fail") {
              res.redirect("/dang-nhap");
              return false;
            } else {
              // a valid cookie already exists
              // increment days for save cookie
              createCookie(res, {account, password, id: storeId, storePath});

              // save to session login
              saveToSessionLogin(req, {account, id: storeId, storePath});
              return true;
            }
          }
          catch (err) {
            if (__DEV__) {
              console.log("err:", err);
            }
            return false;
          }
        }
      } else {
        res.redirect("/dang-nhap");
        return false;
      }
    } else {
      // a session already exists
      return true;
    }
  }
};

function checkingCookie(req) {
  const loginCookie = req.cookies.LID; // LID fix here
  if (loginCookie == undefined || loginCookie == '' || loginCookie == null) {
  } else {
    return true;
  }
}

function parseCookie(req) {
  try {
    const loginCookie = req.cookies.LID; // LID fix here
    if (loginCookie != undefined) {
      const bytes = AES.decrypt(loginCookie, divCookie);
      const objLoginStr = bytes.toString(enc);
      return JSON.parse(objLoginStr);
    }
  }
  catch (err) {
    if (__DEV__) {
      console.log(err);
    }
    return undefined;
  }
}

export function createCookie(res, obj) {
  const _state = AES.encrypt(JSON.stringify(obj), divCookie);
  const stateString = _state.toString();
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 7); // 7 days
  res.cookie(cookieLogged.id, stateString, {
    expires: expireDate,
    httpOnly: true,
    secure: true,
    domain: process.env.NODE_ENV == 'production' ? cookieLogged.publishDomain : cookieLogged.localDomain
  });
}

export function clearCookie(res) {
  res.clearCookie(cookieLogged.id, {domain: process.env.NODE_ENV == 'production' ? cookieLogged.publishDomain : cookieLogged.localDomain});
}
