/**
 * Created by leezi on 6/18/2017.
 */
const router = require('koa-router')()
const {
  prod_m,
  ser_m,
  api_m,
  param_m
} = require('./../model/index')
// 查所有项目
router.get('/pro', async ctx => {
  ctx.response.body = await prod_m.searchAll()
})
// 根据项目id查大模块
router.get('/ser', async ctx => {
  let data = await ser_m.searchByDid({
    id: ctx.query.id
  })
  ctx.response.body = {
    code: 200,
    msg: 'ok',
    data: data
  }
})
// 根据模块id 查所有接口
router.get('/interface', async ctx => {
  ctx.response.body = await api_m.searchbyDid({
    id: ctx.query.id
  })
})
// 查所有
router.get('/info', async ctx => {
  let ser = await ser_m.searchAll()
  for (let val of ser) {
    val.dataValues.item = await api_m.searchbyDid({
      id: val.id
    })
  }
  ctx.response.body = ser
})
// 根据2个id 查参数
router.get('/params', async ctx => {
  let data = await param_m.searchBy2id({
    id: ctx.query.id,
    did: ctx.query.did,
  })
  ctx.response.body = {
    code: 200,
    msg: 'ok',
    data
  }
})
// 更改 模块baseUrl
router.get('/changeBaseUrl', async ctx => {
  let data = await ser_m.changeBaseUrl({
    id: ctx.query.id,
    baseUrl: ctx.query.baseUrl
  })
  if (data.length > 0) {
    ctx.response.body = {
      code: 200,
      data: null,
      msg: 'ok'
    }
  } else {
    ctx.response.body = {
      code: 400,
      data: null,
      msg: 'error'
    }
  }
})
// 更改参数
router.get('/saveParam', async ctx => {
  ctx.response.body = await param_m.changeParam({
    pid: ctx.query.pid,
    key: ctx.query.key,
    defaultValue: ctx.query.default,
    what: ctx.query.what
  })
})
// 更改接口的content-type
router.get('/changeContentType', async ctx => {
  let data = await api_m.changeType({
    id: ctx.query.id,
    content_type: ctx.query.content_type
  })
  if (data.length > 0) {
    ctx.response.body = {
      code: 200,
      data: null,
      msg: 'ok'
    }
  } else {
    ctx.response.body = {
      code: 400,
      data: null,
      msg: 'ok'
    }
  }
})
module.exports = router