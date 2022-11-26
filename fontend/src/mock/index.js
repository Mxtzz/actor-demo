import Mock from 'mockjs';
import { home } from './home';
import { detail } from './detail';
import { browser } from './browser';

if (process.env.NODE_ENV === 'development') {
  Mock.mock(/star\/getByParam/, 'get', home.list);
  Mock.mock(/works\/list/, 'get', home.list);
  Mock.mock(/star\/selectDetail/, 'get', detail.data);
  Mock.mock(/browser/, 'get', browser.data);
}

console.log('===api', process.env);
