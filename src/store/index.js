import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

const baseUrl = 'https://dvapi.tempest.app/api/v1'
const login = '/auth/login'
const jobsUrl = '/jobs?order_by=start_time&include=client.jobRequest.jobType.user'

export default new Vuex.Store({
  state: {
    token: '',
    user: {},
    status: '',
    error: {},
    page: 0,
    per_page: 0,
    jobs: []
  },
  mutations: {
    auth_request (state) {
      state.status = 'requesting'
      state.error = ''
    },
    auth_success (state, user) {
      state.status = 'success'
      state.user = user
    },
    auth_error (state, error) {
      state.status = 'error'
      state.error = error
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.error = {}
      state.user = {}
    },
    store_token (state, token) {
      state.token = token
    },
    store_jobs (state, data) {
      state.jobs = data
    },
    pagination (state, { page, perPage }) {
      state.page = page
      state.per_page = perPage
    }
  },
  actions: {
    login ({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: baseUrl + login,
          data: { email, password },
          method: 'POST'
        })
          .then(response => {
            const token = response.data.token
            const user = response.config.data
            localStorage.setItem('token', token)
            // axios.defaults.headers.common['Authorization'] = token
            commit('store_token', token)
            commit('auth_success', user)
            resolve(response)
          })
          .catch(error => {
            commit('auth_error', error)
            localStorage.removeItem('token')
            reject(error)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    jobs ({ commit }, page, perPage) {
      return new Promise((resolve, reject) => {
        commit('pagination', { page, perPage })
        let pagination = `&per_page=${perPage}&page=${page}`
        let myHeaders = new Headers()
        myHeaders.append('Authorization: Bearer ' + localStorage.getItem('token'))
        console.log(myHeaders)
        axios({
          url: baseUrl + jobsUrl + pagination,
          method: 'GET',
          headers: myHeaders
        })
          .then(response => {
            console.log(response.data)
            // const token = response.data.token
            // const user = response.config.data
            // localStorage.setItem('token', token)
            // axios.defaults.headers.common['Authorization'] = token
            commit('store_jobs', response.data)
            // commit('auth_success', user)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            // commit('auth_error', error)
            // localStorage.removeItem('token')
            reject(error)
          })
        resolve()
      })
    }
  },
  modules: {},
  getters: {
    isLoggedIn: state => state.token,
    authStatus: state => state.status
  }
})
