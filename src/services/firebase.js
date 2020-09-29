import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyADbOjtJP1oz3Kddv3ijoXb8az_9qPJmNo",
  authDomain: "vue-chat-app-8e549.firebaseapp.com",
  databaseURL: "https://vue-chat-app-8e549.firebaseio.com",
  projectId: "vue-chat-app-8e549",
  storageBucket: "vue-chat-app-8e549.appspot.com",
  messagingSenderId: "941963036355",
  appId: "1:941963036355:web:adf95a6bb5489489ed0476"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
