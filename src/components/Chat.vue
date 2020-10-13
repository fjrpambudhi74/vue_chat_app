<template>
  <div class="wrapper">
    <!-- Sidebar  -->
    <nav style="color: white" id="sidebar">
      <div class="sidebar-header d-flex justify-content-around">
        <div
          class="d-flex pointer"
          style="margin-right: 5px; width: 200px"
          v-on:click="onProfileClick"
        >
          <img
            :src="photoURL"
            alt="user"
            width="50px"
            height="50px"
            style="border-radius: 50%; background: white"
          />
          <h6 class="item_user_id" style="line-height: 2; font-weight: 600">
            {{ currentUserName }}
          </h6>
        </div>
        <button
          type="button"
          class="btn btn-outline-secondary"
          v-on:click="logout"
        >
          Logout
        </button>
      </div>
      <div style="height: 1px; border-bottom: 1px solid #00388b"></div>
      <ul class="list-unstyled components">
        <li
          class="active mb-3"
          v-on:click="letsChat(item)"
          v-for="item in searchUsers"
          :key="item.id"
          v-show="item.id != currentUserId"
        >
          <div
            class="d-flex"
            style="cursor: pointer; padding-bottom: 15px; width: 100%"
          >
            <div style="width: 30%">
              <img
                :src="item.URL"
                alt="user"
                width="50px"
                height="50px"
                style="border-radius: 50%; background: white"
              />
            </div>
            <div
              style="
                padding: 10px 0px 0px;
                width: 50%;
                display: flex;
                justify-content: space-between;
              "
            >
              <h6 class="item_user" style="line-height: 2; font-weight: 500">
                {{ item.name }}
              </h6>
            </div>
          </div>
          <div style="height: 1px; border-bottom: 1px solid #00388b"></div>
        </li>
      </ul>
    </nav>

    <!-- Page Content  -->
    <div id="content" v-if="currentPeerUser === null">
      <div class="my-4">
        <img :src="photoURL" width="200px" class="br-50" />
      </div>
      <div>
        <h2>Welcome {{ currentUserName }},</h2>
        <h3>"{{ currentDescription }}"</h3>
      </div>
      <div>
        <div
          class="card"
          style="width: 30rem; position: fixed; bottom: 10%; left: 45%"
        >
          <div class="card-body">
            <h5 class="card-title" style="font-weight: 600">Important!</h5>
            <p class="card-text">
              For a demo Realtime Chat App you can try it by opening two
              accounts on the browser
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="header-width">
      <ChatBox v-bind:currentPeerUser="currentPeerUser" />
    </div>
  </div>
</template>

<script>
import firebase from "../services/firebase";
import ChatBox from "./ChatBox";

export default {
  app: "Chat",
  components: {
    ChatBox,
  },
  data() {
    return {
      currentUserName: localStorage.getItem("name"),
      currentPeerUser: null,
      currentUserId: localStorage.getItem("id"),
      currentUserPhoto: localStorage.getItem("photoURL"),
      currentDescription: localStorage.getItem("description"),
      searchUsers: [],
      photoURL: localStorage.getItem("photoURL"),
    };
  },
  methods: {
    onProfileClick() {
      this.$router.push("/profile");
    },
    logout() {
      firebase.auth().signOut();
      this.$router.push("/");
      localStorage.clear();
    },
    letsChat(item) {
      this.currentPeerUser = item;
    },
    async getUserList() {
      const result = await firebase.firestore().collection("users").get();
      if (result.docs.length > 0) {
        let listUsers = [];
        listUsers = [...result.docs];
        listUsers.forEach((item, index) => {
          console.log("item", item.data());
          this.searchUsers.push({
            key: index,
            documentKey: item.id,
            id: item.data().id,
            name: item.data().name,
            URL: item.data().URL,
            description: item.data().description,
          });
        });
      }
    },
  },
  created() {
    if (!localStorage.hasOwnProperty("id")) this.$router.push("/");
    this.getUserList();
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.br-50 {
  border-radius: 50%;
}
.header-width {
  width: calc(100% - 350px);
  min-height: 100vh;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  right: 0;
}
</style>