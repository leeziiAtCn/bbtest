/**
 * Created by think on 2017/5/14.
 */
import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui'
axios.defaults.baseURL = process.env.http.root
let loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({
    fullscreen: true
  })
  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => {
  loadinginstace.close()
  return Promise.reject(error)
})
export default axios