import axios from 'axios';
import env from '../../build/env';
import semver from 'semver';
import packjson from '../../package.json';

let util = {

};
util.title = function (title, vm) {
    let iTitle = '在线考试系统';
    if (title) {
        iTitle += ' - ' + (title.i18n ? vm.$t(title.i18n) : title);
    }
    window.document.title = iTitle;
};

const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1:8888'
    : env === 'production'
        ? 'https://www.url.com'
        : 'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
    // 全屏相关
};

util.checkUpdate = function (vm) {
    axios.get('https://api.github.com/repos/iview/iview-admin/releases/latest').then(res => {
        let version = res.data.tag_name;
        vm.$Notice.config({
            duration: 0
        });
        if (semver.lt(packjson.version, version)) {
            vm.$Notice.info({
                title: 'iview-admin更新啦',
                desc: '<p>iView-admin更新到了' + version + '了，去看看有哪些变化吧</p><a style="font-size:13px;" href="https://github.com/iview/iview-admin/releases" target="_blank">前往github查看</a>'
            });
        }
    });
};
util.getSubjectTypeName = function (val) {
    switch (val) {
        case 11:
            return '单选';
            break;
        case 12:
            return '多选';
            break;
        case 20:
            return '判断';
            break;
        case 30:
            return '填空';
            break;
        case 40:
            return '问答';
            break;
        default:
            break;
    }
};

util.getSubjectModeName = function (val) {
    switch (val) {
        case 0:
            return '模拟试题';
            break;
        case 1:
            return '正式试题';
            break;
        default:
            break;
    }
};
util.getSubjectDegree = function (val) {
    switch (val) {
        case 0:
            return '简单';
            break;
        case 1:
            return '普通';
            break;
        case 2:
            return '困难';
            break;
        default:
            break;
    }
};
util.getAboutBll = function (val) {
    switch (val) {
        case 'GN':
            return '国内机票';
            break;
        case 'GJ':
            return '国际机票';
            break;
        case 'JD':
            return '酒店';
            break;
        case 'LY':
            return '旅游';
            break;
        case 'CL':
            return '差旅';
            break;
        case 'RS':
            return '国内机票';
            break;
        case 'XZ':
            return '国内机票';
            break;
        default:
            break;
    }
};

// 难度集合
util.DegreeList = [{
    value: 0,
    label: '简单'
},
{
    value: 1,
    label: '普通'
},
{
    value: 2,
    label: '困难'
}
];

util.SubjectClassList = [{
    value: 11,
    label: '单选题'
},
{
    value: 12,
    label: '多选题'
},
{
    value: 20,
    label: '判断题'
},
{
    value: 30,
    label: '填空题'
},
{
    value: 40,
    label: '问答题'
}
];

util.sCSearchList = [{
    value: -1,
    label: '全部'
}, {
    value: 11,
    label: '单选题'
},
{
    value: 12,
    label: '多选题'
},
{
    value: 20,
    label: '判断题'
},
{
    value: 30,
    label: '填空题'
},
{
    value: 40,
    label: '问答题'
}
];

util.SubjectTypeList = [{
    value: -1,
    label: '全部'
}, {
    value: 0,
    label: '简单'
},
{
    value: 1,
    label: '普通'
},
{
    value: 2,
    label: '困难'
}
];

util.AboutBllList = [{
    value: 'GN',
    label: '国内机票'
}, {
    value: 'GJ',
    label: '国际机票'
}, {
    value: 'JD',
    label: '酒店'
}, {
    value: 'LY',
    label: '旅游'
}, {
    value: 'CL',
    label: '差旅'
}, {
    value: 'RS',
    label: '人事'
}, {
    value: 'XZ',
    label: '行政'
}, {
    value: 'JS',
    label: '技术'
}, {
    value: 'CW',
    label: '财务'
}];
export default util;
