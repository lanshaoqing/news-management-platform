const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })
const router = express.Router()
const router_handler = require('../../router_handler/admin/news')

router.post('/adminapi/news/add',upload.single('file'),router_handler.add)




module.exports = router