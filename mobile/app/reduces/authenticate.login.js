import { AuthenticateTypes } from '../constants/ActionTypes';

const initState = {
  errorMsg: '',
  isLoading: false,
  isLogin: false,
};

const loginReducer = (state = initState, action) => {
  const { errorMsg } = action.payload || {};
  switch (action.type) {
    case AuthenticateTypes.AUTH_LOGIN: {
      return {
        ...initState,
        isLoading: true,
      };
    }
    case AuthenticateTypes.AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLogin: true,
      };
    }
    case AuthenticateTypes.AUTH_LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        errorMsg,
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;