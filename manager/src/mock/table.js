import Mock from 'mockjs';
const { Random } = Mock;
const list = [];
const count = 20;

for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: '@increment',
      title: '@ctitle(5, 10)',
      author: '@cname',
      readings: '@integer(300, 5000)',
      date: '@datetime',
    }),
  );
}

const list2 = [];
for (let i = 0; i < 7; i++) {
  list2.push(
    Mock.mock({
      id: i,
      date: '@date("yyyy-MM-dd")',
      name: '@cname',
      status: i % 2 ? 'Completed' : 'Pending',
      price: '@integer(300, 5000)',
      order_no: '@natural',
      address: '@county(true)',
    }),
  );
}

// 数据
const actorList = {
  page: 0,
  size: 0,
  count: 0,
  data: [
    {
      'array|30': {
        name: Random.cname(),
        age: Random.integer(1, 99),
        birth: Random.date(),
        gender: Random.integer(1, 2),
        picture: Random.image(),
        describe: Random.cparagraph(),
        address: Random.province(),
      },
    },
  ],
};

export default {
  tableData: _ => {
    return {
      code: 200,
      message: 'success',
      data: {
        list,
      },
    };
  },

  dashboardTable: _ => {
    return {
      code: 200,
      message: 'success',
      data: {
        list: list2,
      },
    };
  },

  list: () => {
    return {
      code: 200,
      message: 'success',
      data: actorList,
    };
  },
};
