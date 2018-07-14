import 'whatwg-fetch-timeout';
import _ from 'lodash';
import DB from './localDb';

// const APIUrl = (api) => `https://dcdcs-api.herokuapp.com/api/${api}`;
// const APIUrl = (api) => `https://192.168.33.93:3000/api/${api}`;
const APIUrl = (api) => `http://192.168.33.155:3000/api/${api}`;

const getToken = async () => {
  try {
    const token = await DB.hload('token');
    return token;
  } catch (error) {
    return '';
  }
};
/**
 *
 * @param {String} url
 * @param {String} method
 * @param {Boolean} useToken
 * @param {Object} body
 * fetch API wrapper with default options
 */
const request = async (url, method, useToken, body) => {
  let token = '';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (useToken) {
    token = await getToken();
  }
  if (token) headers['x-access-token'] = token;

  const options = _.omitBy({
    method,
    headers,
    body: JSON.stringify(body),
    timeout: 15000, // 15s
  }, _.isUndefined);
  const res = await fetch(url, options);
  return res;
};

/**
 *
 * @param {String} methodName
 * generatae http method
 */
const genHttpMethod = (methodName) =>
  async (url, useToken, body) => {
    const res = await request(url, methodName.toUpperCase(), useToken, body);
    if (res.status === 404) throw new Error('API not found!');
    return res;
  };

const get = genHttpMethod('get');
const post = genHttpMethod('post');
const put = genHttpMethod('put');
const del = genHttpMethod('delete');

async function postForm(url, uri) {
  console.log('Uploading ' + uri);
  const apiUrl = url;
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  const formData = new FormData();
  const token = await getToken();

  formData.append('file', {
    uri,
    name: `recording.${fileType}`,
    type: `audio/x-${fileType}`,
  });

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'x-access-token': token,
    },
  };

  console.log('POSTing ' + uri + ' to ' + apiUrl);
  return fetch(apiUrl, options);
}


export { getToken, APIUrl, get, post, put, del, postForm };