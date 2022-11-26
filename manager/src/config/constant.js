const WX_APP_ID = 'appid';
const STORAGE_PREFIX = 'rad_';
const COOKIE_PREFIX = 'rad_';

const GLOBAL_DATA = {
  env: 'fat',
  proxy_url: 'https://webapi-fat.shadowcreator.com',
  dev: {
    // 'baseUrl' : '/api/100026'
    baseUrl: '/dev-api',
  },
  fat: {
    baseUrl: 'http://webapi-fat.shadowcreator.com/100026',
  },
  uat: {
    baseUrl: 'http://webapi-uat.shadowcreator.com/100026',
  },
  pro: {
    baseUrl: 'http://webapi.shadowcreator.com/100026',
  },
};

const WHITE_CODE_LIST = [
  {
    code: 200,
    msg: '',
  },
];

const LOGIN_ERROR_CODE = [
  {
    code: 5004,
    msg: '无效token',
  },
];

const COLOR = {
  HomeLeft: '#EEA6B7',
  HomeRightBottom: '#F68C60',
  GalleryBg: '#000000',
};

const MEDIA = {
  HomeC1:
    'https://i0.hdslb.com/bfs/new_dyn/687344b2290dc0c6b2bd5c7a36bebcf8533459953.png',
  HomeC2:
    'https://i0.hdslb.com/bfs/new_dyn/2c0a940c7680e4419433ed6e07e53194533459953.png',
  HomeC3:
    'https://i0.hdslb.com/bfs/new_dyn/005791d537706bd22c2cf55a2e9dcd9f533459953.png',
  HomeC4:
    'https://i0.hdslb.com/bfs/new_dyn/c4ece7974ec496085aa309600ea800f6533459953.png',
  Gallery1:
    'https://i0.hdslb.com/bfs/new_dyn/64af4bde5db5db4600d90e9e4156823e533459953.png',
  Gallery2:
    'https://i0.hdslb.com/bfs/new_dyn/12e4ad66e66530376dddc92192a481de533459953.png',
  Gallery3:
    'https://i0.hdslb.com/bfs/new_dyn/b40d96d263244fb1159aa3f2b3d70a56533459953.png',
  Gallery4:
    'https://i0.hdslb.com/bfs/new_dyn/792fc83b52120ac93612b95ddcbef3c2533459953.png',
  Actor1_1:
    'https://i0.hdslb.com/bfs/new_dyn/3b158fd5a1d26db352d3540a1ac22370533459953.png',
  Actor1_2:
    'https://i0.hdslb.com/bfs/new_dyn/c5b2c718a5dc15f4b5c56e3b2f47a217533459953.png',
  Actor1_3:
    'https://i0.hdslb.com/bfs/new_dyn/1af28ee067d97c09c365a9ff6c453bb5533459953.png',
  Actor2_1:
    'https://i0.hdslb.com/bfs/new_dyn/a31f0ee2ab65d94495872e47099a061f533459953.png',
  Actor2_2:
    'https://i0.hdslb.com/bfs/new_dyn/61ecec63fcd10b65bc218fc222588764533459953.png',
  Actor2_3:
    'https://i0.hdslb.com/bfs/new_dyn/3b1998c36b0982a328a12ad6c15388c4533459953.png',
};

export {
  WX_APP_ID,
  STORAGE_PREFIX,
  COOKIE_PREFIX,
  GLOBAL_DATA,
  WHITE_CODE_LIST,
  LOGIN_ERROR_CODE,
  COLOR,
  MEDIA,
};
