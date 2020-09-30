import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Chat from '../components/Chat.vue'
import Profile from '../components/Profile.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        auth: true,
        title: 'Realtime Chat App - Login'
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {
        auth: true,
        title: 'Realtime Chat App - Signup'
      }
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta: {
        auth: true,
        title: 'Realtime Chat App'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        auth: true,
        title: 'Realtime Chat App - Profile'
      }
    }

  ],
})
