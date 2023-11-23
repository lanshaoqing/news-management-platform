const express = require('express')
// const multer = require('multer')
// const upload = multer({ dest: 'public/newsuploads/' })
const router = express.Router()
const router_handler = require('../../router_handler/web/news')

router.get('/webapi/news/list', router_handler.list)

router.get('/webapi/news/list/:id', router_handler.info)

module.exports = router