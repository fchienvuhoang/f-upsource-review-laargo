/**
 * Created by vuchien on 8/22/16.
 */
  // NOTE change by atom
var express = require('express');
var router = express.Router();
var login = require('../views/login.pug');
import {hostServices} from '../../config';
import fetch from '../../core/fetch';
import {createCookie, saveToSessionLogin} from '../../components/logged';

/* GET users listing. */
router.get('/', function (req, res) {
  // check is logged
  const locals = {message: ''};
  const html = login(locals);
  res.send(html);
});

router.post('/', function (req, res) {
  const account = req.body.a;
  const password = req.body.p;
  var pathAPI = 'stores/login?account=' + account + '&password=' + password;
  const url = hostServices + pathAPI;
  fetch(url)
    .then(response => response.json())
    .then(json => {
      const status = json.status;
      const message = json.message;
      if (status == 'ok') {
        if (message == 'success') {
          const storeId = json.id;
          const storePath = json.storePath;

          /* save to session */
          saveToSessionLogin(req, {account, id: storeId, storePath});

          /* save to cookie */
          createCookie(res, {account, password, id: storeId, storePath});

          // direct to home page
          res.redirect('/');
        } else {
          const locals = {errorMessage: 'Tài khoản hoặc mật khẩu không đúng'};
          const html = login(locals);
          res.send(html);
        }
      } else {
        res.send(json);
        res.end(json);
      }
    });
});

module.exports = router;
