import Mock from 'mockjs';
const { Random } = Mock;

const getList = (page, name) => {
  // 数据
  const actorList = {
    page: 0,
    size: 0,
    count: 0,
    data: [],
  };

  for (let i = 0; i < 30; i++) {
    actorList.data.push({
      id: Random.integer(24).toString(),
      name: name + Random.cname(),
      age: Random.integer(1, 99),
      birth: Random.date(),
      gender: Random.integer(1, 2),
      picture: Random.image(),
      describe: Random.cparagraph(),
      address: Random.province(),
    });
  }
  actorList.page = page;
  actorList.name = name;
  actorList.size = 30;
  actorList.count = Random.integer(page * 30, 99);
  return actorList;
};

export const home = {
  list: _ => {
    const { page, name } = JSON.parse(_.body);
    return {
      code: 200,
      message: 'success',
      data: getList(page, name),
    };
  },
};
