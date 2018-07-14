import { combineReducers } from 'redux';
import login from './authenticate.login';
import connection from './system.connection';
import info from './system.info';

export default combineReducers({
  login,
  connection,
  info,
});