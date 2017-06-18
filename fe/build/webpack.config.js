var
  path = require('path'),
  webpack = require('webpack'),
  assist = require('./assist'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  NODE_ENV = process.env.NODE_ENV
require('shelljs/global')
config = assist.getEnvConfig()

process.noDeprecation = true ///remove deprecation warning of webpack loader,see https://github.com/webpack/loader-utils/issues/56

module.exports = {
  entry: './src/main.js',
  output: {
    path: assist.config.assertRoot,
    publicPath: NODE_ENV !== 'development' ? './' : '',
    filename: assist.assetPath('javascript/[name].[hash].js')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: assist.generate.cssLoaders()
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assist.assetPath('/images/[name].[ext]?[hash]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: assist.assetPath('fonts/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'components': path.join(__dirname, '../src/components'),
      'javascripts': path.join(__dirname, '../src/statics/javascripts'),
      'less': path.join(__dirname, '../src/statics/less'),
      'statics': path.join(__dirname, '../src/statics')
    },
    extensions: ['.js', '.vue']
  },
  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    noInfo: false,
    compress: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval',
  plugins: [
    new webpack.DefinePlugin({'process.env': assist.getEnvConfig()}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
};

///add style loaders for .js files
[].push.apply(module.exports.module.rules, assist.generate.styleLoaders())

if (NODE_ENV !== 'development') {
  module.exports.output.chunkFilename = assist.assetPath('javascript/[name].[chunkhash].js')
  module.exports.module.rules.push({
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'image-webpack-loader'
  })
  rm('-rf', assist.config.assertRoot)

  ///copy identification file into dist
  mkdir(assist.config.assertRoot)
}

/**Tester mode, Mocking actual production environment
 * but the env config use development.
 * */
if (NODE_ENV === 'devTest') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat(assist.generate.productionPlugins({sourceMap: true}))
}

if (NODE_ENV === 'production') {
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.devtool = false
  module.exports.plugins = (module.exports.plugins || []).concat(assist.generate.productionPlugins())
}