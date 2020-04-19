import { stringify } from 'querystring'
import crypto from 'crypto'
import EventEmitter from 'eventemitter3'

export default ({ app, store, redirect, $axios }, inject) => {
  const discordAuth = $axios.create({
    baseURL: process.env.OAUTH2_URL,
    timeout: 1000
  })

  class AuthService extends EventEmitter {
    async verifyAuth() {
      try {
        if (!app.$cookies.get('auth-access-token')) {
          if (!app.$cookies.get('auth-refresh-token')) this.login()
          else await this.refreshLogin()
        }
      } catch (err) {
        console.error(err)
      }
    }

    login() {
      const nonce = crypto.randomBytes(16).toString('base64')
      const params = {
        client_id: process.env.CLIENT_ID,
        redirect_uri:
          process.env.NODE_ENV !== 'production'
            ? 'http://127.0.0.1:3000/login'
            : '',
        response_type: 'code',
        scope: 'identify',
        state: nonce
      }
      sessionStorage.removeItem('nonce')
      sessionStorage.setItem('nonce', nonce)
      location.replace(
        `${process.env.OAUTH2_URL}/authorize?${stringify(params)}`
      )
    }

    handleCallback(queryParams) {
      store.commit('loading', { t: 'user', v: true })
      return new Promise((resolve, reject) => {
        // check state
        if (queryParams.state !== sessionStorage.getItem('nonce'))
          return reject(new Error('Invalid state!'))
        $axios
          .get(`http://127.0.0.1:3000/api/code?code=${queryParams.code}`)
          .then(({ data: { access_token, refresh_token, expires_in } }) => {
            app.$cookies.set('auth-access-token', access_token, {
              maxAge: expires_in
            })
            app.$cookies.set('auth-refresh-token', refresh_token, {
              maxAge: expires_in * 4
            })
            store.commit('auth/login', { access_token, refresh_token })
            return $axios.get('https://discordapp.com/api/users/@me', {
              headers: {
                Authorization: `Bearer ${access_token}`
              }
            })
          })
          .then(({ data }) => {
            console.log(data)
            store.commit('auth/setUser', data)
            resolve()
          })
          .catch((err) => {
            reject(err.response.data)
          })
      })
    }

    async refreshLogin() {
      const refresh_token = app.$cookies.get('auth-refresh-token')
      const { data } = await discordAuth.post(
        '/token',
        stringify({
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token,
          redirect_uri: process.env.REDIRECT_URI,
          scope: 'identify'
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      return data
    }
  }

  inject('auth', new AuthService())
}
