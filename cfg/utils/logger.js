const chalk = require('chalk')

const error = (...args) => {
  console.log(chalk.bgRed(' UC-COMPONENT-H5:ERROR ') + ' ' + chalk.red(...args))
}

const log = (...args) => {
  console.log(chalk.bgYellow(' UC-COMPONENT-H5:LOG ') + ' ' + chalk.yellow(...args))
}

const info = (...args) => {
  console.log(chalk.bgBlue(' UC-COMPONENT-H5:INFO ') + ' ' + chalk.blue(...args))
}

const warning = (...args) => {
  console.log(chalk.bgKeyword('orange')(' UC-COMPONENT-H5:WARN ') + ' ' + chalk.keyword('orange')(...args))
}

const success = (...args) => {
  console.log(chalk.bgGreen(' UC-COMPONENT-H5:DONE ') + ' ' + chalk.green(...args))
}

module.exports = {
  error,
  log,
  info,
  warning,
  success
}
