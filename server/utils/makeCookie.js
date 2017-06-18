/**
 * Created by leezi on 6/18/2017.
 */
function makeCookie (res) {
  let data = res.headers['set-cookie']
  let sid = data[0].substring(data[0].indexOf('='), data[0].indexOf(';'))
  let uid = data[1].substring(data[1].indexOf('='), data[1].indexOf(';'))
  return `uid${uid}; connect.sid${sid}`
}
module.exports = makeCookie