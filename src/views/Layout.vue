<script setup>
import {
    HomeFilled,
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'

import { userInfoService } from '@/api/user.js';
import useUserInfoStore from '@/stores/userInfo.js';
import { useTokenStore } from '@/stores/token.js';
const userInfoStore = useUserInfoStore();
const tokenStore = useTokenStore();

//取得user資料
const getUserInfo = async()=>{
    let result = await userInfoService();
    //存到Pinia
    userInfoStore.setInfo(result.data);
}

getUserInfo();

//目錄被點擊後，啟用的函數
import { useRouter } from 'vue-router';
const router = useRouter();
import { ElMessage, ElMessageBox } from 'element-plus';
const headleCommand = (command)=>{
    //判斷指令
    if(command === 'logout'){
        //登出
        //彈跳警示視窗
    ElMessageBox.confirm(
        '確認要登出嗎?',
        '溫馨提示',
        {
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        type: 'warning',
        }
    )
    .then(async () => {
      //登出
      //1.清空pinia中的token跟userInfo
      tokenStore.removeToken()
      userInfoStore.removeInfo()
      //2.跳轉login
      router.push('/login')
      
      ElMessage({
        type: 'success',
        message: '刪除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消登出',
      })
    })
    }else{
        //router
        router.push('/user/' + command)
    }
}
</script>

<template>
    <!--element container -->
    <el-container class="layout-container">
        <!-- 左側選單 -->
        <el-aside width="200px">
            <!-- <div class="el-aside__logo"></div> -->
            <el-menu active-text-color="#ffd04b" background-color="#232323"  text-color="#fff"
                router>
                <el-menu-item index="/dashboard/index"> <!--需要跟router(index.js)表內的路徑一至-->
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                    <span>儀表板</span>
                </el-menu-item>
                <el-menu-item index="/article/category"> <!--需要跟router(index.js)表內的路徑一至-->
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>文章分類</span>
                </el-menu-item>
                <el-menu-item index="/article/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                <el-sub-menu >
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>個人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本資料</span>
                    </el-menu-item>
                    <el-menu-item  index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更改大頭貼</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密碼</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右側主區域 -->
        <el-container>
            <!-- 頂部區域 -->
            <el-header>
                <div>HELLO：<strong>{{userInfoStore.info.name}}</strong></div>
                <!-- 下拉選單 -->
                <!-- command: 每個細項點擊後觸發，在事件函數上宣告一個參數，接收目錄的對應的指令 -->
                <el-dropdown placement="bottom-end" @command="headleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.avatarUrl? userInfoStore.info.avatarUrl:avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="info" :icon="User">基本資料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更改大頭貼</el-dropdown-item>
                            <el-dropdown-item command="resetPassword" :icon="EditPen">重置密碼</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">登出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中間間區域 -->

            <el-main>
                <!-- <div style="width: 1290px; height: 570px;border: 1px solid red;">
                    內容展示區
                </div> -->
                <router-view></router-view>

            </el-main>

            <!-- 尾部區域 -->
            <el-footer> ©2024 Created by Torres</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>