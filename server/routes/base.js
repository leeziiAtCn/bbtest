/**
 * Created by leezi on 6/17/2017.
 */
const router = require('koa-router')()
const {getProList, getInterfaces, getApi} = require('./../getApi/index')
const {prod_m, ser_m, api_m, param_m} = require('./../model/index')
const {makeParams} = require('./../utils/index')
router.get('/rebuild', async (ctx, next) => {
  await prod_m.delAll()
  await ser_m.delAll()
  await api_m.delAll()
  let info = await getProList()
  let {data} = JSON.parse(info.text)
  for (let val of data) {
    await prod_m.add({
      id: val._id,
      interfaceCount: val.interfaceCount,
      name: val.name,
      userCount: val.userCount,
      status: 2,
      createTime: +new Date()
    })
  }
  let pro = await prod_m.searchAll()
  let interfaces = []
  let did = []
  for (let val of pro) {
    did.push(val.id)
    interfaces.push((await getInterfaces(val.id)).text)
  }
  for (let [i, val] of new Map(interfaces.map((item, i) => [i, item]))) {
    let data = JSON.parse(val).data
    //
    for (let v of data.data) {
      await ser_m.add({
        id: v._id,
        name: v.name,
        description: '',
        createTime: +new Date(),
        status: +v.type,
        did: did[i]
      })
      for (let value of v.data) {
        await api_m.add({
          id: value._id,
          name: value.name,
          method: value.method,
          url: value.url,
          description: '',
          createTime: +new Date(),
          did: v._id,
          status: +v.type
        })
      }
    }
  }

  ctx.response.body = 'ok'

})
router.get('/reset', async (ctx, next) => {
  await param_m.delAll()
  // let apis = (await api_m.searchLive()).filter(val => val.url.indexOf('{') < 0)
  let apis = await api_m.searchAll()
  for (let val of apis) {
    let api = (await getApi(val.id, val.did)).text
    for (let v of makeParams(api)) {
      await param_m.add(v)
    }
  }

  ctx.response.body = 'ok'

})
module.exports = router
