import { SystemTypes } from '../constants/ActionTypes';
import * as SystemState from '../constants/SystemState';

const initState = {
  sysState: SystemState.UNKNOWN,
  oldState: SystemState.UNKNOWN,
  temperature: 0,
  humidity: 0,
  dryingTime: 0,
  errorMsg: '',
  isSent: false,
};

const infoReducer = (state = initState, action) => {
  switch (action.type) {
    case SystemTypes.SYSTEM_PUBLISH_ACTION:
    case SystemTypes.SYSTEM_GET_DATA_SUCCESS:
    case SystemTypes.SYSTEM_GET_DATA_FAILED:
    case SystemTypes.SYSTEM_PUBLISH_ACTION_SUCCESS:
    case SystemTypes.SYSTEM_PUBLISH_ACTION_FAILED: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SystemTypes.SYSTEM_GET_DATA:
    default: {
      return state;
    }
  }
};

export default infoReducer;