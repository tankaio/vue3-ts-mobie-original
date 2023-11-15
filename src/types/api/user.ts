export interface LoginForm {
  username: string
  password: string
  confirmPwd?: string
}

export interface UserInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
