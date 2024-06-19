import './assets/styles/index.scss'; //SCSS

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'   //預設指向router資料夾下的index.js
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import locale from 'element-plus/dist/locale/zh-tw.js'
import vue3GoogleLogin from 'vue3-google-login'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import store from './stores';


import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist)
app.use(store);
app.use(router)
app.use(pinia);
app.use(ElementPlus,{locale});
app.use(vue3GoogleLogin, {
    clientId: '1067850986924-booo54uigq0d9h7c5tvm31ei5lj0vb7k.apps.googleusercontent.com'
  })
// 註冊所有的ICON
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')
