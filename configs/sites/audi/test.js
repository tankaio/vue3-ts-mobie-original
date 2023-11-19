module.exports = {
  SITE_ENV: 'test',
  SITE_CODE: 'audi',
  SITE_TEMPLATE: 'template-1',
  SITE_SYMBOL: 'AUDI',
  SITE_NAME: '奥迪',
  SITE_ICON: 'favicon-audi.png',
  SITE_API_URL: [
    'https://adminapitest.xxx.com', // 接口线路一
    'https://adminaptestii.xxx.com', // 接口线路一
    'https://adminaptestiii.xxx.com' // 接口线路一
  ],
  DEFAULT_DOMAIN: 'www.auditestrc1.com', // 给app用的主站点域名
  APP_VERSION: '0.0.1',
  APP_DOWNLOAD_LDY: 'https://audi.openinstall.com/', // APP下载落地页 集成openinstall
  APP_DOWNLOAD_URL_IOS: [
    // 'itms-services://?action=download-manifest&url=https://downloadapp.xxxxxx.com.com/audi-test.plist', // 企业签
    'https://audione.audidownload.com', // 超级签 通道一
    'https://auditwo.audidownload.com', // 超级签 通道二
    'https://audithree.audidownload.com' // 超级签 通道三
  ],
  APP_DOWNLOAD_URL_ANDROID: 'https://downloadapp.xxxxxx.com/audi-test.apk'
}
