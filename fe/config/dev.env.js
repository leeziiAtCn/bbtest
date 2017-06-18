var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  http: {
    root: "'http://127.0.0.1:8899'"
  }
})
