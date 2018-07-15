import jwdDecode from 'jwt-decode';
import _ from 'lodash';
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
    let decoded;
    if (token) {
      decoded = await jwdDecode(token);
      dispatch(AuthActions.loginSuccess(decoded.id || ''));
    }
    dispatch(connectSuccess(!!token));
    return;
  }
  dispatch(connectFailed());
};

/* ============== CONNECTION ACTION END ================== */

/* =============== SEND ANSWER START ================== */
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
    questionId: '5b49c2954284ca1de036b415',
    interviewId: '5b49c1eb494a872058ef81c0',
  };
  try {
    // res = await post(APIUrl('answer'), true, body);
    res = await postForm(APIUrl('answer'), content, body);
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
/* ================ SEND ANSWER END =================== */

/* ================== FETCH ORG START ===================== */
const fetchingOrg = () => ({
  type: SysTypes.SYSTEM_FETCH_ORGANIZATION,
});

const fetchOrgSuccess = (org) => ({
  type: SysTypes.SYSTEM_FETCH_ORGANIZATION_SUCCESS,
  payload: {
    org,
  },
});

const fetchOrgtFailed = (errorMsg) => ({
  type: SysTypes.SYSTEM_FETCH_ORGANIZATION_FAILED,
  payload: {
    errorMsg,
  },
});

const fetchOrg = (orgId) => async (dispatch) => {
  dispatch(fetchingOrg());
  let res;
  try {
    // res = await post(APIUrl('answer'), true, body);
    res = await get(APIUrl(`org/${orgId}`), true);
    const json = await res.json();
    dispatch(fetchOrgSuccess(json));
    return;
  } catch (error) {
    console.log(error.message);
    dispatch(fetchOrgtFailed());
  }
};
/* =================== FETCH ORG END ====================== */

/* ================== FETCH RESULT START ===================== */
const fetchingResult = () => ({
  type: SysTypes.SYSTEM_FETCH_RESULT,
});

const fetchResultSuccess = (resultCount, result) => ({
  type: SysTypes.SYSTEM_FETCH_RESULT_SUCCESS,
  payload: {
    resultCount,
    result,
  },
});

const fetchResultFailed = (errorMsg) => ({
  type: SysTypes.SYSTEM_FETCH_RESULT_FAILED,
  payload: {
    errorMsg,
  },
});

const fetchResult = () => async (dispatch) => {
  dispatch(fetchingResult());
  let res;
  try {
    // res = await post(APIUrl('answer'), true, body);
    res = await get(APIUrl('interview'), true);
    const json = await res.json();
    dispatch(fetchResultSuccess(json.length, json));
    _.forEach(json, (e) => {
      fetchOrg(e.organizationId)(dispatch);
    });
    return;
  } catch (error) {
    console.log(error.message);
    dispatch(fetchResultFailed(error.messag));
  }
};
/* =================== FETCH RESULT END ====================== */

/* ================== FETCH QUESTIONS START ===================== */
const fetchingQuestions = () => ({
  type: SysTypes.SYSTEM_FETCH_QUESTIONS,
});

const fetchQuestiontSuccess = (questions) => ({
  type: SysTypes.SYSTEM_FETCH_QUESTIONS_SUCCESS,
  payload: {
    questions,
  },
});

const fetchQuestionFailed = (errorMsg) => ({
  type: SysTypes.SYSTEM_FETCH_QUESTIONS_FAILED,
  payload: {
    errorMsg,
  },
});

const fetchQuestion = () => async (dispatch) => {
  dispatch(fetchingQuestions());
  let res;
  try {
    // res = await post(APIUrl('answer'), true, body);
    res = await get(APIUrl('question'), true);
    const json = await res.json();
    dispatch(fetchQuestiontSuccess(json));
    return;
  } catch (error) {
    console.log(error.message);
    dispatch(fetchQuestionFailed(error.messag));
  }
};
/* =================== FETCH QUESTIONS END ====================== */

/* ================== FETCH SCORE START ===================== */
const fetchingScore = () => ({
  type: SysTypes.SYSTEM_FETCH_SCORE,
});

const fetchScoreSuccess = (totalScore) => ({
  type: SysTypes.SYSTEM_FETCH_SCORE_SUCCESS,
  payload: {
    totalScore,
  },
});

const fetchScoreFailed = (errorMsg) => ({
  type: SysTypes.SYSTEM_FETCH_SCORE_FAILED,
  payload: {
    errorMsg,
  },
});

const fetchScore = () => async (dispatch) => {
  dispatch(fetchingScore());
  let res;
  try {
    // res = await post(APIUrl('answer'), true, body);
    res = await get(APIUrl('answer'), true);
    const json = await res.json();
    const totalScore = _.reduce(json, (s, n) => s + n.score, 0);
    dispatch(fetchScoreSuccess(totalScore));
    return;
  } catch (error) {
    console.log(error.message);
    dispatch(fetchScoreFailed(error.messag));
  }
};
/* =================== FETCH SCORE END ====================== */

/* ================== FETCH MAX SCORE START ===================== */
const fetchingMaxScore = () => ({
  type: SysTypes.SYSTEM_FETCH_MAX_SCORE,
});

const fetchMaxScoreSuccess = (maxScore) => ({
  type: SysTypes.SYSTEM_FETCH_MAX_SCORE_SUCCESS,
  payload: {
    maxScore,
  },
});

const fetchMaxScoreFailed = (errorMsg) => ({
  type: SysTypes.SYSTEM_FETCH_MAX_SCORE_FAILED,
  payload: {
    errorMsg,
  },
});

const fetchMaxScore = (id) => async (dispatch) => {
  dispatch(fetchingMaxScore());
  let res;
  try {
    // res = await post(APIUrl('answer'), true, body);
    res = await get(APIUrl(`interview/${id || '5b49c1eb494a872058ef81c0'}`), true);
    const json = await res.json();
    dispatch(fetchMaxScoreSuccess(json.requirementScore));
    return;
  } catch (error) {
    console.log(error.message);
    dispatch(fetchMaxScoreFailed(error.messag));
  }
};
/* =================== FETCH MAX SCORE END ====================== */

const SystemActions = {
  connectToServer,
  sendAnswer,
  fetchResult,
  fetchOrg,
  fetchQuestion,
  fetchScore,
  fetchMaxScore,
};

export default SystemActions;