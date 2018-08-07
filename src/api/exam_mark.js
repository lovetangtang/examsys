import request from '@/utils/request';

export function SaveMarkList (params) {
    return request({
        url: '/Data/exam/examineescore.ashx',
        method: 'post',
        params
    });
}

export function DelMarkList (keyids) {
    return request({
        url: '/Data/exam/examineescore.ashx',
        method: 'post',
        data: {
            action: 'dellist',
            keyids: keyids
        }
    });
}

export function GetList (params) {
    return request({
        url: '/Data/exam/examineescore.ashx',
        method: 'post',
        params
    });
}
