import { UserTypes } from '../constants/ActionTypes';
import { get, APIUrl } from '../lib/helper';
import DB from '../lib/localDb';

const gettingInfo = () => ({
  type: UserTypes.USER_GET_INFO,
});

const getInfoSuccess = () => ({
  type: UserTypes.USER_GET_INFO_SUCCESS,
});

const getInfoFailed = (errorMsg) => ({
  type: UserTypes.USER_GET_INFO_FAILED,
  payload: {
    errorMsg,
  },
});


const getInfo = (userId) => async (dispatch) => {
  dispatch(gettingInfo());
  let res;
  try {
    res = await get(APIUrl(`users/${userId}`), true);
    const json = await res.json();
    if (res.ok) {
      const { token } = json;
      await DB.hsave('token', token);
      dispatch(getInfoSuccess());
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
};

export default UserAction;