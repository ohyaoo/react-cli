'use strict'

const path = require('path')
const args = require('minimist')(process.argv.slice(2))

// List of allowed environments
const allowedEnvs = ['dev', 'dist']

const envMapToDevList = ['development', 'test']

// Set the correct environment
let env
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'dev'
} else if (args.env) {
  process.env.NPM_ENV = args.env
  env = envMapToDevList.indexOf(args.env) !== -1 ? 'dev' : 'dist'
} else if (process.env && process.env.SDP_ENV) {
  env = envMapToDevList.indexOf(process.env.SDP_ENV) !== -1 ? 'dev' : 'dist'
} else {
  env = 'dev'
}

process.env.REACT_WEBPACK_ENV = env

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig (wantedEnv) {
  const isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1
  const validEnv = isValid ? wantedEnv : 'dev'
  const config = require(path.join(__dirname, 'cfg/' + validEnv))
  return config
}

module.exports = buildConfig(env)
