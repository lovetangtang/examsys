import request from '@/utils/request';

export function SavePaperList (params) {
    return request({
        url: '/Data/exam/paperinfo.ashx',
        method: 'post',
        params
    });
}

export function DelPaperList (keyids) {
    return request({
        url: '/Data/exam/paperinfo.ashx',
        method: 'post',
        data: {
            action: 'dellist',
            keyids: keyids
        }
    });
}

export function GetList (params) {
    return request({
        url: '/Data/exam/paperinfo.ashx',
        method: 'post',
        params
    });
}
