import { UserTypes } from '../constants/ActionTypes';

const initState = {
  username: '',
  fullName: '',
  email: '',
  address: '',
  errorMsg: '',
  isLoading: false,
};

const infoReducer = (state = initState, action) => {
  switch (action.type) {
    case UserTypes.USER_GET_INFO: {
      return ({
        ...state,
        isLoading: true,
        errorMsg: '',
      });
    }
    case UserTypes.USER_GET_INFO_SUCCESS: {
      return ({
        ...state,
        isLoading: false,
        errorMsg: '',
        ...action.payload,
      });
    }
    case UserTypes.USER_GET_INFO_FAILED: {
      return ({
        ...state,
        isLoading: false,
        ...action.payload,
      });
    }
    case UserTypes.USER_CLEAR_ERROR_MESSAGE: {
      return {
        ...state,
        errorMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};

export default infoReducer;