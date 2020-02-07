<template>
  <div class="pagination">
      <button class="button" @click="previousPage()">Prev</button>
      <span class="page-number">{{this.$props.page}}</span>
      <button class="button" @click="nextPage()">Next</button>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: ['page', 'perPage'],
  methods: {
    nextPage () {
      this.$store.dispatch('jobs', { page: this.$props.page + 1, perPage: this.$props.perPage })
    },
    previousPage () {
      if (this.$props.page > 1) {
        this.$store.dispatch('jobs', { page: this.$props.page - 1, perPage: this.$props.perPage })
      }
    }
  }
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 50px 0 20px;
  .button {
    width: 100%;
    max-width: 150px;
    min-width: 50px;
    height: 25px;
  }
  .page-number {
    font-size: 2rem;
  }
}
</style>
