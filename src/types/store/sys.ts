interface Meta {
  title: string
  hidden: boolean
  icon: string
}

export interface RouteMenu {
  path: string
  name: string
  meta: Meta
}

export interface SysState {
  tags: RouteMenu[]
  currentMenu: RouteMenu
  menuCollapse: boolean
  refresh: boolean
}
