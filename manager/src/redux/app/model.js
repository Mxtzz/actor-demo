import { createModel } from '@rematch/core';
import { effects } from './effects';
import { getCookie, addCookie } from '@/utils/cookies';

const initState = {
  sidebarStatus: getCookie('sidebarStatus') ? !!+getCookie('sidebarStatus') : true,
  device: 'desktop',
};

export const app = createModel()({
  state: initState,
  reducers: {
    TOGGLE_SIDEBAR: state => {
      state.sidebarStatus = !state.sidebarStatus;

      if (state.sidebarStatus) {
        addCookie('sidebarStatus', 1);
      } else {
        addCookie('sidebarStatus', 0);
      }
      return state;
    },
    CLOSE_SIDEBAR: state => {
      state.sidebarStatus = false;
      addCookie('sidebarStatus', 0);
      return state;
    },
    TOGGLE_DEVICE: (state, { payload: device }) => {
      state.device = device;
      return state;
    },
  },
  effects,
});
