<template>
  <div style="display: flex; flex-direction: column; height: 100vh">
    <header>
      <div style="height: 90px; background: #ededed">
        <img
          :src="currentPeerUser.URL"
          width="40px"
          class="br-50 header-image"
        />
        <div class="header-image">
          <h6 class="mt-4 ml-2" style="font-weight: 600">
            {{ currentPeerUser.name }}
          </h6>
        </div>
      </div>
    </header>
    <div style="flex: 1; overflow-y: auto" class="chat_box">
      <div class="text-outer">
        <div
          :class="item.idFrom === currentUserId ? 'textFrom' : 'textTo'"
          class="text-inner mt-3"
          v-for="item in listMessage"
          :key="item.id"
        >
          <h6>{{ item.content }}</h6>
        </div>
      </div>
    </div>
    <footer>
      <div style="min-height: 60px; background: #ededed">
        <div style="display: flex; padding: 15px">
          <img
            class="mr-3 pointer"
            src="../assets/picture.png"
            alt="select picture"
            width="30px"
            height="30px"
          />

          <input
            type="text"
            style="
              width: 90%;
              border: 1px solid transparent;
              border-radius: 20px;
              padding: 5px 10px;
            "
            class="mr-3"
            v-model="inputValue"
            v-on:keyup.enter="sendMessage(inputValue)"
          />
          <img
            class="mr-2 mt-2 pointer"
            src="../assets/send.png"
            alt="select sticker"
            width="25px"
            height="25px"
            v-on:click="sendMessage(inputValue)"
          />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import firebase from "../services/firebase";
import moment from "moment";

export default {
  app: "ChatBox",
  props: ["currentPeerUser"],
  data() {
    return {
      currentUserName: localStorage.getItem("name"),
      currentUserId: localStorage.getItem("id"),
      currentUserPhoto: localStorage.getItem("photoURL"),
      inputValue: "",
      photoURL: localStorage.getItem("photoURL"),
      listMessage: [],
      groupChatId: null,
    };
  },
  watch: {
    currentPeerUser: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getMessages();
      }
    },
  },
  methods: {
    sendMessage(content) {
      if (content.trim() === "") {
        return;
      }
      const timestamp = moment().valueOf().toString();
      const message = {
        id: timestamp,
        idFrom: this.currentUserId,
        idTo: this.currentPeerUser.id,
        timestamp: timestamp,
        content: content.trim(),
      };
      firebase
        .firestore()
        .collection("Messages")
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .doc(timestamp)
        .set(message)
        .then(() => {
          this.inputValue = "";
        });
    },
    getMessages() {
      this.listMessage = [];
      // here we are creating a room
      let groupChatId = `${this.currentPeerUser.id} + ${this.currentUserId}`;
      firebase
        .firestore()
        .collection("Messages")
        .doc(groupChatId)
        .collection(groupChatId)
        .onSnapshot((Snapshot) => {
          if (Snapshot.docChanges().length > 0) {
            this.groupChatId = groupChatId;
            Snapshot.docChanges().forEach((res) => {
              this.listMessage.push(res.doc.data());
            });
          } else {
            console.log("call cmng 1");
            this.groupChatId = `${this.currentUserId} + ${this.currentPeerUser.id}`;
            firebase
              .firestore()
              .collection("Messages")
              .doc(this.groupChatId)
              .collection(this.groupChatId)
              .onSnapshot((Snapshot) => {
                Snapshot.docChanges().forEach((res) => {
                  console.log("res", res);
                  if (res.type === "added") {
                    this.listMessage.push(res.doc.data());
                  }
                });
              });
          }
        });
    },
  },
  mounted() {
    this.getMessages();
  },
};
</script>

<style scoped>
.welcome {
  color: #010101;
  font-weight: 600;
  margin: 10px 0px 32px;
}
.br-50 {
  border-radius: 50%;
  margin-left: 80px !important;
  margin-top: 20px !important;
}
.header-image {
  float: left;
  margin-left: 10px;
  margin-top: 10px;
}
.text-outer {
  display: flex;
  flex-direction: column;
}
.text-inner {
  padding: 10px 10px 2px;
  border-radius: 0.5rem;
  width: 20%;
}
.textFrom {
  background: #dcf8c6;
  color: white;
  margin: 0% 0% 20px 70%;
}
.textTo {
  background: #effffb;
  color: black;
  margin: 0% 0% 20px 5%;
}
.pointer {
  cursor: pointer;
}
</style>