import jwdDecode from 'jwt-decode';
import { SystemTypes as SysTypes } from '../constants/ActionTypes';
import { get, post, postForm, APIUrl, getToken } from '../lib/helper';
import AuthActions from './authenticate';

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
    const decoded = await jwdDecode(token);
    dispatch(AuthActions.loginSuccess(decoded.id || ''));
    dispatch(connectSuccess(!!token));
    return;
  }
  dispatch(connectFailed());
};

/* ============== CONNECTION ACTION END ================== */

/* =============== SEND Answer START ================== */
const sendingAnswer = () => ({
  type: SysTypes.SYSTEM_SEND_ANSWER,
});

const sendAnswerSuccess = () => ({
  type: SysTypes.SYSTEM_SEND_ANSWER_SUCCESS,
});

const sendAnswerFailed = (errorMsg) => ({
  type: SysTypes.SYSTEM_SEND_ANSWER_FAILED,
  payload: {
    errorMsg,
  },
});

const sendAnswer = (content) => async (dispatch, getState) => {
  dispatch(sendingAnswer());
  let res;
  const store = getState().login;
  const { userId } = store;
  const body = {
    userId,
    content,
    questionId: '5b49c2954284ca1de036b415',
    interviewId: '5b49c1eb494a872058ef81c0',
  };
  try {
    res = await post(APIUrl('answer'), true, body);
    // res = await postForm(APIUrl('answer'), content);
  } catch (error) {
    console.log(error.message);
    dispatch(sendAnswerFailed());
    return;
  }

  if (res.ok) {
    dispatch(sendAnswerSuccess());
    return;
  }
  dispatch(sendAnswerFailed());
};
/* ================ SEND Answer END =================== */

/* ================== GET DATA START ===================== */
/* =================== GET DATA END ====================== */

const SystemActions = {
  connectToServer,
  sendAnswer,
};

export default SystemActions;