import request from '@/utils/request';
export function GetList (params) {
    return request({
        url: '/Data/exam/syslog.ashx',
        method: 'post',
        params
    });
}
