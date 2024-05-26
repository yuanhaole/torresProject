import {createRouter, createWebHistory } from 'vue-router'

//import components
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'

import ArticleCategory from '@/views/article/ArticleCategory.vue'
import ArticleManage from '@/views/article/ArticleManage.vue'
import UserInfo from '@/views/user/UserInfo.vue'
import UserAvatar from '@/views/user/UserAvatar.vue'
import UserResetPassword from '@/views/user/UserResetPassword.vue'
import Dashboard from '@/views/dashboard/Index.vue'

//定義router的關係
const routes = [
    { path:'/login',component:LoginVue },
    { path:'/',component:LayoutVue, redirect:'/dashboard/index', //定義Redirect會預設'/'指向/login這個路徑
    //子router
    children:[  
        { path:'/article/category',component:ArticleCategory },
        { path:'/article/manage',component:ArticleManage },
        { path:'/user/info',component:UserInfo },
        { path:'/user/avatar',component:UserAvatar },
        { path:'/user/resetPassword',component:UserResetPassword },
        { path:'/dashboard/index',component:Dashboard }
    ] },
]

//build route
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

//export route
export default router
