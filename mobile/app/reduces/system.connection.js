import { SystemTypes } from '../constants/ActionTypes';

const initState = {
  isLoading: false,
  isLogin: false,
  healthCheck: 0,
};

const connectionReducer = (state = initState, action) => {
  const { isLogin } = action.payload || {};

  switch (action.type) {
    case SystemTypes.SYSTEM_CHECK_CONNECTION: {
      return {
        ...state,
        isLoading: true,
        isLogin: false,
        healthCheck: 0,
      };
    }
    case SystemTypes.SYSTEM_CHECK_CONNECTION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLogin,
        healthCheck: 1,
      };
    }
    case SystemTypes.SYSTEM_CHECK_CONNECTION_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        healthCheck: 2,
      };
    }
    default: {
      return state;
    }
  }
};

export default connectionReducer;