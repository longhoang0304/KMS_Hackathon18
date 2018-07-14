import jwdDecode from 'jwt-decode';
import { AuthenticateTypes as AuthTypes } from '../constants/ActionTypes';
import { post, APIUrl } from '../lib/helper';
import DB from '../lib/localDb';

const loggingIn = () => ({
  type: AuthTypes.AUTH_LOGIN,
});

const loginSuccess = (userId) => ({
  type: AuthTypes.AUTH_LOGIN_SUCCESS,
  payload: {
    userId,
  },
});

const loginFailed = (errorMsg) => ({
  type: AuthTypes.AUTH_LOGIN_FAILED,
  payload: {
    errorMsg,
  },
});


const login = (username, password) => async (dispatch) => {
  dispatch(loggingIn());
  let res;
  try {
    res = await post(APIUrl('auth/login'), false, {
      username,
      password,
    });
    const json = await res.json();
    if (res.ok) {
      const { token } = json;
      await DB.hsave('token', token);
      dispatch(loginSuccess(jwdDecode(token).id || ''));
    }
    const { message } = json;
    dispatch(loginFailed(message || 'Wrong password'));
  } catch (error) {
    console.log(error.message);
    dispatch(loginFailed(error.message));
  }
};

const AuthenticateActions = {
  login,
  loginSuccess,
};

export default AuthenticateActions;