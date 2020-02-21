const clearLine = require('./clear-line')
const chalk = require('chalk')

class Loading {
  constructor() {
    this.timer = null
  }

  start() {
    let i = 0
    this.timer = setInterval(() => {
      clearLine()
      const strs = ['|', '/', '-', '\\']
      process.stdout.write(chalk.bgBlue('\n UC-COMPONENT-H5:INFO ') + chalk.yellow(' Compiling ' + strs[i % 4]))
      i++
    }, 300)
  }

  clear() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}

module.exports = Loading
