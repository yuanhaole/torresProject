<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { useTokenStore } from '@/stores/token.js'
import { useRouter } from 'vue-router'

// 控制註冊與登入表單的顯示，預設顯示註冊
const isRegister = ref(false)

// 定義資料模型 註冊資料等...
const registerData = ref({
    userAccount: '',
    password: '',
    rePassword: ''
})

// 定義驗證密碼函數
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please Check Password!'))
    } else if (value !== registerData.value.password) {
        callback(new Error('Please ensure that the passwords match!'))
    } else {
        callback()
    }
}

// 表單驗證規則
const rules = {
    userAccount: [
        { required: true, message: 'Please Input Account', trigger: 'blur' },
        { min: 5, max: 40, message: 'Length should be 5 to 40', trigger: 'blur' }
    ],
    password: [
        { required: true, message: 'Please Input Password', trigger: 'blur' },
        { min: 5, max: 16, message: 'Length should be 5 to 16', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}

//宣告註冊及登入時，如果有錯誤碼就不會執行Form表單
const registerFormRef = ref(null)
const loginFormRef = ref(null)

// call後端，註冊
const register = () => {
    registerFormRef.value.validate(async (valid) => {
        if (valid) {
            let result = await userRegisterService(registerData.value)
            if (result.code === 0) {
                ElMessage.success(result.msg ? result.msg : '註冊成功')
            } else {
                ElMessage.error(result.msg ? result.msg : '註冊失敗')
            }
        } else {
            ElMessage.error('請確認是否有填入帳號或密碼')
        }
    })
}

// 登入Function
const router = useRouter()
const tokenStore = useTokenStore()

const login = () => {
    loginFormRef.value.validate(async (valid) => {
        console.log(valid)
        if (valid) {
            let result = await userLoginService(registerData.value)
            if (result.code === 200) {
                ElMessage.success(result.msg ? result.msg : '登入成功')
                tokenStore.setToken(result.data)
                router.push('/')
            } else {
                ElMessage.error(result.msg ? result.msg : '帳號或密碼有誤')
            }
        } else {
            ElMessage.error('請確認是否有填入帳號或密碼')
        }
    })
}

// 切換register與login時，清空資料
const clearRegisterData = () => {
    registerData.value = {
        userAccount: '',
        password: '',
        rePassword: ''
    }
}

//For google OAuth

const googleLoginResponse = ref(null)

const callback = (response) => {
//   googleLogin.value = {
//     name: response.name,
//     email: response.email
//   }
console.log("Handle the response", response)
}

</script>

<template>
    <div class="body">
        <div class="container" id="container">
            <input id="signUp" type="radio" name="sign" v-model="isRegister" :value="true">
            <div class="form-container sign-up-container">
                <form @submit.prevent="register">
                    <h2>Create Account</h2>
                    <div class="social-container">
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <el-form ref="registerFormRef" :model="registerData" :rules="rules">
                        <el-form-item prop="userAccount">
                            <el-input :prefix-icon="User" placeholder="Email" v-model="registerData.userAccount"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input :prefix-icon="Lock" type="password" placeholder="Password" v-model="registerData.password"></el-input>
                        </el-form-item>
                        <el-form-item prop="rePassword">
                            <el-input :prefix-icon="Lock" type="password" placeholder="Password" v-model="registerData.rePassword"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button class="btn" type="primary" auto-insert-space @click="register">
                                Sign Up
                            </el-button>
                        </el-form-item>

                        <!-- <button type="submit">Sign Up</button> -->
                    </el-form>
                </form>
            </div>

            <input id="signIn" type="radio" name="sign" v-model="isRegister" :value="false">
            <div class="form-container sign-in-container">
                <form @submit.prevent="login">
                    <h2>Sign in</h2>
                    <div class="social-container">
                        <!-- <GoogleLogin :callback="callback" />
                        <p v-if="googleLogin">
                            <span>Name: {{ googleLogin.name }}</span><br>
                            <span>Email: {{ googleLogin.email }}</span>
                        </p> -->
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    </div>
                    <span>or use your account</span>
                    <el-form ref="loginFormRef" :model="registerData" :rules="rules">
                        <el-form-item prop="userAccount">
                            <el-input :prefix-icon="User" placeholder="Email" v-model="registerData.userAccount"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input :prefix-icon="Lock" type="password" placeholder="Password" v-model="registerData.password"></el-input>
                        </el-form-item>

                        <!-- <a class="forgotPassword" href="#">Forgot your password?</a> -->
                        <el-link class="forgotPassword" :underline="false">Forget Password？</el-link>
                        
                        <!-- <button type="submit" @click="login">Sign In</button> -->
                        <el-form-item>
                            <el-button class="btn" type="primary" auto-insert-space @click="login">Sign In</el-button>
                        </el-form-item>

                    </el-form>
                </form>
            </div>

            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h2>Welcome Back!</h2>
                        <p>To keep connected with us please login with your personal info</p>
                        <label class="btn ghost" for="signIn" @click="isRegister = true;clearRegisterData()">Sign In</label>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h2>Hello, Friend!</h2>
                        <p>Enter your personal details and start journey with us</p>
                        <label class="btn ghost" for="signUp" @click="isRegister = false;clearRegisterData()">Sign Up</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css);
* {
    box-sizing: border-box;
}

input[type=radio]{
    display: none;
}

.body {
    background: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    height: 100vh;
    margin: -20px 0 50px;
}

h2 {
    font-size: 28px;
    font-weight: bold;
    margin: 0;
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

a.social{
    color: #000;
    text-decoration: none;
    cursor: pointer;
    transition: all .3s;
}
a.social:hover{
    background: #f5f7fa;
}

span {
    font-size: 12px;
}
.el-form{
    margin-top: 8px;
}
.btn, button {
    height: auto;
    border-radius: 4px;
    border: 1px solid #409eff;
    background-color: #409eff;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    outline: none;
    transition: transform 1.2s ease-in, background .3s;
    margin: 12px auto 0;
    cursor: pointer;
}
.btn:hover, button:hover{
    border: 1px solid #79bbff;
    background-color: #79bbff;
}

.btn:active, button:active {
    transform: scale(0.95);
}

.btn.ghost, button.ghost {
    background-color: transparent;
    border-color: #FFFFFF;
}

.forgotPassword{
    color: #606266;
    font-size: 12px;
    text-decoration: none;
    margin: 16px 0 0;
    display: block;
}
.form-container {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}
.el-form-item{
    margin-bottom: 24px;
}
input[type=text], input[type=password], input[type=email] {
    background-color: transparent;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    padding: 10px 12px;
    margin: 8px 0;
    width: 100%;
}

.container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
            0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

#signUp:checked ~ .sign-in-container,
.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

#signUp:checked ~ .sign-up-container,
.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {
    0%, 49.99% {
        opacity: 0;
        z-index: 1;
    }
    
    50%, 100% {
        opacity: 1;
        z-index: 5;
    }
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

#signUp:checked ~ .overlay-container,
.container.right-panel-active .overlay-container{
    transform: translateX(-100%);
}

.overlay {
    background: #FF416C;
    background-image: linear-gradient(-225deg, #7085B6 0%, #87A7D9 50%, #DEF3F8 100%);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

#signUp:checked ~ .overlay-container > .overlay,
.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(0%);
}
#signUp:checked ~ .overlay-container > .overlay-left,
.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}
#signUp:checked ~ .overlay-container > .overlay-right,
.container.right-panel-active .overlay-right {
    transform: translateX(0%);
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #DDDDDD;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}

p {
  margin-top: 12px;
  word-break: break-all;
}

</style>
