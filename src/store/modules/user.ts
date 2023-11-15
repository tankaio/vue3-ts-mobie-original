import { defineStore } from 'pinia'
import type { UserState } from '@/types/store/user'
import type { LoginForm, UserInfo } from '@/types/api/user'
import { reqUserLogin, reqUserLogout } from '@/api/user'
import db from '@/utils/storage'
import constantRoute from '@/router/routes/index'
// import useSysStore from '@/store/modules/sys'
import router from '@/router'

const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => ({
    token: db.session.get('token') ?? '',
    userInfo: db.local.get('userInfo') ?? {},
    routesMenu: constantRoute
  }),
  // 异步/逻辑的地方
  actions: {
    // 退出登录
    async userLogout() {
      const res = await reqUserLogout()
      const { code } = res
      if (code === 200) {
        this.saveUserInfo({})
        this.token = ''
        // const sysStore = useSysStore()
        // sysStore.clearTags()
        db.local.clear()
        db.session.clear()

        await router.replace('/login')
      }
    },
    // 用户登录
    async userLogin(params: LoginForm) {
      const res = await reqUserLogin(params)
      const { data, code } = res
      if (code === 200) {
        this.token = data.token
        db.session.set('token', this.token)
        this.saveUserInfo(data)
        return data
      } else {
        return await Promise.reject(res)
      }
    },
    saveUserInfo(params: Partial<UserInfo>) {
      this.userInfo = params
      db.local.set('userInfo', this.userInfo)
    }
  },
  getters: {
    isLogin: (state) => !!state.token
  }
})

export default useUserStore
