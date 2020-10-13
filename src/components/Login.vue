<template>
  <div class="mt-4">
    <h2>Welcome to Realtime Chat App</h2>
    <form class="detail-box my-5">
      <div class="form-group my-3">
        <h4>Login to Chat</h4>
        <input
          type="text"
          v-model="email"
          class="form-control mb-4 mt-4"
          placeholder="Enter your email..."
        />
        <input
          type="password"
          v-model="password"
          class="form-control mb-4"
          placeholder="Enter your password..."
          v-on:keyup.enter="login"
        />
        <router-link :to="{ path: 'signup' }">
          <h6 class="mb-3" style="font-weight: 600; text-decoration: underline">
            Create an account
          </h6>
        </router-link>

        <button
          type="button"
          v-on:click="login"
          class="btn btn-primary"
          style="
            font-weight: 500;
            padding-left: 30px;
            padding-right: 30px;
            border-radius: 5px;
          "
        >
          Login
        </button>
      </div>
    </form>
    <div class="card mx-auto" style="width: 30rem">
      <div class="card-body">
        <h5 class="card-title" style="font-weight: 600">Important!</h5>
        <p class="card-text">
          For a demo Realtime Chat App you can try it by opening two accounts on
          the browser
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "../services/firebase";

export default {
  app: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const auth = firebase.auth();
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (res) => {
          console.log(res);
          if (res.user) {
            // Checking if the user login and uid is match with id in db
            // While signup store uid as id to db
            await firebase
              .firestore()
              .collection("users")
              .where("id", "==", res.user.uid)
              .get()
              .then((querySnapshot) => {
                // console.log("query", querySnapshot);
                querySnapshot.forEach((doc) => {
                  let userData = doc.data();
                  localStorage.setItem("id", userData.id);
                  localStorage.setItem("name", userData.name);
                  localStorage.setItem("email", userData.email);
                  localStorage.setItem("password", userData.password);
                  localStorage.setItem("photoURL", userData.URL);
                  localStorage.setItem("description", userData.description);
                  localStorage.setItem("FirebaseDocumentId", doc.id);
                });
              });
            this.$router.push("/chat");
          }
        })
        .catch((err) => {
          var errorCode = err.code;
          var errormessage = err.message;
          Vue.toasted.show(errorCode).goAway(3000);
          Vue.toasted.show(errormessage).goAway(3000);
        });
    },
  },
  created() {
    if (localStorage.getItem("id")) this.$router.push("/chat");
  },
};
</script>

<style scoped>
input[type="text"],
input[type="password"] {
  margin: 0 auto;
  width: 80%;
  border: 1px solid lightgrey;
}
.detail-box {
  padding: 5px;
  border: 1px solid lightgrey;
  width: 400px;
  min-height: 250px;
  margin: 0 auto;
}
h2,
h4 {
  color: dodgerblue;
  font-weight: 600;
}
</style>