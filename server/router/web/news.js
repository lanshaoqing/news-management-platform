const express = require('express')
const router = express.Router()
const router_handler = require('../../router_handler/web/news')

router.get('/webapi/news/list', router_handler.list)

router.get('/webapi/news/list/:id', router_handler.info)

router.get('/webapi/news/toplist',router_handler.toplist)

module.exports = router