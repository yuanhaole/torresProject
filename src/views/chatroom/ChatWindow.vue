<template>
  <div class="chat-window">
    <div class="bottom" style="background-color: white;">
      <!-- 聊天訊息名單 -->
      <div class="chat-content" ref="chatContent">
        <div class="chat-wrapper" v-for="item in chatList" :key="item.id">
          <!-- 透過UID得知訊息是自己的還是別人的 -->
          <div class="chat-friend" v-if="item.uid != $store.state.id">
            <div class="chat-text">
              {{ item.msg }}
            </div>
            <div class="info-time">
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <div class="chat-me" v-else>
            <div class="chat-text">
              {{ item.msg }}
            </div>
            <div class="info-time">
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="chatInputs">
        <input class="inputs" v-model="inputMsg" @keyup.enter="sendText" />
        <div class="send box" @click="sendText">
          <span class="sendText" style="background-color: white;"><font-awesome-icon :icon="['far', 'paper-plane']" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatList: [],
      inputMsg: "",
    };
  },
  methods: {
    //取得視窗高度並滾動至最底層
    scrollBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        scrollDom.scrollTop = scrollDom.scrollHeight;
      });
    },
    //傳送消息
    sendText() {
      if (this.inputMsg) {
        const now = new Date();

        const year = now.getFullYear();
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        const day = ("0" + now.getDate()).slice(-2);
        const hours = ("0" + now.getHours()).slice(-2);
        const minutes = ("0" + now.getMinutes()).slice(-2);
        const seconds = ("0" + now.getSeconds()).slice(-2);

        const formattedTime =
          year +
          "-" +
          month +
          "-" +
          day +
          "  " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds;

        let msg = {
          name: this.$store.state.name,
          time: formattedTime,
          msg: this.inputMsg,
          uid: this.$store.state.id,
        };
        // 向websocket server端傳送消息
        this.$store.dispatch("sendMsg", JSON.stringify(msg));
        this.inputMsg = "";
      } else {
        this.$message({
          message: "傳送的訊息不得為空",
          type: "warning",
        });
      }
    },
  },

  computed: {
    getChatMsgList() {
      return this.$store.state.msgList;
    },
  },

  watch: {
    // 重新載入消息LIST
    getChatMsgList: {
      handler: function (newVal, oldVal) {
        console.log("更新chatList");
        this.chatList = this.getChatMsgList;
        this.scrollBottom();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  position: relative;
  .bottom {
    width: 100%;
    height: 80vh;
    background-color: #f4f4f4;
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    margin-top: 1%;
    .chat-content {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      padding: 20px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隱藏滾動條 */
        height: 0; /* Safari,Chrome 隱藏滾動條 */
        display: none; /* 移動端、pad 上Safari，Chrome，隱藏滾動條 */
      }
      .chat-wrapper {
        position: relative;
        word-break: break-all;
        .chat-friend {
          width: 100%;
          float: left;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .chat-text {
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 20px 5px;
            background-color: #fff;
            color: black;
            font-size: 20px;
          }
          .info-time {
            margin: 10px 0;
            color: black;
            font-size: 14px;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 10px;
            }
            span:last-child {
              color: rgb(38, 39, 46);
              margin-left: 10px;
              vertical-align: middle;
            }
          }
        }
        .chat-me {
          width: 100%;
          float: right;
          margin-bottom: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          .chat-text {
            float: right;
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 5px 20px;
            background-color: #f4f4f4;
            color: black;
            font-size: 20px;
          }
          .info-time {
            margin: 10px 0;
            color: black;
            font-size: 14px;
            display: flex;
            justify-content: flex-end;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 10px;
            }
            span {
              line-height: 30px;
            }
            span:first-child {
              color: rgb(38, 39, 46);
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .chatInputs {
      width: 90%;
      position: absolute;
      bottom: 0;
      margin: 3%;
      display: flex;
      .box {
        width: 80px;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }

      .inputs {
        width: 90%;
        height: 50px;
        background-color: #f4f4f4;
        border-radius: 15px;
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 20px;
        color: black;
        font-weight: 100;
        margin: 0 20px;
        &:focus {
          outline: none;
        }
      }
      .send {
        background-color: white;
        border: 0;
        transition: 0.3s;
        box-shadow: 0px 0px 5px 0px black;
        &:hover {
          box-shadow: 0px 0px 10px 0px black;
        }
      }
    }
  }
}
</style>