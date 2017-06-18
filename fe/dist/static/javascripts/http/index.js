/**
 * Created by think on 2017/5/14.
 */
import axios from 'axios'

axios.defaults.baseURL = process.env.http.root;
// axios.interceptors.request.use(
//   config => {
//     // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//     //   config.headers.Authorization = `token ${store.state.token}`;
//     // }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });
//
// // http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // 返回 401 清除token信息并跳转到登录页面
//           // store.commit(types.LOGOUT);
//           // router.replace({
//           //   path: 'login',
//           //   query: {redirect: router.currentRoute.fullPath}
//           // })
//       }
//     }
//     return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//   });
export default axios;
