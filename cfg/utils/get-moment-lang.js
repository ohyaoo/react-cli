const path = require('path')
const _fs = require('fs')
const loaclePath = path.join(__dirname, '../../node_modules/moment/locale')

module.exports = function () {
  let cfiles = []
  let files = _fs.readdirSync(loaclePath)
  files.forEach(function (filename) {
    cfiles.push(filename)
  })
  return cfiles.join(',')
}
