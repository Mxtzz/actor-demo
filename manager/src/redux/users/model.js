import { createModel } from '@rematch/core';
import { effects } from './effects';
import { getCookie, addCookie, removeCookie } from '@/utils/cookies';
import { getUserInfo, logOut } from '@/api/user';

const initState = {
  username: 'Mxtzz',
  roles: [],
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  token: getCookie('token') || '',
};

export const users = createModel()({
  state: initState,
  reducers: {
    setToken: (state, token) => {
      state.token = token || '';
      return state;
    },
    SET_USER_INFO: (state, { roles, avatar, username }) => {
      state.roles = roles;
      state.avatar = avatar || '';
      state.username = username || '';

      addCookie(`username`, username);
      addCookie(`roles`, roles);
      return state;
    },
    CLEAR_USER_INFO: state => {
      state.roles = [];
      state.avatar = '';
      state.username = '';
      state.token = '';

      removeCookie('username');
      removeCookie('roles');
      removeCookie('token');
      return state;
    },
  },
  effects,
});
