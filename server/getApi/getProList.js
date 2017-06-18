/**
 * Created by leezi on 6/15/2017.
 */
const superAgent = require('superAgent')
const {makeCookie} = require('./../utils/index')
const login = require('./login')

async function getProList () {
  let cookie = makeCookie(await login())
  return new Promise((resolve, reject) => {
    superAgent.get('http://sb.bblink.cn/project/list')
      .query({
        sbdoctimestamps: +new Date()
      })
      .set('Cookie', cookie)
      .end((err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
  })
}

module.exports = getProList
