const express = require('express')
const router = express.Router()
const router_handler = require('../../router_handler/web/news')

// 获取已发布的新闻列表
router.get('/webapi/news/list', router_handler.list)

// 获取新闻信息
router.get('/webapi/news/list/:id', router_handler.info)

// 获取前四新闻信息
router.get('/webapi/news/toplist',router_handler.toplist)

module.exports = router