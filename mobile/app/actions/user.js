import { UserTypes } from '../constants/ActionTypes';
import { get, APIUrl } from '../lib/helper';

const gettingInfo = () => ({
  type: UserTypes.USER_GET_INFO,
});

const getInfoSuccess = (payload) => ({
  type: UserTypes.USER_GET_INFO_SUCCESS,
  payload,
});

const getInfoFailed = (errorMsg) => ({
  type: UserTypes.USER_GET_INFO_FAILED,
  payload: {
    errorMsg,
  },
});

const clearError = () => ({
  type: UserTypes.USER_CLEAR_ERROR_MESSAGE,
});

const getInfo = () => async (dispatch, getStore) => {
  dispatch(gettingInfo());
  const store = getStore().login;
  const { userId } = store;
  let res;
  try {
    res = await get(APIUrl(`users/${userId}`), true);
    const json = await res.json();
    if (res.ok) {
      const {
        username, fullName, email, address,
      } = json;
      dispatch(getInfoSuccess({
        username, fullName, email, address,
      }));
      return;
    }
    const { message } = json;
    dispatch(getInfoFailed(message || 'Unknown error occured'));
  } catch (error) {
    console.log(error.message);
    dispatch(getInfoFailed(error.message));
  }
};

const UserAction = {
  getInfo,
  clearError,
};

export default UserAction;