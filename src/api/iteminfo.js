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
