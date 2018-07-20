import request from '@/utils/request';

export function SaveSubjectList (params) {
    return request({
        url: '/Data/subject/subjectinfo.ashx',
        method: 'post',
        params
    });
}

export function DelSubjectList (keyids) {
    return request({
        url: '/Data/subject/subjectinfo.ashx',
        method: 'post',
        data: {
            action: 'dellist',
            keyids: keyids
        }
    });
}

export function GetList (params) {
    return request({
        url: '/Data/subject/subjectinfo.ashx',
        method: 'post',
        params
    });
}