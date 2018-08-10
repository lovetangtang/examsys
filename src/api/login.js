import request from '@/utils/request';

export function login (username, password, type, channel) {
    return request({
        url: '/Data/Login.ashx',
        method: 'post',
        data: {
            userName: username,
            pwd: password,
            type: type,
            channel: channel,
            action: 'userLogin'
        }
    });
}

export function getInfo (token) {
    return request({
        url: '/Data/Login.ashx',
        method: 'get',
        params: { token, action: 'GetLogin' }
    });
}

export function logout () {
    return request({
        url: '/Data/Login.ashx',
        method: 'post',
        data: {
            action: 'logout'
        }
    });
}
