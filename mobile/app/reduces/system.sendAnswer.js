import { SystemTypes } from '../constants/ActionTypes';

const initState = {
  loading: false,
  isSent: false,
  errorMsg: 0,
  score: 0,
};

const connectionReducer = (state = initState, action) => {
  const { errorMsg, score } = action.payload || {};

  switch (action.type) {
    case SystemTypes.SYSTEM_SEND_ANSWER: {
      return {
        ...initState,
        loading: true,
      };
    }
    case SystemTypes.SYSTEM_SEND_ANSWER_SUCCESS: {
      return {
        ...state,
        loading: false,
        isSent: true,
        errorMsg: '',
        score,
      };
    }
    case SystemTypes.SYSTEM_SEND_ANSWER_FAILED: {
      return {
        ...state,
        loading: false,
        isSent: false,
        score: 0,
        errorMsg,
      };
    }
    default: {
      return state;
    }
  }
};

export default connectionReducer;