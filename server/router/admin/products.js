const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'public/productsuploads/' })
const router = express.Router()
const router_handler = require('../../router_handler/admin/products')

router.post('/adminapi/products/add',upload.single('file'),router_handler.add)




module.exports = router