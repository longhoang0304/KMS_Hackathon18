import { combineReducers } from 'redux';
import login from './authenticate.login';
import connection from './system.connection';
import userInfo from './user.info';
import sendAnswer from './system.sendAnswer';
import searchResult from './system.fetchResult';

export default combineReducers({
  login,
  connection,
  userInfo,
  sendAnswer,
  searchResult,
});