import request from '@/utils/request';

export function SaveExamList (params) {
    return request({
        url: '/Data/exam/examinfo.ashx',
        method: 'post',
        params
    });
}

export function DelExamList (keyids) {
    return request({
        url: '/Data/exam/examinfo.ashx',
        method: 'post',
        data: {
            action: 'DelExamList',
            keyids: keyids
        }
    });
}

export function GetList (params) {
    return request({
        url: '/Data/exam/examinfo.ashx',
        method: 'post',
        params
    });
}

export function GetDepartTree (params) {
    return request({
        url: '/Data/System/systeminfo.ashx',
        method: 'post',
        params
    });
}
