import request from '@/utils/request';
export function GetHomeExam (params) {
    return request({
        url: '/Data/Exam/home.ashx',
        method: 'post',
        params
    });
}

export function ExecExam (params) {
    return request({
        url: '/Data/Exam/home.ashx',
        method: 'post',
        params
    });
}
