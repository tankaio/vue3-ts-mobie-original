const { SITE_CODE, SITE_ENV } = process.env
// console.log('SITE_CODE--', SITE_CODE)
// console.log('SITE_ENV--', SITE_ENV)

const siteEnvConfigs = require(`./configs/sites/${SITE_CODE}/${SITE_ENV}.js`)

const normalizeConfigs = (configs) => {
  const normalizeConfigs = {}
  Object.keys(configs).forEach((key) => {
    normalizeConfigs[key] = JSON.stringify(configs[key])
  })
  return normalizeConfigs
}

module.exports = {
  normalizeConfigs,
  siteEnvConfigs
}
