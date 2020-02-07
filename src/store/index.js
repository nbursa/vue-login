import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

const baseUrl = 'https://dvapi.tempest.app/api/v1'
const loginUrl = '/auth/login'
const jobsUrl = '/jobs?order_by=start_time&include=client.jobRequest,jobType.user'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: {},
    page: 1,
    per_page: 20,
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
      state.jobs = []
      state.page = 1
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
          url: baseUrl + loginUrl,
          data: { email, password },
          method: 'POST'
        })
          .then(response => {
            const token = response.data.token
            const user = response.config.data
            localStorage.setItem('token', token)
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
        resolve()
      })
    },
    jobs ({ commit }, { page, perPage }) {
      return new Promise((resolve, reject) => {
        commit('pagination', { page, perPage })
        let pagination = '&per_page=' + perPage + '&page=' + page
        let url = baseUrl + jobsUrl + pagination
        axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then(response => {
            commit('store_jobs', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        resolve()
      })
    }
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
