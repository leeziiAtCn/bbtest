const Koa = require('koa')
const router = require('koa-router')()
const bodyparser = require('koa-bodyparser')
const staticServer = require('koa-static')
const base = require('./routes/base')
const app = new Koa()
app.use(staticServer('./../fe/dist'))
app.use(bodyparser())
app.use(router.routes())

router.use('/base', base.routes(), base.allowedMethods())

app.listen('3000')
