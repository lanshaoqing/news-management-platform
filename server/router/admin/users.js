const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })
const router = express.Router()
const router_handler = require('../../router_handler/admin/users')

router.post('/adminapi/user/login', router_handler.login)

router.post('/adminapi/user/upload', upload.single('file'), router_handler.upload)

router.post('/adminapi/user/add', upload.single('file'), router_handler.add)

router.get('/adminapi/user/list', router_handler.getList)

router.delete('/adminapi/user/list/:id', router_handler.delList)

router.put('/adminapi/user/list/:id', router_handler.editUser)

router.get('/adminapi/user/info/:id', router_handler.getUserInfo)

module.exports = router