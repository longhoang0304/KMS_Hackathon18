import 'whatwg-fetch-timeout';
import _ from 'lodash';
import DB from './localDb';

const APIUrl = (api) => `https://dcdcs-api.herokuapp.com/api/${api}`;
// const APIUrl = (api) => `https://192.168.139.1/api/${api}`;

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


export { getToken, APIUrl, get, post, put, del };