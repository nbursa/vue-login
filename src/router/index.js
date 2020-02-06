import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: () => import('../views/Jobs.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/Logout.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
