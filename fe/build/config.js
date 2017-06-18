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
      root: 'http://118.89.195.97:3000'
    })
  }
}
