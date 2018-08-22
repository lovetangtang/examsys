import request from '@/utils/request';
export function GetList (params) {
    return request({
        url: '/Data/System/examalys.ashx',
        method: 'post',
        params
    });
}

export function GetExamScoreAlys (params) {
    return request({
        url: '/Data/System/examalys.ashx',
        method: 'post',
        params
    });
}

export function GetEchartsScorAlys (params) {
    return request({
        url: '/Data/System/examalys.ashx',
        method: 'post',
        params
    });
}
