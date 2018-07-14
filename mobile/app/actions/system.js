import { SystemTypes as SysTypes } from '../constants/ActionTypes';
import { get, post, APIUrl, getToken } from '../lib/helper';

/* ============= CONNECTION ACTION START ================= */
const connecting = () => ({
  type: SysTypes.SYSTEM_CHECK_CONNECTION,
});

const connectSuccess = (isLogin) => ({
  type: SysTypes.SYSTEM_CHECK_CONNECTION_SUCCESS,
  payload: {
    isLogin,
  },
});

const connectFailed = () => ({
  type: SysTypes.SYSTEM_CHECK_CONNECTION_FAILED,
});

const connectToServer = () => async (dispatch) => {
  dispatch(connecting());
  let res;
  try {
    res = await get(APIUrl('health-check'), false);
  } catch (error) {
    console.log(error.message);
    dispatch(connectFailed());
    return;
  }

  if (res.ok) {
    const token = await getToken();
    dispatch(connectSuccess(!!token));
    return;
  }
  dispatch(connectFailed());
};

/* ============== CONNECTION ACTION END ================== */

/* =============== PUBLISH ACTION START ================== */
const publishing = () => ({
  type: SysTypes.SYSTEM_CHECK_CONNECTION,
  payload: {
    isSent: false,
    errorMsg: '',
  },
});

const publishSuccess = (isSent) => ({
  type: SysTypes.SYSTEM_CHECK_CONNECTION_SUCCESS,
  payload: {
    isSent,
    errorMsg: '',
  },
});

const publishFailed = (errorMsg) => ({
  type: SysTypes.SYSTEM_CHECK_CONNECTION_FAILED,
  payload: {
    errorMsg,
  },
});

const publishAction = (action) => async (dispatch) => {
  dispatch(publishing());
  let res;
  try {
    res = await post(APIUrl('actions'), false, action);
  } catch (error) {
    console.log(error.message);
    dispatch(publishFailed());
    return;
  }

  if (res.ok) {
    dispatch(publishSuccess(true));
    return;
  }
  dispatch(publishFailed());
};
/* ================ PUBLISH ACTION END =================== */

/* ================== GET DATA START ===================== */
/* =================== GET DATA END ====================== */

const SystemActions = {
  connectToServer,
  publishAction,
};

export default SystemActions;