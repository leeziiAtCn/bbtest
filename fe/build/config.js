module.exports = {
  dev: {
    NODE_ENV: '"devTest"',
    buildTime: +new Date(),
    http: JSON.stringify({
      root: 'http://127.0.0.1:3000'
    })
  },
  pro: {
    NODE_ENV: '"production"',
    buildTime: +new Date(),
    http: JSON.stringify({
      root: 'http://192.168.0.116:3000'
    })
  }
}
