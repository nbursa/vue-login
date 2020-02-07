<template>
  <div class="pagination">
      <button @click="log(props.page - 1)">Prev</button>
      <span @click="log(props.page)">{{props.page}}</span>
      <button @click="log(props.page + 1)">Next</button>
  </div>
</template>
<script>
export default {
  name: 'pagination',
  props: ['page', 'perPage'],
  data () {
    return {
    }
  },
  created () {
    console.log(this.$props)
  },
  methods: {
    log (page) {
      console.log(page)
      // console.log(this.$props)
    }
  }
}
</script>
