import Layout from '@/layouts';
import { dynamicImport } from './utils';
// import componentsRouter from "./modules/components";
import nestedRouter from './modules/nested';
// import { isExternal } from '@/utils/validate'

/**
 * Note: 子菜单只在路由子菜单时出现。长度> = 1
 *
 * hidden: true                   如果设置为true, item将不会显示在侧边栏中(默认为false)
 * redirect: '                    重定向地址
 * title:'router-name'            名称显示在侧边栏和面包屑(建议设置)
 * roles: ['admin','editor']      控制页面角色(您可以设置多个角色)
 * icon: 'svg-name'               svgIcon
 * affix: true                    如果设置为true，标签将会一直显示在tags-view中
 */

const constantRoutesList = [
  {
    path: '/login',
    component: dynamicImport(() =>
      import(/* webpackChunkName:'Login'*/ '@/views/login'),
    ),
    hidden: true,
  },
  {
    path: '/401',
    component: dynamicImport(() =>
      import(/* webpackChunkName:'Error401'*/ '@/views/errorPage/401'),
    ),
    hidden: true,
  },
  {
    path: '/404',
    component: dynamicImport(() =>
      import(/* webpackChunkName:'Error401'*/ '@/views/errorPage/404'),
    ),
    hidden: true,
  },
  {
    path: '/',
    redirect: '/dashboard/index',
  },
];

const asyncRoutesList = [
  {
    path: '/dashboard',
    title: '首页',
    icon: 'home',
    redirect: '/dashboard/index',
    component: Layout,
    roles: ['admin', 'editor'],
    children: [
      {
        title: '首页',
        path: '/dashboard/index',
        hidden: true,
        // affix : true,
        roles: ['admin', 'editor'],
        component: dynamicImport(() =>
          import(/* webpackChunkName:'Dashboard'*/ '@/views/dashboard'),
        ),
      },
    ],
  },
  {
    path: '/manage',
    title: '管理',
    redirect: '/manage/list',
    component: Layout,
    icon: 'warning-circle',
    roles: ['admin', 'editor'],
    children: [
      {
        path: '/manage/list',
        title: '列表',
        roles: ['admin', 'editor'],
        component: dynamicImport(() =>
          import(/* webpackChunkName:'ErrorPage404'*/ '@/views/manage/list'),
        ),
      },
      {
        path: '/manage/add',
        title: '添加',
        roles: ['admin', 'editor'],
        component: dynamicImport(() =>
          import(/* webpackChunkName:'ErrorPage401'*/ '@/views/manage/add'),
        ),
      },
    ],
  },
  {
    path: '/error',
    title: '错误页面',
    redirect: '/error/404',
    component: Layout,
    icon: 'warning-circle',
    roles: ['admin', 'editor'],
    children: [
      {
        path: '/error/404',
        title: '404',
        roles: ['admin', 'editor'],
        component: dynamicImport(() =>
          import(/* webpackChunkName:'ErrorPage404'*/ '@/views/errorPage/404'),
        ),
      },
      {
        path: '/error/401',
        title: '401',
        roles: ['admin', 'editor'],
        component: dynamicImport(() =>
          import(/* webpackChunkName:'ErrorPage401'*/ '@/views/errorPage/401'),
        ),
      },
    ],
  },
  nestedRouter,
  {
    path: 'antd',
    component: Layout,
    title: '外链-ant',
    icon: 'sound',
    roles: ['admin', 'editor'],
    children: [
      {
        roles: ['admin', 'editor'],
        path: 'https://ant.design/docs/react/introduce-cn',
        title: 'ant-design',
      },
      {
        roles: ['admin', 'editor'],
        path: 'https://www.baidu.com/',
        title: '百度',
      },
    ],
  },

  {
    path: '*',
    redirect: '/error/404',
  },
];

export const asyncRoutes = asyncRoutesList;
export const constantRoutes = constantRoutesList;
