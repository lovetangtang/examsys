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
            action: 'DelExamScoreList',
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

export function GetAwExamList (params) {
    return request({
        url: '/Data/AnswerPaper/exam.ashx',
        method: 'post',
        params
    });
}
