const express = require('express')
const router = express.Router()
const router_handler = require('../../router_handler/web/products')

// 获取产品列表
router.get('/webapi/products/list',router_handler.list)

module.exports = router