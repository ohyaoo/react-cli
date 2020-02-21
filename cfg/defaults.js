/** 可根据项目配置部分 该文件提供 所有默认配置，以及一些可配置的通用路径 **/

'use strict'

const webpack = require('webpack')
const path = require('path')
const _fs = require('fs')
const _argJson = require('minimist')(process.argv.slice(2))
const _getMomentLang = require('./utils/get-moment-lang')

/** 基础路径 **/
const basePath = path.join(__dirname, '../')

/** package文件读取 **/
const pkgPath = path.join(basePath, 'package.json')
const pkg = (0, _fs.existsSync)(pkgPath) ? require(pkgPath) : {}

/** 其他插件 **/
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const getheme = require('./utils/getheme') // 获取less变量的覆盖值
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin // 分析文件构成
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default

/** 是否是最终打包 **/
const isDist = process.env.REACT_WEBPACK_ENV === 'dist'

// 可根据项目情况自行配置的部分,其他部分不建议修改
// BEGIN ====================================================================================================

/** 打包静态资源输出目录名称 **/
const staticPath = 'assets'

/** 默认入口文件名 **/
const entryJsName = 'index'

/** 合并的外部包 **/
const vendorJs = ['react', 'react-router', 'react-intl']

/** HTML页面使用的静态资源路径
 * 注意:
 *  此处是个绝对路径,为保证每个资源路径正确
 *  请根据发布网站根目录位置填写第一个值
 *  例如发布的根目录位置为 https://www.xxx.com/website/
 *  则 const publicPath = isDist ? '/website/' : '/'
 **/
const publicPath = isDist ? '/' : '/'

/** 源码路径 **/
const srcPath = path.join(basePath, 'src') // 源码目录,该目录根路径下至少需要包含 index.html 与 index.js 两个文件
const stylesPath = path.join(srcPath, 'theme/styles') // 源码样式目录
const staticFilesPath = path.join(srcPath, 'static') // 静态文件目录

/** 别名 **/
const alias = {
  '~': srcPath
}
// END ====================================================================================================

/** 默认端口号 **/
const defaultPort = _argJson.port || 8080

/** 入口文件组 **/
const entryJs = {
  vendor: vendorJs
}

entryJs[entryJsName] = path.join(srcPath, 'index.js')

/** 输出的主js文件名称规则(webpack-dev-server下不能使用chunkhash) **/
const fileName = isDist
  ? staticPath + '/[name]-[chunkhash].js'
  : staticPath + '/[name]-[hash].js'

/** 引用时可省略的后缀 **/
const extensions = ['', '.js', '.jsx', '.less', '.scss', '.sass']

/** 其他路径 **/
const nodeModulesPath = path.join(basePath, 'node_modules') // node_modules路径
const stylesPathAll = [stylesPath, nodeModulesPath] // 源码样式路径,node_modules路径

/** webpack打包输出 **/
const output = {
  path: path.join(basePath, '../webapp'),
  filename: fileName,
  chunkFilename: staticPath + '/[id].chunk-[chunkhash].js',
  publicPath: publicPath
}

/** webpack devServer **/
const devServer = {
  contentBase: srcPath,
  historyApiFallback: true,
  hot: true,
  port: defaultPort,
  publicPath: publicPath,
  noInfo: false
}

/** 样式提取配置 **/
const extractCSS = new ExtractTextPlugin(
  staticPath + '/[name]-[chunkhash].css',
  { allChunks: true }
)

/** 页面生成配置 **/
const indexHtml = new HtmlWebpackPlugin({
  title: pkg.title || pkg.name || '',
  description: pkg.description || '',
  filename: 'index.html',
  template: path.join(srcPath, 'index.html'),
  inject: true,
  hash: false,
  minify: {
    removeComments: isDist, // 移除HTML中的注释
    collapseWhitespace: isDist // 删除空白符与换行符
  },
  chunksSortMode: 'manual', // chunks排序-手动
  chunks: ['vendor', entryJsName]
})

/** Loaders **/
const defaultModules = {
  preLoaders: [
    {
      test: /\.(js|jsx)$/,
      include: srcPath,
      loader: 'eslint-loader'
    }
  ],
  loaders: [
    {
      test: /\.json$/,
      loader: 'json',
      include: [srcPath, nodeModulesPath]
    },
    {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: [srcPath]
    },
    {
      test: /\.css$/,
      exclude: stylesPathAll,
      loader: extractCSS.extract(
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]-[hash:base64:5]!postcss-loader'
      )
    },
    {
      test: /\.css$/,
      include: stylesPathAll,
      loader: extractCSS.extract('style-loader', 'css-loader!postcss-loader')
    },
    {
      test: /\.scss/,
      exclude: stylesPathAll,
      loader: extractCSS.extract(
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[local]-[hash:base64:5]!postcss-loader!sass-loader?outputStyle=expanded'
      )
    },
    {
      test: /\.scss/,
      include: stylesPathAll,
      loader: extractCSS.extract(
        'style-loader',
        'css-loader!postcss-loader!sass-loader?outputStyle=expanded'
      )
    },
    {
      test: /\.less/,
      exclude: stylesPathAll,
      loader: extractCSS.extract(
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]-[hash:base64:5]!postcss-loader!less-loader'
      )
    },
    {
      test: /\.less/,
      include: stylesPathAll,
      loader: extractCSS.extract(
        'style-loader',
        'css-loader!postcss-loader!less-loader?{"modifyVars":' +
        getheme(pkg.theme) +
        '}'
      )
    },
    {
      test: /\.styl/,
      loader: extractCSS.extract(
        'style-loader',
        'css-loader!stylus-loader!postcss-loader'
      )
    },
    {
      test: /\.(ttf|eot|woff|woff2|svg)$/,
      loader: 'url-loader',
      query: { limit: 1, name: staticPath + '/font-[hash].[ext]' }
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader',
      query: { limit: 8192, name: staticPath + '/img-[hash].[ext]' }
    },
    {
      test: /\.(mp4|ogg)$/,
      loader: 'file-loader'
    }
  ]
}

/** Postcss **/
const browsers = ['> 5%', 'ie >= 9']
const defaultPostcss = [
  require('postcss-import')({
    path: srcPath + '/theme/styles'
  }),
  require('postcss-assets')({
    relative: true,
    loadPaths: [srcPath + '/static/images']
  }),
  require('postcss-cssnext')({
    browsers,
    features: {
      customProperties: {
        variables: require(srcPath + '/theme/styles/variables.js')
      },
      autoprefixer: true
    }
  }),
  require('postcss-browser-reporter'),
  require('postcss-reporter')
]

/**
 * 在开启多语言情况下
 * 根据lang-list.json(执行npm run lang:import的时候，根据远程语言包种类生成)
 * 确认moment需要打包哪些语言
 **/
const langListPath = path.join(basePath, 'lang-list.json')
const LANG_LIST = pkg.needFac
  ? (function (data) {
    const momentLang = _getMomentLang()
    const langList = data.langList
    const _exp = ['zh-cn']
    langList.forEach(function (item, index) {
      const _name = item.toLowerCase()
      if (momentLang.indexOf(_name) !== -1) {
        _exp.push(_name)
      } else if (
        _name.indexOf('-') !== -1 &&
        momentLang.indexOf(_name.split('-')[0]) !== -1
      ) {
        _exp.push(_name.split('-')[0])
      }
    })
    return new RegExp(_exp.join('|'))
  })(_fs.existsSync(langListPath) ? require(langListPath) : { langList: [] })
  : new RegExp('zh-cn')

// 默认使用的插件
const plugins = [
  new CopyWebpackPlugin([
    {
      from: staticFilesPath
    }
  ]),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, LANG_LIST),
  extractCSS, // 提取公共css插件
  new CSSSplitWebpackPlugin({ size: 4000 }),
  indexHtml, // 生成HTML插件
  new webpack.NoErrorsPlugin(), // 错误捕获
  new webpack.optimize.OccurenceOrderPlugin() // 模块排序
]

_argJson['analyze'] === 'true' && plugins.push(new BundleAnalyzerPlugin())

/** 输出 **/
module.exports = {
  base: {
    // 基础配置构成
    port: defaultPort,
    output: output,
    devServer: devServer,
    resolve: {
      extensions: extensions,
      alias: alias
    },
    module: defaultModules,
    postcss: defaultPostcss
  },
  entryJs: entryJs, // 入口文件组
  entryJsName: entryJsName, // 入口文件名
  plugins: plugins // 默认插件
}
