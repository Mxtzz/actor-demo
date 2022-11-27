import Mock from 'mockjs';
import loginMock from './login';
import tableMock from './table';

const { login, userInfo, logout } = loginMock;
const { tableData, dashboardTable, getByParam, defaultResult, getUpload } =
  tableMock;

// login
Mock.mock(/\/login/, 'post', login);

// user
Mock.mock(/\/userInfo/, 'post', userInfo);
Mock.mock(/\/logout/, 'post', logout);
Mock.mock(/\/table\/list/, 'get', tableData);
Mock.mock(/\/table\/dashboard/, 'get', dashboardTable);

if (process.env.MOCK_OPEN === true) {
  // 获取管理页列表
  Mock.mock(/star\/getByParam/, 'get', getByParam);
  Mock.mock(/star\/del/, 'get', defaultResult);
  Mock.mock(/star\/saveOrUpdate/, 'post', defaultResult);
  Mock.mock(/star\/upload/, 'post', getUpload);
}
