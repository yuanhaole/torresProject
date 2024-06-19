import { createRouter, createWebHistory } from 'vue-router';

// Import components
import LoginVue from '@/views/Login.vue';
import LayoutVue from '@/views/Layout.vue';
import ArticleCategory from '@/views/article/ArticleCategory.vue';
import ArticleManage from '@/views/article/ArticleManage.vue';
import UserInfo from '@/views/user/UserInfo.vue';
import UserAvatar from '@/views/user/UserAvatar.vue';
import UserResetPassword from '@/views/user/UserResetPassword.vue';
import Dashboard from '@/views/dashboard/Index.vue';
import Chatroom from '@/views/chatroom/index.vue';
import {useTokenStore} from '@/stores/token.js'

// Define router relationships
const routes = [
    { path: '/login', component: LoginVue },
    { 
        path: '/', 
        component: LayoutVue, 
        redirect: '/dashboard/index', // Default redirect to /dashboard/index
        // Children routes
        children: [  
            { path: '/article/category', component: ArticleCategory },
            { path: '/article/manage', component: ArticleManage },
            { path: '/user/info', component: UserInfo },
            { path: '/user/avatar', component: UserAvatar },
            { path: '/user/resetPassword', component: UserResetPassword },
            { path: '/dashboard/index', component: Dashboard },
            { path: '/chatroom/index', component: Chatroom }
        ] 
    },
];

// Build route
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

//Global route guard
router.beforeEach((to, from, next) => {
    const tokenStore = useTokenStore();  
    if (to.path !== '/login') {
      if (!tokenStore.token) {
        next('/login');
      } else {
        next();
      }
    } else {
      next();
    }
  });

// Export route
export default router;
