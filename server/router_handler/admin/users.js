const db = require('../../db/index')
const JWT = require('../../util/jwt')

// 登录
exports.login = (req, res) => {
    // 传参为usernmae，password
    const userInfo = req.body
    const sqlStr = 'select * from users where username=?'
    db.query(sqlStr, [userInfo.username], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('账户不存在')
        if (results[0].password !== userInfo.password) return res.cc('密码错误')

        // 生成token
        const token = JWT.generate({ id: results[0].id, username: results[0].username }, '1d')
        // 配置请求头
        res.header('Authorization', token)
        const { username, gender, introduction, avatar, role, id } = results[0]
        res.send({
            code: 1,
            message: '登录成功',
            data: {
                id,
                username,
                gender,
                introduction,
                avatar,
                role
            }
        })
    })
}

// 更新个人信息
exports.upload = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    let payload = JWT.verify(token)
    const id = payload.id
    const { username, introduction, gender: numberGender } = req.body
    const gender = Number(numberGender)
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
    // 数据库查询语句
    let sqlStr
    // 查询数组
    let uploadArr
    if (avatar) {
        sqlStr = 'UPDATE users SET username = ?, introduction = ?, gender = ?, avatar = ? WHERE id = ?';
        uploadArr = [username, introduction, gender, avatar, id]
    } else {
        sqlStr = 'UPDATE users SET username = ?, introduction = ?, gender = ? WHERE id = ?';
        uploadArr = [username, introduction, gender, id]
    }
    db.query(sqlStr, uploadArr, (err, results) => {
        if (err) res.cc(err)
        if (results.affectedRows !== 1) res.cc('更新失败')
        if (avatar) {
            res.send({
                code: 1,
                message: '更新成功',
                data: {
                    username,
                    introduction,
                    gender,
                    avatar
                }
            })
        } else {
            res.send({
                code: 1,
                message: '更新成功',
                data: {
                    username,
                    introduction,
                    gender
                }
            })
        }
    })
}

// 添加用户
exports.add = (req, res) => {
    const { username, introduction, gender: numberGender, role: numberRole, password
    } = req.body
    const gender = Number(numberGender)
    const role = Number(numberRole)
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''

    const sqlStr = 'select * from users where username=?'
    db.query(sqlStr, username, (err, results) => {
        if (err) res.cc(err)
        if (results.length > 0) res.cc('用户名被占用，请更换用户名')
        const sqlStr = 'insert into users set ?'
        db.query(sqlStr, { username, password, role, gender, introduction, avatar }, (err, results) => {
            if (err) res.cc(err)
            if (results.affectedRows !== 1) {
                return res.cc('添加用户失败')
            }
            res.send({
                message: '添加成功',
                code: 1
            })
        })
    })
}

// 用户列表
exports.getList = (req, res) => {
    const sqlStr = 'select username,role,avatar,introduction,gender,id,password from users'
    db.query(sqlStr, (err, results) => {
        if (err) res.cc(err)
        res.send({
            code: 1,
            message: '获取用户列表成功',
            data: results
        })
    })
}

// 删除用户
exports.delList = (req, res) => {
    const id = req.params.id
    const sqlStr = 'delete from users where id=?'
    db.query(sqlStr, id, (err, results) => {
        if (err) res.cc(err)
        if (results.affectedRows !== 1) res.cc('删除失败')
        res.send({
            code: 1,
            message: '删除成功'
        })
    })
}

// 编辑用户
exports.editUser = (req, res) => {
    const data = req.body
    const sqlStr = 'update users set ? where id=?'
    db.query(sqlStr, [data, data.id], (err, results) => {
        if (err) res.cc(err)
        if (results.affectedRows !== 1) res.cc('编辑失败')
        res.send({
            code: 1,
            message: '编辑成功'
        })
    })
}

// 获取用户信息
exports.getUserInfo = (req, res) => {
    const sqlStr = 'select username,role,introduction,gender from users where id=?'
    db.query(sqlStr, req.params.id, (err, results) => {
        if (err) res.cc(err)
        res.send({
            code: 1,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}