<script setup>
import { ref } from 'vue'
import useUserInfoStore from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore();

// const userInfo = ref({
//     id: 0,
//     username: 'zhangsan',
//     nickname: 'zs',
//     email: 'zs@163.com',
// })
const userInfo = ref({...userInfoStore.info})

const rules = {
    name: [
        { required: true, message: '請輸入使用者姓名', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: '姓名必須在10個字之內',
            trigger: 'blur'
        }
    ],
    email: [
        { required: true, message: '請輸入使用者信箱', trigger: 'blur' },
        { type: 'email', message: '信箱格式不正確', trigger: 'blur' }
    ]
}

//修改userInfo
import { userInfoUpdateService } from '@/api/user.js'
import { ElMessage } from 'element-plus'

const formRef = ref(null);

const updateUserInfo = async () =>{
    formRef.value.validate(async (valid) => {
        if (valid) {
            let result = await userInfoUpdateService(userInfo.value)
            ElMessage.success(result.msg? result.msg : '修改成功')

            //pinia也要修改
            userInfoStore.setInfo(userInfo.value)
        } else {
            ElMessage.error('請填寫正確姓名或Email格式');
        }
    });
};

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>基本資料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form ref="formRef" :model="userInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="登入帳號" >
                        <el-input v-model="userInfo.account" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="userInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateUserInfo">確認修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>