<template>
  <div class="logout">
    <h1>You are now logged out</h1>
  </div>
</template>

<script>
export default {
  name: 'logout',
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
    this.logout()
  },
  methods: {
    logout () {
      setTimeout(() => {
        this.$router.push('/')
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
