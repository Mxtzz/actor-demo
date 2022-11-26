import Mock from 'mockjs';
import { home } from './home';
import { detail } from './detail';
import { browser } from './browser';

Mock.mock(/home\/list/, 'post', home.list);
Mock.mock(/works\/list/, 'get', home.list);
Mock.mock(/detail/, 'get', detail.data);
Mock.mock(/browser/, 'get', browser.data);
