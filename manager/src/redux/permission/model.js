import { createModel } from '@rematch/core';
import { effects } from './effects';
import { constantRoutes } from '@/router/routes';
import { getAllRedirects } from '@/router/utils';

const basicRedirect = getAllRedirects(constantRoutes, []);
const basicRoutes = basicRedirect.concat(constantRoutes);

const initState = {
  routes: [],
  addRoutes: [],
  basicRoutes,
  allRedirects: basicRedirect,
};

export const permission = createModel()({
  state: initState,
  reducers: {
    setRoutes: (state, payload) => {
      const { allAsyncRoutes, routers, addRoutes, asyncRedirects } = payload;
      state.addRoutes = addRoutes;
      state.routes = routers;
      state.basicRoutes = state.basicRoutes.concat(allAsyncRoutes);
      state.allRedirects = state.allRedirects.concat(asyncRedirects);
      return state;
    },
  },
  effects,
});
