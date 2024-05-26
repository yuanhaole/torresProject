<script setup lang="ts">
import { ref } from 'vue'
import useUserInfoStore from '@/stores/userInfo.js';
const userInfoStore = useUserInfoStore();

import { ElNotification as notify } from 'element-plus'

const onBack = () => {
  notify('Back')
}


import { useTransition } from '@vueuse/core'
import { ChatLineRound, Male } from '@element-plus/icons-vue'

const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1500,
})
const outputValue1 = useTransition(source, {
  duration: 99,
})
source.value = 172000

</script>

<template>
  <div class="flex flex-wrap gap-4">
    <el-card style="width: 98%;height: 100px" shadow="hover">
      <el-row>
        <el-col :span="6">
          <el-statistic title="Daily active users" :value="268500" />
        </el-col>
        <el-col :span="6">
          <el-statistic :value="138">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Ratio of men to women
                <el-icon style="margin-left: 4px" :size="12">
                  <Male />
                </el-icon>
              </div>
            </template>
            <template #suffix>/100</template>
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic title="Total Transactions" :value="outputValue" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="專案" :value="outputValue1">
            <template #suffix>
              <el-icon style="vertical-align: -0.125em">
                <Notebook />
              </el-icon>
            </template>
          </el-statistic>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <br />
  <div class="flex flex-wrap gap-4">
    <el-card style="width: 32%;height: 100px" shadow="hover">
      <el-badge :value="12" class="item">
        <el-icon style="font-size: 50px; color: blue; justify-content: center;"> 
          <Message />
        </el-icon>
      </el-badge>
      <el-badge :value="12" class="item">
        <el-icon style="font-size: 50px; justify-content: center;">
          <ChatDotRound />
        </el-icon>
      </el-badge>
      <el-badge :value="12" class="item">
        <el-icon style="font-size: 50px; color: orange; justify-content: center;">
          <UserFilled />
        </el-icon>
      </el-badge>
    </el-card>
    <el-card style="width: 32%" shadow="hover">Hover</el-card>
    <el-card style="width: 32%" shadow="hover">Hover</el-card>
  </div>

  

</template>

