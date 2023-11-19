const inquirer = require('inquirer')
const chalk = require('chalk')
const shell = require('shelljs')

const log = console.log

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: 'input',
      message: '请输入即将运行站点的site code（bmw, amg, audi）:',
      name: 'siteCode',
      default: 'bmw', // 默认值
      filter: function (val) {
        // 使用filter将回答变为小写
        return val.toLowerCase()
      }
    },
    {
      type: 'list', // 也可使用 rawlist 类型（可使用用箭头选择，也可手动输入）
      message: '请选择运行环境:',
      name: 'siteEnv',
      choices: ['test', 'pre', 'prod'],
      when: function (answers) {
        const siteCodes = ['bmw', 'amg', 'audi']
        const { siteCode } = answers
        if (!siteCodes.includes(siteCode)) {
          log(chalk.red('error:the entered code does not exist!'))
          process.exit(1)
        }
        return siteCodes.includes(siteCode) // 当watch为true的时候才会提问当前问题
      }
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    log(chalk.green('answers--'), answers)
    const { siteCode, siteEnv } = answers
    shell.echo(
      chalk.yellow(`执行shell命令：cross-env SITE_CODE=${siteCode} SITE_ENV=${siteEnv} vite`)
    )
    shell.exec(`cross-env SITE_CODE=${siteCode} SITE_ENV=${siteEnv} vite`)
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      log(chalk.red("---Prompt couldn't be rendered in the current environment---"))
    } else {
      // Something else went wrong
      log(chalk.red('inquirer-error--'), error)
    }
  })
