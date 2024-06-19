<template>
  <div class="chatRoom">
    <div class="personList">
      <div class="title">
        <h1>聊天室</h1>
      </div>
      <!-- 誰在線上?列表 -->
      <div class="online-person">
        <span class="title">誰在線上?</span>
        <div class="person-cards-wrapper">
          <div
            class="personList"
            v-for="personInfo in personList"
            :key="personInfo.id"
          >
            <PersonCard :personInfo="personInfo"></PersonCard>
          </div>
        </div>
      </div>
    </div>
    <!-- 聊天窗口 -->
    <div class="chatContent">
      <ChatWindow></ChatWindow>
    </div>
    <!-- 輸入用戶的對話框 -->
    <div v-if="showDialog" class="dialog-wrapper">
      <div class="dialog">
        <h2 class="dialog-title">請輸入名字</h2>
        <el-input
          v-model="inputName"
          class="dialog-content"
          placeholder="請輸入內容"
          maxlength="10"
        ></el-input>
        <button @click="closeDialog" class="dialog-button">確定</button>
      </div>
    </div>
  </div>
</template>

<script>
import PersonCard from "./PersonCard.vue";
import ChatWindow from "./ChatWindow.vue";

import { newUser, addUser } from "@/api/getData";
export default {
  name: "App",
  components: {
    PersonCard,
    ChatWindow,
  },
  data() {
    return {
      personList: [], // 誰在線上的列表
      showDialog: false,
      inputName: "",
    };
  },
  mounted() {
  // 如果sessionStorage中無用戶id，則需輸入用戶名，分配id
    if (!sessionStorage.hasOwnProperty("id")) {
      this.openDialog();
    } else {
      // 如果sessionStorage中有，則無需分配，直接用vuex存儲
      this.$store.dispatch("setUserId", sessionStorage.getItem("id"));
      this.$store.dispatch("setUserName", sessionStorage.getItem("name"));
      console.log("增加已有用户：" + this.$store.state.name);
      addUser({ id: this.$store.state.id, name: this.$store.state.name }).then(
        (res) => {
          // 建立websocket連接，要保證addUser後服務端才傳送更新消息
          this.$store.dispatch("connect");
        }
      );
    }
  },
  methods: {
    openDialog() {
      this.showDialog = true;
    },
    closeDialog() {
      if (this.inputName.length == 0) {
        this.$message({
          message: "請輸入使用者名稱",
          type: "warning",
        });
      } else {
        newUser(this.inputName).then((res) => {
          // 將獲取到的id用vuex存儲
          this.$store.dispatch("setUserId", res);
          this.$store.dispatch("setUserName", this.inputName);
          // 將數據存儲到sessionStorage
          sessionStorage.setItem("id", res);
          sessionStorage.setItem("name", this.inputName);
          // 建立websocket連接，需要用戶id，因此在分配id後進行
          this.$store.dispatch("connect");
        });
        this.showDialog = false;
      }
    },
  },

  computed: {
    getUserList() {
      return this.$store.state.userList;
    },
  },

  watch: {
    getUserList: {
      handler: function (newVal, oldVal) {
        console.log("更新personList");
        console.log("newVal: " + newVal);
        this.personList = this.getUserList;
        console.log(this.personList);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.chatRoom {
  display: flex;
  .personList {
    width: 280px;
    .title {
      color: #000;
      padding-left: 10px;
    }
    .online-person {
      margin-top: 50px;
      .title {
        font-size: 20px;
      }
      .person-cards-wrapper {
        height: 65vh;
        margin-top: 20px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          width: 0; /* Safari,Chrome 隱藏滾動條 */
          height: 0; /* Safari,Chrome 隱藏滾動條 */
          display: none; /* 移動端、pad 上Safari，Chrome，隱藏滾動條 */
        }
      }
    }
  }
  .chatContent {
    flex: 1;
    padding-right: 30px;
  }

  .dialog-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .dialog {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 80%;
  }

  .dialog-title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .dialog-content {
    margin-bottom: 10px;
  }

  .dialog-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }

  .dialog-button:hover {
    background-color: #0056b3;
  }
}
</style>