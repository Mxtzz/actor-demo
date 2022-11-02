import { getUserInfo, logOut } from '@/api/user';
import { getCookie, addCookie } from '@/utils/cookies';

export const effects = dispatch => ({
  reset: () => {},
  getUserInfoSlice: async (params, rootState) => {
    try {
      const { code, data } = await getUserInfo({
        token: getCookie('token') || rootState.users.token,
      });
      if (code === 200) {
        const result = {
          username: data.username || data.nickName || data.phone,
          avatar: data.avatar || '',
          roles: data.roles || ['admin'],
        };

        dispatch.users.SET_USER_INFO(result);
        return result;
      }
      dispatch.users.CLEAR_USER_INFO();
      // return thunkAPI.rejectWithValue(data.message || '登录失败');
      return Promise.reject('登录请求错误');
    } catch (err) {
      dispatch.users.CLEAR_USER_INFO();
      // return thunkAPI.rejectWithValue(err.response.data || '登录失败');
    }
  },
  loginOut: async (params, rootState) => {
    try {
      const { code, data } = await logOut();
      if (code === 200) {
        dispatch.users.CLEAR_USER_INFO();
        window.location.reload();
        return {};
      }
      // return thunkAPI.rejectWithValue(data.message || '登出失败');
    } catch (err) {
      // return thunkAPI.rejectWithValue(err.response.data || '登出失败');
    }
  },
  setToken: token => {
    addCookie('token', token);
  },
});
