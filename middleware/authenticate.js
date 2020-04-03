export default function({ route, store, auth }) {
  if (route.query.code) {
    const body = new URLSearchParams()
    body.set('client_id', process.env.CLIENT_ID)
    body.set('client_secret', process.env.CLIENT_SECRET)
    body.set('grant_type', 'authorization_code')
    body.set('code', route.query.code)
    body.set('redirect_uri', process.env.REDIRECT_URI)
    body.set('scope', 'identify')

    return fetch('https://discordapp.com/api/oauth2/token', {
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
        console.log(response)
        auth.setUser(response.username)
      })
  }
}
