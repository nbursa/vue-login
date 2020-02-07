<template>
  <div class="jobs">
    <h1 class="jobs-title">Jobs</h1>
    <div class="jobs-list" v-if="!loading && jobs.length">
      <div class="jobs-list-item" v-for="(job, index) in jobs" :key="index">
        <div class="user-name">User Name{{  }}</div>
        <div class="job-name">Job Name{{  }}</div>
        <div class="client-name">{{ job.client.name }}</div>
        <div class="start-time">{{ job.start_time }}</div>
        <div class="end-time">{{ job.end_time }}</div>
      </div>
    </div>
    <h2 class="empty" v-if="!jobs.length">No results</h2>
    <h2 class="loader" v-if="loading">Loading...</h2>
    <pagination v-if="jobs.length" :page="page" :perPage="perPage"></pagination>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
export default {
  name: 'jobs',
  data () {
    return {
      loading: true
    }
  },
  created () {
    this.getJobs()
  },
  updated () {
    console.log(this.$store.state.page, this.$store.state.per_page)
  },
  computed: {
    jobs () {
      return this.$store.state.jobs
    },
    page () {
      return this.$store.state.page
    },
    perPage () {
      return this.$store.state.per_page
    }
  },
  methods: {
    getJobs () {
      this.loading = true
      this.$store
        .dispatch('jobs', { page: this.page, perPage: this.perPage })
        .catch(err => {
          console.log(err)
        })
      this.loading = false
    }
  },
  components: {
    pagination
  }
}
</script>
<style lang="scss">
.jobs {
  .empty {
    margin: 100px auto;
  }
  .loader {
    margin: 100px auto;
  }
  &-list {
    &-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      &:nth-child(odd) {
        background-color: lightgray;
      }
      > div {
        display: inline-block;
      }
    }
  }
}
</style>
