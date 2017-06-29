/**
 * Created by leezi on 6/17/2017.
 */
const router = require('koa-router')()
// 爬虫
const {
  getProList,
  getInterfaces,
  getApi
} = require('./../getApi/index')
// 数据模型
const {
  prod_m,
  ser_m,
  api_m,
  param_m
} = require('./../model/index')
// 制造请求参数
const {
  makeParams
} = require('./../utils/index')
// 重构项目,模块,接口数据
router.get('/rebuild', async(ctx, next) => {
  // 清空所有表
  await prod_m.delAll()
  await ser_m.delAll()
  await api_m.delAll()
  // 拉取项目列表
  let info = await getProList()
  let {
    data
  } = JSON.parse(info.text)
  for (let val of data) {
    // 存入 项目表
    await prod_m.add({
      id: val._id,
      interfaceCount: val.interfaceCount,
      name: val.name,
      userCount: val.userCount,
      status: 2,
      createTime: +new Date()
    })
  }
  // 重新查取刚刚存入的项目表
  let pro = await prod_m.searchAll()
  let interfaces = []
  let did = []
  for (let val of pro) {
    did.push(val.id)
    // 拉取大模块列表
    interfaces.push((await getInterfaces(val.id)).text)
  }
  for (let [i, val] of new Map(interfaces.map((item, i) => [i, item]))) {
    let data = JSON.parse(val).data
    // 将大模块存入表中
    for (let v of data.data) {
      await ser_m.add({
        id: v._id,
        name: v.name,
        description: '',
        createTime: +new Date(),
        status: +v.type,
        did: did[i],
        baseUrl: ''
      })
      // 将接口存入表中
      for (let value of v.data) {
        await api_m.add({
          id: value._id,
          name: value.name,
          method: value.method,
          url: value.url,
          description: '',
          createTime: +new Date(),
          did: v._id,
          status: +v.type,
          content_type: 0 // 0 未定义 1 json 2 form 
        })
      }
    }
  }

  ctx.response.body = 'ok'

})

router.get('/reset', async(ctx, next) => {
  // 将参数表清空
  await param_m.delAll()
  // 查接口表
  let apis = await api_m.searchAll()
  for (let val of apis) {
    // 根据接口表 id 拉取参数接口数据
    let api = (await getApi(val.id, val.did)).text
    // 过滤参数
    for (let v of makeParams(api)) {
      // 存入参数表
      await param_m.add(v)
    }
  }

  ctx.response.body = 'ok'
})

module.exports = router