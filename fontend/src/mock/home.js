import Mock from 'mockjs';
import { getParams } from '../api';
const { Random } = Mock;

// const total = Random.integer(0, 399);
const total = 1;

const getActorList = ({ pageNum, pageSize, starName }) => {
  // 数据
  const current = Number(pageNum);

  const actorList = {
    current,
    pages: Math.ceil(total / pageSize),
    searchCount: false,
    size: Number(pageSize),
    total: total,
    records: [],
  };

  let count = pageSize;
  const isLastPage = current === actorList.pages;
  if (isLastPage) {
    count = total % pageSize;
  }

  for (let i = 0; i < count; i++) {
    actorList.records.push({
      certify: Random.integer(1, 99),
      cooperation: {},
      createBy: '',
      createTime: Date.now(),
      experience: Random.cparagraph(),
      starHead: Random.image(),
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
      starName: Number(pageNum * pageSize + i) + Random.cname(),
      starNation: Random.province(),
      starRepresentativeWork: Random.cparagraph(),
      starWeight: Random.integer(1, 99),
      updateTime: Date.now(),
    });
  }

  return actorList;
};

export const home = {
  list: _ => {
    const { pageNum, pageSize, starName } = getParams(_.url);
    return {
      code: 200,
      message: 'success',
      data: getActorList({ pageNum, pageSize, starName }),
    };
  },
};
