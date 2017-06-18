/**
 * Created by leezi on 6/17/2017.
 */
const superAgent = require('superAgent')
const login = require('./login')
const {makeCookie} = require('./../utils/index')

async function getInterfaces (id) {
  let cookie = makeCookie(await login())
  return new Promise((resolve, reject) => {
    superAgent.get('http://sb.bblink.cn/project/interface')
      .query({
        sbdoctimestamps: +new Date(),
        id: id
      })
      .set('Cookie', cookie)
      .end((err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
  })
}
module.exports = getInterfaces