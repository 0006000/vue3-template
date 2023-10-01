import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { common } from './interceptors'
import type { ResponseType } from './interceptors'

// 创建实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
})

// 请求拦截器--如果有特殊需求，可以在interceptors文件中添加处理逻辑
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.lang = navigator.language
    config.headers.Authorization = localStorage.getItem('token')

    common.requestInterceptors && (config = common.requestInterceptors(config))
    return config
  },
  (err: AxiosError) => {
    return err
  }
)

// 响应拦截器--给每个服务器配制各自的拦截器（interceptors文件中包含：common拦截器，main拦截器，其他拦截器）
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

// 请求方法
function http<T = any>(config?: AxiosRequestConfig): Promise<[err: AxiosError | null, res: ResponseType<T> | null]> {
  return new Promise(resolve => {
    instance
      .request<any, ResponseType<T>>(config!)
      .then(res => {
        resolve([null, res])
      })
      .catch(err => {
        resolve([err, null])
      })
  })
}
http.get = <T>(config: AxiosRequestConfig) => http<T>({ ...config, method: 'GET' })
http.post = <T>(config: AxiosRequestConfig) => http<T>({ ...config, method: 'POST' })
// const [err, rsp] = await http<Array<{id:number;type:string;name:string}>>()
// console.log(err,rsp)

// 对于需要取消的请求的封装
export function withCancel() {}

export default http
