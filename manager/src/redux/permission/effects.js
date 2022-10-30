import { asyncRoutes } from '@/router/routes';
import { getAllRedirects, filterAsyncRoutes } from '@/router/utils';

export const effects = dispatch => ({
  reset: () => {},
  asyncPermissionRoutes: async (roles, rootState) => {
    // 获取权限路由
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);

    // 提取 权限重定向路由
    const asyncRedirects = getAllRedirects(accessedRoutes, []);

    // 所有权限路由 ： 权限路由 + 权限重定向路由
    // const allAsyncRoutes = accessedRoutes.concat( asyncRedirects )
    const allAsyncRoutes = asyncRedirects.concat(accessedRoutes);
    const result = {
      // accessedRoutes,
      asyncRedirects,
      allAsyncRoutes,
      addRoutes: accessedRoutes,
      routers: rootState.permission.basicRoutes.concat(allAsyncRoutes),
    };

    await dispatch.permission.setRoutes(result);

    return result;
  },
});
