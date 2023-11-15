import HttpRequest from '@/utils/request'
import useUserStore from '@/store/modules/user'
import { showToast } from 'vant'
import 'vant/es/toast/style'

const http = new HttpRequest({
  baseURL: '/api',
  timeout: 1000 * 10,
  // 请求是否携带cookie
  withCredentials: true,
  showLoading: true,
  interceptorHooks: {
    requestInterceptor: (config) => {
      console.log('request.interceptors.request-config===', config)
      const userStore = useUserStore()
      if (userStore.token) {
        config.headers.Authorization = userStore.token
      }
      return config
    },
    requestInterceptorCatch: async (error) => {
      return await Promise.reject(error)
    },
    responseInterceptor: (response) => {
      console.log('request.interceptors.response-response===', response)
      const { code: status, msg } = response.data
      if (status === 200) return response
      let message = ''
      switch (status) {
        case 401:
          message = 'token失效'
          break
        case 201:
        case 500:
          message = msg
          break
      }
      showToast({
        type: 'fail',
        message
      })
      return response
    },
    responseInterceptorCatch: async (error) => {
      return await Promise.reject(error)
    }
  }
})
console.log('http--', http)

export default http
