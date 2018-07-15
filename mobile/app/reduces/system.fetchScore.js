import { SystemTypes } from '../constants/ActionTypes';

const initState = {
  totalScore: 0,
  maxScore: 0,
  isLoading: false,
  errorMsg: '',
};

const connectionReducer = (state = initState, action) => {
  const { totalScore, maxScore } = action.payload || {};

  switch (action.type) {
    case SystemTypes.SYSTEM_FETCH_SCORE:
    case SystemTypes.SYSTEM_FETCH_MAX_SCORE: {
      return {
        ...initState,
        isLoading: true,
      };
    }
    case SystemTypes.SYSTEM_FETCH_SCORE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        totalScore,
        errorMsg: '',
      };
    }
    case SystemTypes.SYSTEM_FETCH_MAX_SCORE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        maxScore,
        errorMsg: '',
      };
    }
    case SystemTypes.SYSTEM_FETCH_MAX_SCORE_FAILED: {
      return {
        ...state,
        maxScore: 0,
        errorMsg: '',
        isLoading: false,
      };
    }
    case SystemTypes.SYSTEM_FETCH_SCORE_FAILED: {
      return {
        ...state,
        totalScore: 0,
        errorMsg: '',
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default connectionReducer;