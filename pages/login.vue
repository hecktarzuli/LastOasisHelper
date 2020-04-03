<template>
  <div class="lds-roller">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <p>Getting you signed in</p>
  </div>
</template>
<style scoped>
.lds-roller {
  width: 10vw;
  margin-left: 45vw;
  margin-top: 35vh;
  transform: scale(2);
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller p {
  font-size: 7px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  transform: translateY(-2vh);
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: ' ';
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<script>
export default {
  mounted() {
    const body = new URLSearchParams()
    body.set('client_id', process.env.CLIENT_ID)
    body.set('client_secret', process.env.CLIENT_SECRET)
    body.set('grant_type', 'authorization_code')
    body.set('code', this.$route.query.code)
    body.set('redirect_uri', process.env.REDIRECT_URI)
    body.set('scope', 'identify')

    fetch('https://discordapp.com/api/oauth2/token', {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body
    })
      .then((raw) => raw.json())
      .then((response) => {
        console.log(response)
        window.localStorage.setItem('refresh_token', response.refresh_token)
        window.localStorage.setItem('access_token', response.access_token)
        return response.access_token
      })
      .then((token) =>
        fetch('https://discordapp.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      )
      .then((raw) => raw.json())
      .then((response) => {
        window.localStorage.setItem('username', response.username)
        setTimeout(function() {
          document.location.replace('./')
        }, 1300)
      })
  }
}
</script>
