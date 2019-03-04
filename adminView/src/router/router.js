import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['@/views/login.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['@/views/error-page/404.vue'], resolve);
    }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => {
        require(['@//views/error-page/403.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => {
        require(['@/views/error-page/500.vue'], resolve);
    }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
            path: 'home',
            title: '首页',
            name: 'home_index',
            component: resolve => {
                require(['@/views/home/home.vue'], resolve);
            }
        },
        {
            path: 'updatePro',
            title: '编辑商品',
            name: 'updatePro',
            component: resolve => {
                require(['@/views/goods/updatePro.vue'], resolve);
            }
        },
        {
            path: 'orderDetail',
            title: '订单详情',
            name: 'orderDetail',
            component: resolve => {
                require(['@/views/order/orderDetail.vue'], resolve);
            }
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
        path: '/wdInfo',
        icon: 'ios-folder',
        name: 'wdInfo',
        title: '商城基本信息',
        component: Main,
        children: [{
            path: 'wdLogo',
            icon: 'ios-paper-outline',
            name: 'wdLogo',
            title: '商城基本信息',
            component: resolve => {
                require(['@/views/wdInfo/wdLogo.vue'], resolve);
            }
        }]
    },
    {
        path: '/goods',
        icon: 'ios-folder',
        title: '商城商品管理',
        name: 'goods',
        component: Main,
        children: [{
                path: 'proList',
                title: '商品列表',
                icon: 'ios-list-outline',
                name: 'proList',
                component: resolve => {
                    require(['@/views/goods/proList.vue'], resolve);
                }
            },
            {
                path: 'addPro',
                title: '添加商品',
                icon: 'ios-list-outline',
                name: 'addPro',
                component: resolve => {
                    require(['@/views/goods/addPro.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/userList',
        icon: 'ios-folder',
        title: '会员列表',
        name: 'userList',
        component: Main,
        children: [{
            path: 'index',
            title: '会员列表',
            name: 'index',
            component: resolve => {
                require(['@/views/user/userList.vue'], resolve);
            }
        }]
    },
    {
        path: '/orderList',
        icon: 'ios-folder',
        title: '订单列表',
        name: 'orderList',
        component: Main,
        children: [{
            path: 'index',
            title: '订单列表',
            name: 'orderList',
            component: resolve => {
                require(['@/views/order/orderList.vue'], resolve);
            }
        }]
    },
    {
        path: '/comment',
        icon: 'ios-folder',
        title: '评论列表',
        name: 'comment',
        component: Main,
        children: [{
            path: 'index',
            title: '评论列表',
            name: 'comment',
            component: resolve => {
                require(['@/views/comment/index.vue'], resolve);
            }
        }]
    },
    {
        path: '/admin',
        icon: 'ios-folder',
        title: '管理员管理',
        name: 'admin',
        access: 1,
        component: Main,
        children: [{
                path: 'adminList',
                title: '管理员列表',
                icon: 'ios-list-outline',
                name: 'adminList',
                component: resolve => {
                    require(['@/views/admin/adminList.vue'], resolve);
                }
            },
            {
                path: 'addAdmin',
                title: '添加管理员',
                icon: 'ios-list-outline',
                name: 'addAdmin',
                component: resolve => {
                    require(['@/views/admin/addAdmin.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/actionLog',
        icon: 'ios-folder',
        name: 'actionLog',
        title: '管理员操作日志',
        component: Main,
        children: [{
            path: 'actionLog',
            icon: 'ios-paper-outline',
            name: 'actionLog',
            title: '管理员操作日志',
            component: resolve => {
                require(['@/views/actionLog/index.vue'], resolve);
            }
        }]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];