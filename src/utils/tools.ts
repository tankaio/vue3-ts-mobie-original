export const getheight = (key: string): number =>
  parseInt(getComputedStyle(document.documentElement).getPropertyValue(`--${key}`), 10)

export const getv = (v: number): number => (v / 375) * window.innerWidth

export const left: number = window.innerWidth - getv(90)

export function getminheight(clas: string, height: number): number {
  // 用querySelector去获取dom的时候可能为空，所以需要使用断言：
  const ele: HTMLElement = document.querySelector(clas) as HTMLElement
  return ele.offsetHeight - getheight('sat') - getheight('sab') - getv(height)
}
