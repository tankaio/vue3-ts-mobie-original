import http from './index'

import type { CommonResponse } from '@/types/api/common'
import type { LoginForm, UserInfo } from '@/types/api/user'

enum URL {
  LOGIN = '/user/login',
  LOGOUT = '/user/logout',
  USERINFO = '/user/info'
}

export const reqUserLogin = async (data: LoginForm): Promise<CommonResponse<UserInfo>> => {
  return await http.post({
    url: URL.LOGIN,
    data
  })
}

export const reqUserLogout = async (): Promise<CommonResponse<null>> => {
  return await http.post({
    url: URL.LOGOUT
  })
}

export const reqGetUserInfo = async (): Promise<CommonResponse<UserInfo>> => {
  return await http.get({
    url: URL.USERINFO
  })
}
// export const reqGetInfo = async (params: any, self: any): Promise<CommonResponse<UserInfo>> => {
//   return await http.get({
//     url: URL.USERINFO,
//     params
//   })
// }
