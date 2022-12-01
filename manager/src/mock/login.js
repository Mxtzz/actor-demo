const tokens = {
  admin: 'admin-token',
  guest: 'guest-token',
  editor: 'editor-token',
};

const users = {
  'admin-token': {
    id: 'admin',
    roles: ['admin'],
    username: 'Admin',
    avatar: 'https://pic2.zhimg.com/v2-8fac0cdf423ebe9f02e22b2e2da249a5_r.jpg',
    description: '我是超级管理员',
  },
  'editor-token': {
    id: 'editor',
    roles: ['editor'],
    username: '普通用户',
    avatar: 'https://pic4.zhimg.com/v2-762d7a294a36fac50f4af8efab0f5d7b_r.jpg',
    description: '产品啥也不是',
  },
};

export default {
  login: config => {
    const { username } = JSON.parse(config.body);
    const token = tokens[username];
    if (!token) {
      return {
        code: -1,
        message: '用户名或密码错误',
      };
    }
    return {
      code: 200,
      message: 'success',
      data: {
        token,
      },
    };
  },

  userInfo: config => {
    const { token } = JSON.parse(config.body);
    const userInfo = users[token];
    if (!userInfo) {
      return {
        code: 5004,
        message: '无效token',
        data: {},
      };
    }
    return {
      code: 200,
      message: 'success',
      data: userInfo,
    };
  },

  logout: () => {
    return {
      code: 200,
      message: 'success',
    };
  },
};
