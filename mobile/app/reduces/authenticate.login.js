import { AuthenticateTypes } from '../constants/ActionTypes';

const initState = {
  errorMsg: '',
  isLoading: false,
  isLogin: false,
  userId: '',
};

const loginReducer = (state = initState, action) => {
  const { errorMsg, userId } = action.payload || {};
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
        userId,
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