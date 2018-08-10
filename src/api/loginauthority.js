import request from '@/utils/request';

export function SaveLoginAuthority (params) {
    return request({
        url: '/Data/exam/loginauthority.ashx',
        method: 'post',
        params
    });
}

export function DelLoginAuthority (keyids) {
    return request({
        url: '/Data/exam/loginauthority.ashx',
        method: 'post',
        data: {
            action: 'dellist',
            keyids: keyids
        }
    });
}

export function GetList (params) {
    return request({
        url: '/Data/exam/loginauthority.ashx',
        method: 'post',
        params
    });
}
