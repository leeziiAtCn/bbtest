/*
 * @Author: leezii 
 * @Date: 2017-06-26 09:44:48 
 * @Last Modified by: leezii
 * @Last Modified time: 2017-06-27 12:00:09
 */
const router = require('koa-router')()
const {
  asyncTest
} = require('./../test/index')

const {
  makeRequest
} = require('./../utils/index')

router.get('/fire', async ctx => {
  let req = await makeRequest(ctx.query.apiId)
  let res = await asyncTest(req,ctx.query.count)
  ctx.response.body = res
})
module.exports = router
