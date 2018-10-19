const Koa =  require('koa')
const Router = require('koa-router')
const axios = require('axios')
const cors = require('@koa/cors');
const logger = require('koa-logger')

const app = new Koa()
const router = new Router()

router.get('/fact', async ctx => {
	const response =  await axios.get('https://catfact.ninja/fact')
	ctx.body = response.data
})

router.get('/breeds', async ctx => {
	const params = ctx.query
	const response =  await axios.get('https://catfact.ninja/breeds', { params })
	ctx.body = response.data	
})

app.use(logger())
app.use(cors())
app.use(router.routes())
app.listen(3000)