const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'public/productsuploads/' })
const router = express.Router()
const router_handler = require('../../router_handler/admin/products')

// 添加产品
router.post('/adminapi/products/add', upload.single('file'), router_handler.add)

// 获取产品列表信息
router.get('/adminapi/products/list', router_handler.list)

// 更新产品信息
router.post('/adminapi/products/list', upload.single('file'), router_handler.update)

// 获取产品信息
router.get('/adminapi/products/info/:id', router_handler.info)

//删除产品 
router.delete('/adminapi/products/list/:id', router_handler.delete)

module.exports = router