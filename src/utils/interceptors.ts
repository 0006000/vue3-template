import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// 定义返回值类型--根据需要往里面加字段，反正多了也不会报错
export type ResponseType<T = any> = {
  code: number
  msg: string
  data: T
}

export type InterceptorsType = {
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorsCatch?: (err: AxiosError) => AxiosError
  responseInterceptors?: <T = any>(res: AxiosResponse<ResponseType<T>>) => ResponseType<T> | Promise<ResponseType<T>>
  responseInterceptorsCatch?: (err: AxiosError) => AxiosError
}

/**
 * @name 共用的拦截器
 * @desc 公共的处理部分，比如是否都有loading，是否都有toast；基础功能：取消请求、错误重试、防抖节流
 * @loading boolean，规则：<100ms的请求不要loading，>100ms的请求添加loading
 * @needCancel boolean
 */
export const common: InterceptorsType = {
  responseInterceptors(res) {
    const data = res.data
    if (data.code === 0) {
      return res.data
    }
    return Promise.reject(res.data)
  },
}

/**
 * @name 主服务的拦截器
 * @desc 当前项目主业务服务器
 */
export const main: InterceptorsType = {
  responseInterceptors(res) {
    const data = res.data
    if (data.code === 0) {
      return res.data
    }
    return Promise.reject(res.data)
  },
}

/**
 * @name 其他服务的拦截器
 * @desc 一个项目中，有可能需要连接多个服务器，比如中台服务，每个服务器可能需要不同的处理
 */
export const other1: InterceptorsType = {
  responseInterceptors(res) {
    const data = res.data
    if (data.code === 0) {
      return res.data
    }
    return Promise.reject(res.data)
  },
}
