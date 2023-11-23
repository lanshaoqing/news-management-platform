const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })
const router = express.Router()
const router_handler = require('../../router_handler/admin/users')

// 登录
router.post('/adminapi/users/login', router_handler.login)

// 更新个人信息
router.post('/adminapi/users/upload', upload.single('file'), router_handler.upload)

// 添加用户
router.post('/adminapi/users/add', upload.single('file'), router_handler.add)

// 获取用户列表
router.get('/adminapi/users/list', router_handler.getList)

// 删除用户
router.delete('/adminapi/users/list/:id', router_handler.delList)

// 编辑用户
router.put('/adminapi/users/list/:id', router_handler.editUser)

// 获取用户信息
router.get('/adminapi/users/info/:id', router_handler.getUserInfo)

module.exports = router