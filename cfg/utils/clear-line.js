const readline = require('readline')

module.exports = () => {
  readline.clearLine(process.stdout, 0)
  readline.moveCursor(process.stdout, 0, -1)
}
