var merge = require('webpack-merge')
var devEnv = require('./development')
var env = 'product'
module.exports = merge(devEnv, {
  NODE_ENV: 'production',
  env: env,
  base_url: '' // 项目API地址
})
