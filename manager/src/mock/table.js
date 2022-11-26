import Mock from 'mockjs';
const { Random } = Mock;
const list = [];
const count = 20;

const defaultResult = {
  code: 200,
  message: 'success',
  data: {},
};

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

const getActorList = () => {
  // 数据
  const current = Random.integer(1, 99);
  const pages = Random.integer(2, 99);
  const size = Random.integer(1, 99);
  // const total = Random.integer(1, 99);
  const actorList = {
    current,
    pages,
    searchCount: false,
    size,
    total: size * pages,
    records: [],
  };

  for (let i = 0; i < actorList.pages * actorList.size; i++) {
    actorList.records.push({
      certify: Random.integer(1, 99),
      cooperation: {},
      createBy: '',
      createTime: Date.now(),
      experience: Random.cparagraph(),
      id: Random.integer(24),
      sort: 1,
      starAge: Random.integer(1, 99),
      starBriefIntroduction: Random.cparagraph(),
      starDate: Date.now(),
      starHeight: Random.integer(100, 199).toString(),
      starHobby: Random.cparagraph(),
      starImg: Random.image(),
      starImgs: Random.image(),
      starLanguage: 'Chinese',
      starMasterImg: Random.image(),
      starMasterVideo: Random.image(),
      starName: Random.cname(),
      starNation: Random.province(),
      starRepresentativeWork: Random.cparagraph(),
      starWeight: Random.integer(1, 99),
      updateTime: Date.now(),
    });
  }

  return actorList;
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

  getByParam: () => {
    return {
      code: 200,
      message: 'success',
      data: getActorList(),
    };
  },
  defaultResult: () => {
    return defaultResult;
  },
};
