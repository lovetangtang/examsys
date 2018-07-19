import request from '@/utils/request';

export function AddTicketDesk (data) {
    return request({
        url: '/Data/TicketDesk.ashx',
        method: 'post',
        data
    });
}

export function EditTicketDesk (data) {
    return request({
        url: '/Data/TicketDesk.ashx',
        method: 'post',
        data
    });
}

export function DelTicketDesk (KeyID) {
    return request({
        url: '/Data/TicketDesk.ashx',
        method: 'post',
        data: {
            action: 'DelTicketDesk',
            KeyID: KeyID
        }
    });
}

export function getList (params) {
    return request({
        url: '/Data/TicketDesk.ashx',
        method: 'post',
        params
    });
}
