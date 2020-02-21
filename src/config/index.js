const appENV = require('./' + (process.env.SDP_ENV || process.env.NPM_ENV || 'development'))
const packageObj = require('../../package.json')
const langList = require('../../lang-list.json').langList
// 往config里加入packageJson部分信息
appENV.packageJson = {
  name: packageObj.name,
  version: packageObj.version,
  needFac: packageObj.needFac,
  facVersion: packageObj.facVersion
}
appENV.langList = langList
if (process.argv.join(' ').indexOf(' --mock') > 0) {
  appENV.base_url = '' // mock时base_url必须重置为同域名
}
module.exports = {
  build: {
    env: appENV
  },
  dev: {
    env: appENV,
    port: 9999 // 项目端口配置
  }
}
