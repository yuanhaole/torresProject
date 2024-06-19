//定制Request實例

//導入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'
//定義變數，記錄共用的前綴,baseURL

const baseURL = '/api';  //測試區

// const baseURL = import.meta.env.VITE_BASE_URL;  //serve


const instance = axios.create({baseURL})

import {useTokenStore} from '@/stores/token.js'


//加入Request攔截器
instance.interceptors.request.use(
    (config)=>{
        //增加token
        const tokenStore = useTokenStore();
        if(tokenStore.token){
            config.headers.Authorization = tokenStore.token
            // alert(config.headers.Authorization)
        }
        return config;
    },
    (err)=>{
        Promise.reject(err);
    }
)

//加入router回傳URL
import router from '@/router'

//加入Request攔截器
instance.interceptors.response.use(
    result=>{
        return result.data;
        
        //axios的代碼優化，但是無法探測error msg
        // //判斷狀態碼
        // if(result.data.code===0){
        //     return result.data;
        // }
        
        // //操作Fail
        // alert(result.data.msg?result.data.msg:'服務異常')
        // return Promise.reject(result.data)//非同步的狀態轉化成失敗的狀態

    },
    err=>{
        //判斷Request，如果401提示未登入，並跳轉to login
        console.log("err===="+err)
        if(err.response.status === 401 || err.response.status === 500){
            ElMessage.error('請先登入');
            router.push('/login'); //跳轉URL
        }else if (err.response.status === 400) {
            const { statusCode, message } = err.response.data;
            ElMessage.error(message);
        }else{
            ElMessage.error('網路異常，請確認網路狀態');
        }
        return Promise.reject(err);//非同步的狀態轉化成失敗的狀態
    }
)

export default instance;