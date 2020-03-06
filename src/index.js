import '@babel/polyfill'
import './polyfills'
import '~/theme/styles/app.scss'
// 使用babel-plugin-transform-runtime不能完全代替babel-polyfill
import Intl from '~/i18n/intl'
import Root from './Root'

// api地址配置，及一些根据环境配置的常量
window.__config = process.env.__CONFIG
const React = require('react')
const render = require('react-dom').render
const routes = require('./routes')
const routerHistory = require('react-router').useRouterHistory
const createHistory = require('history').createHashHistory
// 移除react-router自动添加的_k=xxx参数
const history = routerHistory(createHistory)({ queryKey: false })

render(
  <Intl>
    <Root>{routes(history)}</Root>
  </Intl>,
  document.getElementById('app')
)
