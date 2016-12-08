/**
 * Created by vuchien on 7/19/16.
 */

import {hostServices} from '../config';
import fetch from '../core/fetch';
import {fetchStoreLoggedServer, checkLogged} from '../components/logged';

export default function apiConfig(app) {
  app.post('/api-post', async(req, res)=> {
    // check logged
    const nextAllow = await checkLogged(req, res);
    if (nextAllow) {
      const pathAPI = req.body.pathAPI;
      const bodyParam = req.body.bodyParam;
      const storeId = fetchStoreLoggedServer(req);
      const storeIdEncode = encodeURIComponent(storeId);
      const decodeBodyParam = decodeURIComponent(bodyParam + "&storeId=" + storeIdEncode);
      let url = hostServices + pathAPI;
      url = preventStoreIdDuplication(url);
      const re = await fetch(url, {
        method: 'POST',
        body: decodeBodyParam,
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      });
      const data = await re.text();
      res.status(200).send(data);
    }
  });

  app.get('/api', async(req, res)=> {
    // check logged
    const nextAllow = await checkLogged(req, res);
    if (nextAllow) {
      const storeId = fetchStoreLoggedServer(req);
      const storeURI = encodeURIComponent(storeId);
      let urlParam = req.query.u;
      urlParam = preventStoreIdDuplication(urlParam);
      fetch(hostServices + urlParam + "&storeId=" + storeURI).then(response => response.json()).then(json => {
        res.status(200).send(json);
      });
    }
  });
}


/**
 * To prevent insert storeId in u param & prevent a hacker insert a fake storeId two
 */
function preventStoreIdDuplication(url) {
  const parameter = "storeId";
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(parameter) + '=';
    var pars = urlparts[1].split(/[&;]/g);
    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0;) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }
    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
    return url;
  } else {
    return url;
  }
}
