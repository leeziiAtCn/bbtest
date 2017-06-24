/**
 * Created by leezi on 6/22/2017.
 */
const superAgent = require('superagent')

function test ({url, header, body}, method) {
  if (method === 'GET') {
    return new Promise((resolve, reject) => {
      superAgent.get(url)
        .set(header)
        .query(body)
        .end((err, res) => {
          if (err) reject(err)
          else resolve(res)
        })
    })
  } else if (method === 'POST') {
    return new Promise((resolve, reject) => {
      superAgent.post(url)
        .set(header)
        .query(body)
        .end((err, res) => {
          if (err) reject(err)
          else resolve(res)
        })
    })
  }

}
function asyncTest (ops, method) {
  let proArr = []
  for (let i = 0; i < 100; i++) {
    proArr.push(test(ops, method))
  }
  return Promise.all(proArr)
}
module.exports = asyncTest
