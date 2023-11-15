import type { RouteRecordRaw } from 'vue-router'
import type { UserInfo } from '@/types/api/user'

export interface UserState {
  token: string
  // Partial 将所有属性变为可选
  userInfo: Partial<UserInfo>
  routesMenu: RouteRecordRaw[]
}
