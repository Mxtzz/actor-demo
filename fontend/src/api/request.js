import axios from 'axios';
import { message as AntMessage } from 'antd';

class HttpRequest {
  // #baseUrl
  constructor() {
    this.withCredentials = false;
    this.timeout = 10000;
  }

  getConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    return config;
  }

  getParams(payload) {
    const { method, data } = payload;
    if (['post', 'put', 'patch', 'delete'].indexOf(method) >= 0) {
      payload.data = data;
    } else {
      payload.params = data;
      delete payload.data;
    }
    return payload;
  }

  checkStatus(status) {
    let errMessage = '';
    switch (status) {
      case 400:
        errMessage = '错误请求';
        break;
      case 401:
        errMessage = '未授权，请重新登录';
        break;
      case 403:
        errMessage = '拒绝访问';
        break;
      case 404:
        errMessage = '请求错误,未找到该资源';
        break;
      case 405:
        errMessage = '请求方法未允许';
        break;
      case 408:
        errMessage = '请求超时';
        break;
      case 500:
        errMessage = '服务器端出错';
        break;
      case 501:
        errMessage = '网络未实现';
        break;
      case 502:
        errMessage = '网络错误';
        break;
      case 503:
        errMessage = '服务不可用';
        break;
      case 504:
        errMessage = '网络超时';
        break;
      case 505:
        errMessage = 'http版本不支持该请求';
        break;
      default:
        errMessage = `连接错误`;
    }
    return errMessage;
  }

  // 拦截处理
  setInterceptors(instance) {
    const that = this;

    // 请求拦截
    instance.interceptors.request.use(
      config => {
        if (!navigator.onLine) {
          AntMessage.warning({
            message: '请检查您的网络是否正常',
            duration: 3 * 1000,
          });
          return Promise.reject('请检查您的网络是否正常');
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    // 响应拦截
    instance.interceptors.response.use(
      res => {
        const result = res.data;
        const type = Object.prototype.toString.call(result);
        // 如果是文件流 直接返回
        if (type === '[object Blob]' || type === '[object ArrayBuffer]') {
          return result;
        }
        return result;
      },
      error => {
        if (error && error.response) {
          error.message = that.checkStatus(error.response.status);
        }
        const isTimeout = error.message.includes('timeout');
        AntMessage.error({
          message: isTimeout
            ? '网络请求超时'
            : error.message || '连接到服务器失败',
          type: 'error',
          duration: 2 * 1000,
        });
        return Promise.reject(error.message);
      },
    );
  }

  request(options) {
    const instance = axios.create();
    const baseOpt = this.getConfig();
    const params = Object.assign({}, baseOpt, this.getParams(options));
    this.setInterceptors(instance);
    return instance(params);
  }
}

const http = new HttpRequest();

export const request = http.request.bind(http);
export default http;