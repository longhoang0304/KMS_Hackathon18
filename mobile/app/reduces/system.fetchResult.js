import { SystemTypes } from '../constants/ActionTypes';

const initState = {
  isLoading: false,
  errorMsg: '',
  resultCount: -1,
  result: [],
  oragnizations: [],
};

const searchResultReducer = (state = initState, action) => {
  const { errorMsg, result, resultCount, org } = action.payload || {};

  switch (action.type) {
    case SystemTypes.SYSTEM_FETCH_RESULT: {
      return {
        ...initState,
        isLoading: true,
      };
    }
    case SystemTypes.SYSTEM_FETCH_RESULT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMsg: '',
        result,
        resultCount,
      };
    }
    case SystemTypes.SYSTEM_FETCH_ORGANIZATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMsg: '',
        oragnizations: [...state.oragnizations, org],
      };
    }
    case SystemTypes.SYSTEM_FETCH_ORGANIZATION_FAILED:
    case SystemTypes.SYSTEM_FETCH_RESULT_FAILED: {
      return {
        ...initState,
        errorMsg,
      };
    }

    default: {
      return state;
    }
  }
};

export default searchResultReducer;