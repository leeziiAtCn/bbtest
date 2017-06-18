/**
 * Created by leezi on 6/18/2017.
 */
const uuid = require('node-uuid')
const fs = require('fs')
function makeParams (data) {
  data = JSON.parse(data).data
  let bodyKey = data.queryParam
  let headerKey = data.header
  let rbodyKey = bodyKey.map(val => {
    return {
      id: data._id,
      did: data.group._id,
      isheader: 1,// 1body 0 header
      key: val.name,
      required: val.must, // 1 必传 0 不必
      description: val.remark,
      default: '',
      pid:  uuid.v4()
    }
  })
  let rheaderKey = headerKey.map(val => {
    return {
      id: data._id,
      did: data.group._id,
      isheader: 0,// 1body 0 header
      key: val.name,
      required: val.must, // 1 必传 0 不必
      description: val.remark,
      default: '',
      pid: uuid.v4()
    }
  })
  return [...rbodyKey, ...rheaderKey]
}
let a = {
  'code': 200,
  'msg': 'ok',
  'data': {
    '_id': '5919998b18445f0a20aff7b8',
    'updatedAt': '2017-05-31 10:12:21',
    'createdAt': '2017-05-15 20:05:31',
    'name': '获取验证码接口-沈超',
    'project': {'_id': '591982cf18445f0a20aff7b4', 'name': '新妇儿医院项目'},
    'group': {'_id': '5919834118445f0a20aff7b7', 'name': '用户'},
    'url': '/User/AuthCode',
    'remark': '用户注册/登录时，获取验证码接口',
    'method': 'GET',
    'outInfo': {'type': 0, 'rawRemark': '', 'rawMock': '', 'jsonType': 0},
    'owner': {'_id': '5919829118445f0a20aff7b3', 'name': '田田'},
    'editor': {'_id': '591e5f9b50fca4123e03bd22', 'name': 'chaos'},
    'after': {'mode': 0, 'code': ''},
    'before': {'mode': 0, 'code': ''},
    '__v': 0,
    'id': '3c66f9f0-3c3e-11e7-99da-6b6db5d347a9',
    'finish': 1,
    'restParam': [],
    'outParam': [{
      'name': 'code',
      'type': 0,
      'remark': '响应码：0000成功,9000：服务器错误  9002：token无效,9001：传入参数为空或者参数不合法',
      'must': 1,
      'mock': '0'
    }, {'name': 'msg', 'type': 0, 'remark': '提示信息', 'must': 1, 'mock': '获取验证码成功'}],
    'bodyParam': [],
    'queryParam': [{
      'name': 'mobile',
      'must': 1,
      'remark': '用户手机号码',
      'value': {'type': 0, 'status': '', 'data': [{'value': '18521006236', 'remark': ''}]}
    }],
    'header': []
  }
}
module.exports = makeParams