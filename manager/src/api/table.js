import { request } from '@/utils/request';

export function getByParam() {
  return request({
    url: '/star/getByParam',
    method: 'get',
  });
}

export function getDashboardList() {
  return request({
    url: '/table/dashboard',
    method: 'get',
  });
}

export function del(id) {
  return request({
    url: '/star/del?id=' + id,
    method: 'get',
  });
}

export function saveOrUpdate(data) {
  return request({
    url: '/star/saveOrUpdate',
    method: 'post',
    data,
  });
}

export function selectDetail(id) {
  return request({
    url: '/star/selectDetail?id=' + id,
    method: 'get',
  });
}

export function uploadImg(data) {
  return request({
    url: '/star/upload',
    method: 'post',
    data,
  });
}
