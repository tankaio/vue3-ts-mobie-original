module.exports = {
  SITE_ENV: 'pre',
  SITE_CODE: 'audi',
  SITE_TEMPLATE: 'template-01',
  SITE_THEME: 'theme-001',
  SITE_SYMBOL: 'AUDI',
  SITE_NAME: '奥迪',
  SITE_ICON: 'favicon-audi.png',
  SITE_API_URL: [
    'https://adminapipre.xxx.com', // 接口线路一
    'https://adminappreii.xxx.com', // 接口线路一
    'https://adminappreiii.xxx.com' // 接口线路一
  ],
  DEFAULT_DOMAIN: 'www.audiprerc1.com', // 给app用的主站点域名
  APP_VERSION: '0.0.1',
  APP_DOWNLOAD_LDY: 'https://audi.openinstall.com/', // APP下载落地页 集成openinstall
  APP_DOWNLOAD_URL_IOS: [
    // 'itms-services://?action=download-manifest&url=https://downloadapp.xxxxxx.com.com/audi-pre.plist', // 企业签
    'https://audione.audidownload.com', // 超级签 通道一
    'https://auditwo.audidownload.com', // 超级签 通道二
    'https://audithree.audidownload.com' // 超级签 通道三
  ],
  APP_DOWNLOAD_URL_ANDROID: 'https://downloadapp.xxxxxx.com/audi-pre.apk'
}
