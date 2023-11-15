import zhJson from './json/zh.json'
import enJson from './json/en.json'
import viJson from './json/vi.json'
import msJson from './json/ms.json'
import twJson from './json/zh_tw.json'
// import termsMessagesFn from './termsMessages'

const zh = {
  ...zhJson,
  countTime: '{msg}秒后重新发送',
  transferTips: '您的余额已转入{msg}，是否结束游戏并一键转回至中心钱包？',
  loginName: '请输入6~{0}位数字或字母组合的密码', // 登录密码
  password: '请输入6~{0}位数字或字母组合的密码', // 登录密码
  alipayAccount: '请输入{0}~{1}位字母或数字组合的支付宝账号', // 支付宝账号
  unReadCount: '{count}条未读', // 未读消息
  accountLevel: '尊敬的 {level} 级VIP会员',
  canBeWithdrawn: '可提现金额：{count}元，不包括游戏平台未转出余额'
  // lotteryGameInner: `超过百种彩票玩法任您赢！${appTitle} 为全球各彩票玩家提供了丰富多样的游戏内容，致力为玩家打造高品质的娱乐环境，安心乐享游戏空间，只为公平、公正的开奖结果。`,
  // hotGameSubText: `您想要的${appText}都有，带给您丰富的游戏体验`,
  // serviceSubText: `${appText}全心全意为您提供最优质的服务`,
  // ...termsMessages.zh
}

const zhTw = {
  ...twJson,
  countTime: '{msg}秒後重新發送',
  transferTips: '您的餘額已轉入{msg}，是否結束遊戲並一鍵轉回至中心錢包？ ',
  loginName: '請輸入6~{0}位數字或字母組合的密碼', // 登錄密碼
  password: '請輸入6~{0}位數字或字母組合的密碼', // 登錄密碼
  alipayAccount: '請輸入{0}~{1}位字母或數字組合的支付寶賬號', // 支付寶賬號
  unReadCount: '{count}條未讀', // 未讀消息
  accountLevel: '尊敬的 {level} 級VIP會員',
  canBeWithdrawn: '可提現金額：{count}元，不包括遊戲平台未轉出餘額'
  // lotteryGameInner: `超過百種彩票玩法任您贏！ ${appTitle} 為全球各彩票玩家提供了豐富多樣的遊戲內容，致力為玩家打造高品質的娛樂環境，安心樂享遊戲空間，只為公平、公正的開獎結果。 `,
  // hotGameSubText: `您想要的${appText}都有，帶給您豐富的遊戲體驗`,
  // serviceSubText: `${appText}全心全意為您提供最優質的服務`,
  // ...termsMessages.zh_tw,
}

const en = {
  ...enJson
}

const vi = {
  ...viJson
}

const ms = {
  ...msJson
}

export default {
  zh,
  en,
  vi,
  ms,
  zhTw
}
