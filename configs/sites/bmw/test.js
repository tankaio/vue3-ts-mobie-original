module.exports = {
  SITE_ENV: 'test',
  SITE_CODE: 'bmw',
  SITE_TEMPLATE: 'template-1',
  SITE_SYMBOL: 'BMW',
  SITE_NAME: '宝马',
  SITE_ICON: 'favicon-bmw.png',
  SITE_API_URL: [
    'https://adminapitest.xxx.com', // 接口线路一
    'https://adminaptestii.xxx.com', // 接口线路一
    'https://adminaptestiii.xxx.com' // 接口线路一
  ],
  DEFAULT_DOMAIN: 'www.bmwtestrc1.com', // 给app用的主站点域名
  APP_VERSION: '0.0.1',
  APP_DOWNLOAD_LDY: 'https://bmw.openinstall.com/', // APP下载落地页 集成openinstall
  APP_DOWNLOAD_URL_IOS: [
    // 'itms-services://?action=download-manifest&url=https://downloadapp.xxxxxx.com.com/bmw-test.plist', // 企业签
    'https://bmwone.bmwdownload.com', // 超级签 通道一
    'https://bmwtwo.bmwdownload.com', // 超级签 通道二
    'https://bmwthree.bmwdownload.com' // 超级签 通道三
  ],
  APP_DOWNLOAD_URL_ANDROID: 'https://downloadapp.xxxxxx.com/bmw-test.apk'
}
