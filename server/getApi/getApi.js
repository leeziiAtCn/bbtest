/**
 * Created by leezi on 6/17/2017.
 */
const superAgent = require('superAgent')
const login = require('./login')
const {makeCookie} = require('./../utils/index')

async function getApi (id, did) {
  let cookie = makeCookie(await login())
  return new Promise((resolve, reject) => {
    superAgent.get('http://sb.bblink.cn/interface/item')
      .set('Cookie', cookie)
      .query({
        id: id,
        group: did,
        sbdoctimestamps: +new Date()
      })
      .end((err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
  })
}
module.exports = getApi