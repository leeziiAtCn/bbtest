/*
 * @Author: leezii 
 * @Date: 2017-06-26 00:34:16 
 * @Last Modified by: leezii
 * @Last Modified time: 2017-06-27 00:19:44
 */
const {
  ser_m,
  api_m,
  param_m
} = require('./../model/index.js')
const superAgent = require('superagent')

function contentMap(type) {
  switch (type) {
    case 1:
      return {
        'Content-Type': 'application/json; charset=utf-8'
      }
    case 2:
      return {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    default:
      return {}
  }
}

function typeMap(val) {
  switch (val.what) {
    case 0:
      return '' + val.default
    case 1:
      return +val.default
    case 2:
      return '' + val.default
  }
}

function makeheader(p) {
  let params = p.filter(val => val.type === 0 && val.key !== 'Content-Type')
  let o = {}
  params.map(val => {
    o[val.key] = val.default
  })
  return o
}

function makebody(p) {
  let params = p.filter(val => val.type === 1)
  let o = {}
  params.map(val => {
    o[val.key] = typeMap(val)
  })
  return o
}

function makeUrl(url, p) {
  let params = p.filter(val => val.type === 2)
  params.map(val => {
    url = url.replace('{' + val.key + '}', val.default)
  })
  return url
}
async function makeRequest(id) {
  let [api] = await api_m.searchbyId({
    id
  })
  let [server] = await ser_m.searchByid({
    id: api.did
  })
  let params = await param_m.searchbyId({
    id
  })
  let url = makeUrl(server.baseUrl + api.url, params.map(v => v.dataValues))
  let headers = Object.assign(contentMap(api.content_type), makeheader(params.map(v => v.dataValues)))
  let body = makebody(params.map(v => v.dataValues))
  return {
    url,
    headers,
    body,
    method: api.method
  }
}
module.exports = makeRequest