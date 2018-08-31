import axios from 'axios';
import store from '../store';
import {
    getToken
} from '@/utils/auth';
import {
    Message, Modal
} from 'iview';

// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:51984', // 'http://' + window.location.host, // process.env.BASE_API, // 'http://192.168.0.97:51984', // api的base_url
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true, // 允许携带cookie
    timeout: 150000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['X-Token'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
    }
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data;
        if (res.success === false) {
            Message.error({
                content: res.msg,
                duration: 5
            });
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.msg === '{expired:true}') {
                Modal.confirm({
                    title: '确定登出',
                    content: '你已被登出，可以取消继续留在该页面，或者重新登录',
                    okText: '重新登录',
                    cancelText: '取消',
                    onOk: () => {
                        store.commit('logout', this);
                        location.reload();
                    },
                    onCancel: () => {}
                });
            }
            return Promise.reject(response.data);
        } else {
            return response.data;
        }
    },
    error => {
        console.log('err' + error); // for debug
        Message.error({
            content: error.message,
            duration: 5
        });
        return Promise.reject(error);
    }
);

export default service;
