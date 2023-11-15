export interface CommonResponse {
  code: number
  msg: string
}

export interface CommonListInfo {
  page: number
  pageSize: number
  total: number
}

export interface SysUserParams {
  page: number
  pageSize: number
  username?: string
  roleName?: string
}

export interface SysUser {
  id?: number
  username: string
  password: string
  realName?: string
  phone?: string
  roleId: number
  roleName?: string
  createTime?: string
  updateTime?: string
}

interface SysUserInfo extends CommonListInfo {
  list: SysUser[]
}

export interface SysUserResponse extends CommonResponse {
  data: SysUserInfo
}

export interface Role {
  id?: number
  roleName: string
  remark?: string
  createTime?: string
  updateTime?: string
}

export interface RoleInfo extends CommonListInfo {
  list: Role[]
}
export interface RoleResponse extends CommonResponse {
  data: RoleInfo
}

export interface Permissions {
  id: number
  pid: number
  code: string
  name: string
  type: number
  level: number
  select: boolean
  createTime: string
  updateTime: string
  children?: Permissions[]
}

export interface PermissionsResponse extends CommonResponse {
  data: Permissions[]
}
