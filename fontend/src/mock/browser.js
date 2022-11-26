import Mock from 'mockjs';
import { getParams } from '../api';
const { Random } = Mock;

// 数据
const data = {
  page: 1,
  size: 30,
  count: 60,
  data: [],
};

for (let i = 0; i < Random.integer(0, 30); i++) {
  const works = [];
  for (let i = 0; i < Random.integer(3, 4); i++) {
    works.push({
      id: Random.integer(24).toString(),
      picture: Random.image(),
      title: Random.cparagraph(3, 20),
    });
  }
  // 数据
  data.data.push({
    id: Random.integer(24).toString(),
    name: Random.cname(),
    age: Random.integer(1, 99),
    birth: Random.date(),
    gender: Random.integer(1, 2),
    picture: Random.image(),
    describe: Random.cparagraph(),
    address: Random.province(),
    intro: Random.cparagraph(),
    award: Random.cparagraph(),
    works,
  });
}

export const browser = {
  data: _ => {
    const params = getParams(_.url);
    if (!params.name) {
      return {
        code: 200,
        message: 'failed',
        data: {},
      };
    }
    data.name = params.name;
    return {
      code: 200,
      message: 'success',
      data,
    };
  },
};
