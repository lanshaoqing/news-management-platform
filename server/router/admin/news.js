const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })
const router = express.Router()
const router_handler = require('../../router_handler/admin/news')

router.post('/adminapi/news/add',upload.single('file'),router_handler.add)

router.get('/adminapi/news/list',router_handler.list)

router.post('/adminapi/news/list',upload.single('file'),router_handler.update)

router.get('/adminapi/news/list/:id',router_handler.info)

router.put('/adminapi/news/publish',router_handler.publish)

router.delete('/adminapi/news/list/:id',router_handler.delete)


module.exports = router