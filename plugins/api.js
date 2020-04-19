export default ({ $axios, env }, inject) => {
  const api = $axios.create({
    baseURL: `${env.baseUrl}/api`,
    timeout: 1000
  })

  inject('api', api)
}
