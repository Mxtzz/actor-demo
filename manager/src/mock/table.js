import Mock from 'mockjs';
import { getParams } from '@/utils/request';

const { Random } = Mock;

const defaultResult = {
  code: 200,
  message: 'success',
  data: {},
};

let total = Random.integer(0, 399);

const getActorList = ({ pageNum, pageSize, starName }) => {
  // 数据
  const current = Number(pageNum);

  if (starName) {
    total = Random.integer(0, 10);
  }

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

  const expCont = Random.integer(0, 6);
  const experience = [];

  for (let i = 0; i < expCont; i++) {
    experience.push({
      title: Random.integer(1, 999999999999),
      img: Random.image(),
      url: 'http://www.baidu.com',
    });
  }

  for (let i = 0; i < count; i++) {
    actorList.records.push({
      certify: Random.boolean(),
      cooperation: {},
      createBy: '',
      createTime: Date.now(),
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
      experience,
    });
  }

  return actorList;
};

export default {
  getByParam: _ => {
    const { pageNum, pageSize, starName } = getParams(_.url);
    return {
      code: 200,
      message: 'success',
      data: getActorList({ pageNum, pageSize, starName }),
    };
  },
  defaultResult: () => {
    return defaultResult;
  },

  getUpload: () => {
    return {
      ...defaultResult,
      data: 'https://asset.txqn.huohua.cn/assets/b0df4fad-ade4-4acc-b1d3-8b7025357e9d.jpg',
    };
  },
};
