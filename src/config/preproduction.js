var merge = require('webpack-merge')
var devEnv = require('./development')
var env = 'preproduction'
module.exports = merge(devEnv, {
  NODE_ENV: 'development',
  env: env,
  base_url: '' // 项目API地址
})
