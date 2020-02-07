<template>
  <div id="nav">
    <ul>
      <li><router-link to="/">Home</router-link></li> |
      <li><router-link to="/jobs">Employes</router-link></li>
    </ul>
    <button v-if="this.$store.getters.isLoggedIn" @click.prevent="logout">Logout</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  updated () {
  },
  methods: {
    logout () {
      console.log('loging out')
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/logout'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped lang="scss">
#nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  ul {
    display: flex;
    list-style: none;
    li {
      margin: 0 20px;
    }
  }

  a, button {
    font-weight: bold;
    color: #999999;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
      text-decoration: underline;
    }
  }
}
</style>
