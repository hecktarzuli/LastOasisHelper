export default ({ $axios }, inject) => {
  const api = $axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1/api' : '',
    timeout: 1000
  })

  inject('api', api)
}
