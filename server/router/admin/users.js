const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })
const router = express.Router()
const router_handler = require('../../router_handler/admin/users')

router.post('/adminapi/users/login', router_handler.login)

router.post('/adminapi/users/upload', upload.single('file'), router_handler.upload)

router.post('/adminapi/users/add', upload.single('file'), router_handler.add)

router.get('/adminapi/users/list', router_handler.getList)

router.delete('/adminapi/users/list/:id', router_handler.delList)

router.put('/adminapi/users/list/:id', router_handler.editUser)

router.get('/adminapi/users/info/:id', router_handler.getUserInfo)

module.exports = router