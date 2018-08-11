import request from '@/utils/request';
export function GetItem (typeNo, itemNo) {
    return request({
        url: '/Data/System/iteminfo.ashx',
        method: 'post',
        data: {
            action: 'getitemlist',
            typeNo: typeNo,
            itemNo: itemNo
        }
    });
}

export function SaveItemList (params) {
    return request({
        url: '/Data/System/iteminfo.ashx',
        method: 'post',
        params
    });
}

export function Dellist (keyids) {
    return request({
        url: '/Data/System/iteminfo.ashx',
        method: 'post',
        data: {
            action: 'dellist',
            keyids: keyids
        }
    });
}

export function GetList (params) {
    return request({
        url: '/Data/System/iteminfo.ashx',
        method: 'post',
        params
    });
}

export function GetItemType (params) {
    return request({
        url: '/Data/System/iteminfo.ashx',
        method: 'post',
        params
    });
}
