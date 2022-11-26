import { request } from './request';

export const getParams = (url = '') => {
  let urlStr = url.split('?')[1];
  let paramsArr = urlStr.split('&');
  const result = {};
  for (const param of paramsArr) {
    const arr = param.split('=');
    result[arr[0]] = arr[1];
  }
  return result;
};

export const getHomeList = data => {
  return request({
    url: '/home/list',
    method: 'post',
    data,
  });
};
export const getByParam = data => {
  return request({
    url: '/star/getByParam',
    method: 'get',
    data,
  });
};

export const getWorksList = () => {
  return request({
    url: '/works/list',
    method: 'get',
  });
};

export function getDetail(id) {
  return request({
    url: '/star/selectDetail?id=' + id,
    method: 'get',
  });
}

export const getBrowserList = name => {
  return request({
    url: '/browser?name=' + name,
  });
};
