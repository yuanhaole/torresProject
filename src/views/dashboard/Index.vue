<script setup>
import { ref,reactive, onMounted, computed } from 'vue'

import useUserInfoStore from '@/stores/userInfo.js';
const userInfoStore = useUserInfoStore();

const date = new Date();
const greetings = computed(() => {
  const hours = date.getHours();
  if (hours >= 6 && hours < 8) {
    return "晨起披衣出草堂，軒窗已自喜微涼🌅！";
  } else if (hours >= 8 && hours < 12) {
    return "上午好，" + userInfoStore.info.name + "！";
  } else if (hours >= 12 && hours < 18) {
    return "下午好，" + userInfoStore.info.name + "！";
  } else if (hours >= 18 && hours < 24) {
    return "晚上好，" + userInfoStore.info.name + "！";
  } else {
    return "偷偷向銀河要了一把碎星，只等你閉上眼睛撒入你的夢中，晚安🌛！";
  }
});

import * as ElIcons from '@element-plus/icons-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// 右上角的數量
const statisticData = ref([
  {
    value: 99,
    iconClass: "message",
    title: "通知",
    key: "message",
  },
  {
    value: 50,
    iconClass: "check",
    title: "待辦",
    // suffix: "/100",
    key: "upcoming",
  },
  {
    value: 10,
    iconClass: "folder",
    title: "專案",
    key: "project",
  },
]);

//ICon顏色
const getIconColor = (iconClass) => {
  switch (iconClass) {
    case 'message':
      return 'red';
    case 'check':
      return 'green';
    case 'folder':
      return 'blue';
    default:
      return 'black';
  }
};

//動態ICON
const getIconComponent = (iconClass) => {
  // 映射 iconClass 到 Element Plus ICON的Component
  // return ElIcons[iconClass] || ElIcons['QuestionFilled']; // 預設ICON
  return FontAwesomeIcon; // AwesomeICON
};


import { useTransition, TransitionPresets } from "@vueuse/core";
const duration = 5000;

// 銷售額
const amount = ref(0);
const amountOutput = useTransition(amount, {
  duration: duration,
  // transition: TransitionPresets.easeOutExpo,
});
amount.value = 2000;

// 訪客數
const visitCount = ref(0);
const visitCountOutput = useTransition(visitCount, {
  duration: duration,
  // transition: TransitionPresets.easeOutExpo,
});
visitCount.value = 2000;

// IP數
const dauCount = ref(0);
const dauCountOutput = useTransition(dauCount, {
  duration: duration,
  // transition: TransitionPresets.easeOutExpo,
});
dauCount.value = 2000;

// 訂單量
const orderCount = ref(0);
const orderCountOutput = useTransition(orderCount, {
  duration: duration,
  // transition: TransitionPresets.easeOutExpo,
});
orderCount.value = 2000;

const cardData = ref([
  {
    title: '訪客數',
    tagType: 'success',
    tagText: '日',
    count: visitCountOutput,
    dataDesc: '總訪客數',
    iconClass: 'visit',
  },
  {
    title: 'IP數',
    tagType: 'success',
    tagText: '日',
    count: dauCountOutput,
    dataDesc: '總IP數',
    iconClass: 'ip',
  },
  {
    title: '銷售額',
    tagType: 'primary',
    tagText: '月',
    count: amountOutput,
    dataDesc: '總銷售額',
    iconClass: 'money',
  },
  {
    title: '訂單量',
    tagType: 'danger',
    tagText: '季',
    count: orderCountOutput,
    dataDesc: '總訂單量',
    iconClass: 'order',
  },
]);

// 取得时间
let nowTime = reactive({
  data: ""
});

let myDate = new Date();

function setTime(myDate) {
  const year = myDate.getFullYear();
  const month = myDate.getMonth() + 1 < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
  const date = myDate.getDate() < 10 ? "0" + (myDate.getDate()) : myDate.getDate();
  const h = myDate.getHours();
  const m = myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes();
  const s = myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
  const time = h + ":" + m + ":" + s;
  const day = year + "-" + month + "-" + date;

  nowTime.data = day + ' ' + time;
}

function nowTimes() {
  setTime(myDate);
  setInterval(() => {
    myDate = new Date();
    setTime(myDate);
  }, 1000);
}

onMounted(() => {
  nowTimes();
});

</script>

<template>
    <el-card shadow="never">
      <el-row justify="space-between">
        <el-col :span="18" :xs="24">
          <div class="flex h-full items-center">
            <!-- <img
              class="w-20 h-20 mr-5 rounded-full"
              :src="'@/assets/treefrog.jpg'"
            /> -->
            <!-- <img
              class="w-20 h-20 mr-5 rounded-full"
              :src="userStore.user.avatar + '?imageView2/1/w/80/h/80'"
            /> -->
            <div>
              <p>{{ greetings }} 
                <span><font-awesome-icon :icon="['far', 'clock']" style="color: aquamarine;"/> {{nowTime.data}}</span> 
              </p>
              <br />
              <p class="text-sm text-gray">
                今日天氣晴朗，氣溫在15℃至25℃之間，東南風
              </p>
            </div>
          </div>
        </el-col>

        <el-col :span="6" :xs="24">
          <div class="flex h-full items-center justify-around">
            <el-statistic
              v-for="item in statisticData"
              :key="item.key"
              :value="item.value"
            >
              <template #title>
                <div class="flex items-center">
                  <component :is="getIconComponent(item.iconClass)" :icon="['fas', item.iconClass]" 
                  :style="{ color: getIconColor(item.iconClass) }" :class="svg-icon" />
                  <span class="text-[16px] ml-1">{{ item.title }}</span>
                </div>
              </template>
              <!-- <template v-if="item.suffix" #suffix>/100</template> -->
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 卡片 資料 -->
    <el-row :gutter="10" class="mt-3">
      <el-col
        :xs="24"
        :sm="12"
        :lg="6"
        v-for="(item, index) in cardData"
        :key="index"
      >
        <el-card shadow="never">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-[var(--el-text-color-secondary)]">{{
                item.title
              }}</span>
              <el-tag :type="item.tagType">
                {{ item.tagText }}
              </el-tag>
            </div>
          </template>

          <div class="flex items-center justify-between mt-5">
            <div class="text-lg text-right">
              {{ Math.round(item.count) }}
            </div>
            <svg-icon :icon-class="item.iconClass" size="2em" />
          </div>

          <div
            class="flex items-center justify-between mt-5 text-sm text-[var(--el-text-color-secondary)]"
          >
            <span> {{ item.dataDesc }} </span>
            <span> {{ Math.round(item.count * 15) }} </span>
          </div>
        </el-card>
      </el-col>
    </el-row>

</template>

<style lang="scss" scoped>

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}

.dashboard-container {
  position: relative;
  padding: 24px;

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    border: 0;
  }

  .data-box {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-weight: bold;
    color: var(--el-text-color-regular);
    background: var(--el-bg-color-overlay);
    border-color: var(--el-border-color);
    box-shadow: var(--el-box-shadow-dark);
  }

  .svg-icon {
    fill: currentcolor !important;
  }
}

.flex {
  display: flex;
  align-items: center;
}
</style>