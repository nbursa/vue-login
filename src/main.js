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

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/logout']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('token')
  if (authRequired && !loggedIn) {
    alert('Not authorised')
    return next('/')
  }
  next()
})
