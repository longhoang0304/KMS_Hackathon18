import { SystemTypes } from '../constants/ActionTypes';

const initState = {
  isLoading: false,
  errorMsg: '',
  questions: [],
};

const searchResultReducer = (state = initState, action) => {
  const { errorMsg, questions } = action.payload || {};

  switch (action.type) {
    case SystemTypes.SYSTEM_FETCH_QUESTIONS: {
      return {
        ...initState,
        isLoading: true,
      };
    }
    case SystemTypes.SYSTEM_FETCH_QUESTIONS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMsg: '',
        questions,
      };
    }
    case SystemTypes.SYSTEM_FETCH_QUESTIONS_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMsg,
      };
    }
    default: {
      return state;
    }
  }
};

export default searchResultReducer;