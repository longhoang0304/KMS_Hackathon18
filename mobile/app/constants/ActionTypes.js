const AuthenticateTypes = {
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILED: 'AUTH_LOGIN_FAILED',
  AUTH_FORGOT_PWD: 'USER_FORGOT_PASSWORD',
  AUTH_FORGOT_PWD_SUCCESS: 'USER_FORGOT_PASSWORD_SUCCESS',
  AUTH_FORGOT_PWD_FAILED: 'USER_FORGOT_PASSWORD_FAILED',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
};

const UserTypes = {
  USER_GET_INFO: 'USER_GET_INFORMATION',
  USER_GET_INFO_SUCCESS: 'USER_GET_INFORMATION_SUCCESS',
  USER_GET_INFO_FAILED: 'USER_GET_INFORMATION_FAILED',
  USER_UPDATE_INFO: 'USER_UPDATE_INFORMATION',
  USER_UPDATE_INFO_SUCCESS: 'USER_UPDATE_INFORMATION_SUCCESS',
  USER_UPDATE_INFO_FAILED: 'USER_UPDATE_INFORMATION_FAILED',
  USER_CLEAR_ERROR_MESSAGE: 'USER_CLEAR_ERROR_MESSAGE',
};

const SystemTypes = {
  SYSTEM_CHECK_CONNECTION: 'SYSTEM_CHECK_CONNECTION',
  SYSTEM_CHECK_CONNECTION_SUCCESS: 'SYSTEM_CHECK_CONNECTION_SUCCESS',
  SYSTEM_CHECK_CONNECTION_FAILED: 'SYSTEM_CHECK_CONNECTION_FAILED',
  SYSTEM_PUBLISH_ACTION: 'SYSTEM_PUBLISH_ACTION',
  SYSTEM_PUBLISH_ACTION_SUCCESS: 'SYSTEM_PUBLISH_ACTION_SUCCESS',
  SYSTEM_PUBLISH_ACTION_FAILED: 'SYSTEM_PUBLISH_ACTION_FAILED',
  SYSTEM_GET_DATA: 'SYSTEM_GET_DATA',
  SYSTEM_GET_DATA_SUCCESS: 'SYSTEM_GET_DATA_SUCCESS',
  SYSTEM_GET_DATA_FAILED: 'SYSTEM_GET_DATA_FAILED',
};

export { AuthenticateTypes, UserTypes, SystemTypes };