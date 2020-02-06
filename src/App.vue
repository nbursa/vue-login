<template>
  <div id="app">
    <navigation></navigation>
    <router-view/>
  </div>
</template>
<script>
import navigation from '@/components/Navigation'
export default {
  components: {
    navigation
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
}
</style>
