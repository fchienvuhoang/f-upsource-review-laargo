/**
 * Created by vuchien on 7/27/16.
 */

import jwt from 'jsonwebtoken';
import {clearCookie} from '../components/logged';

export default function authentication(app) {

  // fetch session login
  app.get('/fetch-session', (req, res)=> {
    if (req.session.authenticated != 'undefined') {
      const authenSession = req.session.authenticated;
      res.send(JSON.stringify(authenSession));
    }
    else {
      res.send('');
    }
  });

  // Logout endpoint
  app.get('/thoat', function (req, res) {
    req.session.destroy();
    clearCookie(res);
    res.redirect("/dang-nhap");
  });

  /**
   * TEST
   */
  app.get('/sign', (req, res) => {
    var token = jwt.sign({foo: 'bar'}, 'shhhhh');
    res.send(token);
  });

  /**
   * TEST
   */
  app.get('/verify', (req, res)=> {
    const sign = req.query.sign;
    const decode = jwt.decode(sign);
    var decoded_verify = jwt.verify(sign, 'shhhhh');
    res.send(JSON.stringify({
        sign: sign,
        decode: decode,
        decoded_verify: decoded_verify
      }
    ));
  })
}
