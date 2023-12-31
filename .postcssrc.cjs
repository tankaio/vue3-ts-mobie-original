module.exports = {
  plugins: [
    // require("autoprefixer")({ overrideBrowserslist: ["> 0.15% in CN"] }),
    // require("postcss-nested"),
    // require('postcss-syntax')
    require('postcss-px-to-viewport')({
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    })
  ]
}
