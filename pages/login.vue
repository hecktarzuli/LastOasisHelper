<template>
  <div>Logging in...</div>
</template>
<script>
export default {
  mounted() {
    this.$auth
      .handleCallback(this.$route.query)
      .then(() => {
        this.$store.commit('loading', { t: 'user', v: false })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
