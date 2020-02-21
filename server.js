'use strict'
process.env.NODE_ENV = 'development'

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')
const rewriteJson = require('./mock/routes.json')
const open = require('open')

// let server = jsonServer.create()

/**
 * Flag indicating whether webpack compiled for the first time.
 * @type {boolean}
 */
const app = express()

const compiler = webpack(config)

app.use(express.static(path.join(__dirname, '/')))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

if (process.argv.join(' ').indexOf(' --mock') > 0) {
  const jsonServer = require('json-server')
  const router = jsonServer.router('./mock/db.json')
  const middlewares = jsonServer.defaults()
  const rewriter = jsonServer.rewriter(rewriteJson)
  app.use(middlewares)
  app.use(rewriter)
  app.use(router)
}

app.listen(config.port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + config.port
  console.log('Listening at ' + uri + '\n')
  open(uri)
})
