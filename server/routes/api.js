/**
 * Created by leezi on 6/18/2017.
 */
const router = require('koa-router')()
const {prod_m, ser_m, api_m} = require('./../model/index')
router.get('/pro', async ctx => {
  ctx.response.body = await prod_m.searchAll()
})
router.get('/ser', async ctx => {
  ctx.response.body = await ser_m.searchAll()
})
router.get('/interface', async ctx => {
  ctx.response.body = await api_m.searchbyDid({
    id: ctx.query.id
  })
})
router.get('/info', async ctx => {
  let ser = await ser_m.searchAll()
  for (let val of ser) {
    val.item = await api_m.searchbyDid({
      id: val.id
    })
  }
  ctx.response.body = ser
})
module.exports = router
