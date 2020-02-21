var merge = require('webpack-merge')
var devEnv = require('./development')
var env = 'test'
module.exports = merge(devEnv, {
  NODE_ENV: 'development', // testing为模拟生产环境
  env: env,
  base_url: '' // 项目API地址
})
