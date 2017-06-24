/**
 * Created by leezi on 6/21/2017.
 */
const router = require('koa-router')()
const {asyncTest} = require('./../test/index')

router.post('/async', async ctx => {
  let {url, header, body} = ctx.request.body
  let {method} = body
  delete body.method
 try {
    ctx.response.body = await asyncTest({url, header, body}, method)
 } catch(err) {
    ctx.response.body = "我挂了,等会"
 }
})
module.exports = router
