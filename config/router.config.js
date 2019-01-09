export default [
    { path: '/login', component: './User/Login' },
    {
        path: '/', component: '../layouts/BasicLayout', routes: [
            { path: '/', redirect: '/home' },
            { path: '/home', component: './Home' },
            {
                path: '/user/setting', component: './User/Setting/Index', routes: [
                    { path: '/user/setting', redirect: '/user/setting/base' },
                    { path: '/user/setting/base', component: './User/Setting/Base' },
                    { path: '/user/setting/security', component: './User/Setting/Security' },
                    { path: '/user/setting/theme', component: './User/Setting/Theme' },
                ]
            },
            {
                path: '/system', name: 'system', routes: [
                    { path: '/system/user', name: 'user', component: './System/User' },
                    { path: '/system/role', component: './System/Role' },
                    { path: '/system/resource', component: './System/Resource' },
                ]
            }
        ]
    }
];