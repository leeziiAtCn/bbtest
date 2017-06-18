/**
 * Created by leezi on 6/17/2017.
 */
const superAgent = require('superAgent')

function login () {
  return new Promise((resolve, reject) => {
    superAgent.post('http://sb.bblink.cn/user/login')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        name: 'leezii',
        password: 'leezii'
      }))
      .end((err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
  })
}
module.exports = login
