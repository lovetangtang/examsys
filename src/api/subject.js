import request from '@/utils/request';

export function AddTicketInfo (dtheader, dtdata) {
    return request({
        url: '/Data/TicketReFund.ashx',
        method: 'post',
        data: {
            action: 'AddTicketInfo',
            dtheader: JSON.stringify(dtheader),
            dtdata: JSON.stringify(dtdata)
        }
    });
}

export function ExportExcel (type, dtdata, exportTime, keyword, state) {
    return request({
        url: '/Data/TicketReFund.ashx',
        method: 'post',
        data: {
            action: 'ExportExcel',
            type: type,
            dtdata: JSON.stringify(dtdata),
            exportTime,
            keyword,
            state
        }
    });
}

export function ExecTicketRefund (type, dtdata) {
    return request({
        url: '/Data/TicketReFund.ashx',
        method: 'post',
        data: {
            action: 'ExecRefund',
            type: type,
            dtdata: JSON.stringify(dtdata)
        }
    });
}

export function DelTicketInfo (dtdata) {
    return request({
        url: '/Data/TicketReFund.ashx',
        method: 'post',
        data: {
            action: 'DelTicketInfo',
            dtdata: JSON.stringify(dtdata)
        }
    });
}

export function getList (params) {
    return request({
        url: '/Data/subject/subjectinfo.ashx',
        method: 'post',
        params
    });
}
