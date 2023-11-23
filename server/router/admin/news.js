const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })
const router = express.Router()
const router_handler = require('../../router_handler/admin/news')

// 添加新闻
router.post('/adminapi/news/add',upload.single('file'),router_handler.add)

// 获取新闻列表
router.get('/adminapi/news/list',router_handler.list)

// 更新新闻信息
router.post('/adminapi/news/list',upload.single('file'),router_handler.update)

// 获取新闻信息
router.get('/adminapi/news/list/:id',router_handler.info)

// 更新发布状态
router.put('/adminapi/news/publish',router_handler.publish)

// 删除新闻
router.delete('/adminapi/news/list/:id',router_handler.delete)

module.exports = router