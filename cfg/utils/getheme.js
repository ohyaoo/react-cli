const path = require('path')
const _fs = require('fs')
const lessToJs = require('less-vars-to-js')

module.exports = function (theme) {
  let themeObj = {}
  if (theme) {
    if (typeof theme === 'string') {
      let cfgPath = theme
      // relative path
      if (cfgPath.charAt(0) === '.') {
        cfgPath = (0, path.resolve)(process.cwd(), cfgPath)
      }
      if (_fs.existsSync(cfgPath)) {
        let _type = theme.split('.')
        _type = _type[_type.length - 1]
        switch (_type) {
          case 'less':
            themeObj = lessToJs(_fs.readFileSync(cfgPath, 'utf8'))
            break
          case 'js':
            themeObj = require(cfgPath)
            break
          default:
            console.log('not support file type:' + _type)
            break
        }
      } else {
        console.log('no find ' + cfgPath)
      }
    } else if (typeof theme === 'object') {
      themeObj = theme
    }
  }
  return JSON.stringify(themeObj)
}
