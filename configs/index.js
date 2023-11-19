const { SITE_CODE, SITE_ENV } = process.env
console.log('SITE_CODE--', SITE_CODE)
console.log('SITE_ENV--', SITE_ENV)

const siteEnvConfigs = require(`./configs/sites/${SITE_CODE}/${SITE_ENV}.js`)
console.log('siteEnvConfigs--', siteEnvConfigs)

module.exports = {}

// const dotenv = require("dotenv");

// const ROMAN_APP = /^ROMAN_APP/i;

// dotenv.config();

// const raw = Object.keys(process.env)
//   // 遍历只符合正则表达式的环境变量
//   .filter((key) => ROMAN_APP.test(key))
//   .reduce(
//     (prev, key) => {
//       prev[key] = process.env[key];
//       return prev;
//     },
//     {
//       // 一般都有个NODE_ENV环境变量
//       NODE_ENV: process.env.NODE_ENV || "development",
//     }
//   );

// const stringifiedEnv = JSON.stringify(raw)

// module.exports = {
//   raw,
//   stringifiedEnv
// }
