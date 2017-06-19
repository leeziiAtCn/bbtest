/**
 * Created by leezi on 6/18/2017.
 */
const uuid = require('node-uuid')
function makeParams (data) {
  data = JSON.parse(data).data
  let bodyKey = data.queryParam
  let headerKey = data.header
  let resetKey = data.restParam

  let rbodyKey = bodyKey.map(val => {
    return {
      id: data._id,
      did: data.group._id,
      type: 1,// 1body 0 header 2rest
      key: val.name,
      required: val.must, // 1 必传 0 不必
      description: val.remark,
      default: '',
      pid: uuid.v4()
    }
  })
  let rheaderKey = headerKey.map(val => {
    return {
      id: data._id,
      did: data.group._id,
      type: 0, // 1body 0 header
      key: val.name,
      required: val.must, // 1 必传 0 不必
      description: val.remark,
      default: '',
      pid: uuid.v4()
    }
  })
  let rresetKey = resetKey.map(val => {
    return {
      id: data._id,
      did: data.group._id,
      type: 2, // 1body 0 header
      key: val.name,
      required: val.must, // 1 必传 0 不必
      description: val.remark,
      default: '',
      pid: uuid.v4()
    }
  })
  return [...rbodyKey, ...rheaderKey, ...rresetKey]
}
module.exports = makeParams
