/**
 * Created by vuchien on 8/12/16.
 */
import fetch from '../core/fetch';

/**
 * fetch client type get
 * @param url
 * @param callback
 * @returns {*}
 */
export const fetchGet = (url, callback) => {
  fetch(url, {credentials: 'include'})
    .then(response => response.json())
    .then(json => callback(json))
};
export const fetchPost = (form, callback) => {
  const url = "/api-post";
  fetch(url, {
    method: 'POST',
    body: form,
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    credentials: 'include'
  })
    .then(response => response.json())
    .catch(function (ex) {
      console.log('parsing failed', ex)
    })
    .then(result => callback(result));
};

export const renderAPI = (pathParams) => {
  return '/api?u=' + encodeURIComponent(pathParams);
};

export const renderForm = (pathAPI, bodyParams) => {
  return "pathAPI=" + pathAPI + "&bodyParam=" + bodyParams;
};
