import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },
        { path: 'examedit', title: '编辑考试', name: 'examedit', component: () => import('@/views/examedit/examedit.vue') },
        { path: 'examcreat', title: '创建考试', name: 'examcreat', component: () => import('@/views/examedit/examcreat.vue') },
        { path: 'paperedit', title: '试卷编辑', name: 'paperedit', component: () => import('@/views/examedit/paperedit.vue') },
        { path: 'mypaper', title: '判分', name: 'mypaper', component: () => import('@/views/exam/components/mypapermark.vue') }
    ]
};

export const appRouter = [
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [
            { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue') }
        ]
    },
    {
        path: '/access-test',
        icon: 'lock-combination',
        title: '权限测试页',
        name: 'accesstest',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
        ]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        title: '考试管理',
        component: Main,
        children: [
            {
                path: 'exam_set',
                icon: 'compose',
                name: 'exam_set',
                title: '考试信息管理',
                component: () => import('@/views/exam/exam_set.vue')
            },
            {
                path: 'subject',
                icon: 'pound',
                name: 'subject',
                title: '试题库管理',
                component: () => import('@/views/exam/subject.vue')
            },
            {
                path: 'exam_paper',
                icon: 'crop',
                name: 'exam_paper',
                title: '试卷库管理',
                component: () => import('@/views/exam/exam_paper.vue')
            },
            {
                path: 'exam_mark',
                icon: 'arrow-move',
                name: 'exam_mark',
                title: '成绩查询批改',
                component: () => import('@/views/exam/exam_mark.vue')
            },
            {
                path: 'examanalysis',
                icon: 'arrow-move',
                name: 'examanalysis',
                title: '统计分析',
                component: () => import('@/views/exam/examanalysis.vue')
            }
        ]
    },
    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        title: '学习',
        component: Main,
        children: [
            { path: 'artical-publish', title: '学习资料', name: 'artical-publish', icon: 'compose', component: () => import('@/views/error-page/404.vue') },
            { path: 'workflow', title: '课程管理', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/error-page/404.vue') },
            { path: 'workflow', title: '学习记录', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/error-page/404.vue') }
        ]
    },
    {
        path: '/testfile',
        icon: 'android-checkbox',
        name: 'testfile',
        title: '测试',
        component: Main,
        children: [
            { path: 'test', title: '测试', name: 'test', icon: 'compose', component: () => import('@/views/test/test.vue') }
        ]
    },
    {
        path: '/tables',
        icon: 'ios-grid-view',
        name: 'tables',
        title: '系统管理',
        component: Main,
        children: [
            { path: 'loginauthority', title: '登录权限管理', name: 'loginauthority', icon: 'arrow-move', component: () => import('@/views/system/loginauthority.vue') },
            { path: 'dragableTable', title: '人员管理', name: 'error', icon: 'arrow-move', component: () => import('@/views/error-page/404.vue') },
            { path: 'iteminfo', title: '字典管理', name: 'iteminfo', icon: 'arrow-move', component: () => import('@/views/system/iteminfo.vue') },
            { path: 'editableTable', title: '角色权限', name: 'editable-table', icon: 'edit', component: () => import('@/views/error-page/404.vue') },
            { path: 'syslog', title: '操作记录', name: 'syslog', icon: 'search', component: () => import('@/views/system/syslog.vue') }
        ]
    }
];


// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
