<template>
  <div>Callback</div>
</template>
<script>
const bota = require('bota')

export default {
  mounted() {
    const creds = bota(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)
    const uri = 'http://localhost:3000'
    this.$axios
      .post(
        `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${this.$route.query.code}&redirect_uri=${uri}`,
        {
          headers: {
            Authorization: `Basic ${creds}`
          }
        }
      )
      .then((res) => {
        console.log(res)
      })
  }
}
</script>
