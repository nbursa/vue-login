import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = Axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/logout']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = store.getters.isLoggedIn
  // console.log(store.state.token)
  // console.log(store.state.user.email, store.state.user.password)
  // console.log(store.state.user.error)
  if (authRequired && !loggedIn) {
    console.log('Not authorised')
    return next('/')
  }

  next()
})
