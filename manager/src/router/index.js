import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DynamicRouter from './dynamicRouter';
import { getCookie } from '@/utils/cookies';

const whiteList = ['/login'];

const RouterComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // const routes = useSelector(state => state.permission.routes);
  const roles = useSelector(state => state.users.roles);
  const { pathname } = location;
  const [routeList, setRouteList] = useState([]);

  // 路由守卫
  const routeGuard = async () => {
    const hasToken = getCookie('token');
    if (hasToken) {
      if (pathname === '/login') {
        navigate('/');
      } else {
        // 权限判断
        const hasRoles = roles && roles.length > 0;
        // let currentRoles = roles
        // 权限为空 则重新获取用户信息
        if (!hasRoles) {
          try {
            // const payload = await dispatch(getUserInfoSlice()).unwrap();
            // currentRoles = payload.roles

            const payload = await dispatch.users.getUserInfoSlice();
            // 注入权限路由
            const { routers } = await dispatch.permission.asyncPermissionRoutes(
              payload.roles,
            );
            setRouteList(routers);
          } catch (e) {
            // 退出登录
            dispatch.users.CLEAR_USER_INFO();
            navigate('/login');
            window.location.reload();
          }
        }

        // // 注入权限路由
        // await dispatch( asyncPermissionRoutes( currentRoles ) )
        // const { permission } = await store.getState()
        // const { routes } = permission
        // console.log( '路由守卫', routes )
        // setRouteList( routes )
      }
    } else {
      // debugger
      // 注入基础路由
      const { routers } = await dispatch.permission.asyncPermissionRoutes([]);
      setRouteList(routers);
      // 设置路由
      if (whiteList.indexOf(pathname) === -1) {
        navigate('/login', { replace: true });
      }
    }
  };

  useEffect(() => {
    (async () => {
      await routeGuard();
    })();
  }, [pathname]);

  return (
    <div>
      <DynamicRouter routes={routeList} />
    </div>
  );
};

export default RouterComponent;
