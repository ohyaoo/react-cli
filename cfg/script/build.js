'use strict'

const webpack = require('webpack')
const logger = require('../utils/logger')
const clearLine = require('../utils/clear-line')
const Loading = require('../utils/loading')
const rimraf = require('rimraf')

// must under development
// for node
// process.env.NODE_ENV = 'production'

// for sdp, it can be override by project
// process.env.SDP_ENV = (process.env.SDP_ENV || 'test').trim() // default set to test, no why
process.env.SDP_ENV = (process.env.SDP_ENV || process.env.npm_config_sdp_env || 'test').trim()

logger.info('Project build for SDP_ENV: ' + process.env.SDP_ENV + '\n')

// ensure create config after env
const webpackConfig = require('../../webpack.config')

logger.info('Clean dist files\n')
rimraf.sync(webpackConfig.output.path)

const compiler = webpack(webpackConfig)
const loading = new Loading()

loading.start()

compiler.run((err, stats) => {
  loading.clear()
  clearLine()
  logger.info('Webpack compile completed.\n')

  if (err) {
    logger.error('Webpack compiler encountered a fatal error.\n', err)
    process.exit(1)
  }

  const jsonStats = stats.toJson()
  console.log(stats.toString({
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    colors: true
  }))
  if (jsonStats.errors.length > 0) {
    logger.error('Webpack compiler encountered errors.\n')
    console.log(jsonStats.errors.join('\n'))
    process.exit(1)
  } else if (jsonStats.warnings.length > 0) {
    logger.warning('Webpack compiler encountered warnings.\n')
    process.exit(0)
  } else {
    logger.success('No errors or warnings encountered.\n')
    process.exit(0)
  }
})
