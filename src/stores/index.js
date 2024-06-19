import { createStore } from 'vuex';

const state = {
  socket: null,
  id: "",
  name: "",
  userList: [],
  msgList: [],
};

const mutations = {
  setSocket(state, socket) {
    state.socket = socket;
  },
  setId(state, id) {
    state.id = id;
  },
  setName(state, name) {
    state.name = name;
  },
  setUserList(state, userList) {
    state.userList = userList;
  },
  setMsgList(state, msgList) {
    state.msgList = msgList;
  },
};

const actions = {
  connect(context) {
    console.log("context.state.id====" + context.state.id);
    // const socket = new WebSocket('ws://localhost:8089/chat/' + context.state.id);
    const socket = new WebSocket('ws://localhost:4090/start/chat/' + context.state.id);
    socket.onopen = () => {
      console.log("建立websocket連線");
    };
    socket.onmessage = (event) => {
      console.log("收到Server的消息：" + event.data);
      let msg = JSON.parse(event.data);
      if (msg.type == '1') {
        console.log("更新使用者名單: " + msg.userList);
        context.commit("setUserList", msg.userList);
      } else if (msg.type == '2') {
        console.log("更新消息名單: " + msg.msgList);
        context.commit("setMsgList", msg.msgList);
      }
    };

    context.commit("setSocket", socket);
  },

  setUserId(context, id) {
    console.log("設定使用者ID：" + id);
    context.commit("setId", id);
  },

  setUserName(context, name) {
    console.log("設定使用者Name：" + name);
    context.commit("setName", name);
  },

  sendMsg(context, msg) {
    context.state.socket.send(msg);
  }
};

export default createStore({
  state,
  mutations,
  actions,
});
