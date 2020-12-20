// import Vue from 'vue'
// import axios from 'axios'

// Vue.prototype.$axios = axios

// import Vue from 'vue'
import axios from 'axios'
// axios.defaults.baseURL = process.env.API
// Vue.prototype.$axios = axios
// Object.defineProperty(Vue.prototype, '$axios', {
//   get: () => axios
// })
import { Notify } from 'quasar'
// create an axios instance
const service = axios.create({
  // withCredentials: false,
  // baseURL: process.env.API, // url = base url + request url
  // baseURL: 'http://139.224.114.195:1188',
  baseURL: process.env.API,
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  // 'Content-Type': 'multipart/form-data'
  // 'Access-Control-Allow-Origin': true
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Notify.create({
        message: res.msg || 'Error',
        icon: 'r_warning',
        position: 'top',
        timeout: '1500',
        color: 'negative'
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Notify.create({
      message: 'Network Error',
      icon: 'warning',
      position: 'top',
      timeout: '1500',
      color: 'negative'
    })
    return Promise.reject(error)
  }
)
export { service }
