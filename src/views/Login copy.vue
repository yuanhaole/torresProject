<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
// 控制註冊與登入表單的顯示，預設顯示註冊
const isRegister = ref(false)

//定義資料模型 註冊資料等...
const registerData = ref({
    userAccount:'',
    password:'',
    rePassword:''
})

//定義驗證密碼函數
const checkRePassword = (rule, value, callback)=>{
    if(value === ''){
        callback(new Error('Please Check Password!'))
    }else if(value !== registerData.value.password){
        callback(new Error('Please ensure that the passwords match!'))
    }else{
        callback()
    }
}

//表單驗證規則
const rules = {
    userAccount:[
        { required: true, message: 'Please Input Account', trigger: 'blur' },
        { min: 5, max: 40, message: 'Length should be 5 to 40', trigger: 'blur' }
    ],
    password:[
        { required: true, message: 'Please Input Password', trigger: 'blur' },
        { min: 5, max: 16, message: 'Length should be 5 to 16', trigger: 'blur' }
    ],
    rePassword:[
        { validator: checkRePassword, trigger: 'blur' }
    ]
}


import {userRegisterService, userLoginService} from '@/api/user.js'
//call後端，註冊
const register = async ()=>{
    //registerData是一個響應式對象，並非值，若要值，請加.value
    let result = await userRegisterService(registerData.value);
    if(result.code === 0){
        ElMessage.success(result.msg? result.msg : 'Register Success');
    }else{
        ElMessage.error(result.msg? result.msg : 'Register fail');
    }
    
    //axios的代碼優化，但是無法探測error msg
    // alert(result.msg? result.msg : 'Register Success');
}

//綁定資料，重複使用註冊的表單資料模型
//表單驗證
//登入Function
import {useTokenStore} from '@/stores/token.js'
import {useRouter} from 'vue-router'
const router = useRouter();
const tokenStore = useTokenStore();
const login = async () => {
    let result = await userLoginService(registerData.value);
    if(result.code === 0){
        ElMessage.success(result.msg? result.msg : '登入成功');

        //把得到的Token存在Pinia中
        tokenStore.setToken(result.data);

        //跳轉到首頁，透過router轉跳
        router.push('/');
    }else{
        ElMessage.error(result.msg? result.msg : '帳號或密碼有誤');
    }

    //axios的代碼優化，但是無法探測error msg
    // alert(result.msg? result.msg : 'Login Success');
}

//切換register與login時，清空資料
const clearRegisterData = ()=>{
    registerData.value={
        userAccount:'',
        password:'',
        rePassword:''
    }
}
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- Register -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>Register</h1>
                </el-form-item>
                <el-form-item prop="userAccount">
                    <el-input :prefix-icon="User" placeholder="Email" v-model="registerData.userAccount"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="password" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="password" v-model="registerData.rePassword"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        Register
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()">
                        ← Back
                    </el-link>
                </el-form-item>
            </el-form>
            
            <!-- Login -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>Login</h1>
                </el-form-item>
                <el-form-item prop="userAccount">
                    <el-input :prefix-icon="User" placeholder="Email" v-model="registerData.userAccount"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="Password" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>Remember Me</el-checkbox>
                        <el-link type="primary" :underline="false">Forget Password？</el-link>
                    </div>
                </el-form-item>
                
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">Login</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterData()">
                        Register →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.login-page {
    height: 100vh;
    background-color: #fff;

    // .bg {
    //     background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
    //         url('@/assets/login_bg.jpg') no-repeat center / cover;
    //     border-radius: 0 20px 20px 0;
    // }

    .bg {
        background:
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }
    

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>