const superAgent = require('superagent')
const fs = require('fs')

function fire({
  url,
  headers,
  body,
  method
}) {
  if (method === 'POST') {
    return new Promise((resolve, reject) => {
      superAgent.post(url)
        .set(headers)
        .send(body)
        .end((err, res) => {
          if (err) reject(err)
          else resolve(res)
        })
    })
  } else if (method === 'GET') {
    return new Promise((resolve, reject) => {
      superAgent.get(url)
        .set(headers)
        .query(body)
        .end((err, res) => {
          if (err) reject(err)
          else {
            res = JSON.parse(JSON.stringify(res))
            res.req.data = body
            resolve(res)
          }
        })
    })
  }
}
module.exports = fire