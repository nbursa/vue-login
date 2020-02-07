<template>
  <div class="jobs">
    <h1>Employes</h1>
    <div class="">{{ this.$store.state.jobs }}</div>
    <!-- <pagination :page="page" :perPage="perPage"></pagination> -->
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
export default {
  name: 'jobs',
  data () {
    return {
      page: 1,
      perPage: 20
    }
  },
  created () {
    console.log(this.$store.state.jobs, this.$store.state.page, this.$store.state.per_page)
    this.getJobs()
  },
  updated () {
    console.log(this.$store.state.page, this.$store.state.per_page)
  },
  computed: {
    // page () {
    //   return this.$store.state.page
    // },
    // perPage () {
    //   return this.$store.state.per_page
    // }
  },
  methods: {
    getJobs () {
      // const { email, password } = this
      // this.error = ''
      // this.emailError = ''
      // this.passwordError = ''
      this.$store
        .dispatch('jobs', this.page, this.perPage)
        // .then(() => this.$router.push('/jobs'))
        .catch(err => {
          this.error = err.response
        })
    }
  },
  components: {
    pagination
  }
}
</script>
