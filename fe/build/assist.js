/**
 * Created by moersing on 04/05/2017.
 */

var
  path = require('path'),
  fs = require('fs'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin')

var NODE_ENV = process.env.NODE_ENV
var config = {
  assertRoot: path.resolve(__dirname, '../dist'),
  assertPath: 'static'
}
var
  assetPath = function (_path) {
    return path.posix.join(config.assertPath, _path)
  }
module.exports = {
  getEnvConfig(){
    var
      key
    switch (NODE_ENV) {
      case 'production':
        key = 'pro'
        break
      default:
        key = 'dev'
    }

    return require('./config')[key]
  },
  /**
   * @desc return a absolute asset path
   * */
  assetPath: assetPath,
  /**
   * @desc  generating config,contain `ENV plugins` etc...
   * */
  generate: {
    productionPlugins(options = {sourceMap: false}){

      return [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          sourceMap: options.sourceMap
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true
        }),
        new ExtractTextPlugin({filename: assetPath('/style/[name].[hash].css')}),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'common',
          minChunks: function (module) {
            return module.context && /\.js$/.test(module.resource) && module.context.indexOf('node_modules') !== -1
          }
        })
      ]
    },
    /**
     * @desc generate css loaders for .vue files
     * */
    cssLoaders(){
      var
        cssLoaders = {
          css: 'css-loader!postcss-loader',
          less: 'css-loader!less-loader!postcss-loader'
        }
      for (var key in cssLoaders) {
        cssLoaders[key] = cssLoaders[key] + '?sourceMap=' + (NODE_ENV !== 'production')
        if (NODE_ENV === 'development') {
          cssLoaders[key] = 'vue-style-loader!' + cssLoaders[key]
        }
        else {
          cssLoaders[key] = ExtractTextPlugin.extract({
            use: cssLoaders[key],
            fallback: 'vue-style-loader',
            publicPath: '../../'
          })
        }
      }

      return cssLoaders
    },
    /**
     * @desc generate style loaders for .js files
     * */
    styleLoaders(){
      var output = []
      var loaders = module.exports.generate.cssLoaders()
      for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
          test: new RegExp('\\.' + extension + '$'),
          loader: loader
        })
      }
      return output
    }
  },
  config: config
}