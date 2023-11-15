import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig
} from 'axios'
import type { CommonResponse } from '@/types/api/common'
import { showLoadingToast } from 'vant'
import 'vant/es/toast/style'

interface InterceptorHooks {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
interface IRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  interceptorHooks?: InterceptorHooks
}

class HttpRequest {
  config: IRequestConfig
  instance: AxiosInstance
  toast: any
  showLoading: boolean

  constructor(config: IRequestConfig) {
    this.config = config
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? false
    this.toast = null
    this.setupInterceptor()
  }

  setupInterceptor(): void {
    // 创建实例时手动传入的自定义拦截器
    this.instance.interceptors.request.use(
      this.config.interceptorHooks?.requestInterceptor,
      this.config.interceptorHooks?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.config.interceptorHooks?.responseInterceptor,
      this.config.interceptorHooks?.responseInterceptorCatch
    )
    // 所有实例共有的公共拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('interceptors.request-config--', config)
        if (this.showLoading) {
          this.toast = showLoadingToast({
            message: '加载中...',
            forbidClick: true,
            duration: 0
          })
        }
        return config
      },
      async (error) => {
        return await Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        this.toast?.close()
        return response
      },
      async (error) => {
        this.toast?.close()
        return await Promise.reject(error)
      }
    )
  }

  // 类型参数的作用，T 决定AxiosResponse实例中data属性的类型，可以鼠标指到AxiosResponse上后 command+点击 进其源代码中查看 ---> data:{ code: xxx, msg: xxx, data: xxx }
  // Promise中的泛型参数T代表promise变成成功态之后resolve的值，resolve(value)
  async request<T = any>(config: IRequestConfig): Promise<CommonResponse<T>> {
    console.log('request-config--', config)
    return await new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<CommonResponse<T>>>(config)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async get<T = any>(config: IRequestConfig): Promise<CommonResponse<T>> {
    return await this.request({ ...config, method: 'GET' })
  }

  async post<T = any>(config: IRequestConfig): Promise<CommonResponse<T>> {
    return await this.request({ ...config, method: 'POST' })
  }

  async put<T = any>(config: IRequestConfig): Promise<CommonResponse<T>> {
    return await this.request({ ...config, method: 'PUT' })
  }

  async patch<T = any>(config: IRequestConfig): Promise<CommonResponse<T>> {
    return await this.request({ ...config, method: 'PATCH' })
  }

  async delete<T = any>(config: IRequestConfig): Promise<CommonResponse<T>> {
    return await this.request({ ...config, method: 'DELETE' })
  }
}

export default HttpRequest
