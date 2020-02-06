<template>
  <div class="employes">
    <h1>Employes</h1>
    <pagination></pagination>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
export default {
  name: 'jobs',
  updated () {
    console.log(this.$router)
  },
  components: {
    pagination
  }
}
</script>
